const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const definitionDiv = document.getElementById("definition");
const paragraphElement = document.getElementById("paragraph")
const h2 = document.createElement("h2");

let language
let paragraph = paragraphElement.textContent

switch (paragraph) {
  case "Type below and search for a word.":
    language = "en";
    h2.textContent = "Definition:";
    break;
  case "Digite abaixo e procure por uma palavra.":
    language = "pt-BR";
    h2.textContent = "Definição:";
    break;
  case "Tapez ci-dessous et recherchez un mot.":
    language = "fr";
    h2.textContent = "Définition:";
    break;
  case "Escriba abajo y busque una palabra.":
    language = "es";
    h2.textContent = "Definición:";
    break;
  case "Tippen Sie unten und suchen Sie nach einem Wort.":
    language = "de";
    h2.textContent = "Definition:";
    break;
  default:
    language = "en";
    h2.textContent = "Definition:";
}
buttonElement.addEventListener("click", () => showDefinitions());

inputElement.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    buttonElement.click();
  }
});

async function getAPI() {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/${language}/${inputElement.value}`,
    {
      method: "GET",
    }
  );
  const results = await response.json();
  return results[0].meanings[0].definitions[0].definition;
}
async function showDefinitions() {
  definitionDiv.innerHTML = "";
  const definitionText = document.createElement("h3");
  if (inputElement.value) {
    const definitionResults = await getAPI();
    const text = document.createTextNode(definitionResults);
    definitionDiv.appendChild(h2);
    definitionText.appendChild(text);
    definitionDiv.appendChild(definitionText);
  } else {
    if (language == "en") {
      const text = document.createTextNode("I need you to type something :(");
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "pt-BR") {
      const text = document.createTextNode("Preciso que você digite algo :(");
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "fr") {
      const text = document.createTextNode(
        "J'ai besoin que vouz tapiez quelque chose :("
      );
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "es") {
      const text = document.createTextNode("Necesito que escribas algo :(");
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "de") {
      const text = document.createTextNode("Sie müssen etwas tippen :(");
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    }
  }
}
