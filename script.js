const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const definitionDiv = document.getElementById("definition");

buttonElement.addEventListener("click", () => showDefinitions());

async function getAPI() {
  const response = await fetch(
    `https://dictionaryapi.com/api/v3/references/collegiate/json/${inputElement.value},?key=a094f4ed-dc7b-46de-bcbd-fdb810da33bf`,
    {
      method: "GET",
    }
  );
  const results = await response.json();
  return results[0].shortdef[0];
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
