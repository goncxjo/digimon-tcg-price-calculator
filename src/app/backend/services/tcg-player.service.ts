import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeAll, of } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { Card } from '../models';
import { ProductPriceTcgPlayer, SearchProductResultTcgPlayer, SearchTcgPlayer } from '../models/tcg-player';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import { createTcgPlayerQuery } from './tcg-player-search-query';

@Injectable({
    providedIn: 'root'
})
export class TcgPlayerService {
    private searchEndpoint: string;
    private priceEndpoint: string;
    private imageEndpoint: string;
    private productUrl: string;

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        this.searchEndpoint = this.appConfigService.config.TCG_PLAYER_API_SEARCH_ENDPOINT;
        this.priceEndpoint = this.appConfigService.config.TCG_PLAYER_API_PRICE_ENDPOINT;
        this.imageEndpoint = this.appConfigService.config.TCG_PLAYER_API_IMAGE_ENDPOINT;
        this.productUrl = this.appConfigService.config.TCG_PLAYER_PRODUCT_URL;
    }
  
    getDigimonCards(value: string): Observable<Card[]> {
        if (value == '') {
            return of<Card[]>([]);
        }

        const url = `${this.searchEndpoint}/search/request`;
        const params = {
            q: value,
            isList: true
        };
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        return this.httpClient.post<SearchTcgPlayer>(url, JSON.stringify(createTcgPlayerQuery()), { params: params, headers: headers }).pipe(
            map((response: SearchTcgPlayer) => {
                return this.getCardsFromResults(response);
            })
        );
    }

    getDigimonCardById(tcg_player_id: number | null): Observable<Card> {
        if (!tcg_player_id) {
            return of<Card>();
        }

        const url = `${this.searchEndpoint}/search/request`;
        const params = {
            isList: true
        };

        const body = JSON.stringify(createTcgPlayerQuery(tcg_player_id))
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        return forkJoin([
            this.httpClient.post<SearchTcgPlayer>(url, body, { params: params, headers: headers }),
            this.getCardPrice(tcg_player_id || 0)
        ]).pipe(
            map(([response, price]) => {
                if (response.results[0].totalResults) {
                    let cards = this.getCardsFromResults(response);
                    let card = cards[0];
                    card.tcg_player_price = price;
                    return card;                        
                }
                return {} as Card;
            }),
        );
    }

    getCardsFromResults(response: SearchTcgPlayer): Card[] {
        const results: SearchProductResultTcgPlayer[] = response.results[0].results;
        let cards: Card[] = [];
        results.forEach(res => {
            let cardId = `${res.productId}`.replace('.0', '');
            const number_split = res.customAttributes.number.split(" ");
            const collector_number = number_split[0];
            const rarity_code = number_split[1];
            cards.push({
                id: uuid.v4(),
                name: res.productName,
                fullName: `${res.productName} (${collector_number})`,
                expansion_id: res.setId,
                image_small_url: this.imageEndpoint.replace('{quality}', '1').replace('{id}', cardId),
                image_url: this.imageEndpoint.replace('{quality}', '100').replace('{id}', cardId),
                card_trader_id: null,
                card_market_id: null,
                tcg_player_id: parseInt(cardId),
                rarity_code: rarity_code,
                rarity_name: res.rarityName,
                tcg_player_url: `${this.productUrl}`.replace('{id}', cardId),
                collector_number: collector_number,
                expansion_name: res.setName,
                price: {
                    currency_symbol: "ARS",
                    currency_value: 0.0
                }
            } as Card);
        });
        return cards;
    }

    getCardPrice(tcg_player_id: number): Observable<ProductPriceTcgPlayer[]> {
        const url = `${this.priceEndpoint}/product/${tcg_player_id}/pricepoints?mpfev=1821`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        return this.httpClient.get<ProductPriceTcgPlayer[]>(url, { headers: headers });
    }
}