// consult storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

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
const yorubaVideoEmbed01 = document.getElementById("yorubaVideoEmbed01");
yorubaVideoEmbed01.src = "https://www.youtube.com/embed/KnGPtahOlx0";

const yorubaAudioEmbed01 = document.getElementById("yorubaAudioEmbed01");
yorubaAudioEmbed01.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/369438599&color=%236495ed&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";


const encodingsBody = document.getElementById("encodingsBody");
//let encodingsRow = encodingsBody.childNodes;
let encodingsRow = encodingsBody.children; // returns the rows of the table

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
    "x1ECD" : "",  //     o dot          
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

// called functions ---------------------------------------------------------------

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


// main ---------------------------------------------------------------

// populate morse data column
for (let key in yorubaMorse){    
    if (yorubaMorse[key] != ""){
        //console.log(key);
        //console.log(yorubaMorse[key]);
        let hexStringMorse = createHexStringMorse(yorubaMorse[key]);
        //console.log(hexStringMorse);
        
        let targetMorseField = getMorseField(key);
        //console.log(targetMorseField);
        //console.log();
        
        // just make absolutely sure that a field was matched
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



*/



