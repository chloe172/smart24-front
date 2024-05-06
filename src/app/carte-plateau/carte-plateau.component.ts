import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plateau } from '../modele/plateau.model';
import { CartePlateauService } from './carte-plateau.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-carte-plateau',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './carte-plateau.component.html',
  styleUrl: './carte-plateau.component.scss'
})

export class CartePlateauComponent implements OnInit {
  @Input() plateau!: Plateau;
  avancement: number = 0;

  constructor(
    private service: CartePlateauService
  ) { }

  ngOnInit() {
    this.avancement = Math.round(this.plateau.nombreActivitesTerminees / this.plateau.nombreActivites * 100);
  }

  select(idPlateau: number) {
    this.service.choisirPlateauPartie(idPlateau);
  }

  getBadgeImagePath(): String {
    return "../assets/" + this.plateau.nom + "/noir.svg";
  }
}
