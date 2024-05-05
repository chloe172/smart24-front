import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CartePlateauComponent } from '../carte-plateau/carte-plateau.component';
import { Plateau } from '../modele/plateau.model';
import { Router } from '@angular/router';
import { SelectionPlateauxService } from './selection-plateaux.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-selectionPlateaux',
  standalone: true,
  imports: [NgFor, CartePlateauComponent, MatIcon, MatButton, MatCardModule],
  templateUrl: './selection-plateaux.component.html',
})
export class SelectionPlateauxComponent {
  plateaux: Plateau[] = [];
  router: Router = new Router();

  constructor(private service: SelectionPlateauxService) {}

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
    console.log('partie mise en pause');
    this.service.mettreEnPause();
  }
}
