import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import { ConnexionService } from './connexion.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule,MatIconModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  password = new FormControl('', [Validators.required]);
  errorMessage = '';

  constructor(private service : ConnexionService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  connect(){
    if (this.email.valid && this.email.value != null && this.password.valid && this.password.value != null) {
		console.log("Envoi");
		this.service.authentify(this.email.value,this.password.value);
		this.service.getAuthentication((message) => {
			console.log("json reçu",message);
			if (!message.succes){
				console.log(message.messageErreur);
				this.errorMessage = message.messageErreur as string;
			}else{
				console.log("Connexion réussie");
			}
		});
      
    }
  }
}

