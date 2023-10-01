import { Injectable } from '@angular/core';
import { Card } from '../models';
import * as uuid from 'uuid';
import { SearchProductResultTcgPlayer, SearchTcgPlayer } from '../models/tcg-player';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
      private httpClient: HttpClient,
      private appConfigService: AppConfigService
  ) { }

  public getListTcgPlayerCards(response$: Observable<SearchTcgPlayer>, imageEndpoint: string, productUrl: string): Observable<Card[]> {
    return response$.pipe(
      map((response: SearchTcgPlayer) => {
        const results: SearchProductResultTcgPlayer[] = response.results[0].results;
        let cards: Card[] = [];
        results.forEach(res => {
          const card = this.mapTcgPlayerToCard(res, imageEndpoint, productUrl);
          cards.push(card);
        });
        return cards;    
      })
      )
    }
    
  public getTcgPlayerCard(response$: Observable<SearchTcgPlayer>, imageEndpoint: string, productUrl: string): Observable<Card> {
    return response$.pipe(
      map((response: SearchTcgPlayer) => {
        return this.mapTcgPlayerToCard(response, imageEndpoint, productUrl);
      })
    );
  }


  public mapTcgPlayerToCard(res: any, imageEndpoint: string, productUrl: string) {
    let card: Card = {} as Card;

    try {
      let cardId = `${res.productId}`.replace('.0', '');
      const number_split = res.customAttributes.number.split(" ");
      const collector_number = number_split[0];
      const rarity_code = number_split[1];
      
      card = {
          id: uuid.v4(),
          name: res.productName,
          fullName: `${res.productName} (${collector_number})`,
          expansion_id: res.setId,
          card_trader_id: null,
          card_market_id: null,
          tcg_player_id: parseInt(cardId),
          rarity_code: rarity_code,
          rarity_name: res.rarityName,
          collector_number: collector_number,
          expansion_name: res.setName,
          image_small_url: imageEndpoint.replace('{quality}', '1').replace('{id}', cardId),
          image_url: imageEndpoint.replace('{quality}', '100').replace('{id}', cardId),
          tcg_player_url: `${productUrl}`.replace('{id}', cardId),
          custom_price: {
              currency_symbol: "ARS",
              currency_value: 0.0
          },
          price: {
              currency_symbol: "ARS",
              currency_value: 0.0
          },
          multiplier: 1
      } as Card;  
    } catch (error) {
      console.log('hubo un error al obtener info de carta')
    }

    return card;
  }
}