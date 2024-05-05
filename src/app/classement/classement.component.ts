import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { Equipe } from '../modele/equipe.model';

@Component({
  selector: 'app-classement',
  standalone: true,
  imports: [NgFor, MatCard, NgStyle],
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.scss'
  
})
export class ClassementComponent {
  @Input() equipes!: Equipe[];

getColor(i: number) {
  const colors = ['#5ce1e6', '#ca5fe8', '#fbcd40', '#ff5353'];
  return colors[i % 4];
}
}


