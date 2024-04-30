import { Routes } from '@angular/router';
import { HostComponent } from './features/host/host.component';
import { JoinComponent } from './features/join/join.component';
import { DesignTypeComponent } from './shared/design-type/design-type.component';
import { AccessSessionComponent } from './access-session/access-session.component';
import { ConnexionComponent } from './connexion/connexion.component';

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
    }
];
