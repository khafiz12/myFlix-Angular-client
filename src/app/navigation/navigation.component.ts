import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for the navigation bar.
 * Handles navigation actions such as logging out and navigating to the user profile.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  
  /**
   * Indicates whether the navigation should be shown.
   * Defaults to `false`, meaning the navigation is hidden by default.
   */
  @Input() showNavigation: boolean = false;

  /**
   * Creates an instance of NavigationComponent.
   * @param router The router service for navigation.
   */
  constructor(private router: Router) { }

  /**
   * Logs out the user by clearing user data from local storage
   * and redirecting to the welcome page or home page.
   */
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']); // Adjust the route as needed
  }

  /**
   * Navigates to the user profile page.
   */
  goToUserProfile(): void {
    this.router.navigate(['/user-profile']); // Adjust the route as needed
  }
}