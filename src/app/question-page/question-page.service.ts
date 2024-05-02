import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { AccessSessionService } from '../access-session/access-session.service';
import { IdPartieService } from '../general-services/id-partie.service';


@Injectable({
    providedIn: 'root'
})
export class QuestionPageService {
    constructor(
        private webservice: WebSocketService,
        private connexionService: ConnexionService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private router: Router
    ) {
    }

    InitQuestionPage(callback: (message: any) => any){
        if (this.connexionService.getUserAuthentication()) {
            let idPartie = this.partieService.getId();
            this.webservice.SendToType("lancerActivite", {idPartie});
            this.webservice.subscribeToType('reponseLancerActivite', (message): any => {
                callback(message);
            });

            this.webservice.subscribeToType('notificationReponseActivite', (message): any => {
                callback(message);
            });
        }
        else {
            this.router.navigate(['/login']);            
        }
    }
}