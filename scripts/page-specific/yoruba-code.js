// consult storage for latest background settings
let htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

let headChar = document.getElementById("headChar");
let headUnicode = document.getElementById("headUnicode");
let headHTML = document.getElementById("headHTML");
let headMorse = document.getElementById("headMorse");
let headNotes = document.getElementById("headNotes");
let headHEX = document.getElementById("headHEX");
let headDEC = document.getElementById("headDEC");

// make table headers appropriate at page load
if (document.documentElement.clientWidth < 800){
    headChar.textContent = "Char";
    headUnicode.textContent = "Unicode";
    headHTML.textContent = "HTML Char Ref.";
    headMorse.textContent = "Morse Code";
    headNotes.textContent = "Notes";
    headHEX.textContent = "HEX";
    headDEC.textContent = "DEC";
}

//
// assign value of iframe src attribute, and get the resource AFTER page content has loaded
let yorubaVideoEmbed01 = document.getElementById("yorubaVideoEmbed01");
yorubaVideoEmbed01.src = "https://www.youtube.com/embed/9tXsxBzGJzw";

let encodingsBody = document.getElementById("encodingsBody");
//let encodingsRow = encodingsBody.childNodes;
let encodingsRow = encodingsBody.children;

const yorubaMorse = {
    "x0061" : ".-", //  a
    "x00E0" : ".--.-", //    a grave   
    "x00E1" : "",  //     a acute
    "x0062" : "-...",  //     b
    "x0064" : "-..",  //     d
    "x0065" : ".",  //     e
    "x00E8" : "",  //     e grave
    "x00E9" : "..-..",  //     e acute
    "x1EB9" : "",  //     e dot
    "xNoHexeDotgrave" : "",  //     e dot grave
    "xNoHexeDotacute" : "",  //     e dot acute
    "x0066" : "..-.",  //     f
    "x0067" : "--.",  //     g
    "xNoHexgb" : "",  //     gb
    "x0068" : "....",  //     h
    "x0069" : "..",  //     i
    "x00EC" : "",  //     i grave
    "x00ED" : "",  //     i acute
    "x006A" : ".---",  //     j
    "x006B" : "-.-",  //     k
    "x006C" : ".-..",  //     l
    "x006D" : "--",  //     m
    "x006E" : "-.",  //     n            
    "x006F" : "---",  //     o          
    "x00F2" : "",  //     o grave        
    "x00F3" : "---.",  //     o acute        
    "x01ECD" : "",  //     o dot          
    "xNoHexoDotGrave" : "",  //     o dot grave        
    "xNoHexoDotAcute" : "",  //     o dot acute        
    "x0070" : ".--.",  //     p          
    "x0072" : ".-.",  //     r        
    "x0073" : "...",  //     s        
    "x1E63" : "",  //     s dot          
    "x0074" : "-",  //     t        
    "x0075" : "..-",  //     u        
    "x00F9" : "",  //     u grave          
    "x00FA" : "",  //     u acute        
    "x0077" : ".--",  //     w        
    "x0079" : "-.--"  //     y
};

const morse = {
    "dot" : "&#x2022;",
    "dash" : "&#x2501;"
};

const createHexStringMorse = (punctString) => {
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

const getMorseField = (key) => {
    let targetString = `&#${key};`;
    let targetMorseField = null;
    //console.log(`targetString : ${targetString}`);
    for (let i = 0; i < encodingsRow.length; i++) {
        //console.log(`textcontent : ${encodingsRow[i].children.item(1).textContent}`);
        if (encodingsRow[i].children.item(1).textContent == targetString){
            targetMorseField = encodingsRow[i].children.item(4);
            break;
        }   
    }
    return targetMorseField;
};


// main : populate morse data column
for (let key in yorubaMorse){    
    if (yorubaMorse[key] != ""){
        //console.log(key);
        //console.log(yorubaMorse[key]);
        let hexStringMorse = createHexStringMorse(yorubaMorse[key]);
        //console.log(hexStringMorse);
        
        let targetMorseField = getMorseField(key);
        //console.log(targetMorseField);
        //console.log();
        
        if (targetMorseField != null){            
            targetMorseField.innerHTML = `<p>${hexStringMorse}</p>`;
        }
    }
}



/*
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //             
    "x00E0 : ",  //               
    "x00E0 : ",  //             
    "x00E0 : ",  //              



*/



