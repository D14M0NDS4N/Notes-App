import { generateUniqueId, validateNoteInput } from './utils.js';
import { notesData } from './data.js';

// Data notes (bisa diganti dengan penyimpanan yang lebih permanen)
let notes = notesData;

// Fungsi render notes
function renderNotes() {
    const container = document.getElementById('notesContainer');
    
    // Hapus catatan yang ada
    container.innerHTML = '';

    // Filter catatan yang tidak diarsipkan
    const activeNotes = notes.filter(note => !note.archived);

    if (activeNotes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Tidak ada catatan. Mulai membuat catatan baru!</p>
            </div>
        `;
        return;
    }

    // Render setiap catatan
    activeNotes.forEach(note => {
        const noteCard = document.createElement('note-card');
        noteCard.setAttribute('id', note.id);
        noteCard.setAttribute('title', note.title);
        noteCard.setAttribute('body', note.body);
        noteCard.setAttribute('created-at', note.createdAt);
        
        container.appendChild(noteCard);
    });
}

// Fungsi tambah catatan
function addNote(title, body) {
    try {
        // Validasi input
        validateNoteInput(title, body);

        // Buat objek catatan baru
        const newNote = {
            id: generateUniqueId(),
            title: title.trim(),
            body: body.trim(),
            createdAt: new Date().toISOString(),
            archived: false
        };

        // Tambahkan ke array notes
        notes.push(newNote);

        // Simpan ke localStorage
        localStorage.setItem('notes', JSON.stringify(notes));

        // Render ulang catatan
        renderNotes();

        // Reset form
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteBody').value = '';
    } catch (error) {
        alert(error.message);
    }
}

// Fungsi hapus catatan
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // Render catatan saat halaman dimuat
    renderNotes();

    // Listener untuk form submit
    const noteForm = document.getElementById('noteForm');
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('noteTitle').value;
        const body = document.getElementById('noteBody').value;
        addNote(title, body);
    });

    // Listener untuk hapus catatan
    document.addEventListener('delete-note', (e) => {
        deleteNote(e.detail.id);
    });
});