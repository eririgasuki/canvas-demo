var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

autoSetCanvasSize();
listenToUser(canvas);


var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth
canvas.height = pageHeight

clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
upload.onclick = function () {
    getImage.click();
}

getImageSrc = function () {

    var files = getImage.files[0]
    var url = URL.createObjectURL(files)
    var img = new Image();
    img.src = url
    img.onload = function () {
        canvas.width = Math.max(img.width,canvas.width)
        canvas.height = Math.max(img.height,canvas.height)
        ctx.drawImage(img, 0, 0)
    }

}


download.onclick = function () {
    var url = canvas.toDataURL("img.png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'image'
    a.target = '_blank'
    a.click()
}

var eraserEnable = false
var colors = 'red'
eraser.onclick = function () {
    eraserEnable = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
pencil.onclick = function () {
    eraserEnable = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
red.onclick = function () {
    colors = 'red'
    red.classList.add('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
    eraserEnable = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
yellow.onclick = function () {
    colors = 'yellow'
    red.classList.remove('active')
    yellow.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
    eraserEnable = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
blue.onclick = function () {
    colors = 'blue'
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
    eraserEnable = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
black.onclick = function () {
    colors = 'black'
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
    black.classList.add('active')
    eraserEnable = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
var lineWidth = 4

thin.onclick = function () {
    lineWidth = 4
    thin.classList.add('active')
    normal.classList.remove('active')
    thick.classList.remove('active')
}
normal.onclick = function () {
    lineWidth = 8
    thin.classList.remove('active')
    normal.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 12
    thin.classList.remove('active')
    normal.classList.remove('active')
    thick.classList.add('active')
}

/* 设置函数 */

function autoSetCanvasSize() {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }
}

function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth
    canvas.height = pageHeight
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = colors;
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function listenToUser(canvas) {
    var using = false
    var lastpoint = {
        "x": undefined,
        "y": undefined
    }
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (MouseEvent) {
            var x = MouseEvent.touches[0].clientX
            var y = MouseEvent.touches[0].clientY
            using = true
            if (eraserEnable) {
                ctx.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth)
            } else {
                ctx.fillStyle = colors
                ctx.fillRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth)
                lastpoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) { return }
            if (eraserEnable) {
                ctx.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth)
            } else {
                var newpoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint;
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnable) {
                ctx.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth)
            } else {
                ctx.fillStyle = colors
                ctx.fillRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth)
                lastpoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) { return }
            if (eraserEnable) {
                ctx.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth)
            } else {
                var newpoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint;
            }
        }
        canvas.onmouseup = function () {
            using = false
        }
    }
}

