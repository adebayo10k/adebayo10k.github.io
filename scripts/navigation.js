// This script is used by all pages with navigation
let burger = document.getElementById("burger");
console.log(burger.clientHeight);
console.log(burger.clientWidth);

let navGrid = document.getElementById("nav-links");

// toggle between display styles on mobile screens
const toggleNav = () => {   
    navGrid.className = navGrid.className == "nav-grid" ? "nav-grid open-grid" : "nav-grid";
    console.log(navGrid.className);
};

// display the navigation by default
const openNav = () => {
    navGrid.className = "nav-grid open-grid";
    console.log(navGrid.className);
};

// check whether fa icon url was received.
// if not, we'll have to just display the navigation by default
// TODO: later on, catch and handle the download failure ERROR
if (burger.clientHeight == 0 || burger.clientWidth == 0){
    openNav();
}



