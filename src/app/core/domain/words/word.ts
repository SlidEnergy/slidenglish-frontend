export class Word {
    id?: number;
    text: string;
    association: string;
    description: string;
    synonyms: Array<Word>;
}
