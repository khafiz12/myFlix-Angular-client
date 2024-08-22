import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Ensure correct import

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login', component: UserLoginFormComponent }, // Ensure this route is available
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Adjust pathMatch for default route
  { path: '**', redirectTo: 'welcome' } // Handle undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }