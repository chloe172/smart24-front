import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { Classement, Plateau } from '../modele/plateau.model';

@Component({
  selector: 'app-badge-joueur',
  standalone: true,
  imports: [MatCard, NgFor],
  templateUrl: './badge-joueur.component.html',
  styleUrl: './badge-joueur.component.scss'
})
export class BadgeJoueurComponent {
  @Input() classements!: Classement[];
  
  getBadgeImagePath(index: number) : string {
    return "../assets/"+this.classements[index].plateau.nom+"/"+this.classements[index].rang+".svg";
  }
}
