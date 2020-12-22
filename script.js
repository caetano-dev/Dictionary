const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const definitionDiv = document.getElementById("definition");

buttonElement.addEventListener("click", () => showDefinitions());

async function getAPI() {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputElement.value}`,
    {
      method: "GET", 
    }
  );
  const results = await response.json();
  return results[0].meanings[0].definitions[0].definition
}
async function showDefinitions() {
  definitionDiv.innerHTML = "";
  var definitionText = document.createElement("h3");

  if (inputElement.value != "") {
    const definitionResults = await getAPI();
    var text = document.createTextNode(definitionResults);
    definitionText.appendChild(text);
    definitionDiv.appendChild(definitionText);
  } else {
    var text = document.createTextNode("I need you to type something :(");
    definitionText.appendChild(text);
    definitionDiv.appendChild(definitionText);
  }
}
