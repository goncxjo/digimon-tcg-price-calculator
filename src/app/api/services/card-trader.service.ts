import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatAll, concatMap, forkJoin, map, mergeAll, mergeMap, switchMap, take, toArray } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { BlueprintCardTrader, ExpansionCardTrader } from '../models/card-trader';

@Injectable({
    providedIn: 'root'
})
export class CardTraderService {
    private baseRoute: string;
    private token: string;

	private dataSubject = new BehaviorSubject<any>(null);
    data$ = this.dataSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        this.baseRoute = this.appConfigService.config.CARD_TRADER_API.BASE_URL;
        this.token = this.appConfigService.config.CARD_TRADER_API.JWT_TOKEN;
    }
  
	sendData(data: any) {
	  this.dataSubject.next(data);
	}
  
    getExpansions(): Observable<ExpansionCardTrader[]> {
        const url = `${this.baseRoute}/expansions`;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
        return this.httpClient.get<ExpansionCardTrader>(url, { headers: headers }).pipe(
            map((response: any) => {
                const filteredData = response.filter((item: ExpansionCardTrader) => {
                    return item.game_id === this.appConfigService.config.CARD_TRADER_API.GAME_ID && (item.code.includes('bt') || item.code.includes('st') || item.code.includes('ex'));
                });
                return filteredData;            
            })
        );
    }
  
    getBlueprints(expansion_id: number): Observable<BlueprintCardTrader[]> {
        const url = `${this.baseRoute}/blueprints/export`;

        const params = { expansion_id };

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
        return this.httpClient.get<BlueprintCardTrader[]>(url, { params: params, headers: headers });
    }

    getAllBlueprints(): Observable<BlueprintCardTrader[]> {
        return this.getExpansions().pipe(
            take(1),
            concatMap(expansions => 
                forkJoin(
                    expansions.map((e: ExpansionCardTrader) => this.getBlueprints(e.id))
                ).pipe(
                    map(allBlueprints => allBlueprints.reduce((acc, curr) => acc.concat(curr), []))
                )
            )
        );
    }

  
    getData(): Observable<any> {
        const url = `${this.baseRoute}/blueprints/export?expansion_id=3398`;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
        return this.httpClient.get(url, { headers: headers })
    }
}