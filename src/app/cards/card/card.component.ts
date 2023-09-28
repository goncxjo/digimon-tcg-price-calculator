import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Card, Dolar } from 'src/app/backend/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() data!: Card;
  @Input() dolar!: Dolar;
    
  ngOnInit(): void {
  }

  cartaTienePrecio() {
    return this.getPrecioCarta() !== 0;
  }

  getPrecioCarta() {
    return (this.data.price * this.dolar.venta);
  }

  getPrecioCartaFixed() {
    return this.getPrecioCarta().toFixed(2);
  }

  getFechaActualizacionDolar() {
    return (new Date(this.dolar.fechaActualizacion)).toLocaleString('es-AR')
  }

  ngOnDestroy(): void {
  }
}
