// src/app/director-view/director-view.component.ts
import { Component, OnInit } from '@angular/core';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// API Calls
import { UserRegistrationService } from '../fetch-api-data.service'
// Routing
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  directors: any[] = [];
  // Could use to say if you have any favorites by the Director
  // favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public route: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getSingleDirector();
  }

  /**
   * This function returns discrete data available for the selected Director.
   * No parameter is defined for specifying the Director as this info is pulled directly from the routing information.
   */
  getSingleDirector(): void {
    let name = this.route.snapshot.queryParamMap.get('name')
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      // Force response to take the form of an Array with []
      // This allows the use of *ngFor in Component's Template, maintaining consistency with All Movies View
      this.directors = [resp[0].Director];
      return this.directors;
    });
  }

  /**
   * This function facilitates routing the user to the home page which features all movies in the database.
   */
  navAllMovies(): void {
    this.router.navigate(['movies']);
  }

}
