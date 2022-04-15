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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    let name = localStorage.getItem('user') || ''
    this.fetchApiData.getFavMovies(name).subscribe((resp: any) => {
      console.log(resp[0].FavoriteMovies)
      this.favoriteMovies = resp[0].FavoriteMovies;
      return this.favoriteMovies;
    })
  }

  navMovie(title: string): void {
    console.log('TESTING NavMovie: ' + title);
    this.router.navigate(['movies/', title], { queryParams: { title: title } });
  }

  navGenre(name: string): void {
    console.log('TESTING NavGen: ' + name);
    this.router.navigate(['genres/', name], { queryParams: { name: name } });
  }

  navDirector(name: string): void {
    console.log('TESTING NavDir: ' + name);
    this.router.navigate(['directors/', name], { queryParams: { name: name } });
  }

  addFavorite(movie: any): void {
    let userDetails = { Username: localStorage.getItem('user') || '' }
    let movieId = movie._id
    this.fetchApiData.addFavMovie(userDetails, movieId).subscribe((result) => {
      // console.log(userDetails);
      // console.log(movieId);
      console.log(result);
      // console.log(movie);
      let readableResult: string = result.FavoriteMovies.indexOf(movieId) > -1 ? movie.Title + ' is now a favorite.' : 'Something Went Wrong. Please Try Again.'
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
      console.log(result);
      // console.log(movie);
      let readableResult: string = result.FavoriteMovies.indexOf(movieId) === -1 ? movie.Title + ' is no longer a favorite.' : 'Something Went Wrong. Please Try Again.'
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

}

// this.fetchApiData.userLogin(this.userData).subscribe((result) => {
//   console.log(result);
//   console.log(result.token);
//   console.log(result.user);
//   this.snackBar.open(readableResult, 'OK', {
//     duration: 2000
//   });
// }, (result) => {
//   console.log('Second Section');
//   // console.log(result.token);
//   // let readableResult: string = result.user.Username ? result.user.Username + ' Logged In!' : result
//   this.snackBar.open(result, 'OK', {
//     duration: 2000
//   });
// });