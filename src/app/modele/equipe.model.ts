import { Partie } from "./partie.model";

export interface Equipe {
    id: number;
    nom: string;
    score: number;
    avatar: string;
    partie?: Partie;
    rang: string;
}