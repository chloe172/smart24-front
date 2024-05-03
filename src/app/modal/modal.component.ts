import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { IdPartieService } from '../general-services/id-partie.service';
import { Partie } from '../modele/partie.model';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButton],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  constructor (
    private idService : IdPartieService, 
    public dialogRef: MatDialogRef<ModalComponent>,
    private webservice: WebSocketService, 
    private service : ModalService
    ) {}
    @Input() partie!: Partie;
    router : Router = new Router;

  terminer(){
    
    this.service.finishGame(this.partie, (message) => {
      console.log("json reçu",message);
      if(!message.succes){
         console.log(message.messageErreur);
         this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
      }
      else{
        console.log("Partie terminée avec succès");
        this.router.navigate(['/ongoing-games']);
      }
   });
    this.closeModal();
  } 

  
  ngOnInit(): void {}
  
  closeModal() {
    this.dialogRef.close();
  }
}

