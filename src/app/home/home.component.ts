import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DolarService } from '../backend/services/dolar.service';
import { Dolar } from '../backend/models';
import { TcgPlayerService } from '../backend/services/tcg-player.service';

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
    private tcgPlayerService: TcgPlayerService,
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
    this.tcgPlayerService.getCardPrice(card.tcg_player_id)
    .pipe(take(1))
    .subscribe(res => {
      card.price = res;
      this.selectedCard = card;
    });
  }
}
