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
function removeDeadParticles(particles) {
    var i = particles.length - 1;
    for (; i >= 0; ) {
        var p = particles[i];
        if (p.position.x - p.radius > width || p.position.x + p.radius < 0 || p.position.y - p.radius > height || p.position.y + p.radius < 0) {
            particles.splice(i, 1);
        };
        var _js3232 = i - 1;
        i = _js3232;
    };
};
function wrap(p) {
    if (p.position.x - p.radius > width) {
        var _js3233 = p;
        var _js3232 = -p.radius;
        var _js3235 = _js3233.position;
        var _js3234 = _js3232;
        _js3235.x = _js3234;
    };
    if (p.position.x + p.radius < 0) {
        var _js3237 = p;
        var _js3236 = width + p.radius;
        var _js3239 = _js3237.position;
        var _js3238 = _js3236;
        _js3239.x = _js3238;
    };
    if (p.position.y - p.radius > height) {
        var _js3241 = p;
        var _js3240 = -p.radius;
        var _js3243 = _js3241.position;
        var _js3242 = _js3240;
        _js3243.y = _js3242;
    };
    if (p.position.y + p.radius < 0) {
        var _js3247 = p;
        var _js3246 = height + p.radius;
        var _js3249 = _js3247.position;
        var _js3248 = _js3246;
        return _js3249.y = _js3248;
    };
};
function bounce(p) {
    var object3250 = p.velocity;
    if (p.position.x + p.radius > width) {
        var _js3252 = p;
        var _js3251 = width - p.radius;
        var _js3254 = _js3252.position;
        var _js3253 = _js3251;
        _js3254.x = _js3253;
        object3250.x *= p.bounce;
    };
    if (p.position.x - p.radius < 0) {
        var _js3256 = p;
        var _js3255 = p.radius;
        var _js3258 = _js3256.position;
        var _js3257 = _js3255;
        _js3258.x = _js3257;
        object3250.x *= p.bounce;
    };
    if (p.position.y + p.radius > height) {
        var _js3260 = p;
        var _js3259 = height - p.radius;
        var _js3262 = _js3260.position;
        var _js3261 = _js3259;
        _js3262.y = _js3261;
        object3250.y *= p.bounce;
    };
    if (p.position.y - p.radius < 0) {
        var _js3266 = p;
        var _js3265 = p.radius;
        var _js3268 = _js3266.position;
        var _js3267 = _js3265;
        _js3268.y = _js3267;
        return object3250.y *= p.bounce;
    };
};
function drawParticle(p) {
    CTX.beginPath();
    CTX.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
    return CTX.fill();
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
        var _js3269 = angle + 0.01;
        angle = _js3269;
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
    var _js3270 = v;
    var _js3269 = Math.PI / 6;
    var length = vecLength(_js3270);
    var _js3272 = _js3270;
    var _js3271 = Math.cos(_js3269) * length;
    _js3272.x = _js3271;
    var _js3274 = _js3270;
    var _js3273 = Math.sin(_js3269) * length;
    _js3274.y = _js3273;
    var _js3276 = v;
    var _js3275 = 100;
    var angle = vecAngle(_js3276);
    var _js3278 = _js3276;
    var _js3277 = Math.cos(angle) * _js3275;
    _js3278.x = _js3277;
    var _js3280 = _js3276;
    var _js3279 = Math.sin(angle) * _js3275;
    _js3280.y = _js3279;
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
        var collect3282 = [];
        for (var _js3281 = 0; _js3281 < numParticles; _js3281 += 1) {
            collect3282.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect3282;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3283 = 0; _js_idx3283 < particles.length; _js_idx3283 += 1) {
            p = particles[_js_idx3283];
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
        var collect3285 = [];
        for (var _js3284 = 0; _js3284 < numParticles; _js3284 += 1) {
            collect3285.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect3285;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3286 = 0; _js_idx3286 < particles.length; _js_idx3286 += 1) {
            p = particles[_js_idx3286];
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
        var _js3288 = thrust;
        var _js3287 = angle;
        var length = vecLength(_js3288);
        var _js3292 = _js3288;
        var _js3291 = Math.cos(_js3287) * length;
        _js3292.x = _js3291;
        var _js3294 = _js3288;
        var _js3293 = Math.sin(_js3287) * length;
        _js3294.y = _js3293;
        var _js3290 = thrust;
        var _js3289 = thrusting ? 0.1 : 0;
        var angle3295 = vecAngle(_js3290);
        var _js3297 = _js3290;
        var _js3296 = Math.cos(angle3295) * _js3289;
        _js3297.x = _js3296;
        var _js3299 = _js3290;
        var _js3298 = Math.sin(angle3295) * _js3289;
        _js3299.y = _js3298;
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
            var _js3301 = ship;
            var _js3300 = 0;
            var _js3303 = _js3301.position;
            var _js3302 = _js3300;
            _js3303.x = _js3302;
        };
        if (ship.position.x < 0) {
            var _js3305 = ship;
            var _js3304 = width;
            var _js3307 = _js3305.position;
            var _js3306 = _js3304;
            _js3307.x = _js3306;
        };
        if (ship.position.y > height) {
            var _js3309 = ship;
            var _js3308 = 0;
            var _js3311 = _js3309.position;
            var _js3310 = _js3308;
            _js3311.y = _js3310;
        };
        if (ship.position.y < 0) {
            var _js3313 = ship;
            var _js3312 = height;
            var _js3315 = _js3313.position;
            var _js3314 = _js3312;
            _js3315.y = _js3314;
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
        var collect3317 = [];
        for (var _js3316 = 0; _js3316 < numParticles; _js3316 += 1) {
            collect3317.push((particle = makeParticle(width / 2, height, Math.random() * 8 + 5, Math.PI / -2 + (Math.random() * 0.2 - 0.1), 0.1), ((particle.radius = Math.random() * 10 + 2, particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect3317;
    })();
    function regenerate(p) {
        if (p.position.y - p.radius > height) {
            var _js3327 = p;
            var _js3326 = width / 2;
            var _js3335 = _js3327.position;
            var _js3334 = _js3326;
            _js3335.x = _js3334;
            var _js3329 = p;
            var _js3328 = height;
            var _js3337 = _js3329.position;
            var _js3336 = _js3328;
            _js3337.y = _js3336;
            var _js3331 = p.velocity;
            var _js3330 = Math.random() * 8 + 5;
            var angle = vecAngle(_js3331);
            var _js3339 = _js3331;
            var _js3338 = Math.cos(angle) * _js3330;
            _js3339.x = _js3338;
            var _js3341 = _js3331;
            var _js3340 = Math.sin(angle) * _js3330;
            _js3341.y = _js3340;
            var _js3333 = p.velocity;
            var _js3332 = Math.PI / -2 + (Math.random() * 0.2 - 0.1);
            var length = vecLength(_js3333);
            var _js3343 = _js3333;
            var _js3342 = Math.cos(_js3332) * length;
            _js3343.x = _js3342;
            var _js3345 = _js3333;
            var _js3344 = Math.sin(_js3332) * length;
            __PS_MV_REG = [];
            return _js3345.y = _js3344;
        };
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        console.log(particles.length);
        for (var p = null, _js_idx3346 = 0; _js_idx3346 < particles.length; _js_idx3346 += 1) {
            p = particles[_js_idx3346];
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
/** Springs Part 1 */
function ep15() {
    var springPoint = makeVector(width / 2, height / 2);
    var weight = makeParticle(Math.random() * width, Math.random() * height, 50, Math.random() * Math.PI * 2);
    var k = 0.1;
    weight.radius = 20;
    weight.friction = 0.9;
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        var distance = v(springPoint, weight.position);
        var springForce = vstar(distance, k);
        vplusbang(weight.velocity, springForce);
        particleUpdatebang(weight);
        CTX.beginPath();
        CTX.arc(weight.position.x, weight.position.y, weight.radius, 0, Math.PI * 2, false);
        CTX.fill();
        CTX.beginPath();
        CTX.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
        CTX.fill();
        CTX.beginPath();
        CTX.moveTo(weight.position.x, weight.position.y);
        CTX.lineTo(springPoint.x, springPoint.y);
        CTX.stroke();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    document.body.addEventListener('mousemove', function (evt) {
        var _js3348 = springPoint;
        var _js3347 = evt.clientX;
        _js3348.x = _js3347;
        var _js3350 = springPoint;
        var _js3349 = evt.clientY;
        return _js3350.y = _js3349;
    });
    __PS_MV_REG = [];
    return update();
};
/** Springs Part 2 */
function ep16() {
    var springPoint = makeVector(width / 2, height / 2);
    var particleA = makeParticle(randomRange(0, width), randomRange(0, height), randomRange(0, 50), randomRange(0, Math.PI * 2), 0.2);
    var particleB = makeParticle(randomRange(0, width), randomRange(0, height), randomRange(0, 50), randomRange(0, Math.PI * 2), 0.2);
    var particleC = makeParticle(randomRange(0, width), randomRange(0, height), randomRange(0, 50), randomRange(0, Math.PI * 2), 0.2);
    var k = 0.01;
    var separation = 200;
    particleA.friction = 0.9;
    particleA.radius = 20;
    particleB.friction = 0.9;
    particleB.radius = 20;
    particleC.friction = 0.9;
    particleC.radius = 20;
    var spring = function (p0, p1, separation) {
        var distance = v(p0.position, p1.position);
        var springForce = null;
        var _js3352 = distance;
        var _js3351 = vecLength(distance) - separation;
        var angle = vecAngle(_js3352);
        var _js3354 = _js3352;
        var _js3353 = Math.cos(angle) * _js3351;
        _js3354.x = _js3353;
        var _js3356 = _js3352;
        var _js3355 = Math.sin(angle) * _js3351;
        _js3356.y = _js3355;
        springForce = vstar(distance, k);
        vplusbang(p1.velocity, springForce);
        __PS_MV_REG = [];
        return vbang(p0.velocity, springForce);
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation);
        bounce(particleA);
        bounce(particleB);
        bounce(particleC);
        particleUpdatebang(particleA);
        particleUpdatebang(particleB);
        particleUpdatebang(particleC);
        drawParticle(particleA);
        drawParticle(particleB);
        drawParticle(particleC);
        CTX.beginPath();
        CTX.moveTo(particleA.position.x, particleA.position.y);
        CTX.lineTo(particleB.position.x, particleB.position.y);
        CTX.lineTo(particleC.position.x, particleC.position.y);
        CTX.lineTo(particleA.position.x, particleA.position.y);
        CTX.stroke();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
window.onload = ep16;
