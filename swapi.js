const URL = 'https://swapi.dev/api/';

async function GetPeople(id) {
    fetch(`${URL}people/${id}`)
    .then(peopleData => peopleData.json())
    .then(peopleDetails => {
        
    })
}

GetPeople(1)