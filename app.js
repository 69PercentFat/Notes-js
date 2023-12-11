document.addEventListener('DOMContentLoaded', () => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = storedNotes;
    displayNotes();
});

let notes = [];
let editingNoteId = null;

function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteContent = noteInput.value.trim();

    if (noteContent !== '') {
        if (editingNoteId !== null) {
            const editedNoteIndex = notes.findIndex(note => note.id === editingNoteId);
            if (editedNoteIndex !== -1) {
                notes[editedNoteIndex].content = noteContent;
                editingNoteId = null;
            }
        } else {
            const newNote = {
                id: Date.now(),
                content: noteContent,
                done: false,
                timestamp: new Date() // Set the timestamp to the current date and time
            };
            notes.push(newNote);
        }

        saveNotes();
        displayNotes();

        // Clear the input field
        noteInput.value = '';
    }
}




function editNote(id) {
    const noteToEdit = notes.find(note => note.id === id);
    if (noteToEdit) {
        document.getElementById('note-input').value = noteToEdit.content;
        editingNoteId = id;
    }
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    editingNoteId = null;
    saveNotes();
    displayNotes();
}

function toggleDone(id) {
    notes = notes.map(note => (note.id === id ? { ...note, done: !note.done } : note));
    editingNoteId = null;
    saveNotes();
    displayNotes();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = `card ${note.done ? 'done' : ''}`;
        card.onclick = () => editNote(note.id);

        const content = document.createElement('p');
        content.textContent = note.content;

        const timestamp = document.createElement('p');
        timestamp.textContent = formatDateTime(note.timestamp);
        timestamp.className = 'timestamp';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = (event) => {
            event.stopPropagation();
            deleteNote(note.id);
        };

        const toggleButton = document.createElement('button');
        toggleButton.textContent = note.done ? 'Undo' : 'Done';
        toggleButton.className = 'toggle-button';
        toggleButton.onclick = (event) => {
            event.stopPropagation();
            toggleDone(note.id);
        };

        card.appendChild(content);
        card.appendChild(timestamp);
        card.appendChild(deleteButton);
        card.appendChild(toggleButton);
        notesContainer.appendChild(card);
    });
}

function formatDateTime(dateTime) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };

    return new Intl.DateTimeFormat('en-US', options).format(dateTime);
}




