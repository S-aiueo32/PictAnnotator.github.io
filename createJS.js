window.addEventListener("load", init);

var cj = createjs;
var stagee
var circle = new Array();

console.log(cj);

function init() {
    //ステージ生成
    stage = new cj.Stage("ann_canvas");

    circle[0] = new cj.Shape();
    circle[0].x = stage.canvas.width / 2;
    circle[0].y = stage.canvas.height / 2;
    circle[0].graphics.beginFill("#ffffff").drawCircle(0, 0, 10);

    circle.push(new cj.Shape);
    circle[1].x = stage.canvas.width / 2 + 20;
    circle[1].y = stage.canvas.height / 2 + 20;
    circle[1].graphics.beginFill("#ffffff").drawCircle(0, 0, 10);

    for (var i = 0; i < circle.length; i++)
        stage.addChild(circle[i]);

    //ステージ更新
    stage.update();

}

cj.Ticker.addEventListener("tick", handleTick);
createjs.Ticker.framerate = 60;

//自動更新
function handleTick() {
    for (var i = 0; i < circle.length; i++) {
        circle[i].scaleX *= 1.01;
        circle[i].scaleY *= 1.01;

        if (circle[i].scaleX > 2) {
            //circle.x = 0;
            circle[i].scaleX = 1;
            circle[i].scaleY = 1;
        }
    }
    stage.update();
}
