const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const definitionDiv = document.getElementById("definition");

buttonElement.addEventListener("click", () => showDefinitions())

async function getAPI() {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputElement.value}`,
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

  if (inputElement.value != "") {
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
