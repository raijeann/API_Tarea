async function getArtistDetails() {
    const url = "https://www.theaudiodb.com/api/v1/json/2/artist.php?i=118277";

    try {
        const res = await fetch(url);

        if(res.ok) {
            const artistData = await res.json();
            const artistDetails = {
                name: artistData.artists.strArtist,
                genre: artistData.artists.strStyle,
                genre1: artistData.artists.strGenre,
                genre2: artistData.artists.strMood,
            };

            return artistDetails;
        } else {
            console.error(`Error: ${res.status}`);
            return null;
        }
    } catch(error) {
        console.log(`An error ocurred: ${error}`);
        return null;
    }
}

getArtistDetails().then(artistDetails => {
    if(artistDetails) {
        console.log(`Artist: ${artistDetails.name}`);
        console.log(`Genres: ${artistDetails.genre}, ${artistDetails.genre1}, ${artistDetails.genre2}`)
    }
});