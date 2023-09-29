import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { DolarService } from '../backend/services/dolar.service';
import { Dolar } from '../backend/models';
import { TcgPlayerService } from '../backend/services/tcg-player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  id: string = '0';
  data: any[] = [];
  selectedCard: any;
  dolar!: Dolar;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tcgPlayerService: TcgPlayerService,
    private dolarService: DolarService,
  ) {
    route.params.pipe(
      take(1),
      map(p => p['id'])
    ).subscribe(id => {
      this.id = id;
    });
  }

  ngOnInit(): void {
    this.dolarService.getDolarBlue()
    .pipe(take(1))
    .subscribe(data => {
      this.dolar = data;
    });

    if (this.id) {
      this.tcgPlayerService.getDigimonCardById(parseInt(this.id))
      .pipe(take(1))
      .subscribe(res => {
        if (res['id']) {
          this.selectedCard = res;
        }
        else {
          this.router.navigate(['/'])
        }
      });
    }

  }
  
  onCardAdded($event: any) {
    let card = $event;
    this.getById(card.tcg_player_id);
  }
  
  getById(tcg_player_id: any) {
    this.tcgPlayerService.getDigimonCardById(tcg_player_id)
    .pipe(take(1))
    .subscribe(res => {
      this.selectedCard = res;
    });
  }  
}
