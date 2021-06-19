// make table headers appropriate at page load
if (document.documentElement.clientWidth < 800){
    document.getElementById("headChar").textContent = "Char";
    document.getElementById("headUnicode").textContent = "Unicode";
    document.getElementById("headHTML").textContent = "HTML Char Ref.";
    document.getElementById("headMorse").textContent = "Morse Code";
    document.getElementById("headNotes").textContent = "Notes";
    document.getElementById("headHEX").textContent = "HEX";
    document.getElementById("headDEC").textContent = "DEC";
}

//
// assign value of iframe src attribute, and get the resource AFTER page content has loaded
//const yorubaVideoEmbed01 = document.getElementById("yorubaVideoEmbed01");
//yorubaVideoEmbed01.src = "https://www.youtube.com/embed/KnGPtahOlx0";

//const yorubaAudioEmbed01 = document.getElementById("yorubaAudioEmbed01");
//yorubaAudioEmbed01.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/369438599&color=%236495ed&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";


const encodingsBody = document.getElementById("encodingsBody");

const yorùbáJsonPath = "./data/yoruba-char-encodings.json";// from the root apparently

// called functions ---------------------------------------------------------------

const createHexStringMorse = (punctString) => {
// TODO: use try..catch to validate actual argument and handle errors
// specifically:
// must be a string that contains only "." and/or "-" characters
  const morse = {
    "dot" : "&#x2022;",
    "dash" : "&#x2501;"
  };
  
  let hexStringMorse = "";
  for (charPos in punctString){
    char = punctString.charAt(charPos);    
    if ( char == "." ){
      hexStringMorse += `${morse.dot} `;
    }
    else{
      hexStringMorse += `${morse.dash} `; 
    }     
  }
  hexStringMorse = hexStringMorse.trimEnd();
  return hexStringMorse;
};

const getYorubaCharTableData = (url, responseType) => {
  return fetch(url).then(response => {
    if(!response.ok){
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    else {
      if (responseType === "json"){
        return response.json();
      }
    }
  })
  .catch(err => {
    console.log(`There has been a problem with your fetch operation for resource "${url}": ${err.message}`);
  });
};

// for every object in charInfo, make a row and add it to the table body
const populateTableBody = (jsonObj) => {
  const charInfo = jsonObj['alphabetCharacters'];
  
  for (let index = 0; index < charInfo.length; index++){
    //console.log(charInfo[index].characterSymbol);
    const row = document.createElement("tr");
    
    // compose each td item required
    const charSymbolData = document.createElement("td");
    charSymbolData.innerHTML = `<p>${charInfo[index].characterSymbol}</p>`;
    //charSymbolData.innerHTML = `<p>${charInfo[index].characterSymbol}</p>`;

    const charHexData = document.createElement("td");
    charHexData.textContent = charInfo[index].unicodeHex === "undefined" ? "undefined" : `&#${charInfo[index].unicodeHex};`;

    const charDecData = document.createElement("td");
    charDecData.textContent = charInfo[index].unicodeDec === "undefined" ? "" : `&#${charInfo[index].unicodeDec};`;

    const charCERData = document.createElement("td");
    charCERData.textContent = `${charInfo[index].htmlCER}`;

    const charMorseData = document.createElement("td");
    charMorseData.setAttribute("class", "morse-field monospaced");
    let morseValue = charInfo[index].morse;
    let hexStringMorse = createHexStringMorse(morseValue);
    charMorseData.innerHTML = `<p>${hexStringMorse}</p>`;
    
    const charNoteData = document.createElement("td");
    
    // put the td elements into an array
    let rowData = new Array(charSymbolData, charHexData, charDecData, charCERData, charMorseData, charNoteData);

    // iterate over that now fully formed td array elems to append each to row element
    for (let j = 0; j < rowData.length; j++){
      row.appendChild(rowData[j]);
    }

    encodingsBody.appendChild(row);

  }// end outer for loop
};

//------------- main ------------

getYorubaCharTableData(yorùbáJsonPath, "json")
.then(jsonData => {
  //console.log(jsonData);
  // populate table header

  // populate table body
  populateTableBody(jsonData);
  // populate table footer
})
.catch(err => {
  console.log(`Emptiness of return was experienced. Investigate. Error message: ${err.message}`);
});





