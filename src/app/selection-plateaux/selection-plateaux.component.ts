import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CartePlateauComponent } from '../carte-plateau/carte-plateau.component';

@Component({
    selector: 'app-selectionPlateaux',
    standalone: true,
    imports: [NgFor, CartePlateauComponent],
    templateUrl: './selection-plateaux.component.html',
})

  export class SelectionPlateauxComponent {
    cartes: any[] = [
      { titre: 'Carte 1', contenu: 'Contenu de la carte 1' },
      { titre: 'Carte 2', contenu: 'Contenu de la carte 2' },
      { titre: 'Carte 3', contenu: 'Contenu de la carte 3' },
    ];
  }
  
  