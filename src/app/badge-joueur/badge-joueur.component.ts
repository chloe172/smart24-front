import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { Badge, Plateau } from '../modele/plateau.model';

@Component({
  selector: 'app-badge-joueur',
  standalone: true,
  imports: [MatCard, NgFor],
  templateUrl: './badge-joueur.component.html',
  styleUrl: './badge-joueur.component.scss'
})
export class BadgeJoueurComponent {
  @Input() badges!: Badge[];
  
  getBadgeImagePath(badge: Badge) : string {
    return "../assets/"+badge.plateau+"/"+badge.rang+".svg";
  }
}
