import * as api from '../../../api';
import {RelationAttribute} from "../../../api";

export type Word = {
    relatedLexicalUnits?: { word: Word, attribute: RelationAttribute }[];
} & api.LexicalUnit
