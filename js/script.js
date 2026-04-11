let mobilApp = document.getElementById("mobile-app");
let Menuicon = document.getElementById("tool-icon-menu");
let Removeicon = document.getElementById("tool-icon-remove");
Menuicon.addEventListener("click", () => {
  mobilApp.classList.add("active");
  Menuicon.style.display = "none";
  Removeicon.style.display = "block";
});
Removeicon.addEventListener("click", () => {
  mobilApp.classList.remove("active");
  Removeicon.style.display = "none";
  Menuicon.style.display = "block";
});
Removeicon.style.display = "none";
Menuicon.style.display = "block";
//Language
let LanguageIcon = document.getElementById("Lang-icon");
const Lang = {
  en: {
    text_one: "Abdo Elkasby",
  },
  ar: {
    text_one: "غبدو القصبي",
  },
};
let currentLang = "en";
function Togglelang() {
  currentLang = currentLang === "en" ? "ar" : "en";
  let Langdata = Lang[currentLang];
  Langdata = Lang[key]
}
