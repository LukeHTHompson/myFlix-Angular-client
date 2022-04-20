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

  navProfile(): void {
    let username = localStorage.getItem('user') || ''
    this.router.navigate(['users/' + username], { queryParams: { username: username } });
  }

  navHome(): void {
    this.router.navigate(['movies']);
  }

  navLogout(): void {
    this.router.navigate([''])
  }

  Logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    localStorage.setItem('passwordLength', '');
    this.navLogout();
  }
}
