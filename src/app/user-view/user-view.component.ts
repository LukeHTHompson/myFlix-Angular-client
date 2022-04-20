// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserViewEditFormComponent } from '../user-view-edit-form/user-view-edit-form.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})

export class UserViewComponent implements OnInit {

  Username: string = '';
  Password: string = '';
  Email: string = '';
  Birthday: string = '';

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.viewUser();
  }

  viewUser(): void {
    let name = localStorage.getItem('user')
    this.fetchApiData.getUser(name).subscribe((result) => {
      this.Username = result[0].Username;
      this.Password = localStorage.getItem('passwordLength') || 'standardlength';
      this.Email = result[0].Email;
      this.Birthday = result[0].Birthday;
    }, (result) => {
      console.log(result);
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserViewEditFormComponent, {
      width: '280px'
    });
    this.viewUser()
  }
}
