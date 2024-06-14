import { Component, OnDestroy, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown91, faArrowUp19, faEye, faFloppyDisk, faImage, faMinus, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../../core';
import { ToastrService } from 'ngx-toastr';
import { DolarDataService } from '../../../core/services/dolar.data.service';
import { DataService } from '../../../core/services/data.service';
import { Card, Post } from '../../../backend';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-posts-edit',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe, AsyncPipe],
  templateUrl: './posts-edit.component.html',
  styleUrl: './posts-edit.component.scss'
})
export class PostsEditComponent implements OnDestroy {
  sortUpIcon = faArrowUp19;
  sortDownIcon = faArrowDown91;
  imageIcon = faImage;
  closeIcon = faTimes;
  trashIcon = faTrash;
  plusIcon = faPlus;
  minusIcon = faMinus;
  viewIcon = faEye;
  saveIcon = faFloppyDisk;

  cards = computed(() => this.dataService.cards());
  total = computed(() => this.dataService.totals());

  readonly: boolean = false;
  editMode: boolean = false;
  enableCreateMode: boolean = false;
  title: string = '';
  id: string = '';

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
          this.readonly = data['readonly'];
          this.editMode = data['editMode'];
          this.title = data['title'];
          if (post.id) {
            this.dataService.set(post.cards);
            this.dataService.updateMode = true;
            this.id = post.id;
          } else {
            post.cards = _.clone(this.cards());
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

  save() {
    console.log('pending save')
  }

  ngOnDestroy(): void {
    this.dataService.updateMode = false;
    this.dataService.clear();
  }
}
