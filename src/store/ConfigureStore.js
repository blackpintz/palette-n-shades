import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import PaletteReducers from '../reducers/PaletteCard'
import ColorReducers from '../reducers/Colors'
import DisplayReducers from '../reducers/DisplayColors'
import RandomReducers from '../reducers/RandomColor'
import Thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const ConfigureStore = () => {
    const store = createStore (
        combineReducers ({
            Colors: ColorReducers,
            Palette: PaletteReducers,
            Display: DisplayReducers,
            RandomColor : RandomReducers
        }),
        composeEnhancers(applyMiddleware(Thunk)) // this set up helps us setup both redux-thunk and the redux dev-tools.
        // If we had left the redux devtools as set up below 👇, it wouldn't have worked.
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}

export default ConfigureStore