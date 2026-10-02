
/* =========================================
   SEARCH.JS
   Notes Search Functionality
   ========================================= */

const searchInput = document.getElementById("searchInput");


/* =========================================
   SEARCH NOTES
   ========================================= */

function searchNotes() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredNotes = notes.filter(note => {

        const title =
            note.title.toLowerCase();

        const content =
            note.content.toLowerCase();


        return (
            title.includes(searchText) ||
            content.includes(searchText)
        );

    });


    displayNotes(filteredNotes);
}


/* =========================================
   SEARCH INPUT EVENT
   ========================================= */

if (searchInput) {

    searchInput.addEventListener("input", searchNotes);

}


/* =========================================
   CLEAR SEARCH
   ========================================= */

function clearSearch() {

    if (!searchInput) {
        return;
    }

    searchInput.value = "";

    displayNotes(notes);
}