import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, OperatorFunction, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
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
  @ViewChild('cardSearcherInput') cardSearcherInput!: ElementRef;

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
    setTimeout(() => {
      this.card.emit(this.model);
      delete this.model;
    }, 0);
  }

  blurInput() {
    this.cardSearcherInput.nativeElement.blur();
  }
}
