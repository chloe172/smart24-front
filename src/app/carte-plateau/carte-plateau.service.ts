import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';
import { Equipe } from '../modele/equipe.model';
import { ModalScoreComponent } from '../modal-score/modal-score.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
    providedIn: 'root'
})
export class CartePlateauService {
    equipes: Equipe[] = [];
    nomPlateau: string ='';
    constructor(private webSocketService: WebSocketService,
                private connexionService: ConnexionService,
                private router: Router,
                private partieService : IdPartieService,
                public dialog: MatDialog
    ) {
       
    }

    choisirPlateauPartie(idPlateau: number){
        if(this.connexionService.getUserAuthentication()){
            const idPartie = this.partieService.getId();
            if(idPartie !== -1){
                this.webSocketService.SendToType('choisirPlateau', {idPartie, idPlateau});
                this.webSocketService.subscribeToType('reponseChoisirPlateau', (message) => {
                    console.log('Plateau choisi', message);
                    if(!message.succes){
                        console.log(message.messageErreur);
                        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                    } else {
                        if(message.data.plateau.termine===true){
                            this.equipes = message.data.listeEquipes;
                            this.nomPlateau = message.data.plateau.nom + " - Terminé";
                            this.openDialogMaitreDuJeu();
                        } else {
                            this.router.navigate(['/question']);
                        }
                    }    
                });
            }
            else{
                this.router.navigate(['/error', 404, "Partie introuvable"]);
            }
        }
        else{
            this.router.navigate(['/login']);
        }
    }

    openDialogMaitreDuJeu(): void {
        const dialogRef = this.dialog.open(ModalScoreComponent, {
          data: {"equipes": this.equipes, "nomPlateau": this.nomPlateau},
          width: '70%'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }

}