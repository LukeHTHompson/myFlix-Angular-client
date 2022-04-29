import { Component, OnInit } from '@angular/core';

// Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * This function facilitates routing the user to a User details page for the logged in user.
   */
  navProfile(): void {
    let username = localStorage.getItem('user') || ''
    this.router.navigate(['users/' + username], { queryParams: { username: username } });
  }

  /**
   * This function facilitates routing the user to the home page which features all movies in the database.
   */
  navHome(): void {
    this.router.navigate(['movies']);
  }

  /**
   * This function facilitates routing the user to the welcome page which features registration and login options.
   */
  navLogout(): void {
    this.router.navigate([''])
  }

  /**
   * This function clears local items which define the currently logged in user and returns them to the welcome page via navLogout().
   */
  Logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    localStorage.setItem('passwordLength', '');
    this.navLogout();
  }
}
