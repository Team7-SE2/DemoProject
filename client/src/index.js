import React from 'react';
import { IntlProvider } from 'react-intl';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';


//const [locale, setLocale] = useState('en');
ReactDOM.render(
                
                <IntlProvider /*locale={locale} messages={messages[locale]}*/>
                
                <React.StrictMode>
                <Router>
                <App />
                </Router>
                </React.StrictMode>
                </IntlProvider>,
                document.getElementById('root')
                );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
