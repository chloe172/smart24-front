import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class IdPartieService {
    idPartie: number;
    constructor(private webservice : WebSocketService,private router: Router) {     
        this.idPartie = -1;
        
    }

    
    setId(id : number){
        this.idPartie = id;
        this.router.navigate(["/waiting"])
    }
    getId () {
        return this.idPartie;
    }
}