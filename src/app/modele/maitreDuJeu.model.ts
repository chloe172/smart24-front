import { Partie } from "./partie.model";

export interface MaitreDuJeu {
    id: number;
    nom: string;
    motDePasse: string;
    parties: Partie[];
}

