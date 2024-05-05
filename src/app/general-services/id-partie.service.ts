import { Injectable } from '@angular/core';
import { Partie } from '../modele/partie.model';

@Injectable({
  providedIn: 'root',
})
export class IdPartieService {
  private partie: Partie | null = null;

  constructor() {
    let partieStr = localStorage.getItem('partie');
    if (partieStr) {
      this.partie = JSON.parse(partieStr);
    }
  }

  setPartie(partie: Partie) {
    this.partie = partie;
    localStorage.setItem('partie', JSON.stringify(this.partie));
  }

  getPartie() {
    return this.partie;
  }

  removePartie() {
    this.partie = null;
    localStorage.removeItem('partie');
  }
}
