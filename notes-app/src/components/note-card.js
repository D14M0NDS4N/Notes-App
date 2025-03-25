import { formatDate } from '../scripts/utils.js';

class NoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const body = this.getAttribute('body');
        const createdAt = this.getAttribute('created-at');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    padding: 15px;
                    transition: transform 0.3s ease;
                }
                :host(:hover) {
                    transform: scale(1.03);
                }
                .note-title {
                    font-weight: bold;
                    font-size: 1.2em;
                    margin-bottom: 10px;
                    color: #333;
                }
                .note-body {
                    color: #666;
                    margin-bottom: 10px;
                }
                .note-date {
                    font-size: 0.8em;
                    color: #888;
                    text-align: right;
                }
                .note-actions {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                }
                .btn {
                    background: none;
                    border: none;
                    color: #007bff;
                    cursor: pointer;
                    padding: 5px;
                }
            </style>
            <div class="note-title">${title}</div>
            <div class="note-body">${body}</div>
            <div class="note-date">${formatDate(createdAt)}</div>
            <div class="note-actions">
                <button class="btn edit-btn">Edit</button>
                <button class="btn delete-btn">Hapus</button>
            </div>
        `;

        // Tambahkan event listener untuk tombol
        this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => this.editNote());
        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => this.deleteNote());
    }

    editNote() {
        const editEvent = new CustomEvent('edit-note', {
            detail: {
                id: this.getAttribute('id'),
                title: this.getAttribute('title'),
                body: this.getAttribute('body')
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(editEvent);
    }

    deleteNote() {
        const deleteEvent = new CustomEvent('delete-note', {
            detail: { id: this.getAttribute('id') },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(deleteEvent);
    }
}

customElements.define('note-card', NoteCard);
export default NoteCard;