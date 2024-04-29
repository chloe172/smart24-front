import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-design-type',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './design-type.component.html',
  styleUrl: './design-type.component.scss'
})
export class DesignTypeComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('puzzle0', sanitizer.bypassSecurityTrustResourceUrl('assets/puzzle-pieces/0.svg'));
  }

}
