import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying director information in a dialog.
 * Shows details about the director including their name, biography, birth year, and optionally death year.
 */
@Component({
  selector: 'app-director-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.directorName }}</h1>
    <div mat-dialog-content>
      <p><strong>Bio:</strong> {{ data.bio }}</p>
      <p><strong>Birth Year:</strong> {{ data.birthday }}</p>
      <p><strong>Death Year:</strong> {{ data.deathday }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class DirectorDialogComponent {
  
  /**
   * Creates an instance of DirectorDialogComponent.
   * @param data The director data injected into the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { directorName: string, bio: string, birthday: string, deathday: string }) {}
}