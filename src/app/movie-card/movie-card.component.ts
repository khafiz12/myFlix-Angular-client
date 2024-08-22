import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { Router } from '@angular/router';

/**
 * Component for displaying movie cards.
 * Provides functionality to view movie details, genre, and director information.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  /**
   * Indicates whether the navigation should be shown.
   */
  showNavigation: boolean = true;

  /**
   * The list of movies to be displayed.
   */
  movies: any[] = [];

  /**
   * The user data.
   */
  user: any = {};

  /**
   * Creates an instance of MovieCardComponent.
   * @param fetchApiData The service for API data fetching.
   * @param dialog The MatDialog service for dialog management.
   * @param router The router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  /**
   * Initializes the component by fetching movies and user data.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * Retrieves user data from local storage and parses it.
   * Logs an error if parsing fails or no user data is found.
   */
  getUser(): void {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      try {
        this.user = JSON.parse(storedUserString);
        console.log('User data:', this.user);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }

  /**
   * Retrieves all movies from the API and assigns them to the `movies` property.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Opens a dialog to display genre information.
   * @param genre The genre to be displayed in the dialog.
   */
  openGenreDialog(genre: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre: genre },
      width: '500px'
    });
  }

  /**
   * Opens a dialog to display director information.
   * @param director The director details to be displayed in the dialog.
   */
  openDirectorDialog(director: { name: string, bio: string, birthday: string, deathday?: string }): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        directorName: director.name,
        bio: director.bio,
        birthday: director.birthday,
        deathday: director.deathday || 'N/A'
      },
      width: '400px'
    });
  }

  /**
   * Opens a dialog to display movie details.
   * @param movie The movie details to be displayed in the dialog.
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        director: movie.director,
        releaseDate: movie.ReleaseDate
      },
      width: '400px'
    });
  }

  /**
   * Checks if a movie is in the user's favorites list.
   * @param movieId The ID of the movie to check.
   * @returns `true` if the movie is in the favorites list, otherwise `false`.
   */
  isFavorite(movieId: string): boolean {
    return this.user.Favoritemovies?.includes(movieId);
  }

  /**
   * Adds a movie to the user's favorites list.
   * Shows an alert upon success or failure.
   * @param movieId The ID of the movie to be added to favorites.
   */
  addToFavorites(movieId: string): void {
    let user: any;

    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user = JSON.parse(storedUser);
      } else {
        throw new Error('No user data found in localStorage');
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return; // Exit the function if parsing fails
    }

    if (!user || !user.Username) {
      alert('You must be logged in to add movies to your favorites.');
      return;
    }

    this.fetchApiData.addFavoriteMovie(user.Username, movieId).subscribe(
      (response: any) => {
        console.log('Movie added to favorites:', response);
        alert('Movie added to favorites!');
        
        // Update user data in localStorage
        user.Favoritemovies = response.Favoritemovies;
        localStorage.setItem('user', JSON.stringify(user));
      },
      (error: any) => {
        console.error('Error adding movie to favorites:', error);
        alert('Failed to add movie to favorites.');
      }
    );
  }
}