import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatCard } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatError } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: 'gestion-projet.component.html',
  styleUrl: 'gestion-projet.component.scss',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatCard, NgIf, MatError, MatButtonModule],
})
export class GestionProjetComponent{
  message='';
  score: number = 100;
  @Output() scoreEvent = new EventEmitter<number>();
  
  etapes = [
    {'intitule':'Tests et intégration','place': 4},
    {'intitule':'Validation par l’utilisateur', 'place': 5},
    {'intitule':'Analyse et définition des objectifs','place': 1},
    {'intitule': 'Développement', 'place': 3},
    {'intitule':'Maintenance', 'place':7},
    {'intitule':'Mise en production', 'place':6},
    {'intitule':'Conception', 'place':2}
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapes, event.previousIndex, event.currentIndex);
    this.message='';
  }

  valider() {
    for (let i = 0; i < this.etapes.length - 1; i++) {
      if (this.etapes[i].place > this.etapes[i + 1].place) {
        this.message = 'Mauvaise Réponse. Réessayez !';
        return;
      }
    }
    this.message = 'Félicitations ! Vous avez trouvé le bon ordre.';
    this.scoreEvent.emit(this.score);
  }
}
