import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator, faGear, faHeart, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  homeIcon = faHome;
  calcIcon = faCalculator;
  searchIcon = faSearch;
  favIcon = faHeart;
  settingsIcon = faGear;

  constructor(
    private router: Router,
  ) {
    
  }

  items: any[] = [
    { icon: this.homeIcon, command: () => { this.router.navigate(['/'])} },
    { icon: this.calcIcon, command: () => { this.router.navigate(['/old'])} },
    { icon: this.searchIcon, command: () => {} },
    { icon: this.favIcon, command: () => {} },
    { icon: this.settingsIcon, command: () => {} },
  ]
}
