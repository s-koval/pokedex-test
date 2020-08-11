const onResponse = (response) => {
    switch (response.status) {
        case 200: {
            return response.json();
        }
        case 404: {
            throw new Error('Not found');
        }
        default: {
            throw new Error('Oops! Something went wrong. Please, try later');
        }
    }
}

const loadPokemonGender = async id => {
    const BASE_URL = 'https://pokeapi.co/api/v2/gender';
    try {
        const { name } = await fetch(`${BASE_URL}/${id}/`)
            .then(response => response.json());

        return name;
    } catch (e) {
        return 'N\\A'
    }
}

const loadPokemonLocations = async id => {
    try {
        const locations = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
            .then(response => response.json());

        return locations.map(location => ({
            location: {
                name: location.location_area.name,
                url: location.location_area.url
            }
        }));
    } catch (e) {
        return 'unknown'
    }
}

const loadSpec = async id => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
        return await fetch(url)
            .then(response => response.json());
    } catch (e) {
        return {}
    }
}

const loadEvolutions = async id => {
    try {
        const evolutions = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
            .then(response => response.json());
        return evolutions.chain;
    } catch (e) {
        return {}
    }
}

export const loadPokemon = async (name) => {
    const pokemon = await fetch(` https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(onResponse)
    try {
        const species = await loadSpec(pokemon.id);
        const evolutions = await loadEvolutions(pokemon.id);
        return {
            ...pokemon,
            color: species?.color?.name,
            gender: await loadPokemonGender(pokemon.id),
            locations: await loadPokemonLocations(pokemon.id),
            varieties: species.varieties,
            evolutions: evolutions
        }
    } catch (e) {
        return pokemon
    }
};