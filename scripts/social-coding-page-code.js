let htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

// here I fake my own expiry 
// generalised constructor function for codewars and hackerrank solution objects
function Solution (latestCode, expiryDate, codeBlockElemID, showBtnElemID){
    this.latestCode = latestCode;
    this.expiryDate = expiryDate;
    this.codeBlockElemID = codeBlockElemID;
    this.showBtnElemID = showBtnElemID;
    daily_ms = 1E+3*Math.pow(60,2)*24;
    currentDate = new Date();
    this.daysLeft = Math.floor( (this.expiryDate.getTime() - currentDate.getTime()) / daily_ms );
    this.plurosity = Math.abs(this.daysLeft) != 1;
    this.expiryLapseDays = this.daysLeft < 0 ? Math.abs(this.daysLeft) : null;

    this.codeBlockElem = document.getElementById(this.codeBlockElemID); //;
    this.showBtnElem = document.getElementById(this.showBtnElemID); // ;

    this.codeText = "";

    expiredCodeText = `
<strong>THIS SOLUTION &lsquo;EXPIRED&rsquo; ${this.expiryLapseDays} ${(this.plurosity ? "sols" : "sol")} ago</strong>.
IF YOU&apos;RE ALSO INTO PROGRESSING, COLLABORATING AND SOCIAL CODING, DM ME TODAY.
                
                `;
    // set the code or message that will be displayed when button is pressed
    this.setCodeText = function (){
        if (this.daysLeft >= 0){ // not yet expired    
            this.codeText += `
// NOTE: This solution expires in ${this.daysLeft} ${(this.plurosity ? "days" : "day")}`;
            this.codeText += this.latestCode;    
        }
        else{ // expired
            this.codeText = expiredCodeText;            
        }
    };  
    // display or hide the code or message, based on toggle switch position
    this.displayCode = function (flag){
        if (flag) {
            this.codeBlockElem.innerHTML = this.codeText;
            this.showBtnElem.setAttribute("value", "hide code");
        }
        else {
            this.codeBlockElem.innerHTML = "";
            this.showBtnElem.setAttribute("value", "show code");
        }
    };
    // toggle switch based on existing state of this object
    this.switchDisplay = function(){
        if (this.codeBlockElem.innerHTML == ""){
            this.displayCode(true);
        }
        else{
            this.displayCode(false);
        }
    };

    // set initial state of this object
    this.showBtnElem.addEventListener("click", () => {this.switchDisplay()});
    this.setCodeText();
    this.displayCode(false); 
    

} // end constructor function


//-------------------------------------V EDIT V----------------------------------------------------
// arguments for codewars object instantiation
const cwCodeBlockElemID = "codeFragBlockCW";
const cwShowBtnElemID = "showBtnCW";
let latestCWexpiryDate = new Date(2020, 4, 16, 18, 00, 0, 000); // zero based month, UTC accounted
let latestCWcode = `
// 6 kyu

function decode(r){

    const badMultiplierMessage = "Impossible to decode";
    const alphaDict = { "a":0, "b":1, "c":2, "d":3, "e":4, "f":5, "g":6, "h":7, "i":8, "j":9, "k":10, "l":11, "m":12, "n":13, "o":14, "p":15, "q":16, "r":17, "s":18, "t":19, "u":20, "v":21, "w":22, "x":23, "y":24, "z":25 };
    const alphaDictLen = Object.keys(alphaDict).length;
    let numStr = "";
    let encodedStr = "";
    // separate numStr and encodedStr
    for (let charKey in r){
        //console.log(r[charKey]);
        if (Number.isInteger(Number.parseInt(r[charKey]))){
            numStr += r[charKey];
        }
        else{
            encodedStr += r[charKey];
        }
    }

    // parse numStr into multiplier number
    const multiplier = Number.parseInt(numStr);

    let decodedStr = "";
    // decode if possible
    for (let charKey in encodedStr){      
        // lookup the dictionary value for the encoded character
        let remainderVal = alphaDict[\`\${encodedStr[charKey]}\`];

        // how many (number*multiplier)%26 between 0..25 will give remainderVal?
        // if there is not exactly 1, we can't decode
        let check = 0; let decodedValArr = [];
        while (check < alphaDictLen){            
            // collect decoded value(s)
            if ((check*multiplier) % alphaDictLen == remainderVal){
                decodedValArr.push(check);
            }
            check++;
        }
        // if not exactly 1 in range 0..alphaDictLen, fail
        if (decodedValArr.length !== 1){
            return badMultiplierMessage;
        }
        // translate value back to letter and remake string
        for (letter in alphaDict){
            if (alphaDict[letter] === decodedValArr[0]){
                decodedStr += letter;
                break; // inner for
            }
        }
    }
    return decodedStr;
    `;

//-------------------------------------^ EDIT ^----------------------------------------------------
// create a codewars solution object
let latestCWsolution = new Solution(latestCWcode, latestCWexpiryDate, cwCodeBlockElemID, cwShowBtnElemID);
/*
for (let key in latestCWsolution){
    console.log(key);
}
const keys = Object.keys(latestCWsolution.__proto__); // array returned
console.log(keys);
*/


//-------------------------------------V EDIT V----------------------------------------------------
// arguments for hackerrank object instantiation
const hrCodeBlockElemID = "codeFragBlockHR";
const hrShowBtnElemID = "showBtnHR";
let latestHRexpiryDate = new Date(2020, 4, 27, 18, 00, 0, 1); // zero based month, UTC accounted
let latestHRcode = ` 
#!/bin/bash

# mac_regex="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"
adr=$1
function check_ip
{
    valid_ok=0 # 0 = success
    ip4_test1_regex="^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$"
    #ip4_test1_regex="^([0-9]{1,3}[\.]){3}([0-9]{1,3})$"
       
    if [[ $adr =~ $ip4_test1_regex ]] # test 1
    then
        OIFS=$IFS
        IFS='.'
        test_byte_array=($adr)
        IFS=$OIFS

        for byte in \${test_byte_array[@]}
	    do              
            if [ $byte -gt 255 ] || [[ \${byte:0:1} -eq 0 && \${#byte} > 1 ]] # test 2 
            then
            valid_ok=3 # 3 = failed  # bad ip
            fi
        done
    else
        valid_ok=2 # 2 = failed # bad ip
    fi
    
    if [ $valid_ok -eq 0 ]
    then
        echo "True"
    else
        echo "False"
    fi
}
    `;

//-------------------------------------^ EDIT ^----------------------------------------------------
// create an hackerrank solution object
let latestHRSolution = new Solution(latestHRcode, latestHRexpiryDate, hrCodeBlockElemID, hrShowBtnElemID);

/*
for (let key in latestHRSolution){
    console.log(key);
}
*/

//-----------------------------------------------------------------------------------------
// TODO:  
// adds code to try-catch blocks 
// to display arbitrary number of concurrent solution article objects ????



/*
FINALLY, SOME PRIVACY...
This is where legend has it that tech companies put those job ads - for the eyes of the curious only. Unfortunately, it's just me this time....and you.
TODO: Become a better Software Developer and build great stuff that I genuinely care about.
It seems that this SD game is all about the collaboration. Nobody has all the skills it takes to build great stuff.
On that note, feel free to DM me on Slack if you're also into progressing, collaborating or social coding in general. Good Luck!.
*/