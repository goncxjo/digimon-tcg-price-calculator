import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AppConfigModule } from './core';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './cards/card/card.component';
import { ToastrModule } from 'ngx-toastr';
import { CardSearcherComponent } from './cards/card-searcher/card-searcher.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    CardSearcherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppConfigModule,
    LayoutModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
