import { Partie } from "./partie.model";

export interface Equipe {
    id: number;
    nom: string;
    score: number;
    partie?: Partie;
}