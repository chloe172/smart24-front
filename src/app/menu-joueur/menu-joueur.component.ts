import { Component } from '@angular/core';
import { BadgeJoueurComponent } from '../badge-joueur/badge-joueur.component';
import { ClassementComponent } from '../classement/classement.component';

@Component({
  selector: 'app-menu-joueur',
  standalone: true,
  imports: [BadgeJoueurComponent, ClassementComponent],
  templateUrl: './menu-joueur.component.html',
  styleUrl: './menu-joueur.component.scss'
})
export class MenuJoueurComponent {


}
