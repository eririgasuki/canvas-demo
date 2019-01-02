var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth
canvas.height = pageHeight

autoSetCanvasSize();
listenToUser(canvas);
hidePhoneRuler();

function hidePhoneRuler() {
    console.log(pageWidth)
    if (pageWidth < 500) {
        ruler1.style.display = 'none';
        ruler2.style.display = 'none';
    }
}

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
        if (pageWidth > 500) {
            canvas.width = Math.max(img.width + 60, canvas.width)
            canvas.height = Math.max(img.height + 50, canvas.height)
            ctx.drawImage(img, 60, 50)
        } else {
            var drawWidth = Math.min(img.width, canvas.width)
            var drawHeight = img.height * drawWidth / img.width
            ctx.drawImage(img, 0, 0, drawWidth, drawHeight)
        }
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
    thin.classList.add('activeline')
    normal.classList.remove('activeline')
    thick.classList.remove('activeline')
}
normal.onclick = function () {
    lineWidth = 8
    thin.classList.remove('activeline')
    normal.classList.add('activeline')
    thick.classList.remove('activeline')
}
thick.onclick = function () {
    lineWidth = 12
    thin.classList.remove('activeline')
    normal.classList.remove('activeline')
    thick.classList.add('activeline')
}
var auxiliary1 = false
var auxiliary2 = false
ruler1.onclick = function () {
    if (auxiliary1) {
        ruler1.classList.remove('actived')
        auxiliary1 = false
        AR1.classList.add('unseen')
    } else {
        ruler1.classList.add('actived')
        auxiliary1 = true
        AR1.classList.remove('unseen')
    }
}
ruler2.onclick = function () {
    if (auxiliary2) {
        ruler2.classList.remove('actived')
        auxiliary2 = false
        AR2.classList.add('unseen')
    } else {
        ruler2.classList.add('actived')
        auxiliary2 = true
        AR2.classList.remove('unseen')
    }
}

var moveFlag = false
AR1.onmousedown = function (eee) {
    moveFlag = true
    var x = eee.pageX - AR1.offsetLeft
    var y = eee.pageY - AR1.offsetTop
    document.onmousemove = function (eee) {
        if (moveFlag) {
            AR1.style.left = eee.pageX - x + 'px'
            AR1.style.top = eee.pageY - y + 'px'
            AR1.onmouseup = function () {
                moveFlag = false
            }
        }
    }
}
AR2.onmousedown = function (eee) {
    moveFlag = true
    var x = eee.pageX - AR2.offsetLeft
    var y = eee.pageY - AR2.offsetTop
    document.onmousemove = function (eee) {
        if (moveFlag) {
            AR2.style.left = eee.pageX - x + 'px'
            AR2.style.top = eee.pageY - y + 'px'
            AR2.onmouseup = function () {
                moveFlag = false
            }
        }
    }
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
            var x = aaa.pageX
            var y = aaa.pageY
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
            var x = aaa.pageX
            var y = aaa.pageY
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

