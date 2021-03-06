/**
 * SlidEnglish
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ExampleOfUse } from './exampleOfUse';
import { LexicalUnitInputAttribute } from './lexicalUnitInputAttribute';
import { LexicalUnitRelation } from './lexicalUnitRelation';
import { PartOfSpeech } from './partOfSpeech';


export interface LexicalUnit { 
    id?: number;
    text: string;
    association?: string;
    notes?: string;
    relatedLexicalUnits?: Array<LexicalUnitRelation>;
    inputAttributes?: LexicalUnitInputAttribute;
    usagesCount?: number;
    partOfSpeech?: PartOfSpeech;
    examplesOfUse?: Array<ExampleOfUse>;
    translation?: string;
    isWord?: boolean;
    isPhrase?: boolean;
}
