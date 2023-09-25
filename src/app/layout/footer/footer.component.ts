import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  actualYear: number = (new Date()).getFullYear();
  environmentName: string = '';
  appVersion: string = '';
  
  constructor(
    @Inject('ENVIRONMENT_NAME') environmentName: string,
    @Inject('APP_VERSION') appVersion: string
  ) {
    this.environmentName = environmentName;
    this.appVersion = appVersion;
  }

  ngOnInit(): void {
  }

  getFooterText() {
    return `Digimon TCG Price Calculator © ${this.actualYear} - VERSION: ${this.appVersion} - AMBIENTE: ${this.environmentName}`
  }

}
