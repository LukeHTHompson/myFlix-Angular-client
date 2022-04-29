/*
git remote add origin https://github.com/LukeHTHompson/myFlix-Angular-client.git
ng deploy --base-href=/myFlix-Angular-client/
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SingleMovieViewComponent } from './single-movie-view/single-movie-view.component';
import { DirectorViewComponent } from './director-view/director-view.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserViewEditFormComponent } from './user-view-edit-form/user-view-edit-form.component';

/**
 * appRoutes specifies the different URL paths used in the application and connects each of them to a specific component.
 */
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'genres/:Genre', component: GenreViewComponent },
  { path: 'directors/:Director', component: DirectorViewComponent },
  { path: 'movies/:Movie', component: SingleMovieViewComponent },
  { path: 'users/:User', component: UserViewComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    SingleMovieViewComponent,
    DirectorViewComponent,
    GenreViewComponent,
    HeaderViewComponent,
    UserViewComponent,
    UserViewEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    // ActivatedRoute,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }