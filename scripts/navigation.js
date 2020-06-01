//
const toggleNav = () => {
    let navGrid = document.getElementById("nav-links");
    // toggle between display styles on mobile screens
    navGrid.className = 
        navGrid.className == "nav-grid" ? "nav-grid open-grid" : "nav-grid";
    console.log(navGrid.className);
};