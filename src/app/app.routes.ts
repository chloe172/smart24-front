import { Routes } from '@angular/router';
import { HostComponent } from './features/host/host.component';
import { JoinComponent } from './features/join/join.component';
import { DesignTypeComponent } from './shared/design-type/design-type.component';
import { AccessSessionComponent } from './access-session/access-session.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { OngoingGamesComponent } from './ongoing-games/ongoing-games.component';
import { SelectionPlateauxComponent } from './selection-plateaux/selection-plateaux.component';
import { MenuJoueurComponent } from './menu-joueur/menu-joueur.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WaitingForPlayersComponent } from './waiting-for-players/waiting-for-players.component';


export const routes: Routes = [
    {
        path: '',
        component: AccessSessionComponent,
        title: 'Access'

    },
    {
        path: 'host',
        component: HostComponent,
        title: 'Host a game'
    },
    {
        path: 'join',
        component: JoinComponent,
        title: 'Join a game'
    },
    {
        path: 'design',
        component: DesignTypeComponent
    },
    {
        path: 'login',
        component: ConnexionComponent,
        title: 'Login'
    },
    {
        path: 'question',
        component: QuestionPageComponent
    },
    {
        path : 'ongoing-games',
        component : OngoingGamesComponent,
        title : 'Ongoing Games'
    },
    {
        path: 'selection',
        component: SelectionPlateauxComponent,
    },
    {
        path: 'menuJoueur',
        component: MenuJoueurComponent,
    },

    {
        path: 'create-game',
        component: CreateGameComponent, 
    },
    { 
        path: 'error/:code/:message', 
        component: ErrorPageComponent, 
    },
    {
        path: 'waiting',
        component: WaitingForPlayersComponent

    }
];
