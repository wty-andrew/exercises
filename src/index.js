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
    var _js5377 = v;
    var _js5376 = v.x * scalar;
    _js5377.x = _js5376;
    var _js5379 = v;
    var _js5378 = v.y * scalar;
    return _js5379.y = _js5378;
};
function vslashbang(v, scalar) {
    __PS_MV_REG = [];
    return vstarbang(v, 1 / scalar);
};
function distance(v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    __PS_MV_REG = [];
    return Math.sqrt(dx * dx + dy * dy);
};
function angleBetween(v1, v2) {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
};
function makeParticle(x, y, speed, direction, gravity) {
    if (gravity === undefined) {
        gravity = 0;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js5381 = velocity;
    var _js5380 = speed;
    var angle = vecAngle(_js5381);
    var _js5385 = _js5381;
    var _js5384 = Math.cos(angle) * _js5380;
    _js5385.x = _js5384;
    var _js5387 = _js5381;
    var _js5386 = Math.sin(angle) * _js5380;
    _js5387.y = _js5386;
    var _js5383 = velocity;
    var _js5382 = direction;
    var length = vecLength(_js5383);
    var _js5389 = _js5383;
    var _js5388 = Math.cos(_js5382) * length;
    _js5389.x = _js5388;
    var _js5391 = _js5383;
    var _js5390 = Math.sin(_js5382) * length;
    _js5391.y = _js5390;
    __PS_MV_REG = [];
    return { position : position,
             velocity : velocity,
             mass : 1,
             radius : 0,
             bounce : -1,
             gravity : makeVector(0, gravity)
           };
};
function particleUpdatebang(p) {
    vplusbang(p.velocity, p.gravity);
    __PS_MV_REG = [];
    return vplusbang(p.position, p.velocity);
};
function particleAcceleratebang(p, accel) {
    __PS_MV_REG = [];
    return vplusbang(p.velocity, accel);
};
function particleGravitateTobang(p1, p2) {
    var grav = makeVector(0, 0);
    var dist = distance(p1.position, p2.position);
    var _js5393 = grav;
    var _js5392 = p2.mass / (dist * dist);
    var angle = vecAngle(_js5393);
    var _js5397 = _js5393;
    var _js5396 = Math.cos(angle) * _js5392;
    _js5397.x = _js5396;
    var _js5399 = _js5393;
    var _js5398 = Math.sin(angle) * _js5392;
    _js5399.y = _js5398;
    var _js5395 = grav;
    var _js5394 = angleBetween(p1.position, p2.position);
    var length = vecLength(_js5395);
    var _js5401 = _js5395;
    var _js5400 = Math.cos(_js5394) * length;
    _js5401.x = _js5400;
    var _js5403 = _js5395;
    var _js5402 = Math.sin(_js5394) * length;
    _js5403.y = _js5402;
    __PS_MV_REG = [];
    return vplusbang(p1.velocity, grav);
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
        var _js5404 = angle + 0.01;
        angle = _js5404;
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
    var _js5405 = v;
    var _js5404 = Math.PI / 6;
    var length = vecLength(_js5405);
    var _js5407 = _js5405;
    var _js5406 = Math.cos(_js5404) * length;
    _js5407.x = _js5406;
    var _js5409 = _js5405;
    var _js5408 = Math.sin(_js5404) * length;
    _js5409.y = _js5408;
    var _js5411 = v;
    var _js5410 = 100;
    var angle = vecAngle(_js5411);
    var _js5413 = _js5411;
    var _js5412 = Math.cos(angle) * _js5410;
    _js5413.x = _js5412;
    var _js5415 = _js5411;
    var _js5414 = Math.sin(angle) * _js5410;
    _js5415.y = _js5414;
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
        var collect5417 = [];
        for (var _js5416 = 0; _js5416 < numParticles; _js5416 += 1) {
            collect5417.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect5417;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx5418 = 0; _js_idx5418 < particles.length; _js_idx5418 += 1) {
            p = particles[_js_idx5418];
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
        var collect5420 = [];
        for (var _js5419 = 0; _js5419 < numParticles; _js5419 += 1) {
            collect5420.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect5420;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx5421 = 0; _js_idx5421 < particles.length; _js_idx5421 += 1) {
            p = particles[_js_idx5421];
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
        var _js5423 = thrust;
        var _js5422 = angle;
        var length = vecLength(_js5423);
        var _js5427 = _js5423;
        var _js5426 = Math.cos(_js5422) * length;
        _js5427.x = _js5426;
        var _js5429 = _js5423;
        var _js5428 = Math.sin(_js5422) * length;
        _js5429.y = _js5428;
        var _js5425 = thrust;
        var _js5424 = thrusting ? 0.1 : 0;
        var angle5430 = vecAngle(_js5425);
        var _js5432 = _js5425;
        var _js5431 = Math.cos(angle5430) * _js5424;
        _js5432.x = _js5431;
        var _js5434 = _js5425;
        var _js5433 = Math.sin(angle5430) * _js5424;
        _js5434.y = _js5433;
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
            var _js5436 = ship;
            var _js5435 = 0;
            var _js5438 = _js5436.position;
            var _js5437 = _js5435;
            _js5438.x = _js5437;
        };
        if (ship.position.x < 0) {
            var _js5440 = ship;
            var _js5439 = width;
            var _js5442 = _js5440.position;
            var _js5441 = _js5439;
            _js5442.x = _js5441;
        };
        if (ship.position.y > height) {
            var _js5444 = ship;
            var _js5443 = 0;
            var _js5446 = _js5444.position;
            var _js5445 = _js5443;
            _js5446.y = _js5445;
        };
        if (ship.position.y < 0) {
            var _js5448 = ship;
            var _js5447 = height;
            var _js5450 = _js5448.position;
            var _js5449 = _js5447;
            _js5450.y = _js5449;
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
        var collect5452 = [];
        for (var _js5451 = 0; _js5451 < numParticles; _js5451 += 1) {
            collect5452.push((particle = makeParticle(width / 2, height, Math.random() * 8 + 5, Math.PI / -2 + (Math.random() * 0.2 - 0.1), 0.1), ((particle.radius = Math.random() * 10 + 2, particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect5452;
    })();
    function wrap(p) {
        if (p.position.x - p.radius > width) {
            var _js5454 = p;
            var _js5453 = -p.radius;
            var _js5456 = _js5454.position;
            var _js5455 = _js5453;
            _js5456.x = _js5455;
        };
        if (p.position.x + p.radius < 0) {
            var _js5458 = p;
            var _js5457 = width + p.radius;
            var _js5460 = _js5458.position;
            var _js5459 = _js5457;
            _js5460.x = _js5459;
        };
        if (p.position.y - p.radius > height) {
            var _js5462 = p;
            var _js5461 = -p.radius;
            var _js5464 = _js5462.position;
            var _js5463 = _js5461;
            _js5464.y = _js5463;
        };
        if (p.position.y + p.radius < 0) {
            var _js5468 = p;
            var _js5467 = height + p.radius;
            var _js5470 = _js5468.position;
            var _js5469 = _js5467;
            return _js5470.y = _js5469;
        };
    };
    function removeDeadParticles(particles) {
        var i = particles.length - 1;
        for (; i >= 0; ) {
            var p = particles[i];
            if (p.position.x - p.radius > width || p.position.x + p.radius < 0 || p.position.y - p.radius > height || p.position.y + p.radius < 0) {
                particles.splice(i, 1);
            };
            var _js5471 = i - 1;
            i = _js5471;
        };
    };
    function regenerate(p) {
        if (p.position.y - p.radius > height) {
            var _js5480 = p;
            var _js5479 = width / 2;
            var _js5488 = _js5480.position;
            var _js5487 = _js5479;
            _js5488.x = _js5487;
            var _js5482 = p;
            var _js5481 = height;
            var _js5490 = _js5482.position;
            var _js5489 = _js5481;
            _js5490.y = _js5489;
            var _js5484 = p.velocity;
            var _js5483 = Math.random() * 8 + 5;
            var angle = vecAngle(_js5484);
            var _js5492 = _js5484;
            var _js5491 = Math.cos(angle) * _js5483;
            _js5492.x = _js5491;
            var _js5494 = _js5484;
            var _js5493 = Math.sin(angle) * _js5483;
            _js5494.y = _js5493;
            var _js5486 = p.velocity;
            var _js5485 = Math.PI / -2 + (Math.random() * 0.2 - 0.1);
            var length = vecLength(_js5486);
            var _js5496 = _js5486;
            var _js5495 = Math.cos(_js5485) * length;
            _js5496.x = _js5495;
            var _js5498 = _js5486;
            var _js5497 = Math.sin(_js5485) * length;
            __PS_MV_REG = [];
            return _js5498.y = _js5497;
        };
    };
    function bounce(p) {
        var object5499 = p.velocity;
        if (p.position.x + p.radius > width) {
            var _js5501 = p;
            var _js5500 = width - p.radius;
            var _js5503 = _js5501.position;
            var _js5502 = _js5500;
            _js5503.x = _js5502;
            object5499.x *= p.bounce;
        };
        if (p.position.x - p.radius < 0) {
            var _js5505 = p;
            var _js5504 = p.radius;
            var _js5507 = _js5505.position;
            var _js5506 = _js5504;
            _js5507.x = _js5506;
            object5499.x *= p.bounce;
        };
        if (p.position.y + p.radius > height) {
            var _js5509 = p;
            var _js5508 = height - p.radius;
            var _js5511 = _js5509.position;
            var _js5510 = _js5508;
            _js5511.y = _js5510;
            object5499.y *= p.bounce;
        };
        if (p.position.y - p.radius < 0) {
            var _js5515 = p;
            var _js5514 = p.radius;
            var _js5517 = _js5515.position;
            var _js5516 = _js5514;
            _js5517.y = _js5516;
            return object5499.y *= p.bounce;
        };
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx5518 = 0; _js_idx5518 < particles.length; _js_idx5518 += 1) {
            p = particles[_js_idx5518];
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
window.onload = ep12;