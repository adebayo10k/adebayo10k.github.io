// get html reference only if one not already declared in another script
if (!htmlElem){
  const htmlElem = document.querySelector("html");
}
const changeIntroPara = document.getElementById("changeIntroPara");
const changeSummaryPara = document.getElementById("changeSummaryPara");
const bgColourInputElem = document.getElementById("bgColourPicker");
const bgColourBtnElem = document.getElementById("bgColourBtn");
const forgetMeSectionElem = document.getElementById("forgetMe");
const forgetMeBtn = document.getElementById("forgetMeBtn");

const defaultColour = "#6495ed"; //cornflower blue"#6495ed"; //cornflower blue

//---------------------------------------------------------------------------------------------------

// feature detection function that checks whether localStorage (or sessionStorage) is both supported and available
const storageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(err) {
    return err instanceof DOMException && (
      // everything except Firefox
      err.code === 22 ||
      // Firefox
      err.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      err.name === 'QuotaExceededError' ||
      // Firefox
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

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
            localStorage.setItem("userChoiceDate", new Date()); // stored as an array object.
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
    /*
    //FIGURING OUT THE MOST PLEASING DATE FORMAT

    console.log(typeof localStorage.getItem("userChoiceDate")); // string returned
    console.log(localStorage.userChoiceDate);

    const testDate = new Date(localStorage.userChoiceDate);
    console.log(typeof testDate);
    console.log(testDate.toLocaleDateString());
    console.log(testDate.getDay());
    console.log(testDate.getFullYear());
    console.log(testDate.toDateString());
    console.log(testDate.toLocaleTimeString());
    console.log(testDate.toLocaleString());
    console.log(testDate.toUTCString()); // ** THIS ONE (ALTHOUGH EXISTING FORMAT OK AFTER ALL)
    */

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

const updateStyleThisPage = () => {
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
    // in all states... update this pages' styles:
    updateStyleThisPage();

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

    const confirmMsg = `Your browser will now forget any background colour preferences you made for this site. Is that OK?`;

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

//==============================================================


// on page load...main...
// 
if (storageAvailable('localStorage')) {
  // localStorage is both supported and available, so...
  bgColourBtnElem.addEventListener("click", userConfigurePage);
  forgetMeBtn.addEventListener("click", clearUserConfiguration);
  refreshSiteAppearance();
}
else {
  // No localStorage, so error was returned. Nothing to do. App will not work.
  console.log(storageAvailable());
  // the default 'bad news.. no JavaScript..' html coded message stays visible
  // TODO: MAKE THAT THE ONLY THING VISIBLE, SO NO BUTTONS, NO NOTHING.
  /*

  window.addEventListener('storage', function(e) {  
  document.querySelector('.my-key').textContent = e.key;
  document.querySelector('.my-old').textContent = e.oldValue;
  document.querySelector('.my-new').textContent = e.newValue;
  document.querySelector('.my-url').textContent = e.url;
  document.querySelector('.my-storage').textContent = JSON.stringify(e.storageArea);
  });

  */
}


