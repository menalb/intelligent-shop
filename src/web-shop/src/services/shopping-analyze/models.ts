import { Product } from '../../pages/shopping/models';

export type AnalyzeResult = SearchReponse | AddToCartReponse;

export interface AnalyzeFailureResult {
    kind: 'error';
    error: Error;
}
export interface Result {
    topScoringIntent: TopIntent;
    entities: Entity[];
}

export interface TopIntent {
    intent: 'SearchAProduct' | 'Buy';
}

export interface Entity {
    entity: string;
    type: string;
}

export interface SearchReponse {
    kind: 'search';
    items: Product[];
}

export interface AddToCartReponse {
    kind: 'add-to-cart';
    item: {
        name: string;
    };
}

export interface NotFoundReponse {
    kind: 'not-found';
}