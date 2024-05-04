import { Component, Input } from '@angular/core';
import { BadgeJoueurComponent } from '../badge-joueur/badge-joueur.component';
import { ClassementComponent } from '../classement/classement.component';
import { Equipe } from '../modele/equipe.model';
import { Classement } from '../modele/plateau.model';

@Component({
  selector: 'app-menu-joueur',
  standalone: true,
  imports: [BadgeJoueurComponent, ClassementComponent],
  templateUrl: './menu-joueur.component.html',
  styleUrl: './menu-joueur.component.scss'
})
export class MenuJoueurComponent {
  @Input() equipe!: Equipe;
  @Input() classements!: Classement[];
}
