import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The UserRegistrationFormComponent is responsible for handling user registration.
 * It provides a form for users to input their registration details and sends this data to the backend.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Object to capture the user's registration data.
   * Contains properties for username, password, email, and birthday.
   * 
   * @type {{ Username: string, Password: string, Email: string, Birthday: string }}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor for UserRegistrationFormComponent.
   * Injects necessary services to manage API calls, dialog control, and snack bar notifications.
   * 
   * @param {FetchApiDataService} fetchApiData - Service to handle API calls.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the currently open dialog.
   * @param {MatSnackBar} snackBar - Service to display notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   * Here, it's implemented to satisfy the OnInit interface but does not perform any actions.
   */
  ngOnInit(): void {
  }

  /**
   * Registers a new user by sending their data to the backend.
   * If the registration is successful, the dialog is closed and a success message is shown.
   * If an error occurs, an error message is displayed.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // Closes the modal on success
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.log(error);
      this.snackBar.open(error, 'OK', {
        duration: 2000
      });
    });
  }
}