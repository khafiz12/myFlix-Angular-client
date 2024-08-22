import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for editing user profile details in a dialog.
 * Provides a form for updating user information including username, email, birthday, and optional password.
 */
@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  /**
   * Form group for editing the profile.
   */
  editProfileForm: FormGroup;

  /**
   * Creates an instance of EditProfileDialogComponent.
   * @param dialogRef The MatDialogRef for controlling the dialog.
   * @param data The user data injected into the dialog.
   * @param formBuilder The FormBuilder service for creating the form.
   * @param fetchApiData The service for API data fetching.
   */
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
   * Initializes the component. Currently no specific initialization required.
   */
  ngOnInit(): void {}

  /**
   * Submits the form data to update the user profile.
   * Constructs the updated data object, including the password only if provided.
   * Closes the dialog and logs a success message upon successful update.
   * Logs an error message if the update fails.
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