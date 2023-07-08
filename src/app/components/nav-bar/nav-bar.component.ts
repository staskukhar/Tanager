import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStateService } from 'src/app/user-state.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  constructor(private userState: UserStateService) {}

  userLoggined$: Observable<boolean> = new Observable<boolean>();

  ngOnInit(): void {
    this.userLoggined$ = this.userState.userLoggedIn$;
  }
}
