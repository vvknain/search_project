import {createStore, applyMiddleware} from 'redux';
import main_reducer from '../reducer/main_reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const store = createStore(
    main_reducer,
    applyMiddleware(
        thunk,
        logger
    )
);

export default store;