import { Equipe } from './equipe.model';
import { MaitreDuJeu } from './maitreDuJeu.model';
import { Plateau } from './plateau.model';

export interface Partie {
  id: number;
  nombreEquipe: number;
  codePin: string;
  nom: string;
  date: string;
  etat: string;
  dernierPlateau: Plateau;
  listePlateaux: Plateau[];
  listeEquipes: Equipe[];
  maitreDuJeu: MaitreDuJeu;
}
