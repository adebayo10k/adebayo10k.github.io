// consult storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

// output some data needed to test responsive design implementation

console.log(`screenWidth: ${screen.height}`);
console.log(`screenWidth: ${screen.width}`);

console.log(`availScreenWidth: ${screen.availHeight}`);
console.log(`availScreenWidth: ${screen.availWidth}`);

console.log(`window innerWidth: ${innerHeight}`);
console.log(`window innerWidth: ${innerWidth}`);

console.log(`viewport height: ${document.documentElement.clientHeight}`);
console.log(`viewport width: ${document.documentElement.clientWidth}`);

console.log(`page Y-Offset: ${window.pageYOffset}`);
console.log(`page X-Offset: ${window.pageXOffset}`);


// using this as workaround for the 'no android browser console.log()' problem
const screenDataSectionElem = document.getElementById("screenDataSection");

const screenWidthPara = document.createElement("p");
const availScreenWidthPara = document.createElement("p");
const innerWidthPara = document.createElement("p");
const clientWidthPara = document.createElement("p");

screenWidthPara.textContent = `screen width: ${screen.width}`;
availScreenWidthPara.textContent = `available screen width: ${screen.availWidth}`;
innerWidthPara.innerHTML = `<strong>browser window current inner width: ${innerWidth}</strong>`;
clientWidthPara.innerHTML = `<strong>client width (visual viewport): ${document.documentElement.clientWidth}</strong>`;

screenDataSectionElem.appendChild(screenWidthPara);
screenDataSectionElem.appendChild(availScreenWidthPara);
screenDataSectionElem.appendChild(innerWidthPara);
screenDataSectionElem.appendChild(clientWidthPara);

// TODO: really should query image sizes too..

const resultBox = document.getElementById("result");

//---------------------------------------------------------------------
// alert dialog functions
// OK button only

const showAlertDialog = () => {
    
    resultBox.textContent = ""; // clear any existing results content
    let colour1 = "red";
    let colour2 = "blue";
    let dialogMsg = `Old colour is ${colour1} and new colour is ${colour2}`;
    let dialogMsg2 = 'This is our custom alert dialog. Press \'OK\' to close.';

    CustomAlert.show(dialogMsg + ". " + dialogMsg2);
};

const hideAlertDialog = () => {
    CustomAlert.close();
};

//---------------------------------------------------------------------
// confirm dialog functions
// CANCEL and OK buttons

// IMPLEMENTED OK



//---------------------------------------------------------------------
// prompt dialog functions
// TEXT INPUT, CANCEL and OK buttons

// system default prompt
const handleDefaultPrompt = () => {
    resultBox.textContent = ""; // clear any existing results content
    validateUsername(prompt("Give me your username"));    
};

// callback function
const validateUsername = (username) => {

    // all sorts of input validation...HERE.. 
    // null from cancel button?
    if (username != null){
        if (username.startsWith("damola")){
            resultMsg = "Hey, Damola";
        }
        else{
            resultMsg = "who are you?";
        }
    }
    else{
        resultMsg = "User cancelled input";
    }
    
    console.log(resultMsg);
    resultBox.textContent = resultMsg;
};


// custom prompt
const showPromptDialog = () => {
    resultBox.textContent = ""; // clear any existing content
    // create message and callback
    let msg = "Username needs confirmation now";
    // args passed to CustomPrompt object will have been dynamically generated
    CustomPrompt.show(msg,validateUsername);
};


