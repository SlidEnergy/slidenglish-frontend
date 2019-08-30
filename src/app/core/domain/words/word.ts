import * as api from '../../../api';
import {RelationAttribute} from "../../../api";

export type Word = api.LexicalUnit & {
    relatedLexicalUnits?: { word: Word, attribute: RelationAttribute }[];
}
