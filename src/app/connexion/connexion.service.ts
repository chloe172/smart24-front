import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { filter } from 'rxjs/operators'; // Add this import statement

@Injectable({
    providedIn: 'root'
})
export class ConnexionService {

    constructor(private webservice : WebSocketService) {     
        
    }

    authentify(user: string, password: string) {
        let message = { "nom": user, "mdp" : password };
        this.webservice.SendToType('authentifierUtilisateur', message);
    }
    getAuthentication(callback: (message: any) => any) {
        this.webservice.subscribeToType('reponseAuthentifierUtilisateur', (message): any => {
            callback(message);
        });  
    }  
}