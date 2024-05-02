import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'; 
import { MatDialogConfig } from '@angular/material/dialog'; 
import { MatDialogRef } from '@angular/material/dialog'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { DatePipe } from '@angular/common';
import { Partie } from '../modele/partie.model';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-ongoing-game-card',
  standalone: true,
  templateUrl: './ongoing-game-card.component.html',
  styleUrl: './ongoing-game-card.component.scss',
  imports: [MatCardModule,MatButtonModule,MatDialogModule,DatePipe,ModalComponent]
})

export class OngoingGameCardComponent { 
  constructor (private idService : IdPartieService, public matDialog: MatDialog){}
  @Input() partie!: Partie;
  router : Router = new Router;
  reprendre(){
    this.idService.setId(this.partie.id);
  }
  
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ModalComponent, any> | undefined;
  
  
  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }  
  
  openModal() {  
    this.dialogConfig.id = "app-modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "650px";
    this.modalDialog = this.matDialog.open(ModalComponent, this.dialogConfig);
  }
}
