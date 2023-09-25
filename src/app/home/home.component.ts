import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../core';
import { CardTraderService } from '../api/services/card-trader.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  selectedCard: any;

  constructor(
    private appConfig: AppConfigService,
    private cardTraderService: CardTraderService,
  ) { }

  ngOnInit(): void {
    // this.appConfig.getExampleData().subscribe(result => {
    //   if (result) {
    //     this.data = result as any[];
    //   }
    // });

    // this.cardTraderService.getAllBlueprints().subscribe(data => {
    //   console.log(data);
    // });
  }
  
  onCardAdded($event: any) {
    let card = $event;
    this.cardTraderService.getCardPrice(card.card_trader_id)
    .pipe(take(1))
    .subscribe(res => {
      console.log(res);
      card.price_ = res;
      this.selectedCard = card;
    });
  }
}
