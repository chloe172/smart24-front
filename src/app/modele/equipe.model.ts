import { Partie } from "./partie.model";
import { Plateau } from "./plateau.model";

export interface Equipe {
    id: number;
    nom: string;
    score: number;
    avatar: string;
    partie?: Partie;
    rang: string;
}

export interface ClassementPlateau {
    equipes: Equipe[];
    nomPlateau: string;
}