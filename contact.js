const CONTACT_ENDPOINT = "https://api.jelma.be/contact";

function initContactForm() {
    const form = document.querySelector("#contact-form");
    if (!form) return;

    const message = document.querySelector("#form-message");
    const submitButton = form.querySelector("button[type='submit']");
    if (!message || !submitButton) return;

    form.noValidate = true;

    function showMessage(type, text) {
        message.className = `form-message ${type} is-visible`;
        message.textContent = text;
    }

    function getPayload() {
        const formData = new FormData(form);
        return {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            message: String(formData.get("message") || "").trim(),
            source: "jelma.be"
        };
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function buildMailtoFallback(payload) {
        const lines = [];
        if (payload.name) lines.push("Naam: " + payload.name);
        if (payload.email) lines.push("E-mail: " + payload.email);
        if (payload.phone) lines.push("Telefoon: " + payload.phone);
        if (payload.message) lines.push("\nBericht:\n" + payload.message);
        const subject = encodeURIComponent("Contactformulier jelma.be");
        const body = encodeURIComponent(lines.join("\n"));
        return "mailto:contactform@jelma.be?subject=" + subject + "&body=" + body;
    }

    function showFallbackMessage(payload) {
        message.className = "form-message error is-visible";
        message.textContent = "Door een technisch probleem kon het bericht niet verstuurd worden. ";
        const link = document.createElement("a");
        link.href = buildMailtoFallback(payload);
        link.textContent = "Stuur ons een e-mail.";
        message.appendChild(link);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = getPayload();
        if (!payload.email && !payload.phone) {
            showMessage("error", "Vul een e-mailadres of telefoonnummer in.");
            return;
        }

        if (payload.email && !isValidEmail(payload.email)) {
            showMessage("error", "Vul een geldig e-mailadres in.");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Bezig met versturen...";
        message.className = "form-message";
        message.textContent = "";

        try {
            const response = await fetch(CONTACT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            let responseBody = null;
            try {
                responseBody = await response.json();
            } catch {
                responseBody = null;
            }

            if ((response.status === 200 || response.status === 201) && (!responseBody || responseBody.ok !== false)) {
                form.reset();
                showMessage("success", "Bedankt voor je bericht. We nemen zo snel mogelijk contact op.");
            } else if (response.status === 400) {
                showMessage("error", "Controleer je gegevens en probeer opnieuw.");
            } else {
                showFallbackMessage(payload);
            }
        } catch {
            showFallbackMessage(payload);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Verstuur bericht";
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
} else {
    initContactForm();
}
