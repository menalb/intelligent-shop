import React, { useState } from 'react'

import { SpeechRecognizer, startSpeechRecognizer, stopSpeechRecognizer, buildTranslationRecognizer } from '../../services/speech/speech-recognizer-service';

const RecognizerShoppingSearch = (props: { searchSentence: () => void, speechRecognizer: SpeechRecognizer }) => {

    const [result, setResult] = useState('');
    const search = () => props.searchSentence();
    const start = () => startSpeechRecognizer(props.speechRecognizer, setResult);
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
        {result}
    </article>);
}

const ShoppingSearch = (props: { searchSentence: () => void }) =>
    <RecognizerShoppingSearch speechRecognizer={buildTranslationRecognizer()} searchSentence={props.searchSentence} />

export default ShoppingSearch;