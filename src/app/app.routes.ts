import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HostComponent } from './features/host/host.component';
import { JoinComponent } from './features/join/join.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        title: 'App'

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
    }
];
