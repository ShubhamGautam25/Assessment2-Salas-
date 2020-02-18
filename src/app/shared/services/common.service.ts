import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService { 
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(data: any) {
    this.messageSource.next(data)
  }
}