import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, OperatorFunction, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Card } from 'src/app/backend';
import { TcgPlayerService } from 'src/app/backend/services/tcg-player.service';

@Component({
  selector: 'app-card-searcher',
  templateUrl: './card-searcher.component.html',
  styleUrls: ['./card-searcher.component.scss'],
})
export class CardSearcherComponent implements OnInit {
  public model?: Card;
  data: Card[] = [];
  @Output() card = new EventEmitter<Card>();
	
  searching = false;
	searchFailed = false;

  constructor(
    private tcgPlayerService: TcgPlayerService,
  ) { }

  search: OperatorFunction <string, readonly Card[]> = (text$: Observable <string> ) =>
    text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) =>
				this.tcgPlayerService.getDigimonCards(term).pipe(
					tap(() => (this.searchFailed = false)),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					}),
				),
			),
			tap(() => (this.searching = false)),
    );

    formatter = (card: Card) => card.fullName;

  ngOnInit(): void {
  }  

  agregarCarta() {
    this.card.emit(this.model);
    delete this.model;
  }
}
