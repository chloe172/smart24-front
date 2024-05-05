import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'mj-gestion-projet.component',
  templateUrl: 'mj-gestion-projet.component.html',
  styleUrl: 'mj-gestion-projet.component.scss',
  standalone: true,
  imports: [CdkDropList, CdkDrag, ProgressBarComponent],
})
export class MjGestionProjetComponent implements OnInit{
  etapes = [
    'Tests et intégration',
    'Validation par l’utilisateur',
    'Analyse et définition des objectifs',
    'Développement',
    'Maintenance',
    'Mise en production',
    'Conception'
  ];

  duree: number = 10; // Durée en secondes
  valeurProgression: number = 0;
  valeurTemps : number = 0;
  tempsRestant : number = this.duree;
  intervallePourcent: any;
  intervalleTemps : any;

  ngOnInit(): void {
    // Calculer le pourcentage d'avancement de la barre de progression à chaque seconde
    const pourcentageParSeconde = 100 / (this.duree);

    
    // Mettre à jour la valeur de la barre de progression périodiquement
    this.intervallePourcent = setInterval(() => {
      this.valeurProgression += pourcentageParSeconde;
      if (this.valeurProgression >= 100) {
        clearInterval(this.intervallePourcent); // Arrêter l'intervalle lorsque la progression atteint 100%
      }
    }, 1000);

    this.intervalleTemps = setInterval(() => {
      this.tempsRestant --;
      if (this.tempsRestant <= 0) {
        clearInterval(this.intervalleTemps); // Arrêter l'intervalle lorsque la progression atteint 100%
      }
    }, 1000);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapes, event.previousIndex, event.currentIndex);
  }
}
