// this script is used by all pages that need generic, common features and content generated for them. (like navigation)

//===========================================================================================
// query storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")) {
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;
}

//===========================================================================================
// SET A PATH VARIABLE FOR USE BY ASIDE, HEADER NAV AND FOOTER NAV LINK PATHS

const depth0 = "./"; const depth1 = "../"; const depth2 = "../../";
let pathPre = depth0; // default case

// if the page is being built in the projects directory
if (this.location.toString().includes("/projects/")) {
    pathPre = depth1;
}

//===========================================================================================
// ASIDE // adds this list of links to the RHS aside of every page
const aside = document.querySelector("aside");

// this if condition is needed until all pages get the grid layout structure's aside element
if (aside) {

    const asideLinks = `

    <section>  
    <header>
    <h2>Site Links</h2>
    </header>
      
        <section>  
        <header>
        <h3>Project Links</h3>
        </header>
        
        <p><a href="${pathPre}projects/gpg-encrypt.html" title="go to a brief summary of this project" target="_self">GnuPG (gpg) Encryption Using JSON Profiles</a></p>

        <p><a href="${pathPre}projects/expressvpn-upgrader.html" title="go to a brief summary of this project" target="_self">Expressvpn CLI Client Package Upgrader</a></p>

        <p><a href="${pathPre}projects/yoruba-vocab-test.html" title="go to a brief summary of this project" target="_self">Vocabulary tests for English speaking Yoruba language learners</a></p>

        <p><a href="${pathPre}projects/ffmpeg-multi.html" title="go to a brief summary of this project" target="_self">Multi AV file converter using ffmpeg</a></p>

        <p><a href="${pathPre}projects/dockerise-github-site.html" title="go to a brief summary of this project" target="_self">Docker Containerisation of this GitHub Pages Site</a></p>

        <p><a href="${pathPre}projects/microbit-morse.html" title="go to a brief summary of this project" target="_self">bbc micro:bit morse code</a></p>
        
        </section>
    <!---->

        <section>  
        <header>
        <h3>Help Links</h3>
        </header>
        <p>Report content errors or site use problems</p>
        <p>How to collaborate with adebayo10k</p>    
        </section>
  
    </section>
    
    <section>    
    <header>
    <h2>External Links</h2>
    </header>
    <p>
    <a href="https://github.com/adebayo10k" title="links to GitHub source code repository of adebayo10k" target="_blank">Project Source Code</a>
    </p>
    <p>
    <a href="http://yorubasystems.com" title="An aws hosted development project site" target="_blank">A Yoruba language vocabulary test web application project</a>
    </p>
    </section>
    `;

    aside.innerHTML = asideLinks;

}

//===========================================================================================
// HEADER // add generic header content siteLogo-wide
const siteLogo = document.getElementById("siteLogo");
const logoText = `AlgoDiscoDev`;

//siteLogo.innerHTML = `${logoText}`;
siteLogo.innerHTML = `<a href="${pathPre}index.html" title="Site Homepage (Projects)" target="_self">${logoText}</a>`;

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
            <a href="${pathPre}posts-answers.html" title="blog posts and stack exchange answers">Posts and Answers</a>
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
        <li>Developed by: Damola Adebayo</li>
        <li>Maintained by: Damola Adebayo</li>
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
  <a href="${pathPre}posts-answers.html" title="blog posts and stack exchange answers">Posts and Answers</a>
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
// add a last modified line to pages
const lastModified = document.getElementById("lastModified"); 
const lastModifiedStr = new Date(document.lastModified).toString();

// this if condition is needed as not all pages will get this feature
if (lastModified) {

    const lastModifiedInfo = `<i>Last Updated: ${lastModifiedStr}.</i>`;

    lastModified.innerHTML = lastModifiedInfo;

}

//===========================================================================================


