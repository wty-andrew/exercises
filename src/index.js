/** Introduction */
function ep1() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    for (var _ = 0; _ < 100; _ += 1) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    };
};
/** Intro to Trigonometry */
function ep2() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.translate(0, height / 2);
    ctx.scale(1, -1);
    var angle = 0;
    for (; angle < Math.PI * 2; ) {
        ctx.fillRect(angle * (width / (2 * Math.PI)), Math.sin(angle) * (width / (2 * Math.PI)), 5, 5);
        var _js1 = angle + 0.01;
        angle = _js1;
    };
};
/** More Trigonometry */
function ep3() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    var centerY = height * 0.5;
    var centerX = width * 0.5;
    var baseRadius = 50;
    var baseAlpha = 0.5;
    var offsetHeight = height * 0.4;
    var offsetRadius = 30;
    var offsetAlpha = 0.5;
    var speed = 0.1;
    var angle = 0;
    var render = function () {
        y = centerY + Math.sin(angle) * offsetHeight;
        radius = baseRadius + Math.sin(angle / 2) * offsetRadius;
        alpha = baseAlpha + Math.sin(angle / 2) * offsetAlpha;
        ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(centerX, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        angle += speed;
        __PS_MV_REG = [];
        return requestAnimationFrame(render);
    };
    __PS_MV_REG = [];
    return render();
};
window.onload = ep3;