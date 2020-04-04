import { ProductFound, BuyProduct, NoProduct } from '../../pages/shopping/models';

export type AnalyzeResult = (ProductFound | BuyProduct)[] | NoProduct;

export interface AnalyzeFailureResult {
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
