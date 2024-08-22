import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The UserProfileComponent handles displaying the user's profile information,
 * including their favorite movies, and allows for profile editing and account deregistration.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  /**
   * Stores the current user's data.
   * 
   * @type {any}
   */
  user: any = {};

  /**
   * Stores the current user's favorite movies.
   * 
   * @type {any[]}
   */
  userFavoriteMovies: any[] = [];

  /**
   * Stores the current user's username.
   * 
   * @type {string}
   */
  username: string = '';

  /**
   * Constructor for the UserProfileComponent.
   * Injects necessary services to fetch data, handle dialog interactions, 
   * display notifications, and navigate between routes.
   * 
   * @param {FetchApiDataService} fetchApiData - Service to handle API calls.
   * @param {MatDialog} dialog - Service to manage dialog boxes.
   * @param {MatSnackBar} snackBar - Service to display notifications to the user.
   * @param {Router} router - Service to manage navigation.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   * Here, it triggers the retrieval of the user's data.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Retrieves the current user's data from local storage and the backend.
   * Updates the user data and favorite movies list.
   */
  getUser(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!storedUser.Username) {
      console.error('User is not logged in.');
      return;
    }
  
    this.fetchApiData.getUser(storedUser.Username).subscribe((resp: any) => {
      this.user = resp;
      // Update the local storage with the latest user data
      localStorage.setItem('User', JSON.stringify(resp));
      this.getFavoriteMovies();

    }, (error: any) => {
      console.error('Error fetching user data:', error);
    });
  }

  /**
   * Retrieves the list of favorite movies for the current user.
   * Populates the `userFavoriteMovies` array with movie details fetched from the backend.
   */
  getFavoriteMovies(): void {
    const movieIds = this.user.Favoritemovies;
    
    if (movieIds && movieIds.length > 0) {
      this.userFavoriteMovies = [];
      console.log('Fetching favorite movies', movieIds)
      movieIds.forEach((movieId: string) => {
        this.fetchApiData.getOneMovie(movieId).subscribe(
          (movie) => {
            console.log('Fetched movie:', movie); // Check what data is being logged
            if (movie) {
              this.userFavoriteMovies.push(movie);
              console.log('Updated favorite movies array', this.userFavoriteMovies);
            } else {
              console.error(`Movie with ID ${movieId} not found.`);
            }
          },
          (error) => {
            console.error('Error fetching movie details:', error);
          }
        );
      });
    } else {
      console.log('No favorite movies found.');
    }
  }

  /**
   * Opens the Edit Profile dialog where the user can update their profile information.
   * After the dialog is closed, updates the user profile with the new data.
   */
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { user: this.user }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUserProfile(result);
      }
    });
  }

  /**
   * Updates the user's profile with new data and refreshes the displayed user information.
   * 
   * @param {any} userData - The new user data to update.
   */
  updateUserProfile(userData: any): void {
    const storedUser = JSON.parse(localStorage.getItem('User') || '{}');
    const username = storedUser.Username;
  
    this.fetchApiData.updateUserProfile(username, userData).subscribe(
      (response: any) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 3000,
        });
        localStorage.setItem('User', JSON.stringify(response));
        this.getUser(); // Refresh user data
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Profile update failed. Please try again.', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  /**
   * Deregisters the user's account after confirming the action.
   * Clears local storage and navigates back to the welcome page upon success.
   */
  deregisterAccount(): void {
    if (confirm('Are you sure you want to deregister your account? This action cannot be undone.')) {
      const storedUser = JSON.parse(localStorage.getItem('User') || '{}');
      const username = storedUser.Username;

      console.log('Deregistering account for:', username);
      this.fetchApiData.deleteUser(username).subscribe(
        (response) => {
          console.log('Response from server:', response);
          this.snackBar.open('Account deregistered successfully!', 'OK', {
            duration: 3000,
          });
          localStorage.clear();
          console.log('Cleared local storage');
          this.router.navigate(['/welcome']).then(() => {
            console.log('Redirected to /welcome');
          }).catch(error => {
            console.error('Navigation error:', error);
          });
        },
        (error) => {
          console.error('Error deregistering account:', error);
          this.snackBar.open('Deregistration failed. Please try again.', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }
}