import { Injectable, signal } from '@angular/core';
import { CardPrice, Dolar, DolarService } from '../../backend';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolarDataService {
  readonly dolar = signal<Dolar | null>(null);
  readonly userCurrency = signal<string>('ARS');

  constructor(
    private service: DolarService
  ) {
    this.getDolar();
  }

  getDolar(){
    this.service.getDolarBlue()
    .pipe(take(1))
    .subscribe((res: Dolar) => {
      this.dolar.set(res);
    });
  }

  update(dolar: Dolar) {
    this.dolar.set(dolar);
  }

  get venta() {
    return this.dolar()?.venta ?? 1;
  }

  setUserCurrency(currency: string) {
    this.userCurrency.set(currency);
  }

  convertToDolars(price: CardPrice | null | undefined) {
    if (this.userCurrency() == 'ARS' && price?.currency_symbol == 'USD') {
      return Math.round(price.currency_value * this.venta * 100) / 100;
    }
    return price?.currency_value || 0;
  }
}
