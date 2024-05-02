import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Partie } from '../modele/partie.model';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';
import { OngoingGameCardService } from './ongoing-game-card.service';

@Component({
  selector: 'app-ongoing-game-card',
  standalone: true,
  templateUrl: './ongoing-game-card.component.html',
  styleUrl: './ongoing-game-card.component.scss',
  imports: [MatCardModule,MatButtonModule,DatePipe]
})

export class OngoingGameCardComponent { 
  constructor (private service : OngoingGameCardService){}
  @Input() partie!: Partie;
  router : Router = new Router;
  reprendre(){
    this.service.reprendre(this.partie.id);
  }
}
