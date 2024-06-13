import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import _ from 'lodash';
import { ActionsComponent } from '../actions/actions.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ActionsComponent, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isLoading: boolean = false;
}
