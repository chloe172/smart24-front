import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';


@Injectable({
    providedIn: 'root'
})
export class ConnexionService {
    constructor(private webservice : WebSocketService) {     
    }
}