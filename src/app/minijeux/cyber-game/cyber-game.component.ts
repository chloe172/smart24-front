import { Component, EventEmitter, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cyber-game',
  standalone: true,
  imports: [MatCard, MatLabel, FormsModule, ReactiveFormsModule, MatButton, MatInput, MatFormFieldModule, NgIf],
  templateUrl: './cyber-game.component.html',
  styleUrl: './cyber-game.component.scss'
})
export class CyberGameComponent {
  password = new FormControl('', [Validators.required]);
  message='';
  score: number = 100;
  @Output() scoreEvent = new EventEmitter<number>();

  constructor(private bar : MatSnackBar){}

  validerMiniJeu(){
    if(this.password.value == "gribouille"){
      this.message = 'Félicitations ! Vous avez trouvé le bon mot de passe.';
      this.scoreEvent.emit(this.score);

    } else {
      this.message = 'Mauvaise Réponse. Réessayez !';
      this.bar.open(this.message, "OK", {duration : 1000});
    }
  }
  

}
