import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'access-session',
  templateUrl: './access-session.component.html',
  styleUrl: './access-session.component.scss',
  imports: [FormsModule,ReactiveFormsModule,NgIf]
})
export class AccessSessionComponent {
  pinForm: FormGroup;
  router: Router = new Router;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form with form controls and validators
    this.pinForm = this.formBuilder.group({
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  // Function to get access to form controls for easier validation in HTML
  get formControls() {
    return this.pinForm.controls;
  }

  // Function to handle form submission when the button is clicked
  valider() {
    if (this.pinForm.valid) {
      // Form is valid, perform desired action here (e.g., API call, navigate to another page, etc.)
      console.log('PIN is valid:', this.pinForm.value.pin);
      this.router.navigate(['/join']); // Fix: Use navigateByUrl instead of navigate
    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.pinForm.markAllAsTouched();
    }
  }
}
