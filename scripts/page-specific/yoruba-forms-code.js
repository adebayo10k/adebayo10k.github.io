// consult storage for latest background settings
let htmlElem = document.querySelector("html");
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

// form validation at submit time
form.addEventListener("submit", (event) => {
  event.preventDefault();

  checkInputs();
});

username.addEventListener("input", (event) => {
  if (isEmpty(username)){
    setErrorFor(username, "Username cannot be blank");
  }
  else if (isTooShort(username, username.minLength)){
    setErrorFor(username, `Need at least ${username.minLength - username.value.length} more characters.`);
  }
  else if (hasInvalidCharacters(username)) {
    setErrorFor(username, "Invalid character");
  }
  else {
    setSuccessFor(username);
  }  
});

email.addEventListener("input", (event) => {
  if (isEmpty(email)){
    setErrorFor(email, "Email cannot be blank");
  }
  else if (!isEmail(email)) {
    setErrorFor(email, "Email is not valid");
  }
  else {
    setSuccessFor(email);
  }  
});

password.addEventListener("input", (event) => {
  if (isEmpty(password)){
    setErrorFor(password, "Password cannot be blank");
  }
  else if (isTooShort(password, password.minLength)){
    setErrorFor(password, `Need at least ${password.minLength - password.value.length} more characters.`);
  }
  else {
    setSuccessFor(password);
  }  
});

password2.addEventListener("input", (event) => {
  // before validating, just check that password is valid
  if (password.parentElement.className === "form-control error") {
    setErrorFor(password2, "Set a valid password first!");
  }
  else if (isEmpty(password2)){
    setErrorFor(password2, "Password cannot be blank");
  }
  else if (password2.value !== password.value) {
    setErrorFor(password2, `Passwords do not match`);
  }
  else {
    setSuccessFor(password2);
  }  
});



// =======================================================

// show error, error class
const setErrorFor = (input, message) => { 
  const formControl = input.parentElement; //.form-control
  const small = formControl.querySelector("small");
  let constraints = "Only letters, numbers, space, dash(-) and underscore(_) allowed";

  // add error message into small
  if (message == "Invalid character"){
    small.innerHTML = `<abbr title="${constraints}">${message}</abbr>`;
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
// CHECK ALL INPUTS AT SUBMIT TIME
const checkInputs = () => {
  // get values from all the inputs
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {    
    setErrorFor(username, "Username cannot be blank");
  }
  else {    
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  }
  else if (!isSubmitEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  }
  else {
    // add success class
    setSuccessFor(email);
  }

  if (passwordValue === ""){
    setErrorFor(password, "Password cannot be blank");
  }
  else {
    setSuccessFor(password);
  }

  if (password2Value === "") {
    setErrorFor(password2, "Password2 cannot be blank");
  }
  else if (password2Value !== passwordValue) {
    setErrorFor(password2, "Passwords do not match");
  }
  else {
    setSuccessFor(password2);
  }
};

const isSubmitEmail = (input_value) => {
  if (input_value.match(emailRegex)) {    
    return true;
  }
  else {    
    return false;
  }
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

const isEmail = (input) => {
  let input_value = input.value;
  if (input_value.match(emailRegex)) {    
    return true;
  }
  else {    
    return false;
  }
};

const hasInvalidCharacters = (input) => {
  let input_value = input.value;
  //if (!validUsernameCharsetRegex.test(input_value)) {
  if (!input_value.match(validLatinAll)) {  
    return true;
  }
  else {
    return false;
  }
};