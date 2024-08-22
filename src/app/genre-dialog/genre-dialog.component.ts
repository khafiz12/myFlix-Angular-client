import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying genre information in a dialog.
 * Shows the genre passed to it via MAT_DIALOG_DATA.
 */
@Component({
  selector: 'app-genre-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.genre }}</h1>
    <div mat-dialog-content>
      <p><strong>Genre:</strong> {{ data.genre }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class GenreDialogComponent {

  /**
   * Creates an instance of GenreDialogComponent.
   * @param data The genre data injected into the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}