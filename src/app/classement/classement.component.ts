import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-classement',
  standalone: true,
  imports: [NgFor, MatCard, NgStyle],
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.scss'
})
export class ClassementComponent {

  equipes : any[] = [
    { nomEquipe : 'equipe1', color : '#5ce1e6', points : 63, avatar : '', classement : '1er'}, 
    { nomEquipe : 'equipe2', color : '#ca5fe8', points : 54, avatar : '', classement : '2eme'},
    { nomEquipe : 'equipe3', color : '#fbcd40', points : 50, avatar : '', classement : '3eme'},
  ]

}
