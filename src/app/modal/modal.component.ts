import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Partie } from '../modele/partie.model';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButton, MatCardModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private service: ModalService,
    private snackbar: MatSnackBar
  ) { }

  @Input() partie!: Partie;
  router: Router = new Router;

  supprimer() {
    this.service.finishGame(this.partie, (message) => {
      console.log('json reçu', message);
      if (message.succes) {
        this.snackbar.open('Partie terminée avec succès', 'OK');
        this.router.navigate(['/ongoing-games']);
      } else {
        this.snackbar.open('Une erreur est survenue', 'OK');
      }
    });
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
