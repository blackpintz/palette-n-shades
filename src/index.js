import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-less/semantic.less'
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import ConfigureStore from './store/ConfigureStore'
import {getFromDB} from './actions/PaletteCard'
import './Firebase/Firebase'

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


