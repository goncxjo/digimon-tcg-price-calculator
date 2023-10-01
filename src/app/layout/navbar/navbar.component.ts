import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  public appVersion: string = '';
  public isLoading: boolean = false;
  
  constructor(
    @Inject('APP_VERSION') appVersion: string
  ) {
    this.appVersion = appVersion;
  }

  ngOnInit(): void {
  }

  getVersionText() {
    return `v${this.appVersion}`
  }
}
