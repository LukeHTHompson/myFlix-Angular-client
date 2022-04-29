// src/app/single-movie-view/single-movie-view.component.ts
import { Component, OnInit } from '@angular/core';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// API Calls
import { UserRegistrationService } from '../fetch-api-data.service'
// Routing
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-movie-view',
  templateUrl: './single-movie-view.component.html',
  styleUrls: ['./single-movie-view.component.scss']
})
export class SingleMovieViewComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public route: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getSingleMovie();
    this.getFavoriteMovies();
  }

  /**
   * Function retrieves all discrete data for a single movie.
   * No parameter is supplied for the title as this information is pulled directly from the routing information.
   */
  getSingleMovie(): void {
    let title = this.route.snapshot.queryParamMap.get('title')
    this.fetchApiData.getMovie(title).subscribe((resp: any) => {
      // Force response to take the form of an Array with []
      // This allows the use of *ngFor in Component's Template, maintaining consistency with All Movies View
      this.movies = [resp];
      return this.movies;
    });
  }

  /**
   * This function provides the array of favorite movies associated with the logged in user.
   */
  getFavoriteMovies(): void {
    let name = localStorage.getItem('user') || ''
    this.fetchApiData.getFavMovies(name).subscribe((resp: any) => {
      this.favoriteMovies = resp[0].FavoriteMovies;
      return this.favoriteMovies;
    })
  }

  /**
   * This function adds the relevant movie to the list of favorites for the logged in user.
   * @param movie This parameter defines the movie to be added as a favorite for the logged in user.
   * This paramter should be an Object with the  structure:
   * ```
   * movie = {
   * _id: ...
   * }
   * ```
   */
  addFavorite(movie: any): void {
    let userDetails = { Username: localStorage.getItem('user') || '' }
    let movieId = movie._id
    this.fetchApiData.addFavMovie(userDetails, movieId).subscribe((result) => {
      let readableResult: string = result.FavoriteMovies.indexOf(movieId) > -1 ? movie.Title + ' is now a favorite.' : 'Something Went Wrong. Please Try Again.'
      this.favoriteMovies = result.FavoriteMovies;
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * This function removes the relevant movie from the list of favorites for the logged in user.
   * @param movie This parameter defines the movie to be removed as a favorite for the logged in user.
   * This paramter should be an Object with the  structure:
   * ```
   * movie = {
   * _id: ...
   * }
   * ```
   */
  removeFavorite(movie: any): void {
    let userDetails = { Username: localStorage.getItem('user') || '' }
    let movieId = movie._id
    this.fetchApiData.removeFavMovie(userDetails, movieId).subscribe((result) => {
      let readableResult: string = result.FavoriteMovies.indexOf(movieId) === -1 ? movie.Title + ' is no longer a favorite.' : 'Something Went Wrong. Please Try Again.'
      this.favoriteMovies = result.FavoriteMovies;
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * This function facilitates routing the user to a Genre details page.
   * @param name This parameter is a string matching a movie object's Genre value (All Movie.Genre.Name values can be viewed through getAllMovies() in fetch-api-data.service.ts)
   */
  navGenre(name: string): void {
    this.router.navigate(['genres/' + name], { queryParams: { name: name } });
  }

  /**
   * This function facilitates routing the user to a Director details page.
   * @param name This parameter is a string matching a movie object's Director value (All Movie.Director.Name values can be viewed through getAllMovies() in fetch-api-data.service.ts)
   */
  navDirector(name: string): void {
    this.router.navigate(['directors/' + name], { queryParams: { name: name } });
  }

  /**
   * This function facilitates routing the user to the homepage which shows all movies in the database.
   */
  navAllMovies(): void {
    this.router.navigate(['movies']);
  }

}
