class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    color: #333;
                    text-align: center;
                    padding: 10px;
                    font-size: 0.9em;
                    margin-top: 20px;
                }
            </style>
            <footer>&copy; 2025 Notes App - Arsyandi. Hak Cipta Dilindungi.</footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
export default AppFooter;