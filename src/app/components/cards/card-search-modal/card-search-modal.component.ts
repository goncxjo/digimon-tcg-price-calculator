import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation, faSearch, faSliders, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Card, FiltersTcgPlayerQuery, TcgPlayerService } from '../../../backend';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import _ from 'lodash';
import { AsyncPipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-card-search-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbHighlight, AsyncPipe],
  templateUrl: './card-search-modal.component.html',
  styleUrl: './card-search-modal.component.scss',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class CardSearchModalComponent {
  searchIcon = faSearch;
  warningIcon = faTriangleExclamation;
  infoIcon = faCircleExclamation;
  filetersIcon = faSliders;

	activeModal = inject(NgbActiveModal);

  form = this.buildForm();
  searchCard$ = new BehaviorSubject<string>('');
  cardSearchTextInput = new FormControl();
  searching = false;

  mostrarBusquedaAvanzada = false;
  esPreRelease = false;

  get term() {
    return this.cardSearchTextInput.value;
  }

  constructor(
    private tcgPlayerService: TcgPlayerService,
    private formBuilder: FormBuilder,
  ) { }

  doCardSearch() {
    this.searchCard$.next(this.cardSearchTextInput.value)
  }

  cards$: Observable<Card[]> = this.searchCard$.pipe(
    tap(() => (this.searching = true)),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) =>
      this.tcgPlayerService.getDigimonCards(term, this.mapFilters()).pipe(
        // tap(() => (this.searchFailed = false)),
        catchError(() => {
          // this.searchFailed = true;
          return of([]);
        }),
      ),
    ),
    tap(() => (this.searching = false)),
  );

  ngOnInit(): void {
  }  
  
  private buildForm(): FormGroup {
    return this.formBuilder.group({
      expansion: [''],
      category: [''],
      colors: [''],
      rarities: [''],
      isPreRelease: [''],
    });
  }

  mapFilters(): FiltersTcgPlayerQuery {
    var values = this.form.getRawValue();
    return {
      expansions: values?.expansion?.urlName ? [values?.expansion?.urlName] : [],
      categories: values?.category?.id ? [values?.category?.id] : [],
      colors: _.map(values?.colors, 'id'),
      rarities: _.map(values?.rarities, 'id'),
      isPreRelease: this.esPreRelease
    }
  }


  toggleBusquedaAvanzada() {
    this.mostrarBusquedaAvanzada = !this.mostrarBusquedaAvanzada;
    if(!this.mostrarBusquedaAvanzada) {
      this.form.reset();
      this.esPreRelease = false;
    }
  }

  onIsPreReleaseChanged($event: any) {
    this.esPreRelease = $event.target.checked;
  }    

}

