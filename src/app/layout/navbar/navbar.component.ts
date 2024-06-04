import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigModule } from '../../core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule, AppConfigModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  public appVersion: string = '';
  public isLoading: boolean = false;
  public closeResult: string = '';

  constructor(
    @Inject('APP_VERSION') appVersion: string,
    private offcanvasService: NgbOffcanvas
  ) {
    this.appVersion = appVersion;
  }

  ngOnInit(): void {
  }

  getVersionText() {
    return `v${this.appVersion}`
  }

	open(content: any) {
    this.isMenuCollapsed = !this.isMenuCollapsed;
		this.offcanvasService.open(content, { position: 'end', panelClass: 'bg-primary text-bg-dark' }).result.then(
			(result) => {
        this.isMenuCollapsed = !this.isMenuCollapsed;
			},
			(reason) => {
			},
		);
	}
}
