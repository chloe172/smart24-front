import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { filter } from 'rxjs/operators'; // Add this import statement
import { IdPartieService } from '../general-services/id-partie.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AccessSessionService {
    userAccessed : boolean;
    constructor(private webservice : WebSocketService,private idPartieService : IdPartieService,private router: Router) {    
        this.userAccessed = false;       
    }

    validerCodePin(pin: string,callback: (message: any) => any){
        let message = { "codePin": pin };
        this.webservice.SendToType('validerCodePin', message);
        this.webservice.subscribeToType('reponseValiderCodePin', (message): any => {
            callback(message);
           
        });  

    }

    navigate(id : number,etatPartie: string){
        if(etatPartie === 'ATTENTE_EQUIPE_RECONNEXION'){
            this.idPartieService.setId(id);
            this.setUserAccessed();
            this.router.navigate(['/team-choice']);
        }
        else if(etatPartie === 'ATTENTE_EQUIPE_INSCRIPTION'){
            this.idPartieService.setId(id);
            this.setUserAccessed();
            this.router.navigate(['/team-enroll']);
        }
        else {
            this.router.navigate(['/error', '404', 'La partie est introuvable']);
        }
        
    }

    setUserAccessed(){
        this.userAccessed = true;
    }

    getUserAccessed (){
        return this.userAccessed;
    }
    
}