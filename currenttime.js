(function () {
    const TEMPLATE = document.createElement("template");
    const TEMPLATECONTENT = `
    
	<p id="output"></p>`;

    TEMPLATE.innerHTML = TEMPLATECONTENT;

    class CT extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            });

            this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        }

        connectedCallback() {

            const output = this.shadowRoot.getElementById("output");

            // Type in your current time Javascript codes here and 
            // send the result to the output element

            const d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            let hour = d.getHours();
            let minutes = d.getMinutes();
            output.innerHTML = "Date: " + day + "-" + month + "-" + year + " " + hour + ":" + minutes;

        }
    }

    // Change the XXXXX with your new tag name, like m-currenttime	
    window.customElements.define('current-time', CT);
})();