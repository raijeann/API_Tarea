// 7.- Hacer una petición a la swapi a una película y obtener sus personajes

const urlBase = 'https://swapi.dev/api/';

async function GetFilm(id) {
    const url = `${urlBase}films/${id}`;

    try{
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const filmData = await res.json();
        const filmDetails = {
            name: filmData.title,
            characters: [],
        }

        for(const characterUrl of filmData.characters) {
            const characterDetails = await GetCharacters(characterUrl);
            
            if(characterDetails) {
                filmDetails.characters.push(characterDetails.name);
            } else {
                console.error(`Error fetching character details for ${characterUrl}`)
            }
    
            return filmDetails;
        }
    } catch(error) {
        console.error(`Error: ${error.message}`);
        return null;
    }
}

async function GetCharacters(url) {
    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const charactersData = await res.json();
        const charactersDetails = {
            name: charactersData.name,
        }

        return charactersDetails;
    } catch(error) {
        console.error(`Error: ${error.message}`);
        return null;
    }
}

GetFilm(1)
    .then(filmDetails => {
        if(filmDetails) {
            console.log(`Film name: ${filmDetails.name}`);
            console.log(`Characters:\n${filmDetails.characters.join('\n')}`);
        }
    })
    .catch(error => {
        console.error(`Error fetching details: ${error.message}`);
    })