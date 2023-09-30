import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Card, Dolar } from 'src/app/backend/models';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data!: Card;
  @Input() dolar!: Dolar;
  priceSelected: string = "tcg_player_normal";
  @Output() priceChanged = new EventEmitter<boolean>();
    
  ngOnInit(): void { }

  ngAfterViewInit() {
    setTimeout(() => {
      let price = this.getTcgPlayerPrice('Normal');
      if (price == 0) {
        this.priceSelected = "tcg_player_foil"
        price = this.getTcgPlayerPrice('Foil');
      }
      this.data.price.currency_value = Math.round(price * this.dolar.venta * 100) / 100;
    }, 0);
  }
  
  getPrecioCarta() {
    let precio = 0.0;
    switch (this.priceSelected) {
      case 'tcg_player_normal':
      case 'tcg_player_foil':
        const printingType = this.priceSelected === 'tcg_player_normal' ? 'Normal' : 'Foil';
        const price = this.getTcgPlayerPrice(printingType);
        precio = price * this.dolar.venta;
        break;
      case 'phoenix':
          precio = this.data.phoenix_price.currency_value;
        break;
      default:
          precio = this.data.price.currency_value;
          break;
    }
    // this.priceChanged.emit(true);
    return precio;
  }

  getTcgPlayerPrice(printingType: string) {
    return this.data.tcg_player_price.find(p => p.printingType === printingType)?.listedMedianPrice || 0;
  }

  getPhoenixPrice() {
    return this.data.phoenix_price.currency_value;
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
