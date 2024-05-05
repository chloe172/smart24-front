import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgStyle, NgClass, NgIf } from '@angular/common';
import { Proposition } from '../modele/proposition.model';
import { AccessSessionService } from '../access-session/access-session.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [MatCardModule, NgStyle, NgClass, MatIcon, NgIf],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export class ResponseComponent {
  @Input() onClickCallback!: (proposition: Proposition) => void;
  @Input() index!: number;
  @Input() proposition!: Proposition;
  @Input() etape: "click" | "select" | "explication" = "click";
  @Input() estSelectionnee: boolean = false;
  @Input() etatReponse: "bonne" | "mauvaise" | "neutre" = "neutre";

  constructor(
    private accessSessionService: AccessSessionService,
  ) {
  }

  getColor(): string {
    if (this.etape === "click") {
      const colors = ['', '#ca5fe8', '#fbcd40', '#ff5353'];
      return colors[this.index % 4];
    } else if (this.etape === "select") {
      if (this.estSelectionnee) {
        return '#4e5fff';
      } else {
        return 'gray';
      }
    } else {
      if (this.etatReponse === "bonne") {
        return 'green';
      } else if (this.etatReponse === "mauvaise") {
        return '#ff5353';
      } else {
        return 'gray';
      }
    }
  }

  onClick() {
    if (this.accessSessionService.getUserAccessed() && this.etape === "click") {
      this.onClickCallback(this.proposition);
    }
  }

}
