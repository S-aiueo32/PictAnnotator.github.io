window.addEventListener("load", init);

var cj = createjs;

function init(){
    logo = document.getElementById("logo");
    title = document.getElementById("mv-title-wrap");
    caption = document.getElementById("mv-caption");

    document.Ticker.addEventListener("tick", handleTick);
    document.Ticker.framerate = 1;
}

function handleTick() {
    console.log(typeof(parseInt(logo.style.opacity)))
    if(parseInt(logo.style.opacity) <= 1.){
        logo.style.opacity = (parseInt(logo.style.opacity) + 0.1 +";");
        console.log("Done.");
    }
    //console.log(logo.style.opacity)
}
