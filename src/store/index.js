import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import loggerMiddleware from './middleware/logger'
import pokemonReducer from './pokemon/reducer'

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)
    const rootReducer = combineReducers({
        pokemon: pokemonReducer
    });
    return createStore(rootReducer, preloadedState, composedEnhancers)
}