import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { filter } from 'rxjs/operators'; // Add this import statement

@Injectable({
    providedIn: 'root'
})
export class AccessSessionService {

    constructor(private webservice : WebSocketService) { 
        this.getCodePin();
        
        
    }

    validerCodePin(pin: string) {
        let message = { "success": true, "data": { "codePin": pin } };
        this.webservice.SendToType('ValiderCodePin', message);
    }
    getCodePin() {
        this.webservice.subscribeToType('ValiderCodePin', (message): any => {
            if (message.success){
                return message.data;
            }
           
        });  
    }  
}