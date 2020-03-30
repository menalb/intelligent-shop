import { ProductFound, BuyProduct, NoProduct } from './models';
import { settings } from '../../services/configuration';


export const analyzeSentence = (sentence: string): AnalyzeResult => {


    fetch(`${settings.api}/process?sentence=${sentence}`).then(response => response.json().then(body => console.log(body)));

    return ({ kind: 'no-product' });
    // return this.http.get<Result>(`${this.apiRoot}/process?sentence=${sentence}`)
    //     .pipe(
    //         map(resp => this.processAnalyzeResult(resp)),
    //         catchError(this.handleError<ProductFound[] | BuyProduct>('analyzeSentence', [])));
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


const buildImageUrl = (itemName: string): string => `./assets/search/search_${itemName}.jpg`;

// private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//         console.error(error);
//         return of(result as T);
//     };
// }


export type AnalyzeResult = ProductFound[] | BuyProduct | NoProduct;

interface Result {
    topScoringIntent: TopIntent;
    entities: Entity[];
}

interface TopIntent {
    intent: 'SearchAProduct' | 'Buy';
}

interface Entity {
    entity: string;
    type: string;
}
