import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CartePlateauComponent } from '../carte-plateau/carte-plateau.component';
import { Plateau } from '../modele/plateau.model';
import { Router } from '@angular/router';
import { SelectionPlateauxService } from './selection-plateaux.service';
import { MatIcon } from '@angular/material/icon';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ModalScoreComponent } from '../modal-score/modal-score.component';


@Component({
    selector: 'app-selectionPlateaux',
    standalone: true,
    imports: [NgFor, CartePlateauComponent, MatIcon, MatButton, MatCardModule, NgIf],
    templateUrl: './selection-plateaux.component.html',
})

  export class SelectionPlateauxComponent {
    plateaux: Plateau[] = [];
    router : Router = new Router;

    constructor(
      private service : SelectionPlateauxService
      ) { }

    ngOnInit(){
      this.service.InitSelectionPlateau((message) => {
         console.log("json reçu",message);
         if(!message.succes){
            console.log(message.messageErreur);
            this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
         }else{
            this.plateaux = message.data.partie.listePlateaux as Plateau[];
         }
      });
    }

    mettreEnPause() {
      console.log("partie mise en pause");
      this.service.mettreEnPause();
    }
    
    isPlayer(): boolean {
      return this.service.isPlayer();
  }

    isHost(): boolean {
        return this.service.isHost();
    }
}