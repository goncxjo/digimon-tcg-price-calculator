import { Injectable, signal } from '@angular/core';
import { Card } from '../../backend';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly cards = signal<Card[]>([]);

  update(cards: Card[]) {
    this.cards.set(cards);
  }
}
