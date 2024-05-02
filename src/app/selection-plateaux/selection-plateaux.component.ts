import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CartePlateauComponent } from '../carte-plateau/carte-plateau.component';
import { Plateau } from '../modele/plateau.model';
import { Router } from '@angular/router';
import { SelectionPlateauxService } from './selection-plateaux.service';

@Component({
    selector: 'app-selectionPlateaux',
    standalone: true,
    imports: [NgFor, CartePlateauComponent],
    templateUrl: './selection-plateaux.component.html',
})

  export class SelectionPlateauxComponent {
    plateaux: Plateau[] = [];
    router : Router = new Router;

    constructor(private service : SelectionPlateauxService) { }

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


  
}