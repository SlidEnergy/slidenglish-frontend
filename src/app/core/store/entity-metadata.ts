import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Word: {}
};

const pluralNames = { Word: 'Words' };

export const entityConfig = {
    entityMetadata,
    pluralNames
};
