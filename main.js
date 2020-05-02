//document.write("Welcome, you have Javascript on.")

// here I fake my own own expiry using ms Date() arithmetic
const daily_ms = 1E+3*Math.pow(60,2)*24;
let expiry_date = new Date(2020, 5, 12, 5, 22, 0); // zero based month, DST accounted
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
    // 8 kyu
    function check(arr, val){
        // test whether value val is an element of array arr
        const contains = arr.includes(val);
        return contains;
    }
    `;    
}
else{
    // expired
    expiry_lapse_days = Math.abs(days_left);
    // set up strings
    codeText = `
    <strong>THIS SOLUTION &lsquo;EXPIRED&rsquo; ${expiry_lapse_days} sols ago</strong>.
    YOU&apos;RE VERY WELCOME TO DM ME IF YOU&apos;RE   
    ALSO INTO PROGRESSING BY SOCIAL CODING.
    
    `;     
}
// everything to functions


let code_text = document.getElementById("code_text");
let show_button = document.querySelector(".show_button");

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

show_button.addEventListener("click", function(){
    if (code_text.innerHTML !== ""){
        showCode(false);
    }
    else{
        showCode(true);
    }
});

//-----------------------------------------------

// 2020-05-02T09:11:39.299Z     