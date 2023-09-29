import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { DolarService } from '../backend/services/dolar.service';
import { Card, Dolar } from '../backend/models';
import { TcgPlayerService } from '../backend/services/tcg-player.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  id: string = '0';
  cards: Card[] = [];
  selectedCard?: Card;
  dolar!: Dolar;
  precioTotal: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tcgPlayerService: TcgPlayerService,
    private dolarService: DolarService,
  ) {
    route.params.pipe(
      take(1),
      map(p => p['id'])
    ).subscribe(id => {
      this.id = id;
    });
  }

  ngOnInit(): void {
    this.dolarService.getDolarBlue()
    .pipe(take(1))
    .subscribe(res => {
      this.dolar = res;
    });

    if (this.id) {
      this.tcgPlayerService.getDigimonCardById(parseInt(this.id))
      .pipe(take(1))
      .subscribe(res => {
        if (res['id']) {
          this.selectedCard = res;
        }
        else {
          this.router.navigate(['/'])
        }
      });
    }

  }
  
  onCardAdded($event: any) {
    let card = $event;
    let foundCard =_.find(this.cards, (c) => {
      return c.tcg_player_id == card.tcg_player_id;
    });
    if(!foundCard) {
      setTimeout(() => {
        this.getById(card.tcg_player_id);
      }, 0);
    }
  }
  
  getById(tcg_player_id: any) {
    this.tcgPlayerService.getDigimonCardById(tcg_player_id)
    .pipe(take(1))
    .subscribe(res => {
      this.cards.push(res);
      this.calcularPrecioTotal();
    });
  }

  getCardMiniInfo(card: Card) {
    return `${card.name} ${card.collector_number} # ${card.rarity_code}`
  }

  removeCard(card: Card) {
    _.remove(this.cards, (c) => {
      return c.tcg_player_id == card.tcg_player_id;
    });
    this.calcularPrecioTotal();
  }

  calcularPrecioTotal() {
    setTimeout(() => {
      this.precioTotal = _.sumBy(this.cards, (c) => {
        return c.price.currency_value * c.multiplier;
      });
      
    }, 10);
  }

  changeMultiplier(card: Card, i: number) {
    if (card.multiplier + i >= 1) {
      card.multiplier += i;
    }
    this.calcularPrecioTotal();
  }
}
