import { Partie } from "./partie.model";
import { Activite } from "./activite.model";
import { Reponse } from "./reponse.model";

export interface ActiviteEnCours {
    id: number;
    date: number;
    partie: Partie;
    activite: Activite;
    listeReponses: Reponse[];
}