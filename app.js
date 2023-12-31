document.addEventListener('DOMContentLoaded', () => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = storedNotes;
    displayNotes();
});

let notes = [];

function addNote() {
    const noteInput = document.getElementById("note-input");
    const noteContent = noteInput.value.trim();
    
    if (noteContent !== "") {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    
    const newNote = {
    id: Date.now(),
    content: noteContent,
    done: false,
    timestamp: formattedDate,
    };
    
    notes.push(newNote);
    saveNotes();
    displayNotes();
    
    noteInput.value = "";
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

function editNote(id) {
    const newContent = prompt('Edit the note:', notes.find(note => note.id === id).content);
    if (newContent !== null) {
        notes = notes.map(note => (note.id === id ? { ...note, content: newContent } : note));
        saveNotes();
        displayNotes();
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    notes.forEach((note) => {
        const card = document.createElement("div");
        card.className = `card ${note.done ? "done" : ""}`;

        const content = document.createElement("p");
        content.textContent = note.content;

        const timestamp = document.createElement("p");
        timestamp.className = "timestamp";
        timestamp.textContent = `Last Updated: ${note.timestamp}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => deleteNote(note.id); // Fix here

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        editButton.onclick = () => editNote(note.id); // Fix here

        const toggleButton = document.createElement("button");
        toggleButton.textContent = note.done ? "Undo" : "Done";
        toggleButton.onclick = () => toggleDone(note.id);

        card.appendChild(content);
        card.appendChild(timestamp);
        card.appendChild(deleteButton);
        card.appendChild(editButton);
        card.appendChild(toggleButton);
        notesContainer.appendChild(card);
    });
}
