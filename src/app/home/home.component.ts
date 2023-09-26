import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../core';
import { CardTraderService } from '../backend/services/card-trader.service';
import { take } from 'rxjs';
import { DolarService } from '../backend/services/dolar.service';
import { Dolar } from '../backend/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  selectedCard: any;
  dolar!: Dolar;

  constructor(
    private appConfig: AppConfigService,
    private cardTraderService: CardTraderService,
    private dolarService: DolarService,
  ) { }

  ngOnInit(): void {
    this.dolarService.getDolarBlue()
    .pipe(take(1))
    .subscribe(data => {
      this.dolar = data;
    });
  }
  
  onCardAdded($event: any) {
    let card = $event;
    this.cardTraderService.getCardPrice(card.card_trader_id)
    .pipe(take(1))
    .subscribe(res => {
      card.price = res;
      this.selectedCard = card;
    });
  }
}
