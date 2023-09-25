import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../core';
import { CardTraderService } from '../api/services/card-trader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any[] = [];

  constructor(
    private appConfig: AppConfigService,
    private cardTraderService: CardTraderService,
  ) { }

  ngOnInit(): void {
    // this.appConfig.getExampleData().subscribe(result => {
    //   if (result) {
    //     this.data = result as any[];
    //   }
    // });

    // this.cardTraderService.getAllBlueprints().subscribe(data => {
    //   console.log(data);
    // });
  }  
}
