import { Component, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../../core';
import { ToastrService } from 'ngx-toastr';
import { DolarDataService } from '../../../core/services/dolar.data.service';
import { DataService } from '../../../core/services/data.service';
import { Card } from '../../../backend';
import {  } from '@angular/common';
import { CardPriceCurrencyPipe } from '../../../shared';

@Component({
  selector: 'app-cards-edit',
  standalone: true,
  imports: [FontAwesomeModule, CardPriceCurrencyPipe],
  templateUrl: './cards-edit.component.html',
  styleUrl: './cards-edit.component.scss'
})
export class CardsEditComponent {
  closeIcon = faTimes;
  plusIcon = faPlus;
  minusIcon = faMinus;
  viewIcon = faEye;

  cards = computed(() => this.dataService.cards());
  editDolarMode: boolean = false;

  dolarService = inject(DolarDataService);
  dataService = inject(DataService);
  
  constructor(
    private toastr: ToastrService,
    private loaderService: LoaderService,
  ) {
  }

  get noData() {
    return this.cards().length == 0;
  }

  ngOnInit(): void {
  }
  
  removeCard(card: Card) {
    this.dataService.remove(card);
  }

  changeMultiplier(card: Card, i: number) {
    this.dataService.updateCardMultiplier(card, i);
  }


  onCardRemoved(id: number) {
    this.removeCard({ tcg_player_id: id } as Card)
  }
}
