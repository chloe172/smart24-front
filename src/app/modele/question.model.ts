import { Proposition } from "./proposition.model";
import { Activite } from "./activite.model";

export interface Question extends Activite {
    id: number;
    temps: number;
    score: number;
    bonneProposition?: Proposition;
}