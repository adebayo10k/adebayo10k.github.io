//---------------------------------------------------------------------
// alert dialog functions
// OK button only

const CustomAlert = new function(){
    this.show = (msg) => {
        const dlg = document.getElementById("alertDialogCont");
        const dlgBody = dlg.querySelector("#alertDialogBody");
        //dlg.style.top = "30%";
        dlg.style.top = `${(document.documentElement.clientHeight/2)+window.pageYOffset}px`; //
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

//---------------------------------------------------------------------
// confirm dialog functions
// CANCEL and OK buttons

// IMPLEMENTED OK



//---------------------------------------------------------------------
// prompt dialog functions
// TEXT INPUT, CANCEL and OK buttons

const CustomPrompt = new function(){
    // object scope variables assigned at object creation time
    this.dialogInputElem = document.getElementById("promptDialogInput");

    this.show = (msg, callback) => {
        this.callback = callback;
        let dlg = document.getElementById("promptDialogCont");
        const dlgMessage = dlg.querySelector("#promptDialogMessage");
        dlgMessage.textContent = msg;

        this.dialogInputElem.focus();
        //dlg.style.top = "30%";
        dlg.style.top = `${(document.documentElement.clientHeight/2)+window.pageYOffset}px`; //
        dlg.style.opacity = 1;
        document.getElementById("freezeLayer").style.display = "block";
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

