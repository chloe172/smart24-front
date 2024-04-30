import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { filter } from 'rxjs/operators'; // Add this import statement

@Injectable({
    providedIn: 'root'
})
export class ConnexionService {

    constructor(private webservice : WebSocketService) { 
        this.getAuthentication();
        
        
    }

    authentify(user: string, password: string) {
        let message = { "succes": true, "data": { "nom": user, "mdp" : password } };
        this.webservice.SendToType('authentifierUtilisateur', message);
    }
    getAuthentication() {
        this.webservice.subscribeToType('authentifierUtilisateur', (message): any => {
           if (!message.succes){
               throw new Error(message.msgErreur);
           }
           return true;
        });  
    }  
}