window.addEventListener("load", init);

var cj = createjs,
    circle = new Array(),
    globalCnt = 0,
    stage,
    img;


function init() {
    stage = new cj.Stage("ann_canvas");
    var size = getDummySize();
    stage.canvas.width = size[0];
    stage.canvas.height = size[1];

    img = new createjs.Bitmap(getDummyPath());
    stage.addChild(img);

    circle.push([new cj.Shape, 0]);
    circle[0][0].x = stage.canvas.width / 2;
    circle[0][0].y = stage.canvas.height / 2;
    circle[0][0].shadow = new cj.Shadow("rgba(0,0,0,0.25)", 1, 2, 3);
    circle[0][0].graphics.beginFill("rgba(255,255,255,0.75)").drawCircle(0, 0, 10);


    circle.push([new cj.Shape, 1]);
    circle[1][0].x = stage.canvas.width / 2 + 20;
    circle[1][0].y = stage.canvas.height / 2 + 20;
    circle[1][0].shadow = new cj.Shadow("rgba(0,0,0,0.25)", 1, 2, 3);
    circle[1][0].graphics.beginFill("rgba(255,255,255,0.75)").drawCircle(0, 0, 10);

    for (var i = 0; i < circle.length; i++)
        stage.addChild(circle[i][0]);

    //ステージ更新
    stage.update();

}

cj.Ticker.addEventListener("tick", handleTick);
createjs.Ticker.framerate = 60;

//自動更新
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
        if ((circle[i][0].x - 15 < mx && mx < circle[i][0].x + 15) &&
            (circle[i][0].y - 15 < my && my < circle[i][0].y + 15))
            circle[i][0].alpha = 1;
        else
            circle[i][0].alpha = 0.75;
    }
    stage.update();
}

function getDummySize() {
    var dummy = document.getElementById('dummy');
    return [dummy.width, dummy.height];
}

function getDummyPath() {
    var dummy = document.getElementById('dummy');
    return dummy.src;
}
