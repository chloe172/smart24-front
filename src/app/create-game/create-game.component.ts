import { Component } from '@angular/core';
import { Plateau } from '../modele/plateau.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateGameService } from './create-game.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCardModule, NgIf]
})

export class CreateGameComponent {
  nomPartie: string = '';
  constructor(private service: CreateGameService, private router: Router) { }
  plateaux: any[] = [];
  
  ngOnInit() {
    this.service.resetPartyError();
    this.service.listerPlateaux((message) => {
      console.log("json reçu", message);
      if (!message.succes) {
        console.log(message.messageErreur);
        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
      } else {
        let listePlateaux = message.data.listePlateaux as Plateau[];
        this.plateaux = this.initializePlateaux(listePlateaux);
      }
    });
  }

  selectAll() {
    for (const plateau of this.plateaux) {
      plateau.selected = true;
    }
  }

  plateauxSelected(): boolean {
    return this.plateaux.some(plateau => plateau.selected);
  }

  creerPartie() {
    // Logique pour démarrer la partie avec les plateaux sélectionnés
    const plateauxSelectionnes = this.plateaux.filter(plateau => plateau.selected).map(plateau => plateau.plateau);
    this.service.creerPartie(this.nomPartie, plateauxSelectionnes);
    console.log('Nom de la partie:', this.nomPartie);
    console.log('Plateaux sélectionnés:', plateauxSelectionnes);
    // Ajoutez ici la logique pour démarrer la partie
  }
  initializePlateaux(plateaux: Plateau[]): any[] {
    return plateaux.map(plateau => ({ plateau, selected: true }));
  }

  partyNameInvalid(): boolean {
    return this.service.getPartyError();
  }

  getErrorMessage(): string {
    return this.service.getPartyErrorMessage();
  }

  getTousPlateauxSelectionnes(): boolean {
    const plateauxSelectionnes = this.plateaux.filter(plateau => plateau.selected).map(plateau => plateau.plateau);
    return plateauxSelectionnes.length == this.plateaux.length;
  }
}
