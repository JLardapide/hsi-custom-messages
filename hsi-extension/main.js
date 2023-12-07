(function (customElements) {

    const createTemplate = () => {

        const template = document.createElement('template');
        template.innerHTML = `
          <div class="web-component">
            <h1>Mensajes a enviar a HSI</h1>
            <button id="goToPatientButton">VER PACIENTE</button>
            <button id="goToClinicHistory">VER HISTORIA CLINICA</button>
            <button id="denyLogout">BLOQUEAR LOGOUT</button>
            <button id="allowLogout">PERMITIR LOGOUT</button>
          </div>
      `;

        return template;
    };

    class MyExtension extends HTMLElement {

        connectedCallback() {
            const template = createTemplate();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            const goToPatientButton = this.shadowRoot.getElementById('goToPatientButton');
            goToPatientButton.addEventListener('click', this.goToPatient.bind(this));

            const goToClinicHistory = this.shadowRoot.getElementById('goToClinicHistory');
            goToClinicHistory.addEventListener('click', this.goToClinicHistory.bind(this));

            const denyLogout = this.shadowRoot.getElementById('denyLogout');
            denyLogout.addEventListener('click', this.denyLogout.bind(this));

            const allowLogout = this.shadowRoot.getElementById('allowLogout');
            allowLogout.addEventListener('click', this.allowLogout.bind(this));
        }

        goToPatient() {
            postMessage({ patientId: 10, action: 'navigate_to_patient_profile' });
        }

        goToClinicHistory() {
            postMessage({ patientId: 10, action: 'navigate_to_clinic_history' });
        }

        denyLogout() {
            postMessage({ patientId: false, action: 'available_to_logout' });
        }

        allowLogout() {
            postMessage({ availableToLogOut: true, action: 'available_to_logout' });
        }


    }

    // define el web-component
    customElements.define('my-extension', MyExtension);

})(window.customElements);