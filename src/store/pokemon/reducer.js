import {
    POKEMON_GET,
    POKEMON_GET_SUCCESS,
    POKEMON_GET_ERROR
} from './types'

const initialState = {
    item: undefined,
    pending: false,
    error: undefined,
    recent: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POKEMON_GET:
            return {
                ...state,
                pending: true,
                error: undefined
            };
        case POKEMON_GET_SUCCESS:
            const recent = [...state.recent].reverse();
            const hasPokemon = recent.some(item => item.id === action.payload?.item?.id);
            if(hasPokemon) {
                const idx = recent.findIndex(item => item.id === action.payload?.item?.id);
                recent.splice(idx, 1)
            }
            if(!hasPokemon) {
                recent.push(action.payload?.item);
            }
            return {
                ...state,
                pending: false,
                item: action.payload?.item,
                error: undefined,
                recent: recent.reverse()
            };
        case POKEMON_GET_ERROR:
            return {
                ...state,
                error: action.payload.error,
                pending: false,
            };
        default:
            return state;
    }
};