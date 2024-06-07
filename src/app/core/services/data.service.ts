import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject<any>([]);
  currentData = this.data.asObservable();

  constructor() { }

  changeData(data: any) {
    this.data.next(data)
  }
}
