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
  // Could use later on to say if you have any favorites in the Genre
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

  /**
   * This function returns discrete data available for the selected Genre.
   * No parameter is defined for specifying the genre as this info is pulled directly from the routing information.
   */
  getSingleGenre(): void {
    let name = this.route.snapshot.queryParamMap.get('name')
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      console.log(resp[0].Genre)
      // Force response to take the form of an Array with []
      // This allows the use of *ngFor in Component's Template, maintaining consistency with All Movies View
      this.genres = [resp[0].Genre];
      return this.genres;
    });
  }

  /**
   * This function facilitates routing the user to the home page which features all movies in the database.
   */
  navAllMovies(): void {
    this.router.navigate(['movies']);
  }

}
