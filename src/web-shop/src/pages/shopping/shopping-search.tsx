import React from 'react'
import { ResultReason, TranslationRecognizer, TranslationRecognitionEventArgs, AudioConfig, SpeechTranslationConfig } from 'microsoft-cognitiveservices-speech-sdk';

const ShoppingSearch = (props: { searchSentence: () => void }) => {

    const recognizer: TranslationRecognizer = buildTranslationRecognizer();
    const search = () => props.searchSentence();
    const start = () => StartSpeechRecognizer(recognizer);
    const stop = () => StopSpeechRecognizer(recognizer)

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

export default ShoppingSearch;

const StartSpeechRecognizer = (recognizer: TranslationRecognizer) => {
    recognizer.recognizing = recognizer.recognized = (s, e) => recognize(s, e);
    recognizer.startContinuousRecognitionAsync();
}

const StopSpeechRecognizer = (recognizer: TranslationRecognizer) => {
    recognizer.stopContinuousRecognitionAsync(
        () => {
            recognizer.close();
            console.log('stopped');
        },
        (err) => {
            recognizer.close();
            console.error(err);
        }
    );
}

const recognize = (recognizer: TranslationRecognizer, e: TranslationRecognitionEventArgs) => {
    const result = e.result;
    const toLanguages = ['it'];
    const translations: { [lng: string]: string; } = { it: '' };
    const text: string = '';

    const reason = ResultReason[result.reason];
    if (reason !== 'TranslatingSpeech' && reason !== 'TranslatedSpeech') {
        return;
    }

    var langsMap: { [lng: string]: string; } = {};
    const captions = {
        offset: result.offset,
        languages: langsMap
    };

    for (const lang of toLanguages) {
        const langCode = getLanguageCode(lang)
        const caption = result.translations.get(langCode)
        captions.languages['it-IT'] = caption;

        if (reason !== 'TranslatedSpeech') {
            translations[langCode] = caption;
        } else {
            translations[langCode] = translations[langCode];
            // text = translations[langCode];
            //search();
            console.log(translations[langCode]);
        }
    }

    console.log(result.text);
    console.log(captions);
    console.log(JSON.stringify(translations));
}


const getLanguageCode = (lang: string) => lang.substring(0, 2);


function buildTranslationRecognizer(): TranslationRecognizer {
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = SpeechTranslationConfig.fromSubscription(environment.speech_sdk_api_key, environment.azure_region);

    speechConfig.speechRecognitionLanguage = 'it-IT';
    for (const lang of ['it']) {
        speechConfig.addTargetLanguage(lang);
    }

    return new TranslationRecognizer(speechConfig, audioConfig);
}

export const environment = {
    api: process.env.REACT_APP_SPEECH_SDK_API_KEY,
    speech_sdk_api_key: process.env.REACT_APP_SPEECH_SDK_API_KEY ?? '',
    azure_region: process.env.REACT_APP_AZURE_REGION ?? ''
};