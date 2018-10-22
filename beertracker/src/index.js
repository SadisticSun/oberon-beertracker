import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkedAlt, faLocationArrow, faCarSide, faCar } from '@fortawesome/free-solid-svg-icons'
import 'bulma/css/bulma.css'
import './styles/Main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import appStore from './store/appStore';

library.add(faMapMarkedAlt, faLocationArrow, faCarSide, faCar);

ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
