// 5.- Hacer una petición a la swapi a un personaje y obtener su primera película
// 6.- Hacer una petición a la swapi a un personaje y obtener sus primeras películas
// endpoints available: people, planets, films, species, vehivles, starships

const urlBase = 'https://swapi.dev/api/';

async function GetPeople(id) {
    const url = `${urlBase}people/${id}`;

    try { 
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const characterData = await res.json();
        const peopleDetails = {
            name: characterData.name,
            films: [],
        }

        for(const filmUrl of characterData.films) {
            const filmsDetails = await GetFilms(filmUrl);

            if(filmsDetails) {
                peopleDetails.films.push(filmsDetails.title);
            } else {
                console.error(`Error fetching film details for ${filmUrl}`)
            }
        }
        
        return peopleDetails;
    } catch(error) {
        console.error(`Error: ${error.message}`)
        return null;
    }
}

async function GetFilms(url) {
    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const filmsData = await res.json();
        const filmsDetails = {
            title: filmsData.title,
        }

        return filmsDetails;
    } catch(error) {
        console.error(`Error: ${error.message}`)
        return null;
    }
}

GetPeople(3)
    .then(peopleDetails => {
        if(peopleDetails) {
            console.log(`Name: ${peopleDetails.name}`);
            console.log(`First Film: ${peopleDetails.films[0]}`);
            console.log(`Films:\n${peopleDetails.films.join('\n')}`);
        }
    })
    .catch(error => {
        console.error(`Error fetching details: ${error.message}`);
    })