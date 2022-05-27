// this script is used by all pages that need generic, common features and content generated for them. (like navigation)

//===========================================================================================
// query storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")) {
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;
}

//===========================================================================================
// HEADER // add generic header content siteLogo-wide
const siteLogo = document.getElementById("siteLogo");
const logoText = `AlgoDiscoDev`;

siteLogo.innerHTML = `${logoText}`;

//===========================================================================================
// ASIDE // adds this list of links to the RHS aside of every page
const aside = document.querySelector("aside");

// this if condition is needed until all pages get the grid layout structure's aside element
if (aside) {

    const asideLinks = `<section>

  <a href="https://github.com/adebayo10k" title="links to GitHub repository of adebayo10k" target="_blank"><p>Use Our Code</p></a>

  <!--
  <a href="https://yorubasystems.com" title="links to an amazing language test web app" target="_blank"><p>An amazing yoruba language vocabulary test web application</p></a>
  -->

  <a href="http://yorubasystems.com" title="bit emabarrassing, but this now takes you to a failover static page (http), until site back online" target="_blank"><p>An amazing yoruba language vocabulary test web application</p></a>

  

  <p>Report content errors or site use problems</p>
  <p>How to collaborate with adebayo10k</p>
  </section>`;

    aside.innerHTML = asideLinks;

}

//===========================================================================================
// SET A PATH VARIABLE FOR USE BY HEADER AND FOOTER NAV LINK PATHS

const depth0 = "./"; const depth1 = "../"; const depth2 = "../../";
let pathPre = depth0; // default case

// if the page is being built in the projects directory
if (this.location.toString().includes("/projects/")) {
    pathPre = depth1;
}

//===========================================================================================
// FOOTER // add generic footer content siteLogo-wide
const footie = document.querySelector("footer");

const footerText = `<!-- site map -->
<nav class="footer-nav" id="footerSiteMap">
    <ul>
        <li>
            <a href="${pathPre}index.html">Projects</a>
        </li>
        <li>
            <a href="${pathPre}cloud.html">Cloud</a>
        </li>
        <li>
            <a href="${pathPre}skills.html">Skills</a>
        </li>
        <li>
            <a href="${pathPre}multimedia.html">Multimedia</a>
        </li>
        <li>
            <a href="${pathPre}research.html">Research</a>
        </li>
        <li>
            <a href="${pathPre}yoruba-web.html">Yorùbá Web</a>
        </li>
    </ul>
</nav>

<!-- contact links -->
<div>
    <h3>Contact</h3>
    <ul>
        <li>LinkedIn</li>
    </ul>
</div>


<!-- credits links -->
<div>
    <h3>Credits</h3>
    <ul>
        <li>Designed by: algoDisco</li>
        <li>Engineered by: softMod and compSim</li>
        <li>Powered by: Sol</li>
    </ul>
</div>


<!-- notices links -->`;

footie.innerHTML = footerText;

//===========================================================================================
// BUILD PAGE HEADER NAVIGATION DISPLAY
const navGrid = document.getElementById("nav-links");

navGrid.innerHTML = `
<li>
  <a href="${pathPre}index.html" title="Homepage (Projects)">Projects</a>
</li>
<li>
  <a href="${pathPre}cloud.html" title="cloud research">Cloud</a>
</li>                    
<li>
  <a href="${pathPre}skills.html" title="skills page">Skills</a>
</li>
<li>
  <a href="${pathPre}multimedia.html" title="multimedia page">Multimedia</a>    
</li>
<li>
  <a href="${pathPre}research.html" title="research">Research</a>
</li>
<li>
  <a href="${pathPre}yoruba-web.html" title="yoruba language on the web">Yorùbá Web</a>
</li>
`;

//===========================================================================================
// TOGGLE NAVIGATION DISPLAY
const burger = document.getElementById("burger");
//console.log(burger.clientHeight);
//console.log(burger.clientWidth);

const hitZone = document.getElementById("nav-icon-hitzone");

// click event on hitzone that contains just the nav icon
// (basically, the headers disappear along with the navigation menu, leaving just the burger bars icon)
hitZone.addEventListener("click", (event) => {
    // toggle between visible and hidden headers. Useful on smaller, tablet and mobile screens
    const toggleHeadings = () => {
        for (index in headHeadings) {
            headHeadings[index].className = headHeadings[index].className == "toggled-heading" ? "toggled-heading hidden" : "toggled-heading";
        }
    };
    // toggle between visible and hidden navigation. Usefull on smaller, tablet and mobile screens
    const toggleNav = () => {
        navGrid.className = navGrid.className == "nav-grid" ? "nav-grid open-grid" : "nav-grid";
        //console.log(navGrid.className);
    };

    toggleNav();
    toggleHeadings();

});


//===========================================================================================
// SHOW/HIDE HEADER HEADINGS AND NAVIGATION MENU BY DEFAULT  
const headHeadings = document.querySelectorAll(".toggled-heading");
//console.log(headHeadings);

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
if (burger.clientHeight == 0 || burger.clientWidth == 0) {
    openNav();
    showHeadings();
}
// otherwise, hide nav and headings by default
else {
    closeNav();
    hideHeadings();
}

//===========================================================================================


