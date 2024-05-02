import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Router } from '@angular/router';
import { ConnexionService } from '../connexion/connexion.service';
import { AccessSessionService } from '../access-session/access-session.service';


@Injectable({
    providedIn: 'root'
})
export class IdPartieService {
    idPartie: number;
    constructor(private webservice : WebSocketService,private router: Router, private connectionsService : ConnexionService,private accessSessionService : AccessSessionService) {     
        this.idPartie = -1;
        
    }

    
    setId(id : number){
        this.idPartie = id;
    }
    getId () {
        return this.idPartie;
    }
}