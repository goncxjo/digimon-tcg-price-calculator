import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { Card } from '../models';
import { CardPriceTcgPlayer, ProductPriceTcgPlayer, SearchTcgPlayer } from '../models/tcg-player';
import * as _ from 'lodash';
import { createTcgPlayerQuery } from './tcg-player-search-query';
import { CardService } from './card.service';

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
        private cardService: CardService,
    ) {
        this.searchEndpoint = this.appConfigService.config.TCG_PLAYER_API_SEARCH_ENDPOINT;
        this.priceEndpoint = this.appConfigService.config.TCG_PLAYER_API_PRICE_ENDPOINT;
        this.imageEndpoint = this.appConfigService.config.TCG_PLAYER_API_IMAGE_ENDPOINT;
        this.productUrl = this.appConfigService.config.TCG_PLAYER_PRODUCT_URL;
    }
  
    public getDigimonCards(value: string): Observable<Card[]> {
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
        const response$ = this.httpClient.post<SearchTcgPlayer>(url, JSON.stringify(createTcgPlayerQuery()), { params: params, headers: headers });
        return this.cardService.getListTcgPlayerCards(response$, this.imageEndpoint, this.productUrl);
    }

    public getDigimonCardById(tcg_player_id: number): Observable<Card> {
        const url = `${this.searchEndpoint}/product/${tcg_player_id}/details`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        const response$ = this.httpClient.get<SearchTcgPlayer>(url, { headers: headers });
        return this.cardService.getTcgPlayerCard(response$, this.imageEndpoint, this.productUrl);
    }

    public getCardPrice(tcg_player_id: number): Observable<CardPriceTcgPlayer> {
        const url = `${this.priceEndpoint}/product/${tcg_player_id}/pricepoints?mpfev=1821`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        return this.httpClient.get<ProductPriceTcgPlayer[]>(url, { headers: headers }).pipe(
            map((res: ProductPriceTcgPlayer[]) => {
                const tcg_player_normal = {
                    currency_symbol: 'USD',
                    currency_value: res[0].listedMedianPrice
                };
                const tcg_player_foil = {
                    currency_symbol: 'USD',
                    currency_value: res[1].listedMedianPrice
                }
                return {
                    tcg_player_normal: tcg_player_normal.currency_value != null ? tcg_player_normal : null,
                    tcg_player_foil: tcg_player_foil.currency_value != null ? tcg_player_foil : null
                };
            })
        );
    }

}