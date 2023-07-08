import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInWithGoogleComponent } from './components/sign-in-with-google/sign-in-with-google.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: SignInWithGoogleComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
