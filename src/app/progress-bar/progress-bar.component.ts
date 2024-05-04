import {Component, Input, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarService } from './progress-bar.service';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrl: 'progress-bar.component.scss',
  standalone: true,
  imports: [MatProgressBarModule,MatCardModule],
})
export class ProgressBarComponent{

  constructor(private service : ProgressBarService){}

  getTempsRestant():number{
    return this.service.getTempsRestant();
  }

  getValeurProgression():number{
    return this.service.getValeurProgression();
  }
  

}
