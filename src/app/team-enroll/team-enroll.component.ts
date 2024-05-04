import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamEnrollService } from './team-enroll.service';
import { NgIf } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-team-enroll',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCardModule, NgIf, MatFormFieldModule, AvatarComponent],
  templateUrl: './team-enroll.component.html',
  styleUrl: './team-enroll.component.scss'
})
export class TeamEnrollComponent {
  nomEquipe: string = '';
  avatarEquipe: string = 'AUTRUCHE';

  constructor(private service : TeamEnrollService) { }
  ngOnInit() {
    this.service.verifyUser();
  }

  inscrireEquipe(){
    this.service.inscrireEquipe(this.nomEquipe, this.avatarEquipe);
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
