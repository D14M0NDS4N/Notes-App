class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #007bff;
                    color: white;
                    text-align: center;
                    padding: 15px;
                    font-size: 1.5em;
                    font-weight: bold;
                }
            </style>
            <header>Notes App</header>
        `;
    }
}

customElements.define('app-header', AppHeader);
export default AppHeader;
