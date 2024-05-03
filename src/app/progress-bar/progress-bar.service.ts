import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {
    constructor(
        private webSocketService: WebSocketService,
        private idPartieService: IdPartieService,
        private router: Router,
        private accessService: AccessSessionService
    ) {
        // Initialize your service here
    }

    initBar(callback : () => any){
            this.webSocketService.subscribeToType('reponseLancerActivite', (message) => {
                console.log("json reçu",message);
                callback();
            });
        
    }
}