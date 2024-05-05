import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamEnrollService } from './team-enroll.service';
import { NgIf } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-team-enroll',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCardModule, NgIf, MatFormFieldModule, AvatarComponent, ReactiveFormsModule],
  templateUrl: './team-enroll.component.html',
  styleUrl: './team-enroll.component.scss'
})
export class TeamEnrollComponent {
  //nomEquipe: string = '';
  nomEquipe: FormControl;
  errorMessage = '';
  avatarEquipe: string = 'AUTRUCHE';

  constructor(private service : TeamEnrollService) {
    this.nomEquipe = new FormControl('', [Validators.required, Validators.maxLength(16)]);
    merge(this.nomEquipe.statusChanges, this.nomEquipe.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
   }
  ngOnInit() {
    this.service.verifyUser();
  }

  updateErrorMessage() {
    if (this.nomEquipe.hasError('required')) {
      this.errorMessage = 'Vous devez entrer une valeur';
    } else if (this.nomEquipe.hasError('maxlength')) {
      this.errorMessage = 'Pas plus de 16 caractères';
    } else {
      this.errorMessage = '';
    }
  }

  inscrireEquipe(){
    if(this.nomEquipe.valid && this.nomEquipe.value != null)
      this.service.inscrireEquipe(this.nomEquipe.value, this.avatarEquipe);
  }

  teamNameInvalid(): boolean{
    return this.service.getTeamError();
  }

  getErrorMessage(): string{
    return this.service.getTeamErrorMessage();
  }

  updateAvatar(newAvatar: string) {
    this.avatarEquipe = newAvatar;
  }
}
