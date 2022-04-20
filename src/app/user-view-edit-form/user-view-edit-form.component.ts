// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
// Example Import
// import { FetchApiDataService } from '../fetch-api-data.service';
// Real Import using the proper Class Name from fetch-api-data.service.ts
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
    // this.viewUser()
  }

  // viewUser(): void {
  //   let name = localStorage.getItem('user')
  //   this.fetchApiData.getUser(name).subscribe((result) => {
  //     console.log(result);
  //     this.userData.Username = result[0].Username;
  //     // this.userData.Password = localStorage.getItem('passwordLength') || 'standardlength';
  //     this.userData.Email = result[0].Email;
  //     this.userData.Birthday = result[0].Birthday;
  //   }, (result) => {
  //     console.log(result);
  //   });
  // }

  editUser(): void {
    console.log('EDIT')
    let name = localStorage.getItem('user')
    console.log(name);
    console.log(this.userData);
    this.fetchApiData.userEdit(name, this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      console.log('EDIT SUCCESS')
      console.log(result);
      let readableResult = 'Account Details edited for: ' + result.Username
      this.snackBar.open(readableResult, 'OK', {
        duration: 2000
      });
      this.loginNewUser()
    }, (result) => {
      console.log('EDIT FAIL')
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  loginNewUser(): void {
    this.fetchApiData.userLogin({ Username: this.userData.Username, Password: this.userData.Password }).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      let loginResult = result.user.Username ? result.user.Username + ' Logged In!' : result
      this.snackBar.open(loginResult, 'OK', {
        duration: 2000
      });
      // Store username and auth token in local storage to enable Auth-Required API calls
      console.log(result);
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

  copyFavorites(): void {
    // USE FOR LOOP TO BRING OVER ALL OF THE USER'S
  }

}
