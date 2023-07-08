import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedInSubject.asObservable();

  setUserLoggedIn(value: boolean) {
    this.userLoggedInSubject.next(value);
  }
}
