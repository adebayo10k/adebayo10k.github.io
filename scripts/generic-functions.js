// this script is used by all pages that need generic features and content generated for them. (like navigation, so that should maybe be in this script?)

//===========================================================================================
// HEADER // add generic header content siteLogo-wide
const siteLogo = document.getElementById("siteLogo");
const logoText = `AlgoDiscoDev Software Engineering`;

siteLogo.innerHTML = logoText;

//===========================================================================================
// FOOTER // add generic footer content siteLogo-wide
const footie = document.querySelector("footer");

const footerText = `<p>
NOTE: The content of this website is not yet ready for live, prime time. It is not rigorously researched. Assume the authors&apos; policy to be: publish first, check accuracy later (if ever). We&apos;re not talking about our code. That&apos;s already rock solid.
</p>`;

footie.innerHTML = footerText;

//===========================================================================================
// TOGGLE NAVIGATION DISPLAY
const burger = document.getElementById("burger");
//console.log(burger.clientHeight);
//console.log(burger.clientWidth);

const hitZone = document.getElementById("nav-icon-hitzone");

const navGrid = document.getElementById("nav-links");


// click event on hitzone that contains just the nav icon
hitZone.addEventListener("click", (event) => {
  toggleNav();
  toggleHeadings();
});


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

// hide the navigation by default
const closeNav = () => {
  navGrid.className = "nav-grid";
  //console.log(navGrid.className);
};

//===========================================================================================
// TOGGLE HEADER HEADINGS DISPLAY
const headHeadings = document.querySelectorAll(".toggled-heading");
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

// hide header headings by default
const hideHeadings = () => {
  for (index in headHeadings) {
    headHeadings[index].className = "toggled-heading hidden";
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
// otherwise, hide nav and headings by default
else {
  closeNav();
  hideHeadings();
}

//===========================================================================================
// MANAGE HERO MESSAGES
