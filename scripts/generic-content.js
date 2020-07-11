// this script is used by all pages that need generic features and content generated for them. (like navigation, so that should maybe be in this script?)

// add generic footer content
const footie = document.querySelector("footer");

const generalFluff = `<p>
NOTE: The content of this site is not serious. It is not rigorous research. Assume the authors&apos; policy to be: publish first, check accuracy later (if ever). 
</p>`;

footie.innerHTML = generalFluff;