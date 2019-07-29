import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import 'semantic-ui-less/semantic.less'
import App from './App';
import {Provider} from 'react-redux'
import ConfigureStore from './store/ConfigureStore'
import {getFromDB} from './actions/PaletteCard'
import './Firebase/Firebase'
import * as serviceWorker from './serviceWorker';

const store = ConfigureStore()
const rendered = (
    <Provider store = {store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)

store.dispatch(getFromDB()).then(() => {
    ReactDOM.render( rendered, document.getElementById('root'));
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
