import { Activite } from "./activite.model";

export interface Plateau {
    id: number;
    nom: string;
    activites: Activite[];
}

