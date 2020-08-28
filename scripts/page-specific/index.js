// consult storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}
/*
const testCard = document.getElementById("test-card");

const projInfoLayer = document.querySelector(".project-info-layer");

console.log(projInfoLayer);

projInfoLayer.addEventListener("mouseenter", (event) => {
  event.target.style.visibility = "hidden";
  console.log(event.target);
  //event.target.setAttribute("visibility", "hidden");

})

projInfoLayer.addEventListener("mouseout", (event) => {
  event.target.style.visibility = "visible";

})

console.log(projInfoLayer);
*/
