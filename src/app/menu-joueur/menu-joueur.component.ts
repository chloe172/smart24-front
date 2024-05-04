import { Component, Input } from '@angular/core';
import { BadgeJoueurComponent } from '../badge-joueur/badge-joueur.component';
import { ClassementComponent } from '../classement/classement.component';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-menu-joueur',
  standalone: true,
  imports: [BadgeJoueurComponent, ClassementComponent, AvatarComponent],
  templateUrl: './menu-joueur.component.html',
  styleUrl: './menu-joueur.component.scss'
})
export class MenuJoueurComponent {
  /*equipe: Equipe = ;

  getAvatarPath() : string {
    return "../assets/Avatar-pikisuperstar/"+equipe.avatar+".svg";
  }*/
}
