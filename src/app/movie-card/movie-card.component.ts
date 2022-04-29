// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// API Calls
import { UserRegistrationService } from '../fetch-api-data.service'
// Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * This function returns discrete data for all movies in the database.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * This function returns an array of the logged in user's favorite movies.
   */
  getFavoriteMovies(): void {
    let name = localStorage.getItem('user') || ''
    this.fetchApiData.getFavMovies(name).subscribe((resp: any) => {
      this.favoriteMovies = resp[0].FavoriteMovies;
      return this.favoriteMovies;
    })
  }

  /**
   * This function facilitates routing the user to a Movie details page.
   * @param title This parameter is a string matching a movie object's Genre value (All Movie.Title values can be viewed through getAllMovies() in fetch-api-data.service.ts)
   */
  navMovie(title: string): void {
    this.router.navigate(['movies/', title], { queryParams: { title: title } });
  }

  /**
   * This function facilitates routing the user to a Genre details page.
   * @param name This parameter is a string matching a movie object's Genre value (All Movie.Genre.Name values can be viewed through getAllMovies() in fetch-api-data.service.ts)
   */
  navGenre(name: string): void {
    this.router.navigate(['genres/', name], { queryParams: { name: name } });
  }

  /**
   * This function facilitates routing the user to a Director details page.
   * @param name This parameter is a string matching a movie object's Director value (All Movie.Director.Name values can be viewed through getAllMovies() in fetch-api-data.service.ts)
   */
  navDirector(name: string): void {
    this.router.navigate(['directors/', name], { queryParams: { name: name } });
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
}