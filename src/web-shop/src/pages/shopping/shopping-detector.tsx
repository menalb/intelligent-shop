import React, { useState } from 'react'

import { SpeechRecognizer, startSpeechRecognizer, stopSpeechRecognizer, buildTranslationRecognizer } from '../../services/speech/speech-recognizer-service';
import { AnalyzeResult, AnalyzeFailureResult } from '../../services/shopping-analyze/models';
import { NoProduct, ProductFound, BuyProduct, Product } from './models';
import { analyzeSentence } from '../../services/shopping-analyze/shopping-analyze-service';

const RecognizerShoppingSearch = (props: { searchSentence: (text: string) => void, speechRecognizer: SpeechRecognizer }) => {

    const [result, setResult] = useState('');
    const [isRecognitionActive, RecognitionActive] = useState(false);
    const search = () => props.searchSentence(`Cerca ${result}`);
    const start = () => {
        startSpeechRecognizer(props.speechRecognizer, result => {
            setResult(result);
            props.searchSentence(result);
        });
        RecognitionActive(true);
    }

    const stop = () => {
        stopSpeechRecognizer(props.speechRecognizer);
        RecognitionActive(false);
    }

    return (<article className="product-search">
        <input
            type="text"
            placeholder="cosa ti serve?"
            value={result}
            onChange={e => setResult(e.target.value)}
        />
        <span className="product-search-actions">
            <button
                onClick={search}
                title="Cerca"

            >
                <i className="fas fa-search"></i>
            </button>

            <button
                onClick={start}
                title="Avvia Riconoscimento"
                disabled={isRecognitionActive}
            >
                <i className="fas fa-microphone"></i>
            </button>

            <button
                onClick={stop}
                title="Stop Riconoscimento"
                disabled={!isRecognitionActive}
            >
                <i className="fas fa-microphone-slash"></i>
            </button>
        </span>
    </article>);
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

export interface ProductNotFoundReponse {
    kind: 'not-found';
}

export type ShoppingDetectorResponse = SearchReponse | AddToCartReponse | ProductNotFoundReponse | { kind: 'error' } | { kind: 'loading' };

const ShoppingDetector = (props: { detectedAction: (response: ShoppingDetectorResponse) => void }) => {

    const onSearch = async (sentence: string) => {
        props.detectedAction({ kind: "loading" });
        const resp = await analyzeSentence(sentence);

        if (noProductFound(resp))
            props.detectedAction({ kind: "not-found" });

        else if (anyProducts(resp))
            props.detectedAction({ kind: 'search', items: resp.map(mapToProduct) })

        else if (isBuyProducts(resp))
            props.detectedAction({ kind: 'add-to-cart', item: resp.map(mapToBuyProduct)[0] })

        else props.detectedAction({ kind: "error" });
    }
    const noProductFound = (productsResponse: AnalyzeResult | AnalyzeFailureResult): productsResponse is NoProduct => {
        const foundProducts = productsResponse as NoProduct
        return foundProducts && foundProducts.kind === "no-product"
    }

    const anyProducts = (productsResponse: AnalyzeResult | AnalyzeFailureResult): productsResponse is ProductFound[] => {
        const foundProducts = productsResponse as ProductFound[]
        return foundProducts && foundProducts.length >= 0;
    }

    const isBuyProducts = (productsResponse: AnalyzeResult | AnalyzeFailureResult): productsResponse is BuyProduct[] => {
        const foundProducts = productsResponse as BuyProduct[]
        return foundProducts && foundProducts.length >= 0;
    }

    const mapToProduct = (found: ProductFound): Product => ({
        name: found.product,
        imageUrl: found.imageUrl,
        description: ''
    })

    const mapToBuyProduct = (found: BuyProduct): { name: string } => ({
        name: found.product ?? '',
    })
    return (
        <RecognizerShoppingSearch speechRecognizer={buildTranslationRecognizer()} searchSentence={onSearch} />
    );
}

export default ShoppingDetector;