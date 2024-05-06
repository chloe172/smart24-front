import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equipe } from '../modele/equipe.model';
import { ModalScoreComponent } from '../modal-score/modal-score.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class CartePlateauService {
  equipes: Equipe[] = [];
  nomPlateau: string = '';

  constructor(private webSocketService: WebSocketService,
    private connexionService: ConnexionService,
    private router: Router,
    private partieService: PartieService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  choisirPlateauPartie(idPlateau: number) {
    if (this.connexionService.getUserAuthentication()) {
      const partie = this.partieService.getPartie();
      if (partie) {
        this.webSocketService.SendToType('choisirPlateau', { "idPartie": partie.id, idPlateau });
        this.webSocketService.removeAllSubscriptionsOfType('reponseChoisirPlateau');
        this.webSocketService.subscribeToType('reponseChoisirPlateau', (message) => {
          console.log('Plateau choisi', message);
          if (!message.succes) {
            console.log(message.messageErreur);
            this.router.navigate(['/ongoing-games']);
          } else {
            if (message.data.plateau.termine === true) {
              this.equipes = message.data.listeEquipes;
              this.nomPlateau = message.data.plateau.nom + " - Terminé";
              this.openDialogMaitreDuJeu();
            } else {
              this.router.navigate(['/question']);
            }
          }
        });
      } else {
        this.router.navigate(['/ongoing-games']);
        this.snackBar.open('Une erreur est survenue', 'OK');
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  openDialogMaitreDuJeu(): void {
    const dialogRef = this.dialog.open(ModalScoreComponent, {
      data: { "equipes": this.equipes, "nomPlateau": this.nomPlateau },
      width: '70%',
      height:'80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
