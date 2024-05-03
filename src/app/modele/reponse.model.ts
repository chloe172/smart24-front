import { ActiviteEnCours } from "./activiteEnCours.model";
import { Proposition } from "./proposition.model";
import { Equipe } from "./equipe.model";

export interface Reponse {
    id: number;
    dateSoumission: number;
    scoreEquipe: number;
    proposition: Proposition;
    equipe: Equipe;
    activiteEnCours: ActiviteEnCours;
}