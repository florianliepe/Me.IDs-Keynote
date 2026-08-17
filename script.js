const languageButtons = document.querySelectorAll("[data-language]");
const translatableElements = document.querySelectorAll("[data-en][data-de]");
const translatableOptions = document.querySelectorAll("option[data-en][data-de]");

function setLanguage(language) {
  const safeLanguage = language === "de" ? "de" : "en";
  document.documentElement.lang = safeLanguage;
  document.title = safeLanguage === "de"
    ? "Intellectual Twin in Cargo & Rail | Eraneos"
    : "Intellectual Twin in Cargo & Rail | Eraneos";

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[safeLanguage];
  });

  translatableOptions.forEach((option) => {
    option.textContent = option.dataset[safeLanguage];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === safeLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("intellectual-twin-language", safeLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem("intellectual-twin-language");
const browserLanguage = navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
setLanguage(savedLanguage || browserLanguage);

const params = new URLSearchParams(window.location.search);
if (params.get("submitted") === "true") {
  const successMessage = document.querySelector(".form-success");
  if (successMessage) successMessage.hidden = false;
}
