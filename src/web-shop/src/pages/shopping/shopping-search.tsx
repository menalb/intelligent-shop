import React, { useState } from 'react'

import { SpeechRecognizer, startSpeechRecognizer, stopSpeechRecognizer, buildTranslationRecognizer } from '../../services/speech/speech-recognizer-service';

const RecognizerShoppingSearch = (props: { searchSentence: (text: string) => void, speechRecognizer: SpeechRecognizer }) => {

    const [result, setResult] = useState('');
    const search = () => props.searchSentence(result);
    const start = () => startSpeechRecognizer(props.speechRecognizer, result => {
        setResult(result);
        props.searchSentence(result);
    });
    const stop = () => stopSpeechRecognizer(props.speechRecognizer)

    return (<article>
        <input type="text" placeholder="cosa ti serve?" />
        <button onClick={search}>
            Cerca
        </button>
        <button onClick={start} >
            Avvia Riconoscimento
        </button >

        <button onClick={stop} >
            Stop Riconoscimento
        </button >
    </article>);
}

const ShoppingSearch = (props: { searchSentence: (text: string) => void }) =>
    <RecognizerShoppingSearch speechRecognizer={buildTranslationRecognizer()} searchSentence={props.searchSentence} />

export default ShoppingSearch;