class NoteList extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListener('note-added', this.render.bind(this));
    }

    render() {
        this.innerHTML = '';
        notesData.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('title', note.title);
            noteItem.setAttribute('body', note.body);
            this.appendChild(noteItem);
        });
    }
}

customElements.define('note-list', NoteList);