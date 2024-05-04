import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {

    duree: number = 30; // Durée en secondes
    valeurProgression: number = 0;
    tempsRestant : number = this.duree;
    intervallePourcent: any;
    intervalleTemps : any;

    constructor(
        private webSocketService: WebSocketService,
        private idPartieService: IdPartieService,
        private router: Router,
        private accessService: AccessSessionService
    ) {}

    resetBar(){
        this.duree = 30;
        this.valeurProgression = 0;
        this.tempsRestant = this.duree;
        clearInterval(this.intervallePourcent);
        clearInterval(this.intervalleTemps);

        console.log("reset de la barre");
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
       
    }

    getTempsRestant(): number{
        return this.tempsRestant;
    }

    getValeurProgression(): number{
        return this.valeurProgression;
    }
}