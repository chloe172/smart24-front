import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { QuestionPageComponent } from '../question-page/question-page.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [ProgressBarComponent,QuestionPageComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

}
