import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, forkJoin, map, take } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { BlueprintCardTrader, Card, ExpansionCardTrader } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CardTraderService {
    private baseRoute: string;
    private token: string;

	private dataSubject = new BehaviorSubject<any>([]);
    data$ = this.dataSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        this.baseRoute = this.appConfigService.config.CARD_TRADER_API.BASE_URL;
        this.token = this.appConfigService.config.CARD_TRADER_API.JWT_TOKEN;

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
                    return item.game_id === this.appConfigService.config.CARD_TRADER_API.GAME_ID;
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

    getAllBlueprints(): Observable<Card[]> {
        return this.getExpansions().pipe(
            take(1),
            concatMap(expansions => 
                forkJoin(
                    expansions.map((e: ExpansionCardTrader) => this.getBlueprints(e.id).pipe(
                        map((blueprints: BlueprintCardTrader[]) => {
                            const filteredData = blueprints.filter((item: BlueprintCardTrader) => {
                                return item.category_id === this.appConfigService.config.CARD_TRADER_API.CATEGORY_ID;
                            });
                            return filteredData;
                        })
                    ))
                ).pipe(
                    map(allBlueprints => allBlueprints.reduce((acc, curr) => acc.concat(curr), []).map((blueprint: BlueprintCardTrader) => {
                        return new Card(blueprint)
                    }))
                )
            )
        );
    }

	sendData(data: any) {
        this.dataSubject.next(data);
    }
}