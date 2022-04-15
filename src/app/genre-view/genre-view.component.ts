// src/app/genre-view/genre-view.component.ts
import { Component, OnInit } from '@angular/core';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// API Calls
import { UserRegistrationService } from '../fetch-api-data.service'
// Routing
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  genres: any[] = [];
  // Could use to say if you have any favorites in the Genre
  // favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public route: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getSingleGenre()
  }

  getSingleGenre(): void {
    let name = this.route.snapshot.queryParamMap.get('name')
    // console.log(title);
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      // console.log(title)
      console.log(resp[0].Genre)
      // Force response to take the form of an Array with []
      // This allows the use of *ngFor in Component's Template, maintaining consistency with All Movies View
      this.genres = [resp[0].Genre];
      // console.log(this.movies);
      return this.genres;
    });
  }

  navAllMovies(): void {
    this.router.navigate(['movies']);
  }

}
