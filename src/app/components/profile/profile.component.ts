import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/user-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: SocialUser = new SocialUser();

  constructor(private authService: SocialAuthService,
    private router: Router,
    private userState: UserStateService){}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_info')!);
  }
  logout() {
    this.authService.signOut().then(() => {
      localStorage.removeItem('access_token'); 
      localStorage.removeItem('user_info'); 
      this.router.navigate(['/login']); 
      this.userState.setUserLoggedIn(false); // notify userState service that user logged out
    });
  }
}
