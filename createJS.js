window.addEventListener("load", init);

var cj = createjs,
    circle = new Array(),
    globalCnt = 0,
    stage,
    img,
    hitObj;


function init() {
    stage = new cj.Stage("ann_canvas");
    var size = getDummySize();
    stage.canvas.width = size[0];
    stage.canvas.height = size[1];
    stage.enableMouseOver();

    img = new cj.Bitmap(getDummyPath());
    //img.addEventListener("click", handleClick);
    hitObj = new cj.Shape();
    hitObj.alpha = 0.01;
    hitObj.graphics.beginFill("white").drawRect(0, 0, size[0], size[1]);
    hitObj.addEventListener("click", handleClick);

    circle.push([new cj.Shape, "text", 0]);
    circle[0][0].x = stage.canvas.width / 2;
    circle[0][0].y = stage.canvas.height / 2;
    circle[0][0].shadow = new cj.Shadow("rgba(0,0,0,0.25)", 1, 2, 5);
    circle[0][0].alpha = 0.5;
    circle[0][0].graphics.beginFill("white").drawCircle(0, 0, 10);

    circle.push([new cj.Shape, "text", 1]);
    circle[1][0].x = stage.canvas.width / 2 + 20;
    circle[1][0].y = stage.canvas.height / 2 + 20;
    circle[1][0].shadow = new cj.Shadow("rgba(0,0,0,0.25)", 1, 2, 3);
    circle[1][0].alpha = 0.5;
    circle[1][0].graphics.beginFill("white").drawCircle(0, 0, 10);

    stage.addChild(img);
    stage.addChild(hitObj);
    for (var i = 0; i < circle.length; i++) {
        circle[i][0].addEventListener("mouseover", handleMouseOver);
        circle[i][0].addEventListener("mouseout", handleMouseOut);
        stage.addChild(circle[i][0]);
    }

    stage.update();

}

cj.Ticker.addEventListener("tick", handleTick);
cj.Ticker.framerate = 60;

function handleTick() {
    var mx = stage.mouseX,
        my = stage.mouseY;
    for (var i = 0; i < circle.length; i++) {
        circle[i][0].scaleX *= 1.01;
        circle[i][0].scaleY *= 1.01;
        if (circle[i][0].scaleX > 2) {
            circle[i][0].scaleX = 1;
            circle[i][0].scaleY = 1;
        }
    }
    stage.update();
}

function handleMouseOver(e) {
    e.target.alpha = 0.9;
    console.log(e.target)
}

function handleMouseOut(e) {
    e.target.alpha = 0.5;
    //console.log(e.currentTarget)
}

function handleClick(e) {
    var mx = stage.mouseX,
        my = stage.mouseY;
    //console.log(mx, my)
    document.getElementById('x-coord').innerHTML = mx;
    document.getElementById('y-coord').innerHTML = my;

    var r = mx.toString() + "," + my.toString() + "," +
        document.getElementById("annotation").value + "\n";
    document.getElementById("res").innerHTML = r;

    document.getElementById("annotation").value =
        "Input Your Annotation and Click its Position.";
    //tweet(r, file_name);
}

function getDummySize() {
    var dummy = document.getElementById('dummy');
    return [dummy.width, dummy.height];
}

function getDummyPath() {
    var dummy = document.getElementById('dummy');
    return dummy.src;
}
