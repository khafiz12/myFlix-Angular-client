import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for editing user profile details in a dialog.
 * This component provides a form for updating user information including username, email, birthday, and optional password.
 * 
 * @example
 * <app-edit-profile-dialog [data]="userData"></app-edit-profile-dialog>
 */
@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  /**
   * Form group for editing the profile.
   * Includes form controls for Username, Email, Birthday, and an optional Password.
   */
  editProfileForm: FormGroup;

  /**
   * Creates an instance of EditProfileDialogComponent.
   * 
   * @param dialogRef The MatDialogRef for controlling the dialog. Provides methods to close the dialog.
   * @param data The user data injected into the dialog. This should include Username, Email, Birthday, and optionally, Password.
   * @param formBuilder The FormBuilder service for creating and managing the form.
   * @param fetchApiData The service for API data fetching and updating user profile data.
   */
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Username: string, Email: string, Birthday: string, Password?: string },
    private formBuilder: FormBuilder,
    private fetchApiData: FetchApiDataService
  ) {
    this.editProfileForm = this.formBuilder.group({
      Username: [data.Username, Validators.required],
      Email: [data.Email, [Validators.required, Validators.email]],
      Birthday: [data.Birthday, Validators.required],
      Password: [''] // Initialize Password as optional
    });
  }

  /**
   * Initializes the component. Currently no specific initialization is required beyond form setup.
   */
  ngOnInit(): void {}

  /**
   * Handles form submission to update the user profile.
   * Constructs the updated data object with the provided form values. Includes the Password only if it is provided by the user.
   * Sends the update request through the FetchApiDataService. On success, closes the dialog and logs the success message.
   * On failure, logs an error message to the console.
   * 
   * @memberof EditProfileDialogComponent
   */
  onSubmit(): void {
    // Define updatedData with optional Password property
    const updatedData: any = {
      Username: this.editProfileForm.value.Username,
      Email: this.editProfileForm.value.Email,
      Birthday: this.editProfileForm.value.Birthday,
    };

    // Add Password only if it's provided
    if (this.editProfileForm.value.Password) {
      updatedData.Password = this.editProfileForm.value.Password;
    }

    console.log('Updated Data:', updatedData); // Log data for debugging

    this.fetchApiData.editUser(this.editProfileForm.value.Username, updatedData).subscribe(
      response => {
        this.dialogRef.close(); // Close the dialog after successful update
        console.log('Profile updated successfully', response);
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }
}
