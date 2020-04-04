import { settings } from '../configuration';
import { AnalyzeResult, Result, Entity, AnalyzeFailureResult } from './models';
import { ProductFound, BuyProduct as AddToCartProduct } from '../../pages/shopping/models';

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

const processAnalyzeResult = (result: Result): AnalyzeResult => {
    const action = mapIntent[result.topScoringIntent.intent];
    return (action && hasAnyProduct(result)) ?
        result.entities.map(entity => action(entity)) :
        { kind: 'no-product' }
}

const mapIntent = {
    'SearchAProduct': (entity: Entity) => processSearchResult(entity),
    'Buy': (entity: Entity) => processBuyResult(entity)
}

const hasAnyProduct = (result: Result): boolean =>
    result.entities && result.entities.length > 0

const processSearchResult = (entity: Entity): ProductFound =>
    ({
        kind: 'found-product',
        product: entity.entity,
        imageUrl: buildProductImageUrl(entity.entity)
    });

const processBuyResult = (entity: Entity): AddToCartProduct =>
    ({
        kind: 'add-to-cart',
        product: entity.entity
    });


const buildProductImageUrl = (productName: string): string => `./assets/images/search_${productName}.jpg`;