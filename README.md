# Dictionary

A minimalist dictionary built with JavaScript.
[screenshot](./.github/screenshot.png)

## How to use

Go on [dictionaryapi](https://dictionaryapi.com/), register and get an API key for the dictionary. Copy and paste your key in the code below, from the script.js file.

```
 const response = await fetch(
    `https://dictionaryapi.com/api/v3/references/collegiate/json/${inputElement.value},?key=YOUR_API_KEY_HERE`,
    {
```
