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
        <style>
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }

            input, textarea {
                width: 100%;
                padding: 10px;
                padding-right: 1px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }

            button {
                display: block;
                width: 100%;
                padding: 10px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #218838;
            }
            
            .form-group {
                margin-bottom: 15px;
                padding-right: 15px
            }

            notes-form form {
                background-color: white;
                padding: 20px;
                margin-bottom: 5px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                display: grid;
                gap: 10px;
            }

            notes-form input, notes-form textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }

            notes-form button {
                padding: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        </style>

            <form id="noteForm">
                <div class="form-group">
                        <label for="noteTitle">Judul Catatan</label>
                        <input type="text" id="noteTitle" name="noteTitle" required maxlength="50" placeholder="Masukkan judul catatan">
                    </div>
                    <div class="form-group">
                        <label for="noteBody">Isi Catatan</label>
                        <textarea id="noteBody" name="noteBody" required maxlength="500" rows="4" placeholder="Tulis catatan Anda di sini"></textarea>
                    </div>
                    <button type="submit">Simpan Catatan</button>
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