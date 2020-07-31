// consult storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

// Code now gives real-time, live, inline validation, as well as submit time validation.
// Character ranges specified
// Password confirm now first checks that password is valid, before doing it's own validations

// Single error line still only displays the first encountered error, even when >1 exist
// User still doesn't know field requirements and constraints in advance

const form = document.getElementById("form");
// the input elements themselves...
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validUsernameCharsetRegex = "/([\u0030-\u0039\u0041-\u005A\u0061-\u007A\u00C0-\u00DE\u00E0-\u00FF\u1E63\u1EB9\u1ECD])+/gu";

const validLatinBasic = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
const validLatinAll = /^[\u0041-\u005A\u0061-\u007A\u0030-\u0039\u0020\u00E0-\u00FF\u00C0-\u00DE\u1E63\u1EB9\u1ECD _-]+$/;
/*
NUMERIC RANGE
      \u0030-\u0039 numeric 0 - 9
     BASIC LATIN RANGES
      \u0041-\u005A basic latin upper-case A-Z
      \u0061-\u007A basic latin lower-case a-z
     LATIN-1 RANGES
      \u00C0-\u00DE  latin upper-case A-Z
      \u00E0-\u00FF  latin lower-case a-z
     ENUMERATED DOTTED UNICODES (in numeric order)
      \u1E63  s dot
      \u1EB9  e dot
      \u1ECD  o dot
      
      \u00E0-\u00FA à to ú
      \u1EB9-\u1E63 ẹ to 
      space is \u0020
*/

// =======================================================
// ADD EVENT LISTENERS TO FORM CONTROLS

// form (re)validation at submit time
form.addEventListener("submit", (event) => {
  event.preventDefault();

	//checkInputs();
	doUsernameTests();
	doEmailTests();
	doPasswordTests();
  doPasswordConfirmTests();
  
  // reset the form
  // give focus to first input field
	
});


username.addEventListener("input", (event) => {
  doUsernameTests();
});

email.addEventListener("input", (event) => {
	doEmailTests();
});

password.addEventListener("input", (event) => {
	doPasswordTests();
  // now let's just make sure the confirm password isn't caught out...
  // if confirm password has already been entered once and validated, it needs to be done again
  if (!isEmpty(password2)) {
    doPasswordConfirmTests();
  }
});

password2.addEventListener("input", (event) => {
    doPasswordConfirmTests();
});

//================================================================
// FUNCTIONS THAT CALL APPROPRIATE INPUT VALIDATIONS, THEN PASS ON THE OUTCOMES
const doUsernameTests = () => {
	//
	if (isEmpty(username)){
    setErrorFor(username, "Username cannot be blank");
  }
  else if (isTooShort(username, username.minLength)){
    setErrorFor(username, `Need at least ${username.minLength - username.value.length} more characters.`);
  }
  else if (hasInvalidCharacters(username)) {
    setErrorFor(username, "Invalid character");
  }
  else if (hasWhitespaceTopOrTail(username)) {
    setErrorFor(username, "Username cannot start or end with a space character");
  }
  else {
    setSuccessFor(username);
  }
};

const doEmailTests = () => {
	//
	if (isEmpty(email)){
    setErrorFor(email, "Email cannot be blank");
  }
  else if (!isEmail(email)) {
    setErrorFor(email, "Email is not valid");
  }
  else {
    setSuccessFor(email);
  }		
};

const doPasswordTests = () => {
  // 
  if (isEmpty(password)){
    setErrorFor(password, "Password cannot be blank");
  }
  else if (isTooShort(password, password.minLength)){
    setErrorFor(password, `Need at least ${password.minLength - password.value.length} more characters.`);
  }
  else if (hasWhitespaceTopOrTail(password)) {
    setErrorFor(password, "Password cannot start or end with a space character");
  }
  else {
    setSuccessFor(password);
  }
};

const doPasswordConfirmTests = () => {  
  if (isEmpty(password2)){
    setErrorFor(password2, "Password Confirm cannot be blank");
  }
  // before validating for equality, just check that password is valid
  else if (isNotValid(password)) {
    setErrorFor(password2, "Set a valid password first!");
  }
  else if (areNotEqual(password, password2)) {
    setErrorFor(password2, `Passwords do not match`);
  }
  else {
    setSuccessFor(password2);
  }
};

// =======================================================
// SHOW ERROR OR SUCCESS ICONS AND MESSAGING

// show error, add error class
const setErrorFor = (input, message) => { 
  const formControl = input.parentElement; //.form-control
  const small = formControl.querySelector("small");
  const constraintsTip = "Only letters, numbers, space, dash(-) and underscore(_) allowed";

  // add error message into small
  if (message == "Invalid character"){
    small.innerHTML = `<abbr title="${constraintsTip}">${message}</abbr>`;
  }
  else {
    small.innerText = message;
  }
  
  // add error class
  formControl.className = "form-control error"
};

// add success class
const setSuccessFor = (input) => {
  const formControl = input.parentElement; //.form-control
  formControl.className = "form-control success"
};
// =======================================================

// =======================================================
// SPECIFIC CHECKS ON INPUTS AT INPUT TIME

// define a function for every validity check
//===========================================

// generalised function for checking...
const isEmpty = (input) => {
  let input_value = input.value;
  let isEmpty = false;
  if (input_value == ""){
      isEmpty = true;
  }
  return isEmpty;
};

// generalised function for checking...
const isTooShort = (input, minLen) => {
  let input_value = input.value;
  let isTooShort = false;
  if (input_value.length < minLen){
      isTooShort = true;
  }
  return isTooShort;
};

// generalised function for checking...
const isEmail = (input) => {
  let input_value = input.value;
  if (input_value.match(emailRegex)) {    
    return true;
  }
  else {    
    return false;
  }
};

// generalised function for checking...
const hasInvalidCharacters = (input) => {
  let input_value = input.value;
  if (!input_value.match(validLatinAll)) {  
    return true;
  }
  else {
    return false;
  }
};

// generalised function for checking...
const hasWhitespaceTopOrTail = (input) => {
  let input_value = input.value;
  if (input_value.trim().length < input_value.length) {
    return true;
  }
  else {
    return false;
  }
};

// generalised function for checking whether 2 inputs values are NOT strictly equal
const areNotEqual = (input1, input2) => {
  let input1_value = input1.value;
  let input2_value = input2.value;
  if (input1_value !== input2_value) {
    return true;
  }
  else {
    return false;
  }
};

// generalised function for checking whether another input is currently INVALID
const isNotValid = (input) => {
  if (input.parentElement.className === "form-control error") {
    return true;
  }
  else {
    return false;
  }
};