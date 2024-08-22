import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie details in a dialog.
 * Shows information such as title, description, genre, director, and release date.
 */
@Component({
  selector: 'app-movie-details-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p><strong>Description:</strong> {{ data.description }}</p>
      <p><strong>Genre:</strong> {{ data.genre }}</p>
      <p><strong>Director:</strong> {{ data.director.name }}</p>
      <p><strong>Release Date:</strong> {{ data.releaseDate }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class MovieDetailsDialogComponent {
  
  /**
   * Creates an instance of MovieDetailsDialogComponent.
   * @param data The movie details data injected into the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, genre: any, director: any, releaseDate: string }) {}
}