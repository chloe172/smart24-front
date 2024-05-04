import { Component, Input } from '@angular/core';
import { Component, Input } from '@angular/core';
import { BadgeJoueurComponent } from '../badge-joueur/badge-joueur.component';
import { ClassementComponent } from '../classement/classement.component';
import { Badge } from '../modele/plateau.model';
import { Equipe } from '../modele/equipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-menu-joueur',
  standalone: true,
  imports: [BadgeJoueurComponent, ClassementComponent, MatCardModule, MatIcon, AvatarComponent],
  templateUrl: './menu-joueur.component.html',
  styleUrl: './menu-joueur.component.scss'
})
export class MenuJoueurComponent {
  @Input() badges!: Badge[];
  @Input() equipes!: Equipe[];
}
