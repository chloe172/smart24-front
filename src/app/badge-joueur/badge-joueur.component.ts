import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-badge-joueur',
  standalone: true,
  imports: [MatCard, NgFor],
  templateUrl: './badge-joueur.component.html',
  styleUrl: './badge-joueur.component.scss'
})
export class BadgeJoueurComponent {
  badges: any[] = [
    { nom: 'Accessibilite', etat: 'or' },
    { nom: 'AI', etat: 'argent' },
    { nom: 'Cyber', etat: 'or' },
    { nom: 'Developpement', etat: 'noir' },
    { nom: 'Général', etat: 'blanc' },
    { nom: 'GestionProjet', etat: 'bronze' },
    { nom: 'GreenIT', etat: 'blanc' },
    { nom: 'IoT', etat: 'noir' }
  ];

  getBadgeImagePath(badge : any) : string {
    return "../assets/"+badge.nom+"/"+badge.etat+".svg";
  }
}
