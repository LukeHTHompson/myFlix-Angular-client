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
  ) {
    // console.log(this?.router?.getCurrentNavigation()?.extras?.state?.['title'])
    // console.log(this.route.snapshot.queryParamMap.get('title'))
    // let movie = this.route.snapshot.queryParamMap.get('title')
  }

  ngOnInit(): void {
    // console.log(this.router.getCurrentNavigation())
    // this.getSingleMovie(this.route.snapshot.queryParamMap.get('title'));
    this.getSingleMovie();
    this.getFavoriteMovies();
    // this.getFavoriteMovies();
    // console.log('Movie: ' + this.movie)
  }

  getSingleMovie(): void {
    let title = this.route.snapshot.queryParamMap.get('title')
    // console.log(title);
    this.fetchApiData.getMovie(title).subscribe((resp: any) => {
      // console.log(title)
      // console.log(resp)
      // Force response to take the form of an Array with []
      // This allows the use of *ngFor in Component's Template, maintaining consistency with All Movies View
      this.movies = [resp];
      // console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    let name = localStorage.getItem('user') || ''
    this.fetchApiData.getFavMovies(name).subscribe((resp: any) => {
      // console.log(resp[0].FavoriteMovies)
      this.favoriteMovies = resp[0].FavoriteMovies;
      return this.favoriteMovies;
    })
  }

  addFavorite(movie: any): void {
    let userDetails = { Username: localStorage.getItem('user') || '' }
    let movieId = movie._id
    this.fetchApiData.addFavMovie(userDetails, movieId).subscribe((result) => {
      // console.log(userDetails);
      // console.log(movieId);
      // console.log(result);
      // console.log(movie);
      let readableResult: string = result.FavoriteMovies.indexOf(movieId) > -1 ? movie.Title + ' is now a favorite.' : 'Something Went Wrong. Please Try Again.'
      this.favoriteMovies = result.FavoriteMovies;
      // console.log(readableResult);
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log('Second Section');
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  removeFavorite(movie: any): void {
    let userDetails = { Username: localStorage.getItem('user') || '' }
    let movieId = movie._id
    this.fetchApiData.removeFavMovie(userDetails, movieId).subscribe((result) => {
      // console.log(userDetails);
      // console.log(movieId);
      // console.log(result);
      // console.log(movie);
      let readableResult: string = result.FavoriteMovies.indexOf(movieId) === -1 ? movie.Title + ' is no longer a favorite.' : 'Something Went Wrong. Please Try Again.'
      this.favoriteMovies = result.FavoriteMovies;
      // console.log(readableResult);
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
    }, (result) => {
      // console.log('Second Section');
      // console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  navGenre(name: string): void {
    console.log('TESTING NavGen: ' + name);
    this.router.navigate(['genres/' + name], { queryParams: { name: name } });
  }

  navDirector(name: string): void {
    console.log('TESTING NavDir: ' + name);
    this.router.navigate(['directors/' + name], { queryParams: { name: name } });
  }

  navAllMovies(): void {
    this.router.navigate(['movies']);
  }

}
