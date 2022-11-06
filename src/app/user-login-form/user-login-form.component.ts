import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userDetails = { username: '', password: '' };

  /** @constructor */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { }

  /**
  * This is the function responsible for sending the form inputs to the backend
  * @function loginUser
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userDetails).subscribe(
      (result) => {
        this.dialogRef.close(); // Close the modal on success
        console.log(result);
        // Add token and username to local Storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);
        this.dialogRef.close(); // Close the modal on success
        this.router.navigate(['movies']);
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
