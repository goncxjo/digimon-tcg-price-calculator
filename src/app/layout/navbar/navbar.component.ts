import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faMoon, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppThemeService } from '../../core/services/app-theme.service';
import _ from 'lodash';
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionsComponent } from '../actions/actions.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule, CurrencyPipe, NgbOffcanvasModule, ActionsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLoading: boolean = false;
  public isMenuCollapsed = true;
  public appVersion: string = '';
  public closeResult: string = '';

  closeIcon = faTimes;
  menuIcon = faBars;

  readonly defaultTheme = {
    name: 'light',
    label: 'Claro',
    icon: faSun
  };
  theme = this.defaultTheme;

  availableThemes = {
    light: this.defaultTheme,
    dark: { name: 'dark', icon: faMoon, label: 'Oscuro'}
  }

  // dolar = {
  //   compra: 1200,
  //   venta: 1200
  // }

  appThemeService: AppThemeService = inject(AppThemeService);

  constructor(
    @Inject('APP_VERSION') appVersion: string,
    private offcanvasService: NgbOffcanvas
  ) {
    this.appVersion = appVersion;
  }

  ngOnInit(): void {
    this.theme = this.getTheme();
  }

  toggleTheme() {
    if (this.isDarkTheme(this.theme)) {
      this.theme = this.availableThemes.light;
      }
      else {
      this.theme = this.availableThemes.dark;
    }
    this.appThemeService.update(this.theme.name)
  }

  getTheme() {
    const theme = _.find(this.availableThemes, ['name', this.appThemeService.theme()]);
    return theme ?? this.defaultTheme;
  }

  isDarkTheme(theme: any) {
    return this.availableThemes.dark == theme;
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
