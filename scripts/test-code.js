//
let htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

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
        dlg.style.top = "30%";
        dlg.style.opacity = 1;
        dlgBody.textContent = msg;
        document.getElementById("freezeLayer").style.display = "";
    };

    this.affirm = () => {
        this.callback();
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
const doChange = () => {
    console.log("Background now updating....")
};

const showConfirmDialog = () => {
    // create message and callback
    let msg = "Damola needs confirmation now";
    CustomConfirm.show(msg,doChange);
};

//---------------------------------------------------------------------
// prompt dialog functions