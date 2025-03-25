import { addNote } from '../scripts/data.js';

class NotesForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Judul Catatan" required maxlength="50">
                <textarea id="noteBody" placeholder="Isi Catatan" rows="4" required maxlength="500"></textarea>
                <button type="submit">Tambah Catatan</button>
            </form>
        `;
    }

    attachEventListeners() {
        const form = this.shadowRoot.getElementById('noteForm');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const titleInput = this.shadowRoot.getElementById('noteTitle');
        const bodyInput = this.shadowRoot.getElementById('noteBody');

        const newNote = {
            id: `notes-${Date.now()}`,
            title: titleInput.value,
            body: bodyInput.value,
            createdAt: new Date().toISOString(),
            archived: false
        };

        // Tambah catatan menggunakan fungsi dari data.js
        addNote(newNote);

        // Reset form
        titleInput.value = '';
        bodyInput.value = '';
    }
}

customElements.define('note-form', NotesForm);
export default NotesForm;