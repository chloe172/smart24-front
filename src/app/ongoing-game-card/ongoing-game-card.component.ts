import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Partie } from '../modele/partie.model';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { OngoingGameCardService } from './ongoing-game-card.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-ongoing-game-card',
  standalone: true,
  templateUrl: './ongoing-game-card.component.html',
  styleUrl: './ongoing-game-card.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe,
    ModalComponent,
  ],
})
export class OngoingGameCardComponent {
  constructor(
    private service: OngoingGameCardService,
    public matDialog: MatDialog
  ) { }
  @Input() partie!: Partie;
  router: Router = new Router();
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ModalComponent, any> | undefined;

  reprendre() {
    this.service.reprendre(this.partie);
  }
  ngAfterViewInit(): void {
    document.onclick = (args: any): void => {
      if (args.target.tagName === 'BODY') {
        this.modalDialog?.close();
      }
    };
  }

  openModal() {
    this.dialogConfig.id = 'app-modal-component';
    this.modalDialog = this.matDialog.open(ModalComponent, this.dialogConfig);
    this.modalDialog.componentInstance.partie = this.partie;
  }
}
