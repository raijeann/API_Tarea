async function getBookDetails(query) {
    const url = `https://openlibrary.org/search.json?q=${query}`;

    try {
        const response = await fetch(url);

        if(response.ok) {
            const bookData = await response.json();
            const bookDetails = {
                name: bookData.docs.map(titles => titles.title),
            };

            return bookDetails;
        } else {
            console.error(`Error: ${response.status}`);
            return null;
        }
    } catch(error) {
        console.error(`An error ocurred: ${error}`);
        return null;
    }
}

getBookDetails("douglas adams").then(bookDetails => {
    if(bookDetails) {
        console.log(`Titles: ${bookDetails.name}`);
    }
})