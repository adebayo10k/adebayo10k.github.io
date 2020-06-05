// 
let htmlElem = document.querySelector("html");
let changeIntroPara = document.getElementById("changeIntroPara");
let changeSummaryPara = document.getElementById("changeSummaryPara");
let bgColourInputElem = document.getElementById("bgColourPicker");
let bgColourBtnElem = document.getElementById("bgColourBtn");
let forgetMeSectionElem = document.getElementById("forgetMe");
let forgetMeBtn = document.getElementById("forgetMeBtn");

const defaultColour = "#6495ed"; //cornflower blue"#6495ed"; //cornflower blue

//---------------------------------------------------------------------------------------------------

// find out what localeStorage currently looks like
const getSystemState = () => {

    let state = 
    !localStorage.getItem("bgColour") ? "UNSET"
    : localStorage.getItem("bgColour") && !localStorage.getItem("userChoiceDate") ? "SYSTEM_DEFAULT"
    : localStorage.getItem("bgColour") && localStorage.getItem("userChoiceDate") ? "USER_CONFIGURED"
    : console.log("pre try-catch failsafe");

    return state;
};
//---------------------------------------------------------------------------------------------------
// populate local storage with properties based on requested state
const setSystemState = (requestedState) => {
    
    switch (requestedState){
        case "SYSTEM_DEFAULT" :
            localStorage.setItem("bgColour", defaultColour);
            break;
        case "USER_CONFIGURED" :
            localStorage.setItem("bgColour", bgColourInputElem.value);
            localStorage.setItem("userChoiceDate", new Date());
            break;
        case "UNSET" : 
            localStorage.clear();
            break;
        default:
            console.log("Pre try-catch failsafe. setSystemState switch didn't match argument");
    };    
};
//---------------------------------------------------------------------------------------------------

// eg. change text and add forget me button if background is now user configured
const updateAppearanceSectionsContent = (storedAppearanceSetting) => {
    const introText = `
    Make yourself at home by changing the background colour being used by this site. Your browser should remember your changes between restarts.    
    `;
    const summaryText = `
    Your preferred background colour was set to <strong>${localStorage.getItem("bgColour")}</strong> on <strong>${localStorage.getItem("userChoiceDate")}</strong>. Try another whenever you like.    
    `;    

    switch (storedAppearanceSetting){
        case "UNSET" :
            changeIntroPara.innerHTML = introText;
            changeIntroPara.style.display = "block";
            // explicitly use the hardcoded default
            bgColourInputElem.value = defaultColour;
            changeSummaryPara.style.display = "none";
            forgetMeSectionElem.style.display = "none";
            break;
        case "SYSTEM_DEFAULT" :
            changeIntroPara.innerHTML = introText;
            changeIntroPara.style.display = "block";
            bgColourInputElem.value = localStorage.getItem("bgColour");
            changeSummaryPara.innerHTML = "";
            changeSummaryPara.style.display = "none";
            forgetMeSectionElem.style.display = "none";
            break;
        case "USER_CONFIGURED" :
            changeIntroPara.style.display = "none";
            changeSummaryPara.innerHTML = summaryText;
            changeSummaryPara.style.display = "block";
            bgColourInputElem.value = localStorage.getItem("bgColour");
            forgetMeSectionElem.style.display = "block";  
            break;
        default:
            console.log("Pre try-catch failsafe. updateAppearanceSectionsContent switch didn't match argument");
    }; 
};
//---------------------------------------------------------------------------------------------------

const updateStyleAllPages = () => {
   htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;   
};
//---------------------------------------------------------------------------------------------------

const refreshSiteAppearance = () => {

    let storedAppearanceSetting = getSystemState();

    // TODO: USE SWITCH HERE INSTEAD
    if (storedAppearanceSetting == "UNSET"){
        setSystemState("SYSTEM_DEFAULT");
        storedAppearanceSetting = getSystemState();
        updateAppearanceSectionsContent(storedAppearanceSetting);
    }
    else if (storedAppearanceSetting == "USER_CONFIGURED"){
        updateAppearanceSectionsContent(storedAppearanceSetting);
    }
    else{
        // system default state found, so nothing to do here
        updateAppearanceSectionsContent(storedAppearanceSetting);// should be no change, but just for completeness
    }
    // in all states... update page styles:
    updateStyleAllPages();

};
//---------------------------------------------------------------------------------------------------
// called when change button is pressed
const userConfigurePage = () => {
    let currentConfig = getSystemState();
    switch (currentConfig){
        case "UNSET" :
            console.log(`currentConfig: ${currentConfig}`);
            console.log("should NEVER be here at button press time! Investigate.")
            break;
        case "SYSTEM_DEFAULT" :
            setSystemState("USER_CONFIGURED");
            refreshSiteAppearance();         
            break;
        case "USER_CONFIGURED" : // in this case, get user confirmation
            let confirmMsg = `Your site background colour is currently ${localStorage.getItem("bgColour")}. Looks like you're changing it to ${bgColourInputElem.value}. Is that OK?`;

            // callback function
            const getUserResponse = (response) => {
                if (response){
                    setSystemState("USER_CONFIGURED");
                    refreshSiteAppearance();
                }
                else{
                    console.log("user cancelled");// NO ELSE!
                }
            };
            CustomConfirm.show(confirmMsg,getUserResponse);             
            break;
        default:
            console.log("Pre try-catch failsafe. userConfigurePage switch didn't match argument");
    }; 
};
//---------------------------------------------------------------------------------------------------
// when forget me button is pressed, get user confirmation
const clearUserConfiguration = () => {

    let confirmMsg = `Your browser (not you) will now be plugged back into the Matrix, so all your background colour preferences for this site will be forgotten. Is that OK?`;

    // callback function
    const getUserResponse = (response) => {
        if (response){
            console.log("Forgetting EVERYTHING....");
            setSystemState("UNSET");
            refreshSiteAppearance();
        }
        else{
            console.log("user cancelled");// NO ELSE!
        }
    };
    CustomConfirm.show(confirmMsg,getUserResponse);
};
//---------------------------------------------------------------------------------------------------
// on page load...main...
//localStorage.clear();
refreshSiteAppearance();