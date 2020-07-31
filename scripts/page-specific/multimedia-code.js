// consult storage for latest background settings
const htmlElem = document.querySelector("html");
if (localStorage.getItem("bgColour")){
    htmlElem.style.backgroundColor = `${localStorage.getItem("bgColour")}`;    
}

// assign value of iframe src attribute, and get the resource AFTER page content has loaded
const mmediaMapEmbed01 = document.getElementById("mmediaMapEmbed01");
mmediaMapEmbed01.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5773.980672629669!2d13.378977864188501!3d52.521495071318206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c1bd5ef659%3A0x89600299d695c49e!2sMarienstra%C3%9Fe%2C%2010117%20Berlin%2C%20Germany!5e0!3m2!1sen!2suk!4v1591308622464!5m2!1sen!2suk";

const mmediaVideoEmbed01 = document.getElementById("mmediaVideoEmbed01");
mmediaVideoEmbed01.src = "https://www.youtube.com/embed/9tXsxBzGJzw";

const mmediaAudioEmbed01 = document.getElementById("mmediaAudioEmbed01");
mmediaAudioEmbed01.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/476152911&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";


