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
    var _js1033 = v;
    var _js1032 = v.x * scalar;
    _js1033.x = _js1032;
    var _js1035 = v;
    var _js1034 = v.y * scalar;
    return _js1035.y = _js1034;
};
function vslashbang(v, scalar) {
    __PS_MV_REG = [];
    return vstarbang(v, 1 / scalar);
};
function makeParticle(x, y, speed, direction, gravity, mass) {
    if (gravity === undefined) {
        gravity = 0;
    };
    if (mass === undefined) {
        mass = 1;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js1037 = velocity;
    var _js1036 = speed;
    var angle = vecAngle(_js1037);
    var _js1041 = _js1037;
    var _js1040 = Math.cos(angle) * _js1036;
    _js1041.x = _js1040;
    var _js1043 = _js1037;
    var _js1042 = Math.sin(angle) * _js1036;
    _js1043.y = _js1042;
    var _js1039 = velocity;
    var _js1038 = direction;
    var length = vecLength(_js1039);
    var _js1045 = _js1039;
    var _js1044 = Math.cos(_js1038) * length;
    _js1045.x = _js1044;
    var _js1047 = _js1039;
    var _js1046 = Math.sin(_js1038) * length;
    _js1047.y = _js1046;
    __PS_MV_REG = [];
    return { position : position,
             velocity : velocity,
             mass : mass,
             gravity : makeVector(0, gravity),
             update : function () {
        vplusbang(this.velocity, this.gravity);
        __PS_MV_REG = [];
        return vplusbang(this.position, this.velocity);
    },
             accelerate : function (accel) {
        __PS_MV_REG = [];
        return vplusbang(this.velocity, accel);
    },
             angleTo : function (p2) {
        return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
    },
             distanceTo : function (p2) {
        var dx = p2.position.x - this.position.x;
        var dy = p2.position.y - this.position.y;
        __PS_MV_REG = [];
        return Math.sqrt(dx * dx + dy * dy);
    },
             gravitateTo : function (p2) {
        var grav = makeVector(0, 0);
        var dist = this.distanceTo(p2);
        var _js1049 = grav;
        var _js1048 = p2.mass / (dist * dist);
        var angle = vecAngle(_js1049);
        var _js1053 = _js1049;
        var _js1052 = Math.cos(angle) * _js1048;
        _js1053.x = _js1052;
        var _js1055 = _js1049;
        var _js1054 = Math.sin(angle) * _js1048;
        _js1055.y = _js1054;
        var _js1051 = grav;
        var _js1050 = this.angleTo(p2);
        var length = vecLength(_js1051);
        var _js1057 = _js1051;
        var _js1056 = Math.cos(_js1050) * length;
        _js1057.x = _js1056;
        var _js1059 = _js1051;
        var _js1058 = Math.sin(_js1050) * length;
        _js1059.y = _js1058;
        __PS_MV_REG = [];
        return vplusbang(this.velocity, grav);
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
        var _js1060 = angle + 0.01;
        angle = _js1060;
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
    var _js1061 = v;
    var _js1060 = Math.PI / 6;
    var length = vecLength(_js1061);
    var _js1063 = _js1061;
    var _js1062 = Math.cos(_js1060) * length;
    _js1063.x = _js1062;
    var _js1065 = _js1061;
    var _js1064 = Math.sin(_js1060) * length;
    _js1065.y = _js1064;
    var _js1067 = v;
    var _js1066 = 100;
    var angle = vecAngle(_js1067);
    var _js1069 = _js1067;
    var _js1068 = Math.cos(angle) * _js1066;
    _js1069.x = _js1068;
    var _js1071 = _js1067;
    var _js1070 = Math.sin(angle) * _js1066;
    _js1071.y = _js1070;
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
        var collect1073 = [];
        for (var _js1072 = 0; _js1072 < numParticles; _js1072 += 1) {
            collect1073.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect1073;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1074 = 0; _js_idx1074 < particles.length; _js_idx1074 += 1) {
            p = particles[_js_idx1074];
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
        var collect1076 = [];
        for (var _js1075 = 0; _js1075 < numParticles; _js1075 += 1) {
            collect1076.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect1076;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1077 = 0; _js_idx1077 < particles.length; _js_idx1077 += 1) {
            p = particles[_js_idx1077];
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
/** Advanced Acceleration */
function ep10() {
    var ship = makeParticle(width / 2, height / 2, 0, 0);
    var thrust = makeVector(0, 0);
    var angle = 0;
    var turingLeft = null;
    var turingRight = null;
    var thrusting = null;
    document.body.addEventListener('keydown', function (evt) {
        switch (evt.keyCode) {
        case 38:
            return thrusting = true;
        case 37:
            return turingLeft = true;
        case 39:
            return turingRight = true;
        };
    });
    document.body.addEventListener('keyup', function (evt) {
        switch (evt.keyCode) {
        case 38:
            return thrusting = null;
        case 37:
            return turingLeft = null;
        case 39:
            return turingRight = null;
        };
    });
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        if (turingLeft) {
            angle -= 0.05;
        };
        if (turingRight) {
            angle += 0.05;
        };
        var _js1079 = thrust;
        var _js1078 = angle;
        var length = vecLength(_js1079);
        var _js1083 = _js1079;
        var _js1082 = Math.cos(_js1078) * length;
        _js1083.x = _js1082;
        var _js1085 = _js1079;
        var _js1084 = Math.sin(_js1078) * length;
        _js1085.y = _js1084;
        var _js1081 = thrust;
        var _js1080 = thrusting ? 0.1 : 0;
        var angle1086 = vecAngle(_js1081);
        var _js1088 = _js1081;
        var _js1087 = Math.cos(angle1086) * _js1080;
        _js1088.x = _js1087;
        var _js1090 = _js1081;
        var _js1089 = Math.sin(angle1086) * _js1080;
        _js1090.y = _js1089;
        ship.accelerate(thrust);
        ship.update();
        CTX.save();
        CTX.translate(ship.position.x, ship.position.y);
        CTX.rotate(angle);
        CTX.beginPath();
        CTX.moveTo(10, 0);
        CTX.lineTo(-10, -7);
        CTX.lineTo(-10, 7);
        CTX.lineTo(10, 0);
        if (thrusting) {
            CTX.moveTo(-10, 0);
            CTX.lineTo(-18, 0);
        };
        CTX.stroke();
        CTX.restore();
        if (ship.position.x > width) {
            var _js1092 = ship.position;
            var _js1091 = 0;
            _js1092.x = _js1091;
        };
        if (ship.position.x < 0) {
            var _js1094 = ship.position;
            var _js1093 = width;
            _js1094.x = _js1093;
        };
        if (ship.position.y > height) {
            var _js1096 = ship.position;
            var _js1095 = 0;
            _js1096.y = _js1095;
        };
        if (ship.position.y < 0) {
            var _js1098 = ship.position;
            var _js1097 = height;
            _js1098.y = _js1097;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Gravity */
function ep11() {
    var sun = makeParticle(width / 2, height / 2, 0, 0, 0, 20000);
    var planet = makeParticle(width / 2 + 200, height / 2, 10, Math.PI / -2);
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        planet.gravitateTo(sun);
        planet.update();
        CTX.beginPath();
        CTX.fillStyle = '#ffff00';
        CTX.arc(sun.position.x, sun.position.y, 20, 0, Math.PI * 2, false);
        CTX.fill();
        CTX.beginPath();
        CTX.fillStyle = '#0000ff';
        CTX.arc(planet.position.x, planet.position.y, 5, 0, Math.PI * 2, false);
        CTX.fill();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
window.onload = ep11;