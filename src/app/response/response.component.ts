import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [MatCardModule, NgStyle],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export class ResponseComponent {
  @Input() response!: string;
  @Input() index!: number;

  getColor() : string {
    const colors = ['#5ce1e6', '#ca5fe8', '#fbcd40', '#ff5353'];
    return colors[this.index % 4];
  }
}
