import React, { useState } from 'react'

import { SpeechRecognizer, startSpeechRecognizer, stopSpeechRecognizer, buildTranslationRecognizer } from '../../services/speech/speech-recognizer-service';

const RecognizerShoppingSearch = (props: { searchSentence: (text: string) => void, speechRecognizer: SpeechRecognizer }) => {

    const [result, setResult] = useState('');
    const search = () => props.searchSentence(`Cerca ${result}`);
    const start = () => startSpeechRecognizer(props.speechRecognizer, result => {
        setResult(result);
        props.searchSentence(result);
    });
    const stop = () => stopSpeechRecognizer(props.speechRecognizer)

    return (<article className="product-search">
        <input
            type="text"
            placeholder="cosa ti serve?"
            value={result}
            onChange={e => setResult(e.target.value)}
        />
        <span className="product-search-actions">
            <button onClick={search} title="Cerca">
                <i className="fas fa-search"></i>
            </button>

            <button onClick={start} title="Avvia Riconoscimento" >
                <i className="fas fa-microphone"></i>
            </button >

            <button onClick={stop} title="Stop Riconoscimento" >
                <i className="fas fa-microphone-slash"></i>
            </button >
        </span>
    </article>);
}

const ShoppingSearch = (props: { searchSentence: (text: string) => void }) =>
    <RecognizerShoppingSearch speechRecognizer={buildTranslationRecognizer()} searchSentence={props.searchSentence} />

export default ShoppingSearch;