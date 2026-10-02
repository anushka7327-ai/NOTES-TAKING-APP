
/* =========================================
   STORAGE.JS
   LocalStorage Management
   ========================================= */

const NOTES_STORAGE_KEY = "notes";
const DARK_MODE_STORAGE_KEY = "darkMode";


/* =========================================
   NOTES - LOAD
   ========================================= */

function loadNotes() {

    try {

        const savedNotes =
            localStorage.getItem(NOTES_STORAGE_KEY);

        if (!savedNotes) {
            return [];
        }

        const parsedNotes = JSON.parse(savedNotes);

        return Array.isArray(parsedNotes)
            ? parsedNotes
            : [];

    } catch (error) {

        console.error("Error loading notes:", error);

        return [];
    }
}


/* =========================================
   NOTES - SAVE
   ========================================= */

function saveNotesToStorage(notes) {

    try {

        localStorage.setItem(
            NOTES_STORAGE_KEY,
            JSON.stringify(notes)
        );

        return true;

    } catch (error) {

        console.error("Error saving notes:", error);

        return false;
    }
}


/* =========================================
   NOTES - CLEAR
   ========================================= */

function clearNotesStorage() {

    localStorage.removeItem(NOTES_STORAGE_KEY);
}


/* =========================================
   DARK MODE - LOAD
   ========================================= */

function loadDarkModePreference() {

    return localStorage.getItem(
        DARK_MODE_STORAGE_KEY
    ) === "enabled";
}


/* =========================================
   DARK MODE - SAVE
   ========================================= */

function saveDarkModePreference(enabled) {

    localStorage.setItem(
        DARK_MODE_STORAGE_KEY,
        enabled ? "enabled" : "disabled"
    );
}


/* =========================================
   DARK MODE - CLEAR
   ========================================= */

function clearDarkModePreference() {

    localStorage.removeItem(
        DARK_MODE_STORAGE_KEY
    );
}