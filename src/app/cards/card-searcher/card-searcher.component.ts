import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Card } from 'src/app/backend';
import { CardTraderService } from 'src/app/backend/services/card-trader.service';
import { AppConfigService } from 'src/app/core';

@Component({
  selector: 'app-card-searcher',
  templateUrl: './card-searcher.component.html',
  styleUrls: ['./card-searcher.component.scss'],
})
export class CardSearcherComponent implements OnInit {
  public model!: Card;
  data: Card[] = [];
  @Output() card = new EventEmitter<Card>();

  constructor(
    private appConfig: AppConfigService,
    private cardTraderService: CardTraderService,
  ) { }

  search: OperatorFunction <string, readonly Card[]> = (text$: Observable <string> ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
			filter((term) => term.length >= 2),
      map((term) =>
        term === '' ?
        [] :
        this.data.filter((c) => c.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 50),
      ),
    );

    formatter = (card: Card) => card.fullName;

  ngOnInit(): void {
    this.cardTraderService.getAllBlueprints().subscribe(result => {
      if (result) {
        this.data = result as Card[];
      }
    });
  }  

  agregarCarta() {
    this.card.emit(this.model);
  }
}
