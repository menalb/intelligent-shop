import { settings } from '../configuration';
import { AnalyzeResult, Result, Entity, AnalyzeFailureResult, SearchReponse, AddToCartReponse } from './models';

export const analyzeSentence = async (sentence: string): Promise<AnalyzeResult | AnalyzeFailureResult> => {
    return await fetch(`${settings.api}/sentenceanalyzer?sentence=${sentence}`)
        .then(response => response
            .json()
            .then(body => processAnalyzeResult(body)))
        .catch(error => {
            return ({
                kind: 'error',
                error: Error(error)
            })
        });
}

const processAnalyzeResult = (result: Result): AnalyzeResult => {
    const action = mapIntent[result.topScoringIntent.intent];

    const res = (action) ? action(result.entities) : { kind: 'not-found' }

    return res as AnalyzeResult;
}

const mapIntent = {
    'SearchAProduct':
        (entities: Entity[]) => hasAnyProduct(entities) ? processSearchResult(entities) : { kind: 'not-found' },
    'Buy': (entity: Entity[]) => processBuyResult(entity)
}

const hasAnyProduct = (entities: Entity[]): boolean =>
    entities && entities.length > 0

const processSearchResult = (entities: Entity[]): SearchReponse => ({
    kind: 'search',
    items: entities.map(entity =>
        ({
            name: entity.entity,
            description: '',
            imageUrl: buildProductImageUrl(entity.entity)
        }))
});

const processBuyResult = (entities: Entity[]): AddToCartReponse =>
    ({
        kind: 'add-to-cart',
        item: { name: entities && entities.length > 0 ? entities[0].entity : '' }

    })


const buildProductImageUrl = (productName: string): string => `./assets/images/search_${productName}.jpg`;