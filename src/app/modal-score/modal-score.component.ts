import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Equipe } from '../modele/equipe.model';
import { ClassementComponent } from '../classement/classement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-score',
  standalone: true,
  imports: [MatDialogModule, ClassementComponent, MatButtonModule, MatIconModule],
  templateUrl: './modal-score.component.html',
  styleUrl: './modal-score.component.scss'
})
export class ModalScoreComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Equipe[]) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
