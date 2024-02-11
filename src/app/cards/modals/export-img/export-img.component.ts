import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card, Dolar } from 'src/app/backend';

@Component({
  selector: 'app-export-img',
  templateUrl: './export-img.component.html',
  styleUrls: ['./export-img.component.scss']
})
export class ExportImgComponent implements OnInit {

  cards: Card[] = [];
  dolar!: Dolar;
  precioTotal: number = 0;
  precioTotalUSD: number = 0;
  // TODO: pendiente parametrizar
  colExportWidth: string = 'calc(100% / 4)';

  constructor(
    private modalService: NgbActiveModal,

  ) { }

  dismiss(reason?: string) {
    this.modalService.dismiss(reason)
  }

  ngOnInit(): void {
  }

  close(response: string): void {
    this.modalService.close(response)
  }

  accept(): void {
    this.modalService.close('yes')
  }

  getPrecio(c: Card) {
    return c.price.currency_value * c.multiplier;
  }

  getPrecioUSD(c: Card) {
    return Math.round(this.getPrecio(c) / this.dolar.venta * 100) / 100;
  }

}
