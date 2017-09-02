var cj = createjs,
    img;


function init() {
    //stage = new cj.Stage("canvas");
    img = new cj.Bitmap("./images/majo.gif");
    img.onload = function() {
        img.x = stage.canvas.width;
        img.y = stage.canvas.height / 2;
        img.regY = img.getBounds().height / 2;
        stage.addChild(img);
        console.log("Done Here!");
    }
    //img.x = stage.canvas.width/2;
    //img.y = stage.canvas.height/2;
    //stage.addChild(shape);

    stage.update();

    cj.Ticker.addEventListener("tick", handleTick);
    cj.Ticker.framerate = 60;
}

function handleTick() {
    img.x -= 5;
    if (img.x < -stage.canvas.width)
        img.x = stage.canvas.width
    stage.update();
}

function handleMouseOver(e) {
    var parent = e.target.parent,
        circle = parent.getChildAt(0),
        rect = parent.getChildAt(1),
        text = parent.getChildAt(2);
    circle.alpha = 0.9;
    rect.alpha = 0.9;
    text.alpha = 0.9;
}

function handleMouseOut(e) {
    var parent = e.target.parent,
        circle = parent.getChildAt(0),
        rect = parent.getChildAt(1),
        text = parent.getChildAt(2);
    circle.alpha = 0.5;
    rect.alpha = 0;
    text.alpha = 0;
}

function handleClick(e) {
    var mx = Math.floor(stage.mouseX),
        my = Math.floor(stage.mouseY),
        r = mx.toString() + "," + my.toString() + "," +
        document.getElementById("annotation").value + "\n";
    document.getElementById('x-coord').innerHTML = mx;
    document.getElementById('y-coord').innerHTML = my;
    document.getElementById("res").innerHTML = r;
    //document.getElementById("annotation").value =
    //    "Input Your Annotation and Click its Position.";
    //tweet(r, file_name);
}
