import { Routes } from '@angular/router';
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
import { TeamEnrollComponent } from './team-enroll/team-enroll.component';
import { TeamChoiceComponent } from './team-choice/team-choice.component';
import { MjGestionProjetComponent } from './mj-gestion-projet/mj-gestion-projet.component';
import { ActivityComponent } from './activity/activity.component';


export const routes: Routes = [
    {
        path: '',
        component: AccessSessionComponent,
        title: 'Access'

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
        component: ActivityComponent,
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

    },
    {
        path: 'team-enroll',
        component: TeamEnrollComponent
    },
    {
        path: 'team-choice',
        component: TeamChoiceComponent
    },
    {
        path: 'mj-gestion-projet',
        component: MjGestionProjetComponent
    },
    {
        path: '**',
        redirectTo: 'error/404/Page introuvable'
    }
];
