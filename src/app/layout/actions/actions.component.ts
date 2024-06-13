import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator, faGear, faHeart, faHome, faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CardSearchModalComponent } from '../../components/cards/card-search-modal/card-search-modal.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgbModalModule],
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  homeIcon = faHome;
  calcIcon = faCalculator;
  listIcon = faList;
  searchIcon = faSearch;
  favIcon = faHeart;
  settingsIcon = faGear;

  public isMenuCollapsed = true;
  public appVersion: string = '';

  items: any[] = [
    { icon: this.homeIcon, command: () => { this.router.navigate(['/'])} },
    { icon: this.listIcon, command: () => { this.router.navigate(['/cards/list'])} },
    { icon: this.searchIcon, command: () => { this.openCardSearchModal() } },
    { icon: this.favIcon, command: () => {} },
    { icon: this.settingsIcon, command: () => { this.openSettingsOffcanvas() } },
  ];
  
  constructor(
    @Inject('APP_VERSION') appVersion: string,
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private modalService: NgbModal,
  ) { }


  openCardSearchModal() {
    const modalRef = this.modalService.open(CardSearchModalComponent, {
      size: 'lg',
      centered: true,
      scrollable: true,
      modalDialogClass: 'card-search-modal-height' 
    });

    modalRef.result.then(result => {
      if (result == "add") {
        this.router.navigate(['/cards/create']);
      }
    })
  }

	openSettingsOffcanvas() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
		this.offcanvasService.open(SettingsComponent, { position: 'end', panelClass: 'bg-primary text-bg-dark' }).result.then(
			(result) => {
        this.isMenuCollapsed = !this.isMenuCollapsed;
			},
			(reason) => {
			},
		);
	}
}
