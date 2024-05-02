import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButton],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }  
  
  ngOnInit(): void {}
  
  closeModal() {
    this.dialogRef.close();
  }
}

