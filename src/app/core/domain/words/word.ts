export class Word {
    id?: number;
    text: string;
    association: string;
    notes: string;
    relatedLexicalUnits: Array<Word>;
}
