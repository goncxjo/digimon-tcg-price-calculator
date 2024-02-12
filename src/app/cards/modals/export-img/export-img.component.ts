import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card, Dolar } from 'src/app/backend';

@Component({
  selector: 'app-export-img',
  templateUrl: './export-img.component.html',
  styleUrls: ['./export-img.component.scss']
})
export class ExportImgComponent implements OnInit, AfterViewInit {

  form = this.buildForm();
  cards: Card[] = [];
  dolar!: Dolar;
  precioTotal: number = 0;
  precioTotalUSD: number = 0;
  selectedCurrency = 'ARS';
  // TODO: pendiente parametrizar
  colExport: number = 5;
  colExportWidth: string = `calc(100% / ${this.colExport})`;

  constructor(
    private modalService: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.get('currency')?.setValue(this.selectedCurrency);
    }, 0);
  }

  get formFields() {
    return this.form.controls;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      currency: ['']
    });
  }


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
    var price = c.price.currency_value;
    if (this.selectedCurrency == 'ARS') {
      return price;
    }
    return this.getPrecioUSD(price);
  }

  getPrecioUSD(price: number) {
    return Math.round(price / this.dolar.venta * 100) / 100;
  }

  zoom(i: number){
    this.colExport += i;
    this.colExportWidth = `calc(100% / ${this.colExport})`;
  }

  onCurrencyChange(event: string) {
    this.selectedCurrency = event;
  }

}
