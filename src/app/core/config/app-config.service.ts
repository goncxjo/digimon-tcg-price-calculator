import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppConfig } from "./app-config.model";
import { Observable } from 'rxjs';

@Injectable()
export class AppConfigService {

    private httpClient!: HttpClient;
    private jsonFile = `./assets/config/${environment.name}.json`;
    private exampleDataFile = `./assets/config/example_data.json`;

    config!: AppConfig;

    // NOTA: sin esto, no andaba
    constructor(private handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
     }
    
    public load() {
        return new Promise<void>((resolve, reject) => {
            if (environment.production) {
                this.config = this.InitAppConfig(process.env);
                resolve();
            }
            
            this.httpClient.get(this.jsonFile).toPromise().then(response => {
                this.config = <AppConfig>response;
                resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${this.jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }

    public getExampleData(): Observable<Object> {
        return this.httpClient.get(this.exampleDataFile);
    }

    // TODO: esto está por el AuthModule, ya que el método load no llega a traerle la data.
    // ver si es posible evitar esto.
    getPromise() {
        return this.httpClient.get(this.jsonFile);
    }

    get() {
        return this.config;
    }

    InitAppConfig(env: any): AppConfig {
        return {
            ENVIRONMENT_NAME: env.ENVIRONMENT_NAME,
            BASE_URL: env.BASE_URL || '',
            CARD_TRADER_API: env.CARD_TRADER_API,
            DOLAR_API: env.DOLAR_API,
        }
    }
}
