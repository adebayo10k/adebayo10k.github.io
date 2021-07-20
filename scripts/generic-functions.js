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
const logoText = `AlgoDiscoDev Software Development`;

siteLogo.innerHTML = logoText;

//===========================================================================================
// FOOTER // add generic footer content siteLogo-wide
const footie = document.querySelector("footer");

const footerText = `<p>
NOTE: The content of this website is not yet ready for live, prime time. It is not rigorously researched. Assume the authors&apos; policy to be: publish first, check accuracy later (if ever). We&apos;re not talking about our code. That&apos;s already rock solid.
</p>`;

footie.innerHTML = footerText;

//===========================================================================================
// BUILD NAVIGATION DISPLAY
const navGrid = document.getElementById("nav-links");
const depth0 = "./"; const depth1 = "../"; const depth2 = "../../";
let pathPre = depth0;

// if the page is being built in the projects directory
if (this.location.toString().includes("/projects/")) {
    pathPre = depth1;
}

navGrid.innerHTML = `
<li>
  <a href="${pathPre}index.html" title="our projects page">Our Projects</a>
</li>
<li>
  <a href="${pathPre}your-projects.html" title="start your own offline projects right here">Your Projects</a>
</li>                    
<li>
  <a href="${pathPre}social-coding.html" title="social coding page">social coding</a>
</li>
<li>
  <a href="${pathPre}multimedia.html" title="multimedia page">multimedia wins</a>    
</li>
<li>
  <a href="${pathPre}yoruba-systems.html" title="yoruba systems">Yoruba Systems</a>
</li>
<li>
  <a href="${pathPre}yoruba-contexts.html" title="yoruba contexts">Yoruba Contexts</a>
</li>
`;

//===========================================================================================
// TOGGLE NAVIGATION DISPLAY
const burger = document.getElementById("burger");
//console.log(burger.clientHeight);
//console.log(burger.clientWidth);

const hitZone = document.getElementById("nav-icon-hitzone");

// click event on hitzone that contains just the nav icon
// (basically, the headers disappear along with the navigation menu, leaving just the burger bars)
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
// MANAGE HERO MESSAGES

const heroImg_0 = "";
const heroImg_1 = "../media/images/hero-images/rubiks-cube-02-2400.jpg";
const heroImg_2 = "../media/images/hero-images/rubiks-cube-03-2400.jpg";
const heroImg_3 = "../media/images/hero-images/bash-vscode-01-1250.jpg";

const heroMsg_0 = `"Seek TRUTH, exploit FALLACY, live well."`;
const heroMsg_1 = `"Build great stuff that you genuinely care about"`;
const heroMsg_2 = `"If you don't feel passionately... seriously, don't bother."`;
const heroMsg_3 = `"Computer Technology, Yoruba Context. Let's Go!"`;
const heroMsg_4 = `"Build stuff that you actually give a s*** about."`;
const heroMsg_5 = `"Poor code is worse that no code"`;
const heroMsg_6 = `"A language fit to support all concepts - both new and old"`;
const heroMsg_7 = `"Our Philosophies are our foundations."`;
const heroMsg_8 = `"When you're done with the Munchkin services, Join Us."`;
const heroMsg_9 = `"Let's build on solid ground."`;
const heroMsg_10 = `"There is no market for shit coders."`;
// default messages to remain in html?
// character count aware, due to limited space

// anfani nipase&#x0323; imo&#x0323;-e&#x0323;ro&#x0323; => vorsprung durch technik

const img5 = "";
const img6 = "";

// multimedia

// social-coding

// yoruba

// yoruba-forms
