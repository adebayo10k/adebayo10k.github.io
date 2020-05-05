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
YOU&apos;RE WELCOME TO DM ME IF YOU&apos;RE ALSO INTO PROGRESSING, COLLABORATING AND SOCIAL CODING.
                
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
const cwCodeBlockElemID = "code_frag_block_cw";
const cwShowBtnElemID = "show_btn_cw";
let latestCWexpiryDate = new Date(2020, 4, 5, 13, 48, 1, 972); // zero based month, UTC accounted
let latestCWcode = `
// 6 kyu
function findNb(m){

    const testVol = m;
    let n = 1;
    let currentVol = 0; let totalVol = 0;

    // so from top of building...
    while (totalVol < testVol){
        currentVol = Math.pow(n,3);        
        totalVol += currentVol;
        if (totalVol == testVol){        
            return n;
        }
        n++;
    }
    return -1; 

}// end function
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
const hrCodeBlockElemID = "code_frag_block_hr";
const hrShowBtnElemID = "show_btn_hr";
let latestHRexpiryDate = new Date(2020, 4, 12, 11, 48, 1, 972); // zero based month, UTC accounted
let latestHRcode = `
// 
// IMPLEMENTS RESOLVED RELATIONSHIP BETWEEN n AND RESULT
// result = n^2/2
function game(n){ 

    // PART 0: CALCULATE THE TOTAL IN DECIMAL FORM:

    const size = n;
    // :)
    chessboardTotal = (Math.pow(size,2))/2;      
   
    // PART 1: CONVERT THE DECIMAL TOTAL INTO SIMPLIFIED, PROPER OR IMPROPER FRACTION:

    // if decimal part exists, separate whole (even when zero) and decimal
    let wholePart = Math.floor(chessboardTotal);
    let decimalPart = chessboardTotal - wholePart;
    //console.log("wholePart: " + wholePart + ", decimalPart: " + decimalPart);
    // 0. get decimal part rounded to 1 d.p...
        // if rounds to 1.0, ...add to whole and return [whole]
        // if rounds to 0.0 (or did not exist), ...return [whole]    
    decimalPart = Math.round((decimalPart*10))/10;
    if (decimalPart == 0){
        return [wholePart];
    }
    if (decimalPart == 1){
        return [wholePart + decimalPart];
    }
    // 1. use 1 d.p decimal to return num and denom of a fraction
    let testDenominator = 1;
    while ((decimalPart*testDenominator) % 1 !== 0){
        testDenominator++;
    }
    let decimalPartNumerator = decimalPart*testDenominator;
    let decimalPartDenominator = testDenominator;
    // 2. create improper (or proper if wholePart is zero) fraction and return array [num, denom]
    let resultNumerator = (wholePart*decimalPartDenominator)+decimalPartNumerator;
    let resultDenominator = decimalPartDenominator;

    return [resultNumerator, resultDenominator];    

}// end function
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