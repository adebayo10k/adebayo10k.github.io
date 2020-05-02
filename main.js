//document.write("Welcome, you have Javascript on.")

// here I fake my own own expiry


    const codeText = `
// 8 kyu
function check(arr, val){
    // test whether value val is an element of array arr
    const contains = arr.includes(val);
    return contains;
}
`;


    const nosf = `
<strong>THIS SOLUTION HAS NOW &lsquo;EXPIRED&rsquo;</strong>.
YOU&apos;RE VERY WELCOME TO DM ME IF YOU&apos;RE   
ALSO INTO PROGRESSING BY SOCIAL CODING.

`; 






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