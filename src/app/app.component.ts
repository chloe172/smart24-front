import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AccessSessionComponent } from './access-session/access-session.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    RouterOutlet,
    AccessSessionComponent
  ]
})
export class AppComponent {
  title = "app";
}
