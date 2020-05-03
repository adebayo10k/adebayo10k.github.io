//document.write("Welcome, you have Javascript on.")

// here I fake my own expiry 
const daily_ms = 1E+3*Math.pow(60,2)*24;
let expiry_date = new Date(2020, 4, 5, 11, 22, 1, 972); // zero based month, UTC accounted
let current_date = new Date();

let days_left = Math.floor( (expiry_date.getTime() - current_date.getTime()) / daily_ms);
let expiry_lapse_days = 0;
let codeText = "";

if (days_left >= 0){
    // not yet expired
    // set up strings
    codeText += `
// NOTE: This solution expires in ${days_left} days.
    `;
    codeText += `
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
}
else{
    // expired
    expiry_lapse_days = Math.abs(days_left);
    // set up strings
    codeText = `
    <strong>THIS SOLUTION &lsquo;EXPIRED&rsquo; ${expiry_lapse_days} sols ago</strong>.
    YOU&apos;RE VERY WELCOME TO DM ME IF YOU&apos;RE ALSO INTO PROGRESSING, COLLABORATING AND SOCIAL CODING.
    
    `;     
}

let codeBlockElemCw = document.getElementById("code_frag_block_cw"); // codeBlockElemCw, code_frag_block_cw
let showBtnElemCw = document.getElementById("show_btn_cw"); // use id show_btn_cw

// 
let showCode = function (flag) {
    if (flag) {
        codeBlockElemCw.innerHTML = codeText;
        showBtnElemCw.setAttribute("value", "hide code");
    }
    else {
        codeBlockElemCw.innerHTML = "";
        showBtnElemCw.setAttribute("value", "show code");
    }
};

showCode(false);

// in functional, we'll have to pass the related button and codeblockelem objects in 
// in oo, we'd just pass ref to a cwSolution or hrSolution object  and access its' button and cbe properties as required
showBtnElemCw.addEventListener("click", function(){
    if (codeBlockElemCw.innerHTML == ""){
        showCode(true);
    }
    else{
        showCode(false);
    }
});

//-----------------------------------------------------------------------------------------
/*
// define generic solution object
let Solution = function(){}
// define cWsolution object
let CWsolution = function(){
    __proto__ : Solution;
}
// define hRsolution object
let HRsolution = function(){
    __proto__ : Solution;    
}
*/
// TODO:  
// adds finally privacy comment text 
// adds code to separate cw and hr functions
// refactors everything to functions 
// adds code to try-catch blocks 
// rewrites using object-oriented approach

/*
FINALLY, SOME PRIVACY...
This is where legend has it that tech companies put those job ads - for the eyes of the curious only. Unfortunately, it's just me this time....and you.
TODO: Become a better Software Developer and build great stuff that I genuinely care about.
It seems that this SD game is all about the collaboration. Nobody has all the skills it takes to build great stuff.
On that note, feel free to DM me on Slack if you're also into progressing, collaborating or social coding in general. Good Luck!.
*/