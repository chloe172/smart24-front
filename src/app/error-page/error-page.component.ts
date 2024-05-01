import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  standalone: true,
  imports: [
    RouterModule
  ],
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorCode: number = 0;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer les paramètres de l'URL pour afficher le code d'erreur et le message
    this.route.params.subscribe(params => {
      this.errorCode = params['code'];
      this.errorMessage = params['message'];
    });
  }
}

