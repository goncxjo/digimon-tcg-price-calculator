import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppConfigService } from 'src/app/core';
import { CardPriceDigitools } from '../models';
import * as _ from 'lodash';
import { CardService } from './card.service';

@Injectable({
    providedIn: 'root'
})
export class DigitoolsService {
    private baseRoute: string;

    constructor(
        private httpClient: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        this.baseRoute = this.appConfigService.config.DIGITOOLS_API_BASE_URL;
    }

    public getCardPrice(code: string): Observable<CardPriceDigitools[]> {
        const url = `${this.baseRoute}/api/v1/prices?card_number=${code}`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        return this.httpClient.get<CardPriceDigitools[]>(url, { headers: headers }).pipe(
            map(data => data.filter(c => c.source != "TCG Player"))
        );
    }  
}