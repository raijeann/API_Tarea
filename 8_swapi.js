// 8.- Hacer una petición a la swapi a un planeta y obtener los nombres de los habitantes

const urlBase = 'https://swapi.dev/api/';

async function GetPlanet(id) {
    const url = `${urlBase}planets/${id}`;

    try {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const planetData = await res.json();
        const planetDetails = {
            name: planetData.name,
            residents: [],
        }

        for(const residentUrl of planetData.residents) {
            const residentDetails = await GetResidents(residentUrl);

            if(residentDetails) {
                planetDetails.residents.push(residentDetails.name);
            } else {
                console.error(`Error fetching film details for ${residentUrl}`)
            }
        }

        return planetDetails;
    } catch(error) {
        console.error(`Error: ${error.message}`)
        return null;
    }
}

async function GetResidents(url) {
    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const residentsData = await res.json();
        const residentDetails = {
            name: residentsData.name,
        }

        return residentDetails;
    } catch (error) {
        console.error(`Error: ${error.message}`)
        return null;
    }
}

GetPlanet(1)
    .then(planetDetails => {
        if(planetDetails) {
            console.log(`Planet name: ${planetDetails.name}`);
            console.log(`Residents:\n${planetDetails.residents.join('\n')}`)
        }
    })
    .catch(error => {
        console.error(`Error fetching details: ${error.message}`);
    })