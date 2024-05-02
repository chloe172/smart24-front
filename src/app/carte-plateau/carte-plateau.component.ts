import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plateau } from '../modele/plateau.model';
import { CartePlateauService } from './carte-plateau.service';

@Component({
  selector: 'app-carte-plateau',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './carte-plateau.component.html',
  styleUrl: './carte-plateau.component.scss'
})

export class CartePlateauComponent {
  @Input() plateau!:Plateau;

  constructor(private service : CartePlateauService){}
  select(idPlateau: number) {
    console.log("select id ", idPlateau)
    this.service.choisirPlateauPartie(idPlateau);
  }
}
