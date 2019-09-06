import {RelationAttribute} from "../../../api";
import {Word} from "./word";

export type WordRelation = {
    wordId?: number,
    word?: Word,
    attribute: RelationAttribute
}
