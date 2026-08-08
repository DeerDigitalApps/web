const CONTACT_EMAIL = "[deerdigital@seznam.cz]";

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const productInput = document.getElementById("product");
const messageInput = document.getElementById("message");

const privacyConsent = document.getElementById("privacyConsent");
const consentError = document.getElementById("consentError");

const characterCount = document.getElementById("characterCount");

const formSuccess = document.getElementById("formSuccess");
const closeSuccess = document.getElementById("closeSuccess");

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldValidity(field, isValid) {
    const fieldWrapper = field.closest(".form-field");

    if (!fieldWrapper) {
        return;
    }

    fieldWrapper.classList.toggle("invalid", !isValid);
}

function validateForm() {
    const nameIsValid = nameInput.value.trim().length >= 2;
    const emailIsValid = isValidEmail(emailInput.value.trim());
    const topicIsValid = topicInput.value !== "";
    const messageIsValid = messageInput.value.trim().length >= 10;
    const consentIsValid = privacyConsent.checked;

    setFieldValidity(nameInput, nameIsValid);
    setFieldValidity(emailInput, emailIsValid);
    setFieldValidity(topicInput, topicIsValid);
    setFieldValidity(messageInput, messageIsValid);

    consentError.classList.toggle(
        "visible",
        !consentIsValid
    );

    return (
        nameIsValid &&
        emailIsValid &&
        topicIsValid &&
        messageIsValid &&
        consentIsValid
    );
}

function createEmailSubject() {
    const topic = topicInput.value;
    const product = productInput.value;

    if (product) {
        return `${topic} — ${product}`;
    }

    return topic;
}

function createEmailBody() {
    const product = productInput.value || "Not specified";

    return [
        `Name: ${nameInput.value.trim()}`,
        `Email: ${emailInput.value.trim()}`,
        `Topic: ${topicInput.value}`,
        `Product: ${product}`,
        "",
        "Message:",
        messageInput.value.trim(),
        "",
        "Sent from the DeerDigital website contact page."
    ].join("\n");
}

function openEmailClient() {
    const subject = encodeURIComponent(createEmailSubject());
    const body = encodeURIComponent(createEmailBody());

    const mailtoUrl =
        `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
}

function showSuccessMessage() {
    formSuccess.classList.add("active");
    formSuccess.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
        hideSuccessMessage();
    }, 7000);
}

function hideSuccessMessage() {
    formSuccess.classList.remove("active");
    formSuccess.setAttribute("aria-hidden", "true");
}

function updateCharacterCount() {
    characterCount.textContent =
        `${messageInput.value.length} / 3000`;
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        const firstInvalidField =
            contactForm.querySelector(".form-field.invalid");

        if (firstInvalidField) {
            const field =
                firstInvalidField.querySelector(
                    "input, select, textarea"
                );

            field?.focus();
        }

        return;
    }

    showSuccessMessage();
    openEmailClient();
});

[
    nameInput,
    emailInput,
    topicInput,
    messageInput
].forEach((field) => {
    field.addEventListener("input", () => {
        setFieldValidity(field, true);
    });

    field.addEventListener("change", () => {
        setFieldValidity(field, true);
    });
});

privacyConsent.addEventListener("change", () => {
    consentError.classList.remove("visible");
});

messageInput.addEventListener(
    "input",
    updateCharacterCount
);

closeSuccess.addEventListener(
    "click",
    hideSuccessMessage
);

updateCharacterCount();