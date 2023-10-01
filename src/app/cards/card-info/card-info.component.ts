import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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
  priceSelected: string = "tcg_player_normal";
    
  constructor(
    private tcgPlayerService: TcgPlayerService
  ) { }

  ngOnInit(): void {
  }

  async loadTcgPlayerPrices() {
    if (this.data.tcg_player_id) {
      const tcgPlayerPrice$ = this.tcgPlayerService.getCardPrice(this.data.tcg_player_id);
      this.data.tcg_player_price = await firstValueFrom(tcgPlayerPrice$);
        let price = this.getTcgPlayerPrice('Normal');
        if (price == 0) {
          this.priceSelected = "tcg_player_foil"
          price = this.getTcgPlayerPrice('Foil');
        }
        this.data.price.currency_value = Math.round(price * this.dolar.venta * 100) / 100;
    }
  }

  ngAfterViewInit() {
    this.loadTcgPlayerPrices();
  }

  getPrecioCarta() {
    return this.data.price.currency_value;
  }

  setPrecioCarta() {
    let precio = 0.0;
    switch (this.priceSelected) {
      case 'tcg_player_normal':
      case 'tcg_player_foil':
        const printingType = this.priceSelected === 'tcg_player_normal' ? 'Normal' : 'Foil';
        const price = this.getTcgPlayerPrice(printingType);
        precio = price * this.dolar.venta;
        break;
      case 'custom':
        precio = this.data.custom_price.currency_value || 0;
        break;
      default:
        break;
    }
    this.data.price.currency_value = precio;
    this.priceChangeEvent.emit(true);
  }

  getTcgPlayerPrice(printingType: string) {
    switch (printingType) {
      case 'Foil':
        return this.data.tcg_player_price?.foil?.listedMedianPrice || 0;    
      case 'Normal':
        return this.data.tcg_player_price?.normal?.listedMedianPrice || 0;    
      default:
        return 0;
    }
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
    this.setPrecioCarta();
  }
  
  onCustomPriceChange($event: any) {
    this.setPrecioCarta();
  }

  ngOnDestroy(): void {
  }
}
