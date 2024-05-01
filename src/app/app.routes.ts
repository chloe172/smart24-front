import { Routes } from '@angular/router';
import { HostComponent } from './features/host/host.component';
import { JoinComponent } from './features/join/join.component';
import { DesignTypeComponent } from './shared/design-type/design-type.component';
import { AccessSessionComponent } from './access-session/access-session.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { OngoingGamesComponent } from './ongoing-games/ongoing-games.component';
import { SelectionPlateauxComponent } from './selection-plateaux/selection-plateaux.component';

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
    }
];
