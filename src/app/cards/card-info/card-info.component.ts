import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TcgPlayerService } from 'src/app/backend';
import { Card, Dolar } from 'src/app/backend/models';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnDestroy {
  @Input() data!: Card;
  @Input() dolar!: Dolar;
  @Output() priceChangeEvent = new EventEmitter<boolean>();
  priceSelected: string = "custom";
  custom_price: number = 0;
    
  constructor(
    private tcgPlayerService: TcgPlayerService
  ) { }

  ngOnInit(): void {
  }

  async loadTcgPlayerPrices() {
    if (this.data.tcg_player_id) {
      const tcgPlayerPrice$ = this.tcgPlayerService.getCardPrice(this.data.tcg_player_id);
      const tcg_player_prices = await firstValueFrom(tcgPlayerPrice$);
      if (tcg_player_prices.tcg_player_foil) {
        this.priceSelected = 'tcg_player_foil'
        this.data.prices.set('tcg_player_foil', tcg_player_prices.tcg_player_foil);
      }
      if (tcg_player_prices.tcg_player_normal) {
        this.priceSelected = 'tcg_player_normal'
        this.data.prices.set('tcg_player_normal', tcg_player_prices.tcg_player_normal);
      }
      
      this.setPrecioCarta();
    }
  }

  ngAfterViewInit() {
    this.loadTcgPlayerPrices();
  }

  getPrecioCarta() {
    const price = this.data.prices.get(this.priceSelected);
    if (price?.currency_symbol == 'USD') {
      return Math.round(price.currency_value * this.dolar.venta * 100) / 100;
    }
    return price?.currency_value || 0;
  }

  setPrecioCarta() {
    this.data.price.currency_value = this.getPrecioCarta();
    this.priceChangeEvent.emit(true);
  }

  cartaTienePrecio() {
    return this.getPrecioCarta() !== 0;
  }

  getPrecioCartaFixed() {
    return this.getPrecioCarta().toFixed(2);
  }

  onPriceSelected(priceSelected: string) {
    this.priceSelected = priceSelected;
    this.setPrecioCarta();
  }
  
  onCustomPriceChange($event: any) {
    this.data.prices.set('custom', { currency_symbol: 'ARS', currency_value: this.custom_price });
    this.setPrecioCarta();
  }

  ngOnDestroy(): void {
  }
}
