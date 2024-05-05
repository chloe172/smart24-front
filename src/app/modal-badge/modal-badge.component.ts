import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuJoueurComponent } from '../menu-joueur/menu-joueur.component';
import { Badge, Classement } from '../modele/plateau.model';
import { Equipe } from '../modele/equipe.model';

@Component({
  selector: 'app-modal-badge',
  standalone: true,
  imports: [MatDialogModule, MenuJoueurComponent, MatButtonModule, MatIconModule],
  templateUrl: './modal-badge.component.html',
  styleUrl: './modal-badge.component.scss'
})
export class ModalBadgeComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuJoueurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Classement) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
