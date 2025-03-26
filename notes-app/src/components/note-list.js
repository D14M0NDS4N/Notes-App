import notesData from '../scripts/data.js';
import "./note-card.js";

class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.notesData = notesData;
    }

    connectedCallback() {
        this.render();
        document.addEventListener('note-added', (event) => {
            this.addNote(event.detail);
        });
    }

    addNote(note) {
        this.notesData.push(note);
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .notes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
            }

            .empty-state {
                text-align: center;
                color: #888;
                padding: 20px;
            }
        </style>

            <h2>Daftar Catatan</h2>
        `;

        if (this.notesData.length === 0) {
            this.shadowRoot.innerHTML += `<p class="empty-state">Belum ada catatan.</p>`;
            return;
        }

        const notesGrid = document.createElement('div');
        notesGrid.classList.add('notes-grid');

        this.notesData.forEach(note => {
            const noteItem = document.createElement('note-card');
            noteItem.setAttribute('title', note.title);
            noteItem.setAttribute('body', note.body);
            notesGrid.appendChild(noteItem);
        });

        this.shadowRoot.appendChild(notesGrid);
    }
}

customElements.define('note-list', NoteList);
