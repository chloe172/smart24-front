import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { AccessSessionService } from './access-session.service';

@Component({
  standalone: true,
  selector: 'access-session',
  templateUrl: './access-session.component.html',
  styleUrl: './access-session.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule]
})
export class AccessSessionComponent {
  router: Router = new Router;

  pin = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  errorMessage = '';

  constructor(private service : AccessSessionService) {
    merge(this.pin.statusChanges, this.pin.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  valider() {
    if (this.pin.valid) {
      console.log('PIN is valid:', this.pin.value);
      this.router.navigate(['/join']);
    } else {
      this.pin.markAllAsTouched();
    }
  }

  updateErrorMessage() {
    if (this.pin.hasError('required')) {
      this.errorMessage = 'Le code PIN est nécessaire';
    } else {
      this.errorMessage = 'Le code PIN doit être de 6 caractères';
    }
  }
}
