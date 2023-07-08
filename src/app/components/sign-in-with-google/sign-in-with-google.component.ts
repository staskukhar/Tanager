import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/user-state.service';

@Component({
  selector: 'app-sign-in-with-google',
  templateUrl: './sign-in-with-google.component.html',
  styleUrls: ['./sign-in-with-google.component.css']
})
export class SignInWithGoogleComponent implements OnInit {

  private accessToken = '';
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService, 
    private httpClient: HttpClient,
    private router: Router,
    private userState: UserStateService) {}

  getAccessToken(): void {
    this.authService
      .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then(accessToken => {
        this.accessToken = accessToken;
        localStorage.setItem('access_token', accessToken); // Store access token in localStorage
      });
  }

  getGoogleCalendarData(): void {
    const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
    if (!accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .subscribe(events => {
        console.log('events', events);
      });
  }

  refreshToken(): void {
    this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
    localStorage.setItem('access_token', this.accessToken);
  }

  ngOnInit() {
    const storedAccessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
    if (storedAccessToken) {
      this.accessToken = storedAccessToken;
    }

    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user !== null;

      if (user) {
        localStorage.setItem('user_info', JSON.stringify(user)) // Store user info in localStorage
        this.router.navigate(['/profile']) // if logging is succesfull then we redirecr to profile
        this.userState.setUserLoggedIn(true); // notify state service that user is loggined
      } else {
        localStorage.removeItem('user_info'); // Clear user info from localStorage if user is not logged in
      }
    });

    const storedUserInfo = localStorage.getItem('user_info'); // Retrieve user info from localStorage
    if (storedUserInfo) {
      this.user = JSON.parse(storedUserInfo);
      this.loggedIn = true;
    }
  }
}
