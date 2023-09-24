import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  actualYear: number = (new Date()).getFullYear();
  appVersion: string = '0.0.0';

  ngOnInit(): void { }

  getFooterText() {
    return `Digimon TCG Price Calculator © ${this.actualYear} - v${this.appVersion}`
  }
}
