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
import { CyberGameComponent } from './minijeux/cyber-game/cyber-game.component';
import { GestionProjetComponent } from './minijeux/gestion-projet/gestion-projet.component';
import { IAGameComponent } from './minijeux/iagame/iagame.component';
import { GreenITComponent } from './minijeux/green-it/green-it.component';
import { GraphMJComponent } from './minijeux/graph-mj/graph-mj.component';

export const routes: Routes = [
  {
    path: '',
    component: AccessSessionComponent,
  },
  {
    path: 'design',
    component: DesignTypeComponent,
  },
  {
    path: 'login',
    component: ConnexionComponent,
  },
  {
    path: 'question',
    component: QuestionPageComponent,
  },
  {
    path: 'ongoing-games',
    component: OngoingGamesComponent,
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
    path: 'cyber-game',
    component: CyberGameComponent,
  },
  {
    path: 'ia-game',
    component: IAGameComponent,
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
    component: WaitingForPlayersComponent,
  },
  {
    path: 'team-enroll',
    component: TeamEnrollComponent,
  },
  {
    path: 'team-choice',
    component: TeamChoiceComponent,
  },
  {
    path: 'gestion-projet',
    component: GestionProjetComponent,
  },
  {
    path: 'gribouille',
    component: CyberGameComponent,
  },
  {
    path: 'greenIT',
    component: GreenITComponent,
  },
  {
    path: 'graph-mj',
    component: GraphMJComponent,
  },
  {
    path: '**',
    redirectTo: 'error/404/Page introuvable',
  }
];
