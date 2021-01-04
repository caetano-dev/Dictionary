const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const definitionDiv = document.getElementById("definition");

let language;
const pathname = document.location.pathname;
switch (pathname) {
  case "/index.html":
    language = "en";
    console.log("set to english");
    break;
  case "/portuguese.html":
    language = "pt-BR";
    console.log("set to pt");
    break;
  case "/french.html":
    language = "fr";
    console.log("set to fr");
    break;
  default:
    language = "en";
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
    const h2 = document.createElement("h2");
    h2.textContent = "Definition:";
    definitionDiv.appendChild(h2);
    definitionText.appendChild(text);
    definitionDiv.appendChild(definitionText);
  } else {
    const text = document.createTextNode("I need you to type something :(");
    definitionText.appendChild(text);
    definitionDiv.appendChild(definitionText);
  }
}
