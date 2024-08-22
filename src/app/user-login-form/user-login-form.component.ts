import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for the user login form.
 * Handles user login functionality, including user authentication
 * and navigation upon successful login.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * The data model for user login.
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData The service for API data fetching.
   * @param dialogRef The reference to the dialog where this component is used.
   * @param snackBar The snackbar service for displaying messages.
   * @param router The router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Handles user login process.
   * Makes a login request and stores authentication token and user data
   * upon successful login. Displays a success message and navigates to the
   * movies page.
   * If the login fails, displays an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.dialogRef.close();
      this.snackBar.open('Logged in successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (error) => {
      console.log(error);
      this.snackBar.open(error, 'OK', {
        duration: 2000
      });
    });
  }
}