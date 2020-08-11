import React, { useState, useEffect, useCallback } from "react";
import {Form, FormControl} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { loadPokemon } from '../../store/pokemon/actions';

let timer;

const SearchForm = (props) => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    const onChange = useCallback((e) => {
        e.preventDefault();
        setQuery(e.target.value)
    }, []);

    useEffect(() => {
        clearTimeout(timer);
        if(!query) return;
        timer = setTimeout(() => {
            dispatch(loadPokemon(query))
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [query, dispatch]);

    return (
        <Form>
            <FormControl
                value={query}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={onChange}
            />
        </Form>
    )
};

export default SearchForm;