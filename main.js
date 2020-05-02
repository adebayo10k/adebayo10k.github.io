//document.write("Welcome, you have Javascript on.")

// here I fake my own expiry 
const daily_ms = 1E+3*Math.pow(60,2)*24;
let expiry_date = new Date(2020, 4, 6, 5, 22, 1, 972); // zero based month, UTC accounted
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



let code_text = document.getElementById("code_cw"); // codeBlockElemCw
let show_button = document.querySelector(".show_button"); // use id show_btn_cw

// 
let showCode = function (flag) {
    if (flag) {
        code_text.innerHTML = codeText;
        show_button.setAttribute("value", "hide code");
    }
    else {
        code_text.innerHTML = "";
        show_button.setAttribute("value", "show code");
    }
};

showCode(false);

// in functional, we'll have to pass the related button and codeblockelem objects in 
// in oo, we'd just pass a cwSolution or hrSolution object, and access its' button and cbe properties as required
show_button.addEventListener("click", function(){
    if (code_text.innerHTML == ""){
        showCode(true);
    }
    else{
        showCode(false);
    }
});

//-----------------------------------------------

// 2020-05-02T09:11:39.299Z  
// adds finally privacy comment text 
// adds code to separate cw and hr functions
// refactors everything to functions 
// adds code to try-catch blocks 
// rewrites using object-oriented approach

/*
FINALLY, SOME PRIVACY...
This is where legend has it that tech companies put those job ads - for the eyes of the curious only. Unfortunately, it's just me this time....
My focus is on becoming a better Software Developer and building great stuff that I genuinely care about.
It seems that this SD game is all about the collaboration. Nobody has all the skills it takes to build great stuff.
On that note, feel free to DM me on Slack if you're also into progressing, collaborating and social coding in general. Cheers.
*/