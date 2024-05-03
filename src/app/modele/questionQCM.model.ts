import { Proposition } from "./proposition.model";
import { Question } from "./question.model";

export interface QuestionQCM extends Question {
    id: number;
    listePropositions: Proposition[];
}