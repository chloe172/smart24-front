import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { merge } from 'rxjs';
import { AccessSessionService } from './access-session.service';

@Component({
  standalone: true,
  selector: 'access-session',
  templateUrl: './access-session.component.html',
  styleUrl: './access-session.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, NgIf]
})
export class AccessSessionComponent {
  router: Router = new Router;

  pin = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  errorMessage = '';
  sessionErrorMessage ='';
  sessionError: boolean = false;


  constructor(private service : AccessSessionService) {
    merge(this.pin.statusChanges, this.pin.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  valider() {
    if (this.pin.valid && this.pin.value != null) {
      console.log('PIN is valid:', this.pin.value);
      this.sessionError = false;
      this.sessionErrorMessage = '';
      this.service.validerCodePin(this.pin.value,(message) => {
        console.log('json reçu',message);
        if (!message.succes){
          console.log(message.messageErreur);
          this.sessionErrorMessage = message.messageErreur as string;
          this.sessionError = true;
        }else{
          console.log('Connexion réussie');
          this.service.navigate(message.data.partie.id,message.data.partie.etat);
          this.sessionError = false;
          this.sessionErrorMessage = '';
        }
      });
    } else {
      this.pin.markAllAsTouched();
    }
  }

  updateErrorMessage() {
    if (this.pin.hasError('required')) {
      this.errorMessage = 'Code PIN nécessaire';  
    } else {
      this.errorMessage = '6 caractères attendus';
    }
  }
}



