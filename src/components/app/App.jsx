import { useState } from 'react';

import Service from '../service/Service';
import FileUploader from '../file-load/FileUploader';
import FileDownloader from '../file-load/FileDownloader';
import './app.scss';

const _models = ['Метод контрольних сум', 'Метод середніх квадратів', 'Модульне хешування', 
    'Метод перетворення системи числення', 'Метод згортання']

const App = () => {
    const [message, setMessage] = useState('');
    const [decoded, setDecoded] = useState('');
    const [hash, setHash] = useState('');
    const [hashCheck, setHashCheck] = useState('');
    const [model, setModel] = useState(_models[0]);
    const { getHashCs, hashCsCheck, getHashMs, hashMsCheck, getHashMod, hashModCheck } = Service();

    // Renders

    const renderModels = () => {
        return _models.map((md, index) => (
            <li className={`main__item model ${md === model ? 'active' : ''}`}
                key={index}
                onClick={() => {
                    setModel(md);
                    setHash('');
                    setHashCheck('');
                    setDecoded('');
                }}
            >
                {md}
            </li>
        ));
    }

    // Calls

    const hashCs = async () => {
        if (!message) {
            alert('Повідомлення не задано');
            return;
        }
        const newhash = await getHashCs(message);
        setHash(newhash);
    }

    const hashCheckCs = async () => {
        if (!message || !hash) {
            alert('Повідомлення або хеш не задано');
            return;
        }
        const isValid = await hashCsCheck(message, hash);
        setHashCheck(isValid);
    }

    const hashMs = async () => {
        if (!message) {
            alert('Повідомлення не задано');
            return;
        }
        const newHash = await getHashMs(message);
        setHash(newHash);
    }

    const hashCheckMs = async () => {
        if (!message || !hash) {
            alert('Повідомлення або хеш не задано');
            return;
        }
        const isValid = await hashMsCheck(message, hash);
        setHashCheck(isValid);
    }

    const hashMod = async () => {
        if (!message) {
            alert('Повідомлення не задано');
            return;
        }
        const newHash = await getHashMod(message);
        setHash(newHash);
    }

    const hashCheckMod = async () => {
        if (!message || !hash) {
            alert('Повідомлення або хеш не задано');
            return;
        }
        const isValid = await hashModCheck(message, hash);
        setHashCheck(isValid);
    }

    const encodeCall = () => {
        switch (model) {
            case 'Метод контрольних сум':
                hashCs();
                break;
            case 'Метод середніх квадратів':
                hashMs();
                break;
            case 'Модульне хешування':
                hashMod();
                break;
            case 'Метод перетворення системи числення':
                // Call numeral system conversion function
                break;
            case 'Метод згортання':
                // Call folding method function
                break;
            default:
                alert('Невідома модель');
        }
    }

    const checkCall = () => {
        switch (model) {
            case 'Метод контрольних сум':
                hashCheckCs();
                break;
            case 'Метод середніх квадратів':
                hashCheckMs();
                break;
            case 'Модульне хешування':
                hashCheckMod();
                break;
            case 'Метод перетворення системи числення':
                // Call numeral system conversion check function
                break;
            case 'Метод згортання':
                // Call folding method check function
                break;
            default:
                alert('Невідома модель');
        }
    }

    return (
        <>
            <main className="main">
                <div className="main__container">
                    <div className="main__start">
                        <FileUploader title={"Текст повідомлення"} setFileText={setMessage} content={message}/>
                        <FileUploader title={"Хеш"} setFileText={setHash} content={hash}/>
                    </div>
                    <div className="main__mid">
                        <div className="main__block">
                            <h5 className="main__title">
                                Вибір методу хешування
                            </h5>
                            <ul className="main__list">
                                {renderModels()}
                            </ul>
                        </div>
                        <div className="main__block">
                            <h5 className="main__title">
                                Дії
                            </h5>
                            <div className="main__actions">
                                <button 
                                    className="main__button"
                                    onClick={() => encodeCall()}    
                                >
                                    Отримати хеш повідомлення
                                </button>
                                <button 
                                    className="main__button"
                                    onClick={() => checkCall()}    
                                >
                                    Перевірити повідомлення
                                </button>
                            </div>
                        </div>
                        <div className="main__block">
                            <h5 className="main__title">
                                Перевірка
                            </h5>
                            <div className="main__conclusion">
                                <span
                                    className={`main__hash ${hashCheck === '' ? 'neutral' : hashCheck ? 'valid' : 'invalid'}`}
                                >
                                    {hashCheck === '' ? 'Очікування перевірки' : hashCheck ? 'Хеш вірний' : 'Хеш не вірний'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="main__end">
                        <div className="main__downloads">
                            <FileDownloader title={'Хеш повідомлення'} fileContent={hash}/>
                        </div>
                        <div className="main__stats">
                            <span>Розшифроване повідомлення: {decoded}</span>
                            <span>Хеш: {Array.isArray(hash) && hash.join(',')}</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App;
