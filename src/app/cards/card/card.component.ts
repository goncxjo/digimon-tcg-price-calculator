import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() data: any;
    
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
