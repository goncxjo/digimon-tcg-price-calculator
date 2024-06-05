import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, CurrencyPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isLoading: boolean = false;
  lightIcon = faSun;
  darkIcon = faMoon;
  themeIcon: IconDefinition = this.lightIcon;
  dolar = {
    compra: 1200,
    venta: 1200
  }

  toggleTheme() {
    if (this.themeIcon == this.darkIcon) {
      this.themeIcon = this.lightIcon;
    }
    else {
      this.themeIcon = this.darkIcon;
    }
  }
}
