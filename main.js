var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth
canvas.height = pageHeight

var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = true
    actions.className = 'actions x'
}

brush.onclick = function () {
    eraserEnable = false
    actions.className = 'actions'
}

var clickdown = false

var lastpoint = {
    "x": undefined,
    "y": undefined
}

canvas.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    clickdown = true
    if (eraserEnable) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
    } else {
        ctx.fillRect(x - 5, y - 5, 10, 10)
        lastpoint = {
            "x": x,
            "y": y
        }
    }
}

canvas.onmousemove = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    if (!clickdown) { return }
    if (eraserEnable) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
    } else {
        var newpoint = {
            "x": x,
            "y": y
        }
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(lastpoint.x, lastpoint.y);
        ctx.lineWidth = 10;
        ctx.lineTo(newpoint.x, newpoint.y);
        ctx.stroke();
        ctx.closePath();
        lastpoint = newpoint;
    }
}

canvas.onmouseup = function (aaa) {
    clickdown = false
}