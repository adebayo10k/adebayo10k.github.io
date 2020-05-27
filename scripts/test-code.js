//
let htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

// crude hacks until better responsive design understanding
let screenWidth = screen.width;
let availScreenWidth = screen.availWidth;
let viewportWidth = document.documentElement.clientWidth;
console.log(`screenWidth: ${screenWidth}`);
console.log(`availScreenWidth: ${availScreenWidth}`);
console.log(`window innerWidth: ${innerWidth}`);
console.log(`viewport width: ${viewportWidth}`);


// using this as workaround for no android browser console.log() problem
let screenDataSectionElem = document.getElementById("screenDataSection");

let screenWidthPara = document.createElement("p");
let availScreenWidthPara = document.createElement("p");
let innerWidthPara = document.createElement("p");
let clientWidthPara = document.createElement("p");

screenWidthPara.textContent = `screen width: ${screenWidth}`;
availScreenWidthPara.textContent = `available screen width: ${availScreenWidth}`;
innerWidthPara.innerHTML = `<strong>browser window current inner width: ${innerWidth}</strong>`;
clientWidthPara.innerHTML = `<strong>client width (visual viewport): ${viewportWidth}</strong>`;

screenDataSectionElem.appendChild(screenWidthPara);
screenDataSectionElem.appendChild(availScreenWidthPara);
screenDataSectionElem.appendChild(innerWidthPara);
screenDataSectionElem.appendChild(clientWidthPara);

// TODO: really should query image sizes too..


//---------------------------------------------------------------------
// alert dialog functions

const CustomAlert = new function(){
    this.show = (msg) => {
        let dlg = document.getElementById("alertDialogCont");
        let dlgBody = dlg.querySelector("#alertDialogBody");
        dlg.style.top = "30%";
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
        document.getElementById("freezeLayer").style.display = "";

    };

    this.close = () => {
        let dlg = document.getElementById("alertDialogCont");
        dlg.style.top = "-30%";
        dlg.style.opacity = 0;
        document.getElementById("freezeLayer").style.display = "none";
    };
};

const showAlertDialog = () => {
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

const handleDefaultConfirm = () => {
    if (confirm("Ok to change background?")){
        console.log("Background now updating....");
    }
};

const CustomConfirm = new function(){
    this.show = (msg, callback) => {
        this.callback = callback;
        let dlg = document.getElementById("confirmDialogCont");
        let dlgBody = dlg.querySelector("#confirmDialogBody");
        dlg.style.top = "10%";
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
        document.getElementById("freezeLayer").style.display = "";
    };

    this.affirm = () => {
        this.callback();
        this.close();
    };

    this.cancel = () => {
            this.close();
    };

    this.close = () => {
        let dlg = document.getElementById("confirmDialogCont");
        dlg.style.top = "-30%";
        dlg.style.opacity = 0;
        document.getElementById("freezeLayer").style.display = "none";
    };
};

// callback function
const doSomething = () => {
    console.log("Background now updating....");
};

//
const showConfirmDialog = () => {
    // create message and callback
    let msg = "Damola needs confirmation now";
    // args passed to CustomConfirm object will have been dynamically generated
    CustomConfirm.show(msg,doSomething);
};

//---------------------------------------------------------------------
// prompt dialog functions

// callback function
const validateUsername = (username) => {
    let resultBox = document.getElementById("result");
    // all sorts of input validation...HERE.. 
    // null from cancel button?
    if (username != null){
        if (username.startsWith("d")){
            resultMsg = "damola?";
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

const handleDefaultPrompt = () => {
    validateUsername(prompt("Give me your username"));    
};

const CustomPrompt = new function(){
    // object scope variables assigned at object creation time
    this.dialogInputElem = document.getElementById("promptDialogInput");

    this.show = (msg, callback) => {
        this.callback = callback;
        let dlg = document.getElementById("promptDialogCont");
        let dlgMessage = dlg.querySelector("#promptDialogMessage");
        dlgMessage.textContent = msg;

        this.dialogInputElem.focus();
        dlg.style.top = "30%";
        dlg.style.opacity = 1;
        document.getElementById("freezeLayer").style.display = "";
    };

    this.affirm = () => {
        this.callback(this.dialogInputElem.value);
        this.close();
    };

    this.cancel = () => {
        this.callback(null);
        this.close();
    };

    this.close = () => {
        let dlg = document.getElementById("promptDialogCont");
        this.dialogInputElem.value = "";
        dlg.style.top = "-30%";
        dlg.style.opacity = 0;
        document.getElementById("freezeLayer").style.display = "none";
    };
};

const showPromptDialog = () => {
    // create message and callback
    let msg = "Username needs confirmation now";
    // args passed to CustomPrompt object will have been dynamically generated
    CustomPrompt.show(msg,validateUsername);
};


