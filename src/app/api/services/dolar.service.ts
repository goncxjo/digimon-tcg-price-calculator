import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, forkJoin, map, take } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { BlueprintCardTrader, Card, Dolar, ExpansionCardTrader } from '../models';

@Injectable({
    providedIn: 'root'
})
export class DolarService {
    private baseRoute: string;

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        this.baseRoute = this.appConfigService.config.DOLAR_API_BASE_URL;
    }
  
    getDolarBlue(): Observable<Dolar> {
        const url = `${this.baseRoute}/blue`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        return this.httpClient.get<Dolar>(url, { headers: headers });
    }

}