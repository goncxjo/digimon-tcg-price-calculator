import { Injectable, computed, inject, signal } from '@angular/core';
import { Card, TcgPlayerService } from '../../backend';
import _ from 'lodash';
import { forkJoin } from 'rxjs';
import { DolarDataService } from './dolar.data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly #cards = signal<Card[]>([]);

  readonly cards = computed(this.#cards);
  readonly totals = computed(() => {
    return _.sumBy(this.cards(), (c) => {
      return c.price.currency_value * c.multiplier;
    });
  });

  tcgPlayerService = inject(TcgPlayerService);
  dolarService = inject(DolarDataService);

  update(cards: Card[]) {
    cards.forEach(card => this.add(card));
  }

  add(card: Card): void {
    const tcg_player_id = card.tcg_player_id || 0;

    const info = this.tcgPlayerService.getDigimonCardById(tcg_player_id);
    const price = this.tcgPlayerService.getCardPrice(tcg_player_id);

    forkJoin([info, price])
      .subscribe(result => {
          const cardResult = result[0];
          const priceResult = result[1];

          cardResult.multiplier = card.multiplier;
          
          cardResult.selectedPrice = 'custom'; 
          cardResult.prices.set('custom', card.prices.get('custom') || null);
          if (priceResult.tcg_player_foil) {
            cardResult.selectedPrice = 'tcg_player_foil'; 
            cardResult.prices.set('tcg_player_foil', priceResult.tcg_player_foil);
          }
          if (priceResult.tcg_player_normal) {
            cardResult.selectedPrice = 'tcg_player_foil'; 
            cardResult.prices.set('tcg_player_normal', priceResult.tcg_player_normal);
          }

          this.#cards.update(cards => [...cards, cardResult]);
        }
      )
  }

  remove(card: Card) {
    this.#cards.update((cards) => {
      return _.filter(cards, (c) => c.tcg_player_id !== card.tcg_player_id);
    });
  }

  updateCardMultiplier(card: Card, i: number) {
    this.#cards.update((cards) => {
      return _.map(cards, (c) => {
        if (c.tcg_player_id == card.tcg_player_id) {
          c.changeMultiplier(i);
        }
        return c;
      });
    });
  }

  getPrecio(card: Card) {
    const price = card.getPrecioOrDefault();
    if (price?.currency_symbol == 'USD') {
      return Math.round(price.currency_value * this.dolarService.venta * 100) / 100;
    }
    return price?.currency_value || 0;
  }

  setPrecio(card: Card, priceSelected?: string) {
    this.#cards.update((cards) => {
      return _.map(cards, (c) => {
        if (c.tcg_player_id == card.tcg_player_id) {
          c.price.currency_value = this.getPrecio(card);
        }
        return c;
      });
    });
  }
}
