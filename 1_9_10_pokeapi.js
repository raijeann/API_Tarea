async function getPokemonDetails(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    try {
        const res = await fetch(url);

        if (res.ok) {
            const pokemonData = await res.json();
            const locationArea = await getLocationArea(pokemonName);

            const pokemonDetails = {
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types.map(types => types.type.name),
                abilities: pokemonData.abilities.map(abilities => abilities.ability.name),
                location_area: locationArea,
            };

            return pokemonDetails;
        } else {
            console.error(`Error: ${res.status}`);
            return null;
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        return null;
    }
}

async function getLocationArea(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`;

    try {
        const res = await fetch(url);

        if(res.ok) {
            const pokemonData = await res.json();
            const pokemonLocations = {
                locations: pokemonData.map(locations => locations.location_area.name),
            };
            
            return pokemonLocations;
        } else {
            console.error(`Error: ${res.status}`);
            return null;
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        return null;
    }
}

getPokemonDetails("treecko").then(pokemonDetails => {
    if (pokemonDetails) {
        console.log(`Name: ${pokemonDetails.name}`);
        // console.log(`Height: ${pokemonDetails.height}`);
        // console.log(`Weight: ${pokemonDetails.weight}`);
        console.log(`Types: ${pokemonDetails.types.join(", ")}`);
        console.log(`Abilities: ${pokemonDetails.abilities.join(", ")}`);
        console.log(`Locations: ${pokemonDetails.location_area.locations.join(", ")}`);
    }
});