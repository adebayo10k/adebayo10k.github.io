// consult storage for latest background settings
let htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

// NOTE: JUST BASICS FOR NOW UNTIL WE'RE BETTER ON CSS AND DOM JS!
// if possible, organise form elements into data structures over which we can iterate

// get hooks into contact form elements
const contact_form = document.getElementById("contact_form");
//const contact_form_fieldsets = contact_form.children;
const alias_name = document.getElementById("alias_name");
const alias_name_errors = document.getElementById("alias_name_errors");
console.log(alias_name.value);

// get hooks into interface form
const team_interface_form = document.getElementById("team_interface_form");

//console.log(contact_form);
//console.log(contact_form_fieldsets );
//console.log(team_interface_form);
/*
for (i=0; i<contact_form_fieldsets.length; i++){
    console.log(contact_form_fieldsets[i].children.item(1));
}
*/

let currentErrors = new Array();

const addErrorString = (errorString) => {
    currentErrors.push(errorString);
};

// add eventListeners to form inputs
alias_name.addEventListener("input", (event) => {
    currentErrors = [];
    if (checkForEmpty(alias_name.value)){
        // pass a
        console.log("alias name was empty");
        addErrorString(`At least enter something.`);
        //alias_name.setCustomValidity(`At least enter something.`); 
        //alias_name.reportValidity();
    }    
    if (checkForTooShort(alias_name.value, alias_name.minLength)){
        addErrorString(`Need at least ${alias_name.minLength - alias_name.value.length} more characters.`);
    }
    // reset TO EMPTY STRING: setCustomValidity("")

    if (alias_name.validity.valid){
        // if the field is valid, we remove any error messages
        console.log("valid");
        currentErrors = []; //moot
        alias_name_errors.innerHTML = "";
        alias_name_errors.className = "error"
    }
    else{
        // add invalid class and remove valid class 
        alias_name_errors.className = "error"

        console.log(currentErrors);
        alias_name_errors.textContent = currentErrors[0];
        
    }

    
    
});

    // in the submit event
    //event.preventDefault();


// define a function for every validity check
const checkForEmpty = (input_value) => {
    let isEmpty = false;
    if (input_value == ""){
        isEmpty = true;
    }
    return isEmpty;
};
const checkForTooShort = (input_value, minLen) => {
    isTooShort = false;
    if (input_value.length < minLen){
        isTooShort = true;
    }
    return isTooShort;
};
const checkForYorubaChar = (inputRef) => {
    const yorubaCharsetRegex = "/([\u0030-\u0039\u0041-\u005A\u0061-\u007A\u00C0-\u00DE\u00E0-\u00FF\u1E63\u1EB9\u1ECD])+/gu";
};
const checkAgainstPrimaryRegex = (inputRef, primaryRegex) => {
    let regexConstraintMet = false;
    if (inputRef.value.match(primaryRegex)){
        regexConstraintMet = true;
    }
    return regexConstraintMet;
};
