// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// Allows for routing to Movies View on successful Login
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      console.log(result.token);
      console.log(result.user);
      let readableResult: string = result.user.Username ? result.user.Username + ' Logged In!' : result
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
      // Store username and auth token in local storage to enable Auth-Required API calls
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', result.user.Username)
      localStorage.setItem('passwordLength', '*'.repeat(this.userData.Password.length))
      // Navigate logged in user to the default screen for logged in users: Movie View
      this.router.navigate(['movies']);
    }, (result) => {
      console.log('Second Section');
      // console.log(result.token);
      // let readableResult: string = result.user.Username ? result.user.Username + ' Logged In!' : result
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}