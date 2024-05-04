import { Activite } from "./activite.model";
import { Equipe } from "./equipe.model";

export interface Plateau {
    id: number;
    nom: string;
    activites: Activite[];
}

export interface Badge {
    plateau: string;
    rang: string;
}

export interface Classement {
    badges: Badge[];
    equipes: Equipe[];
}

