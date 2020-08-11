import {
    POKEMON_GET,
    POKEMON_GET_ERROR,
    POKEMON_GET_SUCCESS
} from './types';
import API from '../../api';

export const loadPokemon = (name) => async (dispatch) => {
    dispatch({type: POKEMON_GET})
    try {
        const item = await API.pokemon.loadPokemon(name);
        dispatch({
            type: POKEMON_GET_SUCCESS,
            payload: {
                item
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: POKEMON_GET_ERROR,
            payload: {
                error: error.message
            }
        })
    }
}