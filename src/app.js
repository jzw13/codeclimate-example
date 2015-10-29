    var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    ctx.fillStyle=("#000");
    var canvasblock = $('#blocks')[0];
    var lives = 0;
    var scale = 12.5;
    var width, height ;
    var map = new Array(500);
    var tempMap = new Array(500);
    var rate = 0.5;
    var flag = 1;
    for (i = 0; i < 500; i++) {
        map[i] = new Array(500);
        tempMap[i] = new Array(500);
    }
    function redraw(){
        lives = 0;
        scale = 500 / edge;
        ctx.clearRect(0, 0, width * scale,height * scale);
        for(i = 0; i < width; i++){
            for (j = 0; j < height; j++){
                if(map[i][j] != 2)
                    lives += map[i][j];
                if(map[i][j] == 1){
                    ctx.fillRect(i * scale, j * scale, scale, scale);
                }
                else{
                    ctx.strokeRect(i * scale, j * scale, scale, scale);
                }
            }
        }
    }
    function refresh() {
        redraw();
        if(flag == 1)
            grow();
        setTimeout("refresh()", parseInt(refresh_rate));
        $(".livecells")[0].innerHTML= String(lives);
    }
    function draw(){
        edge = parseInt($("#size_of_map").val());
        drawMap(edge, edge);
    }
    function getNeighbour(i, j){
        var num = 0;
        var tX = 0, tY = 0;
        
        for(x = i - 2; x <= i - 1; x++){
                y = j;
                tX = x;
                tY = y;
                if(tX < 0)
                    tX += width;
                if(tY < 0)
                    tY += height;
                if(tX >= width)
                    tX -= width;
                if(tY >= height)
                    tY -= height;
                if(map[tX][tY] == 1)
                    num += map[tX][tY];
            }
            for(x = i + 1; x <= i + 2; x++){
                y = j;
                tX = x;
                tY = y;
                if(tX < 0)
                    tX += width;
                if(tY < 0)
                    tY += height;
                if(tX >= width)
                    tX -= width;
                if(tY >= height)
                    tY -= height;
                if(map[tX][tY] == 1)
                    num += map[tX][tY];
            }
        for(y = j - 2; y <= j - 1; y++){
                x = i;
                tX = x;
                tY = y;
                if(tX < 0)
                    tX += width;
                if(tY < 0)
                    tY += height;
                if(tX >= width)
                    tX -= width;
                if(tY >= height)
                    tY -= height;
                if(map[tX][tY] == 1)
                    num += map[tX][tY];
        }
        for(y = j + 1; y <= j + 2; y++){
                x = i;
                tX = x;
                tY = y;
                if(tX < 0)
                    tX += width;
                if(tY < 0)
                    tY += height;
                if(tX >= width)
                    tX -= width;
                if(tY >= height)
                    tY -= height;
                if(map[tX][tY] == 1)
                    num += map[tX][tY];
        }
        return num;
    }
    function grow(){
        for(i = 0; i < width; i++){
            for(j = 0; j < height; j++){
                tempMap[i][j] = map[i][j];
            if(tempMap[i][j] != 2){
                if(getNeighbour(i, j) == 3)
                    tempMap[i][j] = 1;
                else if(getNeighbour(i, j) != 2)
                    tempMap[i][j] = 0;
                }
            }
        }
        for(i = 0; i < width; i++){
            for(j = 0; j < height; j++){
                map[i][j] = tempMap[i][j];
            }
        }
    }

    var percent = 0.5;
    var edge = 70;
    var refresh_rate = 100;

    function start(){
        percent = $("#cell_density").val();
        refresh_rate = $("#refresh_time").val();
        initializeMap(edge, edge, percent);
    }
    function reset(){
        for(i = 0 ; i < width ; i++)
            for(j = 0 ; j < height ; j++){
                map[i][j] = 0;
        }
        flag = 0;
        $('#blocks')[0].getContext("2d").clearRect(0,0, width*scale, height*scale);
        redraw();
    }
    function drawMap(x, y){
        $('#blocks')[0].getContext("2d").clearRect(0,0, width*scale, height*scale);
        width = x;
        height = y;
        for(i = 0; i < width; i++)
            for(j = 0; j < height; j++)
                ctx.strokeRect(i * scale, j * scale, scale, scale);
    }
    function initializeMap(x, y, r) {
        flag = 1;
        rate =1 - r;
        for (i = 0; i < width; i++)
            for (j = 0; j < height; j++){
                if(map[i][j] != 2){
                    if (Math.random() > rate)
                        map[i][j] = 1;
                    else map[i][j] = 0;
                }
            }
        redraw();
    }
    function continueGrow(){
        if(flag == 0){
            flag = 1;
            redraw();
        }
    }
    function pauseGrow(){
        flag += 1;
        flag = flag % 2;
    }
    function getPointOnCanvas(canvas, x, y) {
        var canvasRect =canvas.getBoundingClientRect();
        return {x:x - canvasRect.left * (canvas.width / canvasRect.width),
            y:y - canvasRect.top * (canvas.height / canvasRect.height)};
    }
    canvasblock.onmousedown = function(e){
        var mouse = getPointOnCanvas(canvasblock, e.pageX, e.pageY);
        var x, y;
        x = parseInt(mouse.x / scale);
        y = parseInt(mouse.y / scale);
        map[x][y] = 2;
        drawBlocks(x,y);
    }

    function drawBlocks(x,y){
    var ctxi = canvasblock.getContext("2d");
    ctxi.fillStyle = "rgb(255,0,0)";
    ctxi.fillRect(x*scale, y*scale, scale, scale);
    }
    refresh();
