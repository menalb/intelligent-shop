import { ResultReason, TranslationRecognizer, TranslationRecognitionEventArgs, AudioConfig, SpeechTranslationConfig } from 'microsoft-cognitiveservices-speech-sdk';
import { speechSettings } from '../configuration';

export const startSpeechRecognizer = (speechRecognizer: SpeechRecognizer, onRecognized: (text: string) => void) => {
    const recognizer = speechRecognizer.recognizer;
    recognizer.recognizing = recognizer.recognized = (s, e) => {
        const text = recognize(e);
        if (text) {
            console.log(text)
            onRecognized(text);
        }
    };
    recognizer.startContinuousRecognitionAsync();
}

export const stopSpeechRecognizer = (speechRecognizer: SpeechRecognizer) => {
    const recognizer = speechRecognizer.recognizer;
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

export const recognize = (e: TranslationRecognitionEventArgs): string => {
    const result = e.result;
    const toLanguages = ['it'];
    const translations: { [lng: string]: string; } = { it: '' };

    const reason = ResultReason[result.reason];
    if (reason !== 'TranslatingSpeech' && reason !== 'TranslatedSpeech') {
        return '';
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
            return translations[langCode]
        }
    }

    // console.log(result.text);
    // console.log(captions);
    // console.log(JSON.stringify(translations));
    return result.text;
}

const getLanguageCode = (lang: string) => lang.substring(0, 2);


export const buildTranslationRecognizer = (): SpeechRecognizer =>
    ({
        recognizer: new TranslationRecognizer(
            buildTranslationConfig(),
            AudioConfig.fromDefaultMicrophoneInput()
        )
    });

const buildTranslationConfig = () => {
    const speechConfig = SpeechTranslationConfig.fromSubscription(
        speechSettings.speech_sdk_api_key,
        speechSettings.azure_region);

    speechConfig.speechRecognitionLanguage = 'it-IT';
    for (const lang of ['it']) {
        speechConfig.addTargetLanguage(lang);
    }
    return speechConfig;
}

export interface SpeechRecognizer {
    recognizer: TranslationRecognizer;
}