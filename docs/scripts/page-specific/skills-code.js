// here I fake my own expiry 
// generalised constructor function for codewars and hackerrank solution objects
function Solution(latestCode, expiryDate, codeBlockElemID, showBtnElemID) {

    const knownCodeBlocks = ["codeFragBlockCW", "codeFragBlockHR"];
    const knownShowButtons = ["showBtnCW", "showBtnHR"];

    // using try..catch to validate actual arguments and handle errors
    try {
        let errors = [];
        // validate the actual arguments
        if (!typeof latestCode === "string") {
            errors.push(new TypeError(`Error: latestCode was not a string literal. It's type was: ${typeof latestCode}`));
        }
        if (!expiryDate instanceof Date) {
            errors.push(new TypeError(`Error: expiryDate was not a Date object.`));
        }
        if (!knownCodeBlocks.includes(codeBlockElemID)) {
            errors.push(new RangeError(`Error: codeBlockElemID was outside expected range. Value was ${codeBlockElemID}`));
        }
        if (!knownShowButtons.includes(showBtnElemID)) {
            errors.push(new RangeError(`Error: showBtnElemID was outside expected range. Value was ${showBtnElemID}`));
        }

        if (errors.length > 0) {
            throw errors;
        }
        else {
            this.latestCode = latestCode;
            this.expiryDate = expiryDate;
            this.codeBlockElemID = codeBlockElemID;
            this.showBtnElemID = showBtnElemID;

            daily_ms = 1E+3 * Math.pow(60, 2) * 24;
            currentDate = new Date();
            this.daysLeft = Math.floor((this.expiryDate.getTime() - currentDate.getTime()) / daily_ms);
            this.daysLeftPlurality = Math.abs(this.daysLeft) !== 1;
            this.expiryLapseDays = this.daysLeft < 0 ? Math.abs(this.daysLeft) : null;
            this.codeBlockElem = document.getElementById(this.codeBlockElemID); //;
            this.showBtnElem = document.getElementById(this.showBtnElemID); // ;
            this.codeText = "";
            expiredCodeText = `
<p><strong>THIS SOLUTION &lsquo;EXPIRED&rsquo; ${this.expiryLapseDays} ${(this.daysLeftPlurality ? "sols" : "sol")} ago.</strong></p>
<p>Never mind. Contact me on LinkedIn to discuss what you're missing.</p>
                
                `;
            // set the code or message that will be displayed when button is pressed
            this.setCodeText = function () {
                if (this.daysLeft >= 0) { // not yet expired    
                    this.codeText += `
// NOTE: This solution expires in ${this.daysLeft} ${(this.daysLeftPlurality ? "days" : "day")}`;
                    this.codeText += this.latestCode;
                }
                else { // expired
                    this.codeText = expiredCodeText;
                }
            };
            // display or hide the code or message, based on toggle switch position
            this.displayCode = function (flag) {
                if (flag) {
                    this.codeBlockElem.innerHTML = this.codeText;
                    this.showBtnElem.innerHTML = "hide code";
                }
                else {
                    this.codeBlockElem.innerHTML = "";
                    this.showBtnElem.innerHTML = "show code";
                }
            };
            // toggle switch based on existing state of this object
            this.switchDisplay = function () {
                if (this.codeBlockElem.innerHTML == "") {
                    this.displayCode(true);
                }
                else {
                    this.displayCode(false);
                }
            };

            // set initial state of this object
            this.showBtnElem.addEventListener("click", () => { this.switchDisplay() });
            this.setCodeText();
            this.displayCode(false);
        }// end else

    }
    catch (err) {
        // handle the errors array
        for (i = 0; i < err.length; i++) {
            console.error(err[i].name);
            console.error(err[i].message);
            // Gracefully shutdown app from here.
        }
    }

} // end constructor function


//-------------------------------------V EDIT V----------------------------------------------------
// arguments for codewars object instantiation
const cwCodeBlockElemID = "codeFragBlockCW";
const cwShowBtnElemID = "showBtnCW";
let latestCWexpiryDate = new Date(2020, 9, 6, 18, 00, 0, 000); // zero based month
const latestCWcode = `
// 5 kyu
//perfect_power.js

function perfect_power_checker(num){
    let baseFound = false; let baseExArr = []; let proof = "";
    // lowest possible exponent is 2, so highest possible base is sqrt(num)
    // lowest possible base is 2, so highest possible exponent is log2(num)
    for (let exp = 2; exp <= Math.ceil( (Math.log(num)/Math.log(2)) ); exp += 1){
        base = Math.round(Math.pow(num, (1/exp)));
        if (Math.pow(base, exp) === num){
            baseFound = true; baseExArr = [base, exp]; proof = \`\${base}^\${exp} = \${Math.pow(base, exp)}\`;
            return baseExArr + " " + proof;
            break;
        }
    }    
    if (!baseFound){
        return null;
    }    
} // end function
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
let latestHRexpiryDate = new Date(2020, 9, 27, 18, 00, 0, 1); // zero based month, UTC accounted
const latestHRcode = ` 
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
// to display arbitrary number of concurrent solution article objects ????



/*
FINALLY, SOME PRIVACY...
This is where legend has it that tech companies put those job ads - for the eyes of the curious only. Unfortunately, it's just me this time....and you.
TODO: Become a better Software Developer and build great stuff that I genuinely care about.
It seems that this SD game is all about the collaboration. Nobody has all the skills it takes to build great stuff.
On that note, feel free to DM me on Slack if you're also into progressing, collaborating or social coding in general. Good Luck!.
*/