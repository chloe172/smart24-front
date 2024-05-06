import { Component, EventEmitter, Output} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-iagame',
  standalone: true,
  imports: [NgFor, MatCard, MatButton, NgClass, NgIf],
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
  score: number = 100;
  @Output() scoreEvent = new EventEmitter<number>();

  constructor(private bar : MatSnackBar){}

  select(src :string){
    // Utilisation de la méthode find pour trouver l'objet correspondant à la source
    const image = this.images.find(indice => indice.src === src);
    
    // Vérification si une mat_card correspondante a été trouvée
    if (image.clicked==false) {
      // Modification de l'objet trouvé
      image.clicked = true;
      // Autres modifications que vous souhaitez apporter

    }else{
      image.clicked=false;
    }
  }
  valider(){
    let reponse = true;
    let nbClick = 0;
    // Vérifier d'abord que toutes les cartes avec rep = "IA" ont cliqued = true
    for (const indice of this.images) {
      if (indice.rep === "IA" && !indice.clicked) {
        reponse = false;
        break;
      }if(indice.clicked==true){
        nbClick++;
      }
    }
    if(nbClick!=4){
      reponse = false;
    }
    if(reponse == true){
      this.scoreEvent.emit(this.score);
    } else {
      this.bar.open("Mauvaise réponse, réessayez !", "OK", {duration : 1000});
    }

  }
}

