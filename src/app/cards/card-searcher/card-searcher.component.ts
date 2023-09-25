import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Card } from 'src/app/api';
import { AppConfigService } from 'src/app/core';

@Component({
  selector: 'app-card-searcher',
  templateUrl: './card-searcher.component.html',
  styleUrls: ['./card-searcher.component.scss']
})
export class CardSearcherComponent implements OnInit {
  public model: Card | null = null;
  data: Card[] = [];

  constructor(
    private appConfig: AppConfigService,
  ) { }

  search: OperatorFunction <string, readonly Card[]> = (text$: Observable <string> ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === '' ?
        [] :
        this.data.filter((c) => c.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  formatter = (x: { fullName: string }) => x.fullName;

  ngOnInit(): void {
    this.appConfig.getExampleData().subscribe(result => {
      if (result) {
        this.data = result as Card[];
      }
    });

    // this.cardTraderService.getAllBlueprints().subscribe(data => {
    //   console.log(data);
    // });
  }  }
