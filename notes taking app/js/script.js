

const addNoteBtn = document.getElementById("addNoteBtn");
const emptyAddBtn = document.getElementById("emptyAddBtn");

const noteModal = document.getElementById("noteModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");

const noteForm = document.getElementById("noteForm");

const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");

const searchInput = document.getElementById("searchInput");

const darkModeBtn = document.getElementById("darkModeBtn");


/* =========================================
   OPEN MODAL
   ========================================= */

function openNoteModal() {

    noteModal.classList.add("active");

    noteTitle.focus();
}


/* =========================================
   CLOSE MODAL
   ========================================= */

function closeNoteModal() {

    noteModal.classList.remove("active");

    noteForm.reset();

    resetEditMode();
}


/* =========================================
   ADD NOTE BUTTON
   ========================================= */

if (addNoteBtn) {

    addNoteBtn.addEventListener("click", () => {

        openNoteModal();

    });

}


/* =========================================
   EMPTY STATE ADD BUTTON
   ========================================= */

if (emptyAddBtn) {

    emptyAddBtn.addEventListener("click", () => {

        openNoteModal();

    });

}


/* =========================================
   CLOSE BUTTON
   ========================================= */

if (closeModalBtn) {

    closeModalBtn.addEventListener("click", () => {

        closeNoteModal();

    });

}


/* =========================================
   CANCEL BUTTON
   ========================================= */

if (cancelBtn) {

    cancelBtn.addEventListener("click", () => {

        closeNoteModal();

    });

}


/* =========================================
   FORM SUBMIT
   ========================================= */

if (noteForm) {

    noteForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();


        // Validation
        if (title === "" || content === "") {

            alert("Please enter both title and note.");

            return;
        }


        /* ---------------------------------
           UPDATE EXISTING NOTE
           --------------------------------- */

        if (editingNoteId !== null) {

            updateNote(
                editingNoteId,
                title,
                content
            );

        }


        /* ---------------------------------
           CREATE NEW NOTE
           --------------------------------- */

        else {

            addNote(
                title,
                content
            );

        }


        // Close modal
        closeNoteModal();

    });

}


/* =========================================
   SEARCH NOTES
   ========================================= */

if (searchInput) {

    searchInput.addEventListener("input", () => {

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

    });

}


/* =========================================
   DARK MODE
   ========================================= */

function enableDarkMode() {

    document.body.classList.add("dark-mode");

    if (darkModeBtn) {
        darkModeBtn.textContent = "☀️";
    }

    localStorage.setItem("darkMode", "enabled");
}


function disableDarkMode() {

    document.body.classList.remove("dark-mode");

    if (darkModeBtn) {
        darkModeBtn.textContent = "🌙";
    }

    localStorage.setItem("darkMode", "disabled");
}


/* =========================================
   DARK MODE BUTTON
   ========================================= */

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        const isDarkMode =
            document.body.classList.contains("dark-mode");


        if (isDarkMode) {

            disableDarkMode();

        } else {

            enableDarkMode();

        }

    });

}


/* =========================================
   LOAD DARK MODE PREFERENCE
   ========================================= */

function loadDarkMode() {

    const savedMode =
        localStorage.getItem("darkMode");


    if (savedMode === "enabled") {

        enableDarkMode();

    } else {

        disableDarkMode();

    }

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================= */

if (noteModal) {

    noteModal.addEventListener("click", (event) => {

        if (event.target === noteModal) {

            closeNoteModal();

        }

    });

}


/* =========================================
   ESC KEY
   ========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (noteModal.classList.contains("active")) {

            closeNoteModal();

        }

    }

});


/* =========================================
   INITIALIZE APP
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    displayNotes();

    loadDarkMode();

});