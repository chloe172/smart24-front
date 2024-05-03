import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-cyber-game',
  standalone: true,
  imports: [MatCard, MatLabel, FormsModule, ReactiveFormsModule, MatButton, MatInput, MatFormFieldModule],
  templateUrl: './cyber-game.component.html',
  styleUrl: './cyber-game.component.scss'
})
export class CyberGameComponent {
  password = new FormControl('', [Validators.required]);
  message='';
  validerMiniJeu(){

    if(this.password.value == "gribouille"){
      this.message = 'Félicitations ! Vous avez trouvé le bon mot de passe.';
    } else {
      this.message = 'Mauvaise Réponse. Veuillez réessayer.';
    }
  }
  

}
