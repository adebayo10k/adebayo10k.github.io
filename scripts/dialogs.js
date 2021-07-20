//---------------------------------------------------------------------
// alert dialog functions
// (OK button only)

const CustomAlert = new function () {
    this.show = (msg) => {
        const dlg = document.getElementById("alertDialogCont");
        const dlgBody = dlg.querySelector("#alertDialogBody");
        dlg.style.top = "30%";
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
        document.getElementById("freezeLayer").style.display = "";

    };

    this.close = () => {
        const dlg = document.getElementById("alertDialogCont");
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
// Confirm Dialog functions
// (CANCEL and OK buttons)

const handleDefaultConfirm = () => {
    if (confirm("Ok to change background?")) {
        console.log("Background now updating....");
    }
};

const CustomConfirm = new function () {
    this.show = (msg, callback) => { // 
        this.callback = callback;
        const dlg = document.getElementById("confirmDialogCont");
        const dlgBody = dlg.querySelector("#confirmDialogBody");
        dlgBody.textContent = msg;
        const dlgOkBtn = document.getElementById("confirmDlgOkBtn");
        const dlgCancelBtn = document.getElementById("confirmDlgCancelBtn");

        dlg.style.top = `${(document.documentElement.clientHeight / 2) + window.pageYOffset}px`; // 

        dlg.style.opacity = 1;
        document.getElementById("freezeLayer").style.display = "block";

        dlgOkBtn.addEventListener("click", this.affirm);
        dlgCancelBtn.addEventListener("click", this.cancel);

    };

    this.affirm = () => {
        this.callback(true);
        this.close();
    };

    this.cancel = () => {
        this.callback(false);
        this.close();
    };

    this.close = () => {
        const dlg = document.getElementById("confirmDialogCont");
        dlg.style.top = "-30%";
        dlg.style.opacity = 0;
        document.getElementById("freezeLayer").style.display = "none";
    };

};

//---------------------------------------------------------------------
// prompt dialog functions
// (TEXT INPUT, CANCEL and OK buttons)

// callback function
const validateUsername = (username) => {
    const resultBox = document.getElementById("result");
    // TODO: all sorts of input validation...HERE.. 
    if (username != null) {
        if (username.startsWith("d")) {
            resultMsg = "damola?";
        }
        else {
            resultMsg = "who are you?";
        }
    }
    else {
        resultMsg = "User cancelled input";
    }
    resultBox.textContent = resultMsg;
};

const handleDefaultPrompt = () => {
    validateUsername(prompt("Give me your username"));
};

const CustomPrompt = new function () {
    // object scope variables assigned at object creation time
    this.dialogInputElem = document.getElementById("promptDialogInput");

    this.show = (msg, callback) => {
        this.callback = callback;
        const dlg = document.getElementById("promptDialogCont");
        const dlgMessage = dlg.querySelector("#promptDialogMessage");
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
        const dlg = document.getElementById("promptDialogCont");
        this.dialogInputElem.value = "";
        dlg.style.top = "-30%";
        dlg.style.opacity = 0;
        document.getElementById("freezeLayer").style.display = "none";
    };
};

const showPromptDialog = () => {
    // create message and callback
    const msg = "Username needs confirmation now";
    // args passed to CustomPrompt object will have been dynamically generated
    CustomPrompt.show(msg, validateUsername);
};
