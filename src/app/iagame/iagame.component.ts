import { Component, HostListener} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-iagame',
  standalone: true,
  imports: [NgFor, MatCard, MatButton],
  templateUrl: './iagame.component.html',
  styleUrl: './iagame.component.scss'
})
export class IAGameComponent {
  images: any[] = [
    {src : "../assets/pikaso_texttoimage_a-abstract-painting-.jpeg", rep : "IA", clicked : false},
    {src : "../assets/QR271 woman portrait painting antique oil paintings XIX century_1000x1000.jpg", rep : "Humain", clicked : false},
    {src : "../assets/HS3112_1356080496.jpg", rep : "Humain", clicked : false},
    {src : "../assets/pikaso_texttoimage_a-classic-painting-of-the-19th-century.jpeg", rep : "IA", clicked : false},
    {src : "../assets/tableau-moderne-antalya-40x40-cm.jpg", rep : "Humain", clicked : false},
    {src : "../assets/pikaso_texttoimage_a-portrait-of-the-17th-century.jpeg", rep : "IA", clicked : false},
    {src : "../assets/pikaso_texttoimage_a-sketch-of-some-invention.jpeg", rep : "IA", clicked : false},
    {src : "../assets/Vesna-figuratif-peinture-turquoise-rose-papillon-femme-fleurs.jpeg", rep : "Humain", clicked : false}
  ];


  select(){
  }
  valider(){

  }
}

