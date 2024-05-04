import {Component, Input, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarService } from './progress-bar.service';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrl: 'progress-bar.component.scss',
  standalone: true,
  imports: [MatProgressBarModule,MatCardModule],
})
export class ProgressBarComponent implements OnInit{

  duree: number = 30; // Durée en secondes
  valeurProgression: number = 0;
  tempsRestant : number = this.duree;
  intervallePourcent: any;
  intervalleTemps : any;

  constructor(private service : ProgressBarService){}

  ngOnInit(): void {
      this.service.initBar(() => {
        console.log("init de la barre");

      // Calculer le pourcentage d'avancement de la barre de progression à chaque seconde
      const pourcentageParSeconde = 100 / (this.duree*10);

      
      // Mettre à jour la valeur de la barre de progression périodiquement
      this.intervallePourcent = setInterval(() => {
        this.valeurProgression += pourcentageParSeconde;
        if (this.valeurProgression >= 100) {
          clearInterval(this.intervallePourcent); // Arrêter l'intervalle lorsque la progression atteint 100%
        }
      }, 100);

      this.intervalleTemps = setInterval(() => {
        this.tempsRestant --;
        if (this.tempsRestant <= 0) {
          clearInterval(this.intervalleTemps); // Arrêter l'intervalle lorsque la progression atteint 100%
        }
      }, 1000);
    }); 
  }

}
