const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const definitionDiv = document.getElementById("definition");
const paragraphElement = document.getElementById("paragraph");
const definitionH2 = document.createElement("h2");
const errorText = document.createElement("h2");

let language;
let text;
let paragraph = paragraphElement.textContent;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

switch (paragraph) {
  case "Type below and search for a word.":
    text = document.createTextNode("I need you to type something :(");
    language = "en";
    definitionH2.textContent = "Definition:";
    break;
  case "Digite abaixo e procure por uma palavra.":
    text = document.createTextNode("Preciso que você digite algo :(");
    language = "pt-BR";
    definitionH2.textContent = "Definição:";
    break;
  case "Tapez ci-dessous et recherchez un mot.":
    text = document.createTextNode(
      "J'ai besoin que vouz tapiez quelque chose :("
    );
    language = "fr";
    definitionH2.textContent = "Définition:";
    break;
  case "Escriba abajo y busque una palabra.":
    text = document.createTextNode("Necesito que escribas algo :(");
    language = "es";
    definitionH2.textContent = "Definición:";
    break;
  case "Tippen Sie unten und suchen Sie nach einem Wort.":
    text = document.createTextNode("Sie müssen etwas tippen :(");
    language = "de";
    definitionH2.textContent = "Definition:";
    break;
  default:
    language = "en";
    definitionH2.textContent = "Definition:";
}
buttonElement.addEventListener("click", () => showDefinitions());

inputElement.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
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
  if (results[0] == undefined) {
    errorText.textContent = "Error";
    definitionDiv.appendChild(errorText);
  } else {
    return results[0].meanings[0].definitions[0].definition;
  }
}

async function showDefinitions() {
  definitionDiv.innerHTML = "";
  const definitionText = document.createElement("h3");
  if (inputElement.value) {
    const definitionResults = await getAPI();
    if (definitionResults != undefined) {
      const text = document.createTextNode(definitionResults);
      definitionDiv.appendChild(definitionH2);
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    }
  } else {
    if (language == "en") {
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "pt-BR") {
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "fr") {
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "es") {
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    } else if (language == "de") {
      definitionText.appendChild(text);
      definitionDiv.appendChild(definitionText);
    }
  }
}
