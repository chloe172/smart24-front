import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ConnexionService {
    userConnected : boolean;
    constructor(private webservice : WebSocketService, private cookieservice : CookieService) {     
        this.userConnected = false;
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
    
    setUserAuthenticated(){
        this.userConnected = true;
        this.cookieservice.set('authentification', 'true');
    }
    getUserAuthentication (){
        return this.userConnected;
    }
}