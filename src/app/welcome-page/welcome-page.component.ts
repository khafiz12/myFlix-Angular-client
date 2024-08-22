import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The WelcomePageComponent is the initial landing page of the application.
 * It provides options for user registration and login.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Controls the visibility of the navigation.
   * @type {boolean}
   */
  showNavigation: boolean = false;

  /**
   * Constructor for WelcomePageComponent.
   * Injects the MatDialog service to open dialog components.
   * 
   * @param {MatDialog} dialog - The Angular Material dialog service.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   * Here, it's implemented to satisfy the OnInit interface but does not perform any actions.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog.
   * The dialog contains the UserRegistrationFormComponent.
   * 
   * @remarks
   * This method sets the width of the dialog to 280px.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   * The dialog contains the UserLoginFormComponent.
   * 
   * @remarks
   * This method sets the width of the dialog to 280px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}