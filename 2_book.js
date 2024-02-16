async function getBookDetails(query) {
    const url = `https://openlibrary.org/search.json?q=${query}`;

    try {
        const response = await fetch(url);

        if(response.ok) {
            const bookData = await response.json();
            const bookDetails = {
                name: bookData.docs[0].title,
                publish_year: bookData.docs[0].first_publish_year,
                author: bookData.docs[0].author_name,
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

getBookDetails("do android dream").then(bookDetails => {
    if(bookDetails) {
        console.log(`Name: ${bookDetails.name}`);
        // console.log(`Published: ${bookDetails.publish_year}`);
        console.log(`Author: ${bookDetails.author}`);
    }
})