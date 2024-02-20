async function getBookDetails(query) {
    const url = `https://openlibrary.org/search.json?q=${query}`;

    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const bookData = await res.json();
        const bookDetails = {
            titles: bookData.docs.map(doc => doc.title),
        }

        return bookDetails;
    } catch(error) {
        console.error(`Error: ${error.message}`);
        return null;
    }
}

getBookDetails("douglas adams")
    .then(bookDetails => {
        if(bookDetails) {
        console.log(`Titles:\n${bookDetails.titles.join('\n')}`);
        }
    })
    .catch(error => {
        console.error(`Error fetch ing book details: ${error.message}`);
    })