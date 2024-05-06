import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CartePlateauComponent } from '../carte-plateau/carte-plateau.component';
import { Plateau } from '../modele/plateau.model';
import { Router } from '@angular/router';
import { SelectionPlateauxService } from './selection-plateaux.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ModalScoreComponent } from '../modal-score/modal-score.component';
import { Equipe } from '../modele/equipe.model';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-selectionPlateaux',
  standalone: true,
  imports: [NgFor, CartePlateauComponent, MatIcon, MatButton, MatCardModule, NgIf],
  templateUrl: './selection-plateaux.component.html',
})
export class SelectionPlateauxComponent {
  plateaux: Plateau[] = [];
  equipes: Equipe[] = [];
  nomPlateau: string ='';

  constructor(
    private service: SelectionPlateauxService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.service.InitSelectionPlateau((message) => {
      console.log('json reçu', message);
      if (!message.succes) {
        console.log(message.messageErreur);
        this.router.navigate(['/ongoing-games']);
      } else {
        this.plateaux = message.data.partie.listePlateaux as Plateau[];
      }
    });
  }

  mettreEnPause() {
    console.log("partie mise en pause");
    this.service.mettreEnPause();
  }

  obtenirClassement(){
    this.service.obtenirClassement((message: any) => {
      this.equipes = message.data.classement;
      this.nomPlateau = "général";
      this.openDialogMaitreDuJeu();
    });
  }

  openDialogMaitreDuJeu(): void {
    const dialogRef = this.dialog.open(ModalScoreComponent, {
      data: { equipes: this.equipes, nomPlateau: this.nomPlateau },
      width: '70%', 
      height:'80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
