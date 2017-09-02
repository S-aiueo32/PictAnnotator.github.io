window.addEventListener("load", adjustSize);
window.addEventListener("resize", adjustSize);

function adjustSize() {
    header = document.getElementsByTagName("header")[0];
    content = document.getElementById("content");
    canvas = document.getElementById("canvas");
    footer = document.getElementsByTagName("footer")[0];

    stage = new cj.Stage("canvas");
    stage.canvas.height = document.documentElement.clientHeight -
        (header.clientHeight + footer.clientHeight);
    stage.canvas.width = window.innerWidth;
    stage.update();

    init();
}
