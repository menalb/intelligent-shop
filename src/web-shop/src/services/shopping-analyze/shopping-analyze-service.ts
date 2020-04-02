import { settings } from '../configuration';
import { AnalyzeResult, Result, Entity, AnalyzeFailureResult } from './models';
import { ProductFound, BuyProduct } from '../../pages/shopping/models';

export const analyzeSentence = async (sentence: string): Promise<AnalyzeResult | AnalyzeFailureResult> => {
    return await fetch(`${settings.api}/sentenceanalyzer?sentence=${sentence}`)
        .then(response => response
            .json()
            .then(body => processAnalyzeResult(body)))
        .catch(error => {
            return ({
                error: Error(error)
            })
        });
}

const processAnalyzeResult = (result: Result): AnalyzeResult =>
    result.topScoringIntent.intent === 'SearchAProduct' ?
        processSearchResult(result.entities) :
        (result.topScoringIntent.intent === 'Buy' ? processBuyResult(result.entities) : { kind: 'no-product' });

const processSearchResult = (entities: Entity[]): ProductFound[] =>
    entities.map(entity => ({ kind: 'found-product', product: entity.entity, imageUrl: buildImageUrl(entity.entity) }));

const processBuyResult = (entities: Entity[]): BuyProduct =>
    (entities && entities.length > 0) ? {
        kind: 'buy',
        product: entities ? entities[0].entity : undefined
    } : { kind: 'buy', product: '' };


const buildImageUrl = (itemName: string): string => `./assets/images/search_${itemName}.jpg`;

