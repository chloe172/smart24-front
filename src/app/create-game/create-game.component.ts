import { Component } from '@angular/core';
import { Plateau } from '../modele/plateau.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCardModule]
})

export class CreateGameComponent {
  nomPartie: string = '';
  plateau1: Plateau = { id: 1, nom: 'Plateau 1', activites: [] };
  plateau2: Plateau = { id: 2, nom: 'Plateau 2', activites: [] };
  plateau3: Plateau = { id: 3, nom: 'Plateau 3', activites: [] };
  plateaux: any[] = [
    { plateau: this.plateau1, selected: false },
    { plateau: this.plateau2, selected: false },
    { plateau: this.plateau3, selected: false }
    // Ajoutez d'autres plateaux selon vos besoins
  ];

  selectAll() {
    for (const plateau of this.plateaux) {
      plateau.selected = true;
    }
  }

  plateauxSelected(): boolean {
    return this.plateaux.some(plateau => plateau.selected);
  }

  demarrerPartie() {
    // Logique pour démarrer la partie avec les plateaux sélectionnés
    const plateauxSelectionnes = this.plateaux.filter(plateau => plateau.selected);
    console.log('Nom de la partie:', this.nomPartie);
    console.log('Plateaux sélectionnés:', plateauxSelectionnes);
    // Ajoutez ici la logique pour démarrer la partie
  }
}
