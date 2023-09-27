import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { Card } from '../models';
import { TcgPlayerSearchQuery } from './tcg-player-search-query';
import { ProductPriceTcgPlayer, SearchProductResultTcgPlayer, SearchTcgPlayer } from '../models/tcg-player';
import * as _ from 'lodash';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class TcgPlayerService {
    private searchEndpoint: string;
    private productEndpoint: string;
    private priceEndpoint: string;
    private imageEndpoint: string;

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        this.searchEndpoint = this.appConfigService.config.TCG_PLAYER_API_SEARCH_ENDPOINT;
        this.productEndpoint = this.appConfigService.config.TCG_PLAYER_API_PRODUCT_ENDPOINT;
        this.priceEndpoint = this.appConfigService.config.TCG_PLAYER_API_PRICE_ENDPOINT;
        this.imageEndpoint = this.appConfigService.config.TCG_PLAYER_API_IMAGE_ENDPOINT;
    }
  
    getDigimonCards(value: string): Observable<Card[]> {
        const url = `${this.searchEndpoint}/search/request`;
        const params = {
            q: value,
            isList: true
        };
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        return this.httpClient.post<SearchTcgPlayer>(url, JSON.stringify(TcgPlayerSearchQuery), { params: params, headers: headers }).pipe(
            map((response: SearchTcgPlayer) => {
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
                        collector_number: collector_number,
                        expansion_name: res.setName,
                    } as Card);
                });
                return cards;
            })
        );
    }

    getCardPrice(tcg_player_id: number): Observable<number> {
        const url = `${this.priceEndpoint}/product/${tcg_player_id}/pricepoints?mpfev=1821`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        return this.httpClient.get<ProductPriceTcgPlayer[]>(url, { headers: headers }).pipe(
            map((response: ProductPriceTcgPlayer[]) => {
                let price = Infinity;
                response.forEach((p: ProductPriceTcgPlayer) => {
                    if (p.listedMedianPrice) {
                        price = Math.min(price, p.listedMedianPrice);
                    }
                })
                return price === Infinity ? 0 : price;
            })
        );
    }

}