import { Component } from '@angular/core';
import { Equipe } from '../modele/equipe.model';
import { TeamChoiceService } from './team-choice.service';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-choice',
  standalone: true,
  imports: [MatListModule, FormsModule, MatCardModule, MatButton],
  templateUrl: './team-choice.component.html',
  styleUrl: './team-choice.component.scss',
})
export class TeamChoiceComponent {
  listeEquipes: Equipe[] = [];
  selected!: any;

  constructor(
    private service: TeamChoiceService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.service.getEquipes((message) => {
      if (message.succes) {
        this.listeEquipes = message.data.listeEquipesNonConnectees as Equipe[];
      } else {
        this.router.navigate(['/']);
        this.snackbar.open('Une erreur est survenue', 'OK');
      }
    });
  }

  connecterEquipe() {
    this.service.connecterEquipe(this.selected[0].id);
  }
}
