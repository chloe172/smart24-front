import { Equipe } from "./equipe.model";
import { MaitreDuJeu } from "./maitreDuJeu.model";
import { Plateau } from "./plateau.model";

export interface Partie {
    id: number;
    nombreEquipe: number;
    codePin: string;
    nom: string;
    date: Date;
    etat: string;
    plateau: Plateau;
    indiceActivite: number;
    listePlateaux: Plateau[];
    listeEquipes: Equipe[];
    maitreDuJeu: MaitreDuJeu;
}