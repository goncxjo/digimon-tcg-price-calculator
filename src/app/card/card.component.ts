import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: any;
    
  ngOnInit(): void {
  }
}
