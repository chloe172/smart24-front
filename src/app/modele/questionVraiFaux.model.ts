import { Proposition } from "./proposition.model";
import { Question } from "./question.model";

export interface QuestionVraiFaux extends Question {
    id: number;
    listePropositions: Proposition[];
}