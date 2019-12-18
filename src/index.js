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
        var _js3035 = angle + 0.01;
        angle = _js3035;
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
    var _js3036 = v;
    var _js3035 = Math.PI / 6;
    var length = vecLength(_js3036);
    var _js3038 = _js3036;
    var _js3037 = Math.cos(_js3035) * length;
    _js3038.x = _js3037;
    var _js3040 = _js3036;
    var _js3039 = Math.sin(_js3035) * length;
    _js3040.y = _js3039;
    var _js3042 = v;
    var _js3041 = 100;
    var angle = vecAngle(_js3042);
    var _js3044 = _js3042;
    var _js3043 = Math.cos(angle) * _js3041;
    _js3044.x = _js3043;
    var _js3046 = _js3042;
    var _js3045 = Math.sin(angle) * _js3041;
    _js3046.y = _js3045;
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
        var collect3048 = [];
        for (var _js3047 = 0; _js3047 < numParticles; _js3047 += 1) {
            collect3048.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect3048;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3049 = 0; _js_idx3049 < particles.length; _js_idx3049 += 1) {
            p = particles[_js_idx3049];
            particleUpdatebang(p);
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
        var collect3051 = [];
        for (var _js3050 = 0; _js3050 < numParticles; _js3050 += 1) {
            collect3051.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect3051;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3052 = 0; _js_idx3052 < particles.length; _js_idx3052 += 1) {
            p = particles[_js_idx3052];
            particleUpdatebang(p);
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
        var _js3054 = thrust;
        var _js3053 = angle;
        var length = vecLength(_js3054);
        var _js3058 = _js3054;
        var _js3057 = Math.cos(_js3053) * length;
        _js3058.x = _js3057;
        var _js3060 = _js3054;
        var _js3059 = Math.sin(_js3053) * length;
        _js3060.y = _js3059;
        var _js3056 = thrust;
        var _js3055 = thrusting ? 0.1 : 0;
        var angle3061 = vecAngle(_js3056);
        var _js3063 = _js3056;
        var _js3062 = Math.cos(angle3061) * _js3055;
        _js3063.x = _js3062;
        var _js3065 = _js3056;
        var _js3064 = Math.sin(angle3061) * _js3055;
        _js3065.y = _js3064;
        particleAcceleratebang(ship, thrust);
        particleUpdatebang(ship);
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
            var _js3067 = ship;
            var _js3066 = 0;
            var _js3069 = _js3067.position;
            var _js3068 = _js3066;
            _js3069.x = _js3068;
        };
        if (ship.position.x < 0) {
            var _js3071 = ship;
            var _js3070 = width;
            var _js3073 = _js3071.position;
            var _js3072 = _js3070;
            _js3073.x = _js3072;
        };
        if (ship.position.y > height) {
            var _js3075 = ship;
            var _js3074 = 0;
            var _js3077 = _js3075.position;
            var _js3076 = _js3074;
            _js3077.y = _js3076;
        };
        if (ship.position.y < 0) {
            var _js3079 = ship;
            var _js3078 = height;
            var _js3081 = _js3079.position;
            var _js3080 = _js3078;
            _js3081.y = _js3080;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Gravity */
function ep11() {
    var sun = makeParticle(width / 2, height / 2, 0, 0);
    var planet = makeParticle(width / 2 + 200, height / 2, 10, Math.PI / -2);
    sun.mass = 20000;
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        particleGravitateTobang(planet, sun);
        particleUpdatebang(planet);
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
/** Edge Handling */
function ep12() {
    var numParticles = 100;
    var particles = (function () {
        var particle;
        var collect3083 = [];
        for (var _js3082 = 0; _js3082 < numParticles; _js3082 += 1) {
            collect3083.push((particle = makeParticle(width / 2, height, Math.random() * 8 + 5, Math.PI / -2 + (Math.random() * 0.2 - 0.1), 0.1), ((particle.radius = Math.random() * 10 + 2, particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect3083;
    })();
    function wrap(p) {
        if (p.position.x - p.radius > width) {
            var _js3085 = p;
            var _js3084 = -p.radius;
            var _js3087 = _js3085.position;
            var _js3086 = _js3084;
            _js3087.x = _js3086;
        };
        if (p.position.x + p.radius < 0) {
            var _js3089 = p;
            var _js3088 = width + p.radius;
            var _js3091 = _js3089.position;
            var _js3090 = _js3088;
            _js3091.x = _js3090;
        };
        if (p.position.y - p.radius > height) {
            var _js3093 = p;
            var _js3092 = -p.radius;
            var _js3095 = _js3093.position;
            var _js3094 = _js3092;
            _js3095.y = _js3094;
        };
        if (p.position.y + p.radius < 0) {
            var _js3099 = p;
            var _js3098 = height + p.radius;
            var _js3101 = _js3099.position;
            var _js3100 = _js3098;
            return _js3101.y = _js3100;
        };
    };
    function removeDeadParticles(particles) {
        var i = particles.length - 1;
        for (; i >= 0; ) {
            var p = particles[i];
            if (p.position.x - p.radius > width || p.position.x + p.radius < 0 || p.position.y - p.radius > height || p.position.y + p.radius < 0) {
                particles.splice(i, 1);
            };
            var _js3102 = i - 1;
            i = _js3102;
        };
    };
    function regenerate(p) {
        if (p.position.y - p.radius > height) {
            var _js3111 = p;
            var _js3110 = width / 2;
            var _js3119 = _js3111.position;
            var _js3118 = _js3110;
            _js3119.x = _js3118;
            var _js3113 = p;
            var _js3112 = height;
            var _js3121 = _js3113.position;
            var _js3120 = _js3112;
            _js3121.y = _js3120;
            var _js3115 = p.velocity;
            var _js3114 = Math.random() * 8 + 5;
            var angle = vecAngle(_js3115);
            var _js3123 = _js3115;
            var _js3122 = Math.cos(angle) * _js3114;
            _js3123.x = _js3122;
            var _js3125 = _js3115;
            var _js3124 = Math.sin(angle) * _js3114;
            _js3125.y = _js3124;
            var _js3117 = p.velocity;
            var _js3116 = Math.PI / -2 + (Math.random() * 0.2 - 0.1);
            var length = vecLength(_js3117);
            var _js3127 = _js3117;
            var _js3126 = Math.cos(_js3116) * length;
            _js3127.x = _js3126;
            var _js3129 = _js3117;
            var _js3128 = Math.sin(_js3116) * length;
            __PS_MV_REG = [];
            return _js3129.y = _js3128;
        };
    };
    function bounce(p) {
        var object3130 = p.velocity;
        if (p.position.x + p.radius > width) {
            var _js3132 = p;
            var _js3131 = width - p.radius;
            var _js3134 = _js3132.position;
            var _js3133 = _js3131;
            _js3134.x = _js3133;
            object3130.x *= p.bounce;
        };
        if (p.position.x - p.radius < 0) {
            var _js3136 = p;
            var _js3135 = p.radius;
            var _js3138 = _js3136.position;
            var _js3137 = _js3135;
            _js3138.x = _js3137;
            object3130.x *= p.bounce;
        };
        if (p.position.y + p.radius > height) {
            var _js3140 = p;
            var _js3139 = height - p.radius;
            var _js3142 = _js3140.position;
            var _js3141 = _js3139;
            _js3142.y = _js3141;
            object3130.y *= p.bounce;
        };
        if (p.position.y - p.radius < 0) {
            var _js3146 = p;
            var _js3145 = p.radius;
            var _js3148 = _js3146.position;
            var _js3147 = _js3145;
            _js3148.y = _js3147;
            return object3130.y *= p.bounce;
        };
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3149 = 0; _js_idx3149 < particles.length; _js_idx3149 += 1) {
            p = particles[_js_idx3149];
            particleUpdatebang(p);
            CTX.beginPath();
            CTX.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
            CTX.fill();
            bounce(p);
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Friction */
function ep13() {
    var p = makeParticle(width / 2, height / 2, 10, Math.random() * Math.PI * 2);
    var friction = 0.97;
    p.radius = 10;
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        vstarbang(p.velocity, friction);
        particleUpdatebang(p);
        CTX.beginPath();
        CTX.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
        CTX.fill();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Collision Detection */
function ep14() {
    var circle0 = { x : Math.random() * width,
                    y : Math.random() * height,
                    radius : 50 + Math.random() * 100
                  };
    var circle1 = { x : Math.random() * width,
                    y : Math.random() * height,
                    radius : 50 + Math.random() * 100
                  };
    var rect0 = { x : 200,
                  y : 200,
                  width : 200,
                  height : 100
                };
    var rect1 = { x : 0,
                  y : 0,
                  width : 100,
                  height : 200
                };
    var drawCircle = function (circle) {
        CTX.beginPath();
        CTX.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    var drawRect = function (rect) {
        return CTX.fillRect(rect.x, rect.y, rect.width, rect.height);
    };
    var pickColor = function (collide) {
        return collide ? '#f66' : '#999';
    };
    var detectPointAndCircle = function (evt) {
        CTX.fillStyle = pickColor(circlePointCollision(evt.clientX, evt.clientY, circle0));
        __PS_MV_REG = [];
        return drawCircle(circle0);
    };
    var detectCircleAndCircle = function (evt) {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        circle1.x = evt.clientX;
        circle1.y = evt.clientY;
        CTX.fillStyle = pickColor(circleCollision(circle0, circle1));
        drawCircle(circle0);
        __PS_MV_REG = [];
        return drawCircle(circle1);
    };
    var detectPointAndRect = function (evt) {
        CTX.fillStyle = pickColor(pointInRect(evt.clientX, evt.clientY, rect0));
        __PS_MV_REG = [];
        return drawRect(rect0);
    };
    var detectRectAndRect = function (evt) {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        rect1.x = evt.clientX - 50;
        rect1.y = evt.clientY - 100;
        CTX.fillStyle = pickColor(rectIntersect(rect0, rect1));
        drawRect(rect0);
        __PS_MV_REG = [];
        return drawRect(rect1);
    };
    return document.body.addEventListener('mousemove', detectRectAndRect);
};
window.onload = ep14;
