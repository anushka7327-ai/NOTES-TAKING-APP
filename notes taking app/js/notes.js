
// Notes array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Currently editing note
let editingNoteId = null;


/* =========================================
   SAVE NOTES
   ========================================= */

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}


/* =========================================
   CREATE NOTE
   ========================================= */

function addNote(title, content) {

    const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toLocaleString()
    };

    notes.unshift(newNote);

    saveNotes();
    displayNotes();
}


/* =========================================
   UPDATE NOTE
   ========================================= */

function updateNote(id, title, content) {

    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    note.title = title.trim();
    note.content = content.trim();
    note.date = new Date().toLocaleString();

    saveNotes();
    displayNotes();
}


/* =========================================
   DELETE NOTE
   ========================================= */

function deleteNote(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
        return;
    }

    notes = notes.filter(note => note.id !== id);

    saveNotes();
    displayNotes();
}


/* =========================================
   GET NOTE
   ========================================= */

function getNoteById(id) {
    return notes.find(note => note.id === id);
}


/* =========================================
   DISPLAY NOTES
   ========================================= */

function displayNotes(notesToDisplay = notes) {

    const notesContainer =
        document.getElementById("notesContainer");

    const emptyState =
        document.getElementById("emptyState");

    if (!notesContainer) {
        return;
    }

    notesContainer.innerHTML = "";


    // No notes
    if (notesToDisplay.length === 0) {

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;
    }


    // Hide empty state
    if (emptyState) {
        emptyState.style.display = "none";
    }


    // Create note cards
    notesToDisplay.forEach(note => {

        const noteCard = document.createElement("article");

        noteCard.className = "note-card";

        noteCard.innerHTML = `
            <div>
                <h3>${escapeHTML(note.title)}</h3>

                <p>${escapeHTML(note.content)}</p>

                <div class="note-date">
                    ${escapeHTML(note.date)}
                </div>
            </div>

            <div class="note-actions">

                <button
                    class="edit-btn"
                    onclick="startEditNote(${note.id})"
                >
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteNote(${note.id})"
                >
                    🗑️ Delete
                </button>

            </div>
        `;

        notesContainer.appendChild(noteCard);
    });
}


/* =========================================
   START EDITING NOTE
   ========================================= */

function startEditNote(id) {

    const note = getNoteById(id);

    if (!note) {
        return;
    }

    editingNoteId = id;

    const modal =
        document.getElementById("noteModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const noteTitle =
        document.getElementById("noteTitle");

    const noteContent =
        document.getElementById("noteContent");

    const saveNoteBtn =
        document.getElementById("saveNoteBtn");


    modalTitle.textContent = "Edit Note";

    noteTitle.value = note.title;
    noteContent.value = note.content;

    saveNoteBtn.textContent = "Update Note";

    modal.classList.add("active");

    noteTitle.focus();
}


/* =========================================
   RESET EDIT MODE
   ========================================= */

function resetEditMode() {

    editingNoteId = null;

    const modalTitle =
        document.getElementById("modalTitle");

    const saveNoteBtn =
        document.getElementById("saveNoteBtn");

    if (modalTitle) {
        modalTitle.textContent = "Add New Note";
    }

    if (saveNoteBtn) {
        saveNoteBtn.textContent = "Save Note";
    }
}


/* =========================================
   ESCAPE HTML
   Prevents HTML injection inside notes
   ========================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================
   INITIAL DISPLAY
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    displayNotes();

});