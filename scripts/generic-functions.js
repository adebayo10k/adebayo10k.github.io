// this script is used by all pages that need generic features and content generated for them. (like navigation, so that should maybe be in this script?)

//===========================================================================================
// FOOTER // add generic footer content
const footie = document.querySelector("footer");

const generalFluff = `<p>
NOTE: The content of this site is not serious. It is not rigorous research. Assume the authors&apos; policy to be: publish first, check accuracy later (if ever). 
</p>`;

footie.innerHTML = generalFluff;

//===========================================================================================
// TOGGLE NAVIGATION DISPLAY
let burger = document.getElementById("burger");
//console.log(burger.clientHeight);
//console.log(burger.clientWidth);

let navGrid = document.getElementById("nav-links");

// toggle between display styles on tablet and mobile screens
const toggleNav = () => {   
    navGrid.className = navGrid.className == "nav-grid" ? "nav-grid open-grid" : "nav-grid";
    //console.log(navGrid.className);
};

// display the navigation by default
const openNav = () => {
    navGrid.className = "nav-grid open-grid";
    //console.log(navGrid.className);
};

//===========================================================================================
// TOGGLE HEADER HEADINGS DISPLAY
let headHeadings = document.querySelectorAll(".toggled-heading");
//console.log(headHeadings);

// toggle between display styles on tablet and mobile screens
const toggleHeadings = () => {
  for (index in headHeadings) {
    headHeadings[index].className = headHeadings[index].className == "toggled-heading" ? "toggled-heading hidden" : "toggled-heading";
  }
};
// display header headings by default
const showHeadings = () => {
  for (index in headHeadings) {
    headHeadings[index].className = "toggled-heading";
  }
}

//===========================================================================================

// check whether fa icon url was received.
// if not, we'll have to just display the navigation by default
// TODO: later on, catch and handle the download failure ERROR
if (burger.clientHeight == 0 || burger.clientWidth == 0){
  openNav();
  showHeadings();
}