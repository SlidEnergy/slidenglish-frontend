import * as api from '../../../api';
import {LexicalUnitInputAttribute} from "../../../api";
import {PartOfSpeech} from "../../../api";
import {ExampleOfUse} from "../../../api";
import {WordRelation} from "./word-relation";

export class Word {
    private readonly _model: api.LexicalUnit;

    get model(): api.LexicalUnit {
        this._model.relatedLexicalUnits = this.relatedLexicalUnits.map(x => ({
            lexicalUnitId: x.word.id,
            attribute: x.attribute
        }));

        return this._model;
    }

    get id(): number | undefined {
        return this._model.id;
    }
    set id(value: number) {
        this._model.id = value;
    }

    get text(): string {
        return this._model.text;
    }
    set text(value: string) {
        this.model.text = value;
    }

    get association(): string {
        return this._model.association;
    }
    set association(value: string) {
        this._model.association = value;
    }

    get notes(): string {
        return this._model.notes;
    }
    set notes(value: string) {
        this._model.notes = value;
    }

    relatedLexicalUnits: WordRelation[];

    get inputAttributes(): LexicalUnitInputAttribute {
        return this._model.inputAttributes;
    }

    get usagesCount(): number {
        return this._model.usagesCount;
    }

    get partOfSpeech(): PartOfSpeech {
        return this._model.partOfSpeech;
    }

    get examplesOfUse(): Array<ExampleOfUse> {
        return this._model.examplesOfUse;
    }
    set examplesOfUse(value: ExampleOfUse[]) {
        this._model.examplesOfUse = value;
    }

    get isWord(): boolean {
        return this._model.isWord;
    }

    get isPhrase(): boolean {
        return this._model.isPhrase;
    }

    constructor()
    constructor(model: api.LexicalUnit)
    constructor(model: api.LexicalUnit, relatedLexicalUnits: WordRelation[])
    constructor(model?: api.LexicalUnit, relatedLexicalUnits?: WordRelation[]) {
        this._model = model || { id: 0, text: ''};
        this.relatedLexicalUnits = relatedLexicalUnits || [];
    }

    addRelatedWord(relation: WordRelation): void {
        this.relatedLexicalUnits.push(relation);
    }
}
