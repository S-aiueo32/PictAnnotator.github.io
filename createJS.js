window.addEventListener("load", init);

var cj = createjs,
    data,
    cont_array,
    globalCnt = 0,
    stage,
    img,
    hitObj,
    size;


function init() {
    var obj1 = document.getElementById("input");
    obj1.addEventListener("change", function(evt) {
        var file = evt.target.files;
        var reader = new FileReader();
        reader.readAsText(file[0]);
        reader.onload = function(ev) {
            //alert(reader.result);
            ln = reader.result.split("\n");
            an = ln.length - 1;
            dummy = document.getElementById("dummy")
            dummy.src = ln[0];
            //console.log(document.getElementById("dummy"))
            data = []
            for (var i = 1; i < an; i++) {
                w = ln[i].split(",");
                data.push(w);
            }
            //console.log(data);
            dummy.onload = function() {
                draw();
            }
        }
    }, false);
}

function draw() {
    stage = new cj.Stage("ann_canvas");
    img = new cj.Bitmap(getDummyPath());
    hitObj = new cj.Shape();
    size = getDummySize();

    stage.removeAllChildren();
    cont_array = [];

    stage.canvas.width = size[0];
    stage.canvas.height = size[1];
    stage.enableMouseOver();

    //stage.update();

    hitObj.alpha = 0.01;
    hitObj.graphics.beginFill("white").drawRect(0, 0, size[0], size[1]);
    hitObj.addEventListener("click", handleClick);

    stage.addChild(img);
    stage.addChild(hitObj);
    for (var i = 0; i < data.length; i++) {
        cont_array.push(makeTag(data[i]));
        stage.addChild(cont_array[i]);
    }

    stage.update();

    cj.Ticker.addEventListener("tick", handleTick);
    cj.Ticker.framerate = 60;
}

function handleTick() {
    for (var i = 0; i < cont_array.length; i++) {
        circle = cont_array[i].getChildAt(0);
        circle.scaleX *= 1.01;
        circle.scaleY *= 1.01;
        if (circle.scaleX > 2) {
            circle.scaleX = 1;
            circle.scaleY = 1;
        }
    }
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

/*
function handleChange(e) {
    var file = e.target.files;
    var reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function(ev) {
        alert(reader.result);
        ln = reader.result.split("\n");
        an = ln.length - 1;
        document.getElementById("dummy").src = ln[0];
        for (var i = 1; i < an + 1; i++) {
            w = ln[i].split(",");
            px[i - 1] = w[0];
            py[i - 1] = w[1];
            tx[i - 1] = w[2];
        }
    }
}
*/

function getDummySize() {
    var dummy = document.getElementById('dummy');
    return [dummy.width, dummy.height];
}

function getDummyPath() {
    var dummy = document.getElementById('dummy');
    return dummy.src;
}

function getData() {
    var data = [
        [47, 227, "風が吹いている"],
        [338, 172, "顔が描かれていない"],
        [266, 643, "タッチがよい"]
    ]
    return data;
}


function makeTag(data_) {
    var container = new cj.Container(),
        circle = new cj.Shape(),
        text = new cj.Text(data_[2], "15px Arial", "black"),
        rect = new cj.Shape();

    circle.x = Number(data_[0]);
    circle.y = Number(data_[1]);
    circle.alpha = 0.5;
    circle.shadow = new cj.Shadow("rgba(0,0,0,0.25)", 1, 2, 5);
    circle.graphics.beginFill("white").drawCircle(0, 0, 10);
    circle.addEventListener("mouseover", handleMouseOver);
    circle.addEventListener("mouseout", handleMouseOut);
    container.addChild(circle);

    text.x = circle.x;
    text.y = circle.y + 10;
    text.alpha = 0;

    rect.x = circle.x;
    rect.y = circle.y + 10;
    rect.alpha = 0;
    rect.shadow = new cj.Shadow("rgba(0,0,0,0.25)", 1, 2, 5);
    rect.graphics.beginFill("white").drawRect(-5, -5,
        text.getMeasuredWidth() + 10, text.getMeasuredLineHeight() + 10);

    container.addChild(circle);
    container.addChild(rect);
    container.addChild(text);

    return container;
}
