import { Plateau } from "./plateau.model";

export interface Activite {
    id: number;
    plateau: Plateau;
    numeroActivite: number;
    difficulteActivite: string;
    intitule: string;
}