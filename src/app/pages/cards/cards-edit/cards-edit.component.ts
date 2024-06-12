import { Component, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../../core';
import { ToastrService } from 'ngx-toastr';
import { DolarDataService } from '../../../core/services/dolar.data.service';
import { DataService } from '../../../core/services/data.service';
import { Card } from '../../../backend';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cards-edit',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe],
  templateUrl: './cards-edit.component.html',
  styleUrl: './cards-edit.component.scss'
})
export class CardsEditComponent {
  closeIcon = faTimes;
  plusIcon = faPlus;
  minusIcon = faMinus;
  viewIcon = faEye;

  cards = computed(() => this.dataService.cards());
  total = computed(() => this.dataService.totals());
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

  getPrice(card: Card) {
    return this.dataService.getPrice(card);
  }
  
  removeCard(card: Card) {
    this.dataService.remove(card);
  }

  changeMultiplier(card: Card, i: number) {
    this.dataService.updateCardMultiplier(card, i);
  }
}
