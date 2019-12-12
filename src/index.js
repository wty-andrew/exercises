if ('undefined' === typeof CANVAS) {
    var CANVAS = document.getElementById('canvas');
};
if ('undefined' === typeof CTX) {
    var CTX = CANVAS.getContext('2d');
};
if ('undefined' === typeof WIDTH) {
    var WIDTH = window.innerWidth;
};
if ('undefined' === typeof HEIGHT) {
    var HEIGHT = window.innerHeight;
};
CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;
var width = WIDTH;
var height = HEIGHT;
function makeVector(x, y) {
    if (x === undefined) {
        x = 0;
    };
    if (y === undefined) {
        y = 0;
    };
    return { x : x, y : y };
};
function vecAngle(vec) {
    return Math.atan2(vec.y, vec.x);
};
function vecLength(vec) {
    __PS_MV_REG = [];
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
};
function vplus(v1, v2) {
    __PS_MV_REG = [];
    return makeVector(v1.x + v2.x, v1.y + v2.y);
};
function v(v1, v2) {
    __PS_MV_REG = [];
    return makeVector(v1.x - v2.x, v1.y - v2.y);
};
function vstar(v, scalar) {
    __PS_MV_REG = [];
    return makeVector(v.x * scalar, v.y * scalar);
};
function vslash(v, scalar) {
    __PS_MV_REG = [];
    return vstar(v, 1 / scalar);
};
function vplusbang(v1, v2) {
    v1.x += v2.x;
    return v1.y += v2.y;
};
function vbang(v1, v2) {
    v1.x -= v2.x;
    return v1.y -= v2.y;
};
function vstarbang(v, scalar) {
    var _js1236 = v;
    var _js1235 = v.x * scalar;
    _js1236.x = _js1235;
    var _js1238 = v;
    var _js1237 = v.y * scalar;
    return _js1238.y = _js1237;
};
function vslashbang(v, scalar) {
    __PS_MV_REG = [];
    return vstarbang(v, 1 / scalar);
};
function makeParticle(x, y, speed, direction, gravity) {
    if (gravity === undefined) {
        gravity = 0;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js1240 = velocity;
    var _js1239 = speed;
    var angle = vecAngle(_js1240);
    var _js1244 = _js1240;
    var _js1243 = Math.cos(angle) * _js1239;
    _js1244.x = _js1243;
    var _js1246 = _js1240;
    var _js1245 = Math.sin(angle) * _js1239;
    _js1246.y = _js1245;
    var _js1242 = velocity;
    var _js1241 = direction;
    var length = vecLength(_js1242);
    var _js1248 = _js1242;
    var _js1247 = Math.cos(_js1241) * length;
    _js1248.x = _js1247;
    var _js1250 = _js1242;
    var _js1249 = Math.sin(_js1241) * length;
    _js1250.y = _js1249;
    __PS_MV_REG = [];
    return { position : position,
             velocity : velocity,
             gravity : makeVector(0, gravity),
             update : function () {
        vplusbang(this.velocity, this.gravity);
        __PS_MV_REG = [];
        return vplusbang(this.position, this.velocity);
    },
             accelerate : function (accel) {
        __PS_MV_REG = [];
        return vplusbang(this.velocity, accel);
    }
           };
};
/** Introduction */
function ep1() {
    for (var _ = 0; _ < 100; _ += 1) {
        CTX.beginPath();
        CTX.moveTo(Math.random() * width, Math.random() * height);
        CTX.lineTo(Math.random() * width, Math.random() * height);
        CTX.stroke();
    };
};
/** Intro to Trigonometry */
function ep2() {
    CTX.translate(0, height / 2);
    CTX.scale(1, -1);
    var angle = 0;
    for (; angle < Math.PI * 2; ) {
        CTX.fillRect(angle * (width / (2 * Math.PI)), Math.sin(angle) * (width / (2 * Math.PI)), 5, 5);
        var _js1251 = angle + 0.01;
        angle = _js1251;
    };
};
/** More Trigonometry */
function ep3() {
    var centerY = height * 0.5;
    var centerX = width * 0.5;
    var baseRadius = 50;
    var baseAlpha = 0.5;
    var offsetHeight = height * 0.4;
    var offsetRadius = 30;
    var offsetAlpha = 0.5;
    var speed = 0.1;
    var angle = 0;
    function render() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        y = centerY + Math.sin(angle) * offsetHeight;
        radius = baseRadius + Math.sin(angle / 2) * offsetRadius;
        alpha = baseAlpha + Math.sin(angle / 2) * offsetAlpha;
        CTX.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        CTX.beginPath();
        CTX.arc(centerX, y, radius, 0, Math.PI * 2, false);
        CTX.fill();
        angle += speed;
        __PS_MV_REG = [];
        return requestAnimationFrame(render);
    };
    __PS_MV_REG = [];
    return render();
};
/** Circles, Ellipses and Lissajous Curves */
function ep4() {
    var centerX = width / 2;
    var centerY = height / 2;
    var xRadius = width / 6;
    var yRadius = height / 3;
    var xAngle = 0;
    var yAngle = 0;
    var xSpeed = 0.1;
    var ySpeed = 0.131;
    var x = null;
    var y = null;
    function render() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        x = centerX + Math.cos(xAngle) * xRadius;
        y = centerY + Math.sin(yAngle) * yRadius;
        CTX.beginPath();
        CTX.arc(x, y, 10, 0, Math.PI * 2, false);
        CTX.fill();
        xAngle += xSpeed;
        yAngle += ySpeed;
        __PS_MV_REG = [];
        return requestAnimationFrame(render);
    };
    __PS_MV_REG = [];
    return render();
};
/** Arctangent */
function ep5() {
    var centerX = width / 2;
    var centerY = height / 2;
    var arrowX = width / 2;
    var arrowY = height / 2;
    var xAngle = 0;
    var yAngle = 0;
    var xSpeed = 0.01;
    var ySpeed = 0.02;
    var dx = null;
    var dy = null;
    var angle = 0;
    function render() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        arrowX = centerX + Math.cos(xAngle) * (width / 6);
        arrowY = centerY + Math.sin(yAngle) * (height / 3);
        CTX.save();
        CTX.translate(arrowX, arrowY);
        CTX.rotate(angle);
        CTX.beginPath();
        CTX.moveTo(20, 0);
        CTX.lineTo(-20, 0);
        CTX.moveTo(20, 0);
        CTX.lineTo(10, -10);
        CTX.moveTo(20, 0);
        CTX.lineTo(10, 10);
        CTX.stroke();
        CTX.restore();
        xAngle += xSpeed;
        yAngle += ySpeed;
        __PS_MV_REG = [];
        return requestAnimationFrame(render);
    };
    document.body.addEventListener('mousemove', function (evt) {
        dx = evt.clientX - arrowX;
        dy = evt.clientY - arrowY;
        return angle = Math.atan2(dy, dx);
    });
    __PS_MV_REG = [];
    return render();
};
function ep6() {
    return 'Vectors, Part I';
};
/** Vectors, Part II */
function ep7() {
    v = makeVector(10, 5);
    console.log(v.x);
    console.log(v.y);
    console.log(vecAngle(v));
    console.log(vecLength(v));
    var _js1252 = v;
    var _js1251 = Math.PI / 6;
    var length = vecLength(_js1252);
    var _js1254 = _js1252;
    var _js1253 = Math.cos(_js1251) * length;
    _js1254.x = _js1253;
    var _js1256 = _js1252;
    var _js1255 = Math.sin(_js1251) * length;
    _js1256.y = _js1255;
    var _js1258 = v;
    var _js1257 = 100;
    var angle = vecAngle(_js1258);
    var _js1260 = _js1258;
    var _js1259 = Math.cos(angle) * _js1257;
    _js1260.x = _js1259;
    var _js1262 = _js1258;
    var _js1261 = Math.sin(angle) * _js1257;
    _js1262.y = _js1261;
    console.log(v.x);
    console.log(v.y);
    v1 = makeVector(10, 5);
    v2 = makeVector(3, 4);
    v3 = vplus(v1, v2);
    console.log(v3.x);
    console.log(v3.y);
    v1 = makeVector(10, 5);
    v2 = vstar(v1, 2);
    console.log(vecLength(v1));
    console.log(vecLength(v2));
    v1 = makeVector(10, 5);
    v2 = makeVector(3, 4);
    vplusbang(v1, v2);
    __PS_MV_REG = [];
    return console.log(v1.x, v1.y);
};
/** Velocity */
function ep8() {
    var numParticles = 100;
    var particles = (function () {
        var collect1264 = [];
        for (var _js1263 = 0; _js1263 < numParticles; _js1263 += 1) {
            collect1264.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect1264;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1265 = 0; _js_idx1265 < particles.length; _js_idx1265 += 1) {
            p = particles[_js_idx1265];
            p.update();
            CTX.beginPath();
            CTX.arc(p.position.x, p.position.y, 10, 0, Math.PI * 2, false);
            CTX.fill();
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Acceleration */
function ep9() {
    var numParticles = 100;
    var particles = (function () {
        var collect1267 = [];
        for (var _js1266 = 0; _js1266 < numParticles; _js1266 += 1) {
            collect1267.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect1267;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1268 = 0; _js_idx1268 < particles.length; _js_idx1268 += 1) {
            p = particles[_js_idx1268];
            p.update();
            CTX.beginPath();
            CTX.arc(p.position.x, p.position.y, 4, 0, Math.PI * 2, false);
            CTX.fill();
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
window.onload = ep9;