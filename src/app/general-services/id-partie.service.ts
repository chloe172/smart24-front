import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Router } from '@angular/router';
import { ConnexionService } from '../connexion/connexion.service';
import { AccessSessionService } from '../access-session/access-session.service';


@Injectable({
    providedIn: 'root'
})
export class IdPartieService {
    idPartie : number;
    codePin : string;
    constructor() {
        this.idPartie = -1;
        this.codePin = "";
    }
        
    setCodePin(code : string){
        this.codePin = code;
    }
    getCodePin () {
        return this.codePin;
    }

    
    setId(id : number){
        this.idPartie = id;
    }
    getId () {
        return this.idPartie;
    }
}