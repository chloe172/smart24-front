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
      { etat: 'pasCommence' },
      { etat: 'pasCommence' },
      { etat: 'pasCommence' },
    ];
}
