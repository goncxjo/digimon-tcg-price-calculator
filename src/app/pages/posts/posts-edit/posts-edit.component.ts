import { Component, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown91, faArrowUp19, faEye, faImage, faMinus, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../../core';
import { ToastrService } from 'ngx-toastr';
import { DolarDataService } from '../../../core/services/dolar.data.service';
import { DataService } from '../../../core/services/data.service';
import { Card, Post } from '../../../backend';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-posts-edit',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe, AsyncPipe],
  templateUrl: './posts-edit.component.html',
  styleUrl: './posts-edit.component.scss'
})
export class PostsEditComponent {
  sortUpIcon = faArrowUp19;
  sortDownIcon = faArrowDown91;
  imageIcon = faImage;
  closeIcon = faTimes;
  trashIcon = faTrash;
  plusIcon = faPlus;
  minusIcon = faMinus;
  viewIcon = faEye;

  cards = computed(() => this.dataService.cards());
  total = computed(() => this.dataService.totals());

  editDolarMode: boolean = false;

  dolarService = inject(DolarDataService);
  dataService = inject(DataService);
  post$!: Observable<Post>;
  
  constructor(
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  get noData() {
    return this.cards().length == 0;
  }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.data
      .pipe(
        map(data => {
          const post = data['entity'];
          if (post.cards) {
            this.dataService.update(post.cards);
          }
          return post;
        })
      );
  }

  getPrice(card: Card) {
    return this.dataService.getPrice(card);
  }
  
  removeCard(card: Card) {
    this.dataService.remove(card);
  }

  changeMultiplier(card: Card, i: number) {
    this.dataService.updateCardMultiplier(card, i);
  }
}
