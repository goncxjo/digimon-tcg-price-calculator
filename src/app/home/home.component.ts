import {Location} from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { take } from 'rxjs';
import * as _ from 'lodash';
import { Card, CardExport, Dolar } from '../backend/models';
import { CryptoService, DolarService, TcgPlayerService } from '../backend/services';
import { style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class HomeComponent implements OnInit {
  id: string = '0';
  importData: string = '';
  cards: Card[] = [];
  selectedCard?: Card;
  dolar!: Dolar;
  activeIds: any[] = [];
  precioTotal: number = 0;
  priceSelected: any;
  mostrarAyuda: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tcgPlayerService: TcgPlayerService,
    private dolarService: DolarService,
    private cryptoService: CryptoService,
    private clipboard: Clipboard,
  ) {
    this.route.params.pipe(
      take(1),
    ).subscribe((params) => {
      this.id = params['id'];
    });
    
    this.route.queryParamMap.subscribe((params) => {
      this.importData = params.get('importData') || '';
    });
  }

  ngOnInit(): void {
    this.dolarService.getDolarBlue()
    .pipe(take(1))
    .subscribe(res => {
      this.dolar = res;
    });

    setTimeout(() => {
      this.mostrarAyuda = true;
    }, 5000);

    // if (this.id) {
    //   this.tcgPlayerService.getDigimonCardById(parseInt(this.id))
    //   .pipe(take(1))
    //   .subscribe(res => {
    //     if (res['id']) {
    //       this.selectedCard = res;
    //     }
    //     else {
    //       this.router.navigate(['/'])
    //     }
    //   });
    // }

    if (this.importData) {
      let res = this.cryptoService.decryptJsonUriFriendly(this.importData);
      res.forEach((c: CardExport) => {
        setTimeout(() => {
          this.addCard(c.tcg_player_id);
        }, 10);
      });
    }

  }
  
  onCardAdded($event: any) {
    let card = $event;
    this.addCard(card.tcg_player_id);
    this.mostrarAyuda = false;
  }

  addCard(tcg_player_id: number) {
    let foundCard =_.find(this.cards, (c) => {
      return c.tcg_player_id == tcg_player_id;
    });
    if(!foundCard) {
      setTimeout(() => {
        try {
          this.getById(tcg_player_id);
        } catch (error) {
          console.log(`error al importar #${tcg_player_id}`)
        }
      }, 0);
    }
  }
  
  getById(tcg_player_id: any) {
    this.tcgPlayerService.getDigimonCardById(tcg_player_id)
    .pipe(take(1))
    .subscribe(res => {
      this.cards.push(res);
      this.calcularPrecioTotal();
    });
  }

  getCardMiniInfo(card: Card) {
    return `${card.fullName} # ${card.rarity_code}`
  }

  removeCard(card: Card) {
    _.remove(this.cards, (c) => {
      return c.tcg_player_id == card.tcg_player_id;
    });
    this.calcularPrecioTotal();
  }

  calcularPrecioTotal() {
    setTimeout(() => {
      this.precioTotal = _.sumBy(this.cards, (c) => {
        return c.price.currency_value * c.multiplier;
      });
      
    }, 10);    
  }

  changeMultiplier(card: Card, i: number) {
    card.changeMultiplier(i);
    this.calcularPrecioTotal();
  }

  generateUrl() {
    const result = this.cards.map(c => c.exportEntity())
    var data = this.cryptoService.encryptJsonUriFriendly(result);
    const baseUrl = window.document.baseURI;
    this.clipboard.copy(`${baseUrl}?importData=${data}`);
  }

  onPriceChanged($event: any) {
    this.calcularPrecioTotal();
  }

  onMultiplierChanged($event: any) {
    this.calcularPrecioTotal();
  }

  onCardRemoved(id: number) {
    this.removeCard({ tcg_player_id: id } as Card)
  }

  getFechaActualizacionDolar() {
    return (new Date(this.dolar.fechaActualizacion)).toLocaleString('es-AR')
  }
}
