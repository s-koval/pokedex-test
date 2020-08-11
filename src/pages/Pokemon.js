import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {loadPokemon} from "../store/pokemon/actions";
import Pokemon from "../components/Pokemon";

const PokemonPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const item = useSelector(state => state.pokemon?.item)
    useEffect(() => {
        dispatch(loadPokemon(id))
    }, [id, dispatch])
    return !!item && <Pokemon item={item} style={{width: '30rem', margin: 'auto'}} />;
};

export default PokemonPage;