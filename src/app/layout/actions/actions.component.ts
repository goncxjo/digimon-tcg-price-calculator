import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator, faGear, faHeart, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CardSearchModalComponent } from '../../components/cards/card-search-modal/card-search-modal.component';

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
  searchIcon = faSearch;
  favIcon = faHeart;
  settingsIcon = faGear;

  items: any[] = [
    { icon: this.homeIcon, command: () => { this.router.navigate(['/'])} },
    { icon: this.calcIcon, command: () => { this.router.navigate(['/old'])} },
    { icon: this.searchIcon, command: () => { this.openCardSearchModal() } },
    { icon: this.favIcon, command: () => {} },
    { icon: this.settingsIcon, command: () => {} },
  ];
  
  constructor(
    private router: Router,
    private modalService: NgbModal
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
        this.router.navigate(['/old']);
      }
    })
  }
}
