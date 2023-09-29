import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Card, Dolar } from 'src/app/backend/models';
import { ProductPriceTcgPlayer } from 'src/app/backend/models/tcg-player';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnDestroy {
  @Input() data!: Card;
  @Input() dolar!: Dolar;
  priceSelected: string = "tcg_player_normal";
    
  ngOnInit(): void {
  }
  
  getPrecioCarta() {
    switch (this.priceSelected) {
      case 'tcg_player_normal':
      case 'tcg_player_foil':
        const printingType = this.priceSelected === 'tcg_player_normal' ? 'Normal' : 'Foil';
        const price = this.getTcgPlayerPrice(printingType);
        return this.data.price.currency_value = price * this.dolar.venta;
      default:
        return this.data.price.currency_value;
    }
  }

  getTcgPlayerPrice(printingType: string) {
    return this.data.tcg_player_price.find(p => p.printingType === printingType)?.listedMedianPrice || 0;
  }

  cartaTienePrecio() {
    return this.getPrecioCarta() !== 0;
  }

  getPrecioCartaFixed() {
    return this.getPrecioCarta().toFixed(2);
  }

  getFechaActualizacionDolar() {
    return (new Date(this.dolar.fechaActualizacion)).toLocaleString('es-AR')
  }

  onPriceSelected(priceSelected: string) {
    this.priceSelected = priceSelected;
  }

  ngOnDestroy(): void {
  }
}
