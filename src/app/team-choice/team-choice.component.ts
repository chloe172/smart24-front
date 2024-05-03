import { Component } from '@angular/core';
import { Equipe } from '../modele/equipe.model';
import { TeamEnrollService } from '../team-enroll/team-enroll.service';
import { TeamChoiceService } from './team-choice.service';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-choice',
  standalone: true,
  imports: [MatListModule,FormsModule],
  templateUrl: './team-choice.component.html',
  styleUrl: './team-choice.component.scss'
})
export class TeamChoiceComponent {
  listeEquipes: Equipe[] = []
  selected !:any;
  constructor(private service : TeamChoiceService) { }
  router : Router = new Router;
  ngOnInit(){
    this.service.getEquipes((message) => {
        console.log("json reçu",message);
        if(!message.succes){
            console.log(message.messageErreur);
            this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
        }
        else{
        this.listeEquipes = message.data.listeEquipesNonConnectees as Equipe[];
        }
      }
    );
  }

  connecterEquipe(){
    console.log("Equipe sélectionnée", this.selected[0].id);
    this.service.connecterEquipe(this.selected[0].id);
  }

}
