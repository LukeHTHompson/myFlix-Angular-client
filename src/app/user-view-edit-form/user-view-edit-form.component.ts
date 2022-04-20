// src/app/user-registration-form/user-registration-form.component.ts
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
  selector: 'app-user-view-edit-form',
  templateUrl: './user-view-edit-form.component.html',
  styleUrls: ['./user-view-edit-form.component.scss']
})

export class UserViewEditFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserViewEditFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    let name = { Username: localStorage.getItem('user') }
    this.fetchApiData.userEdit(name, this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      let readableResult = 'Account Details edited for: ' + result.Username
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
      this.loginNewUser()
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  loginNewUser(): void {
    this.fetchApiData.userLogin({ Username: this.userData.Username, Password: this.userData.Password }).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      let loginResult = result.user.Username ? result.user.Username + ' Logged In!' : result
      this.snackBar.open(loginResult, 'OK', {
        duration: 2000
      });
      // Store username and auth token in local storage to enable Auth-Required API calls
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', result.user.Username)
      localStorage.setItem('passwordLength', '*'.repeat(this.userData.Password.length))
      // Navigate logged in user to the default screen for logged in users: Movie View
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  cancelModal(): void {
    this.dialogRef.close();
  }
}
