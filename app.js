document.addEventListener('DOMContentLoaded', () => {
    // Check if there are any existing notes in local storage
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = storedNotes;
    displayNotes();
});

let notes = [];

function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteContent = noteInput.value.trim();

    if (noteContent !== '') {
        const newNote = {
            id: Date.now(),
            content: noteContent,
            done: false,
            timestamp: new Date()
        };

        notes.push(newNote);
        saveNotes();
        displayNotes();

        // Clear the input field
        noteInput.value = '';
    }
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    displayNotes();
}

function toggleDone(id) {
    notes = notes.map(note => (note.id === id ? { ...note, done: !note.done } : note));
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

        const content = document.createElement('p');
        content.textContent = note.content;

        const timestamp = document.createElement('p');
        timestamp.textContent = formatDateTime(note.timestamp);
        timestamp.className = 'timestamp';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteNote(note.id);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = note.done ? 'Undo' : 'Done';
        toggleButton.className = 'toggle-button';
        toggleButton.onclick = () => toggleDone(note.id);

        card.appendChild(content);
        card.appendChild(timestamp);
        card.appendChild(deleteButton);
        card.appendChild(toggleButton);
        notesContainer.appendChild(card);
    });
}

function formatDateTime(dateTime) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(dateTime);
}
