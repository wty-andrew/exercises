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
        if (p.x - p.radius > width || p.x + p.radius < 0 || p.y - p.radius > height || p.y + p.radius < 0) {
            particles.splice(i, 1);
        };
        var _js2493 = i - 1;
        i = _js2493;
    };
};
function wrap(p) {
    if (p.x - p.radius > width) {
        p.x = -p.radius;
    };
    if (p.x + p.radius < 0) {
        p.x = width + p.radius;
    };
    if (p.y - p.radius > height) {
        p.y = -p.radius;
    };
    return p.y + p.radius < 0 ? (p.y = height + p.radius) : null;
};
function bounce(p) {
    if (p.x + p.radius > width) {
        p.x = width - p.radius;
        p.vx *= p.bounce;
    };
    if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx *= p.bounce;
    };
    if (p.y + p.radius > height) {
        p.y = height - p.radius;
        p.vy *= p.bounce;
    };
    if (p.y - p.radius < 0) {
        p.y = p.radius;
        return p.vy *= p.bounce;
    };
};
function drawParticle(p) {
    CTX.beginPath();
    CTX.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    return CTX.fill();
};
/** Introduction */
function ep1() {
    for (var _ = 0; _ < 100; _ += 1) {
        CTX.beginPath();
        CTX.moveTo(randomRange(0, width), randomRange(0, height));
        CTX.lineTo(randomRange(0, width), randomRange(0, height));
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
        var _js2493 = angle + 0.01;
        angle = _js2493;
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
    var _js2494 = v;
    var _js2493 = Math.PI / 6;
    var length = vecLength(_js2494);
    var _js2496 = _js2494;
    var _js2495 = Math.cos(_js2493) * length;
    _js2496.x = _js2495;
    var _js2498 = _js2494;
    var _js2497 = Math.sin(_js2493) * length;
    _js2498.y = _js2497;
    var _js2500 = v;
    var _js2499 = 100;
    var angle = vecAngle(_js2500);
    var _js2502 = _js2500;
    var _js2501 = Math.cos(angle) * _js2499;
    _js2502.x = _js2501;
    var _js2504 = _js2500;
    var _js2503 = Math.sin(angle) * _js2499;
    _js2504.y = _js2503;
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
        var collect2506 = [];
        for (var _js2505 = 0; _js2505 < numParticles; _js2505 += 1) {
            collect2506.push(makeParticle(width / 2, height / 2, randomRange(1, 5), randomRange(0, Math.PI * 2)));
        };
        __PS_MV_REG = [];
        return collect2506;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx2507 = 0; _js_idx2507 < particles.length; _js_idx2507 += 1) {
            p = particles[_js_idx2507];
            particleUpdatebang(p);
            CTX.beginPath();
            CTX.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
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
        var collect2509 = [];
        for (var _js2508 = 0; _js2508 < numParticles; _js2508 += 1) {
            collect2509.push(makeParticle(width / 2, height / 3, randomRange(2, 7), randomRange(0, Math.PI * 2), 0.1));
        };
        __PS_MV_REG = [];
        return collect2509;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx2510 = 0; _js_idx2510 < particles.length; _js_idx2510 += 1) {
            p = particles[_js_idx2510];
            particleUpdatebang(p);
            CTX.beginPath();
            CTX.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
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
        var _js2512 = thrust;
        var _js2511 = angle;
        var length = vecLength(_js2512);
        var _js2516 = _js2512;
        var _js2515 = Math.cos(_js2511) * length;
        _js2516.x = _js2515;
        var _js2518 = _js2512;
        var _js2517 = Math.sin(_js2511) * length;
        _js2518.y = _js2517;
        var _js2514 = thrust;
        var _js2513 = thrusting ? 0.1 : 0;
        var angle2519 = vecAngle(_js2514);
        var _js2521 = _js2514;
        var _js2520 = Math.cos(angle2519) * _js2513;
        _js2521.x = _js2520;
        var _js2523 = _js2514;
        var _js2522 = Math.sin(angle2519) * _js2513;
        _js2523.y = _js2522;
        particleAcceleratebang(ship, thrust);
        particleUpdatebang(ship);
        CTX.save();
        CTX.translate(ship.x, ship.y);
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
        if (ship.x > width) {
            ship.x = 0;
        };
        if (ship.x < 0) {
            ship.x = width;
        };
        if (ship.y > height) {
            ship.y = 0;
        };
        if (ship.y < 0) {
            ship.y = height;
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
    particleGravitationAddbang(planet, sun);
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        particleUpdatebang(planet);
        CTX.beginPath();
        CTX.fillStyle = '#ffff00';
        CTX.arc(sun.x, sun.y, 20, 0, Math.PI * 2, false);
        CTX.fill();
        CTX.beginPath();
        CTX.fillStyle = '#0000ff';
        CTX.arc(planet.x, planet.y, 5, 0, Math.PI * 2, false);
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
        var collect2525 = [];
        for (var _js2524 = 0; _js2524 < numParticles; _js2524 += 1) {
            collect2525.push((particle = makeParticle(width / 2, height, randomRange(5, 13), Math.PI / -2 + randomRange(-0.1, 0.1), 0.1), ((particle.radius = randomRange(2, 12), particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect2525;
    })();
    function regenerate(p) {
        if (p.y - p.radius > height) {
            var speed = randomRange(5, 13);
            var direction = Math.PI / -2 + randomRange(-0.1, 0.1);
            p.x = width / 2;
            p.y = height;
            p.vx = Math.cos(direction) * speed;
            __PS_MV_REG = [];
            return p.vy = Math.sin(direction) * speed;
        };
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx2526 = 0; _js_idx2526 < particles.length; _js_idx2526 += 1) {
            p = particles[_js_idx2526];
            particleUpdatebang(p);
            drawParticle(p);
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
    var p = makeParticle(width / 2, height / 2, 10, randomRange(0, Math.PI * 2));
    var friction = 0.97;
    p.radius = 10;
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        p.vx *= friction;
        p.vy *= friction;
        particleUpdatebang(p);
        drawParticle(p);
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Collision Detection */
function ep14() {
    var circle0 = { x : randomRange(0, width),
                    y : randomRange(0, height),
                    radius : randomRange(50, 150)
                  };
    var circle1 = { x : randomRange(0, width),
                    y : randomRange(0, height),
                    radius : randomRange(50, 150)
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
    __PS_MV_REG = [];
    return document.body.addEventListener('mousemove', detectRectAndRect);
};
/** Springs Part 1 */
function ep15() {
    var springPoint = makeVector(width / 2, height / 2);
    var weight = makeParticle(randomRange(0, width), randomRange(0, height), 50, randomRange(0, Math.PI * 2));
    var k = 0.1;
    weight.radius = 20;
    weight.friction = 0.9;
    particleSpringAddbang(weight, springPoint, k);
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        particleUpdatebang(weight);
        CTX.beginPath();
        CTX.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
        CTX.fill();
        CTX.beginPath();
        CTX.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
        CTX.fill();
        CTX.beginPath();
        CTX.moveTo(weight.x, weight.y);
        CTX.lineTo(springPoint.x, springPoint.y);
        CTX.stroke();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    document.body.addEventListener('mousemove', function (evt) {
        var _js2528 = springPoint;
        var _js2527 = evt.clientX;
        _js2528.x = _js2527;
        var _js2530 = springPoint;
        var _js2529 = evt.clientY;
        return _js2530.y = _js2529;
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
    particleSpringAddbang(particleA, particleB, k, separation);
    particleSpringAddbang(particleA, particleC, k, separation);
    particleSpringAddbang(particleB, particleA, k, separation);
    particleSpringAddbang(particleB, particleC, k, separation);
    particleSpringAddbang(particleC, particleA, k, separation);
    particleSpringAddbang(particleC, particleB, k, separation);
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
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
        CTX.moveTo(particleA.x, particleA.y);
        CTX.lineTo(particleB.x, particleB.y);
        CTX.lineTo(particleC.x, particleC.y);
        CTX.lineTo(particleA.x, particleA.y);
        CTX.stroke();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
function ep17() {
    return 'Particles - Optimization';
};
/** Particles - Enhancements */
function ep18() {
    var sun1 = makeParticle(300, 200, 0, 0);
    var sun2 = makeParticle(800, 600, 0, 0);
    var emitter = { x : 100, y : 0 };
    var numParticles = 100;
    var particles = (function () {
        var p;
        var collect2532 = [];
        for (var _js2531 = 0; _js2531 < numParticles; _js2531 += 1) {
            collect2532.push((p = makeParticle(emitter.x, emitter.y, randomRange(7, 8), Math.PI / 2 + randomRange(-0.1, 0.1)), (particleGravitationAddbang(p, sun1), particleGravitationAddbang(p, sun2), p.radius = 3, p)));
        };
        __PS_MV_REG = [];
        return collect2532;
    })();
    sun1.mass = 10000;
    sun1.radius = 10;
    sun2.mass = 20000;
    sun2.radius = 20;
    var draw = function (p, color) {
        CTX.fillStyle = color;
        __PS_MV_REG = [];
        return drawParticle(p);
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        draw(sun1, 'yellow');
        draw(sun2, 'yellow');
        for (var p = null, _js_idx2533 = 0; _js_idx2533 < particles.length; _js_idx2533 += 1) {
            p = particles[_js_idx2533];
            particleUpdatebang(p);
            draw(p, 'black');
            if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
                p.x = emitter.x;
                p.y = emitter.y;
                var _js2535 = p;
                var _js2534 = randomRange(7, 8);
                var heading = particleHeading(_js2535);
                _js2535.vx = Math.cos(heading) * _js2534;
                _js2535.vy = Math.sin(heading) * _js2534;
                var _js2537 = p;
                var _js2536 = Math.PI / 2 + randomRange(-0.1, 0.1);
                var speed = particleSpeed(_js2537);
                _js2537.vx = Math.cos(_js2536) * speed;
                _js2537.vy = Math.sin(_js2536) * speed;
            };
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Bezier Curves */
function ep19() {
    var p0 = makeVector(randomRange(0, width), randomRange(0, height));
    var p1 = makeVector(randomRange(0, width), randomRange(0, height));
    var p2 = makeVector(randomRange(0, width), randomRange(0, height));
    var p3 = makeVector(randomRange(0, width), randomRange(0, height));
    var k = 0;
    var direction = 0.01;
    var pFinal = {  };
    function draw() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        CTX.beginPath();
        CTX.moveTo(p0.x, p0.y);
        CTX.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        CTX.stroke();
        cubicBezier(p0, p1, p2, p3, k, pFinal);
        CTX.beginPath();
        CTX.arc(pFinal.x, pFinal.y, 10, 0, Math.PI * 2, false);
        CTX.fill();
        k += direction;
        if (k > 1 || k < 0) {
            direction = -direction;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(draw);
    };
    __PS_MV_REG = [];
    return draw();
};
/** More on Bezier Curves */
function ep20() {
    var p0 = makeVector(randomRange(0, width), randomRange(0, height));
    var p1 = makeVector(randomRange(0, width), randomRange(0, height));
    var p2 = makeVector(randomRange(0, width), randomRange(0, height));
    var cp = makeVector(p1.x * 2 - (p0.x + p2.x) / 2, p1.y * 2 - (p0.y + p2.y) / 2);
    var numPoints = 10;
    var points = (function () {
        var collect2535 = [];
        for (var _js2534 = 0; _js2534 < numPoints; _js2534 += 1) {
            collect2535.push(makeVector(randomRange(0, width), randomRange(0, height)));
        };
        __PS_MV_REG = [];
        return collect2535;
    })();
    var drawPoint = function (p) {
        CTX.beginPath();
        CTX.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    for (var p = null, _js_idx2536 = 0; _js_idx2536 < points.length; _js_idx2536 += 1) {
        p = points[_js_idx2536];
        drawPoint(p);
    };
    CTX.strokeStyle = 'lightgray';
    CTX.beginPath();
    CTX.moveTo(points[0].x, points[0].y);
    for (var i = 1, p = points[i]; i < numPoints; i += 1, p = points[i]) {
        CTX.lineTo(p.x, p.y);
        CTX.stroke();
    };
    CTX.strokeStyle = 'black';
    CTX.beginPath();
    multicurve(points, CTX);
    __PS_MV_REG = [];
    return CTX.stroke();
};
/** Bitmap Collision Detection */
function ep21() {
    var element = document.createElement('canvas');
    element.id = 'target';
    document.body.appendChild(element);
    for (var el = null, _js_arrvar2538 = document.querySelectorAll('canvas'), _js_idx2537 = 0; _js_idx2537 < _js_arrvar2538.length; _js_idx2537 += 1) {
        el = _js_arrvar2538[_js_idx2537];
        var object2539 = el.style;
        object2539.display = 'block';
        object2539.position = 'absolute';
        object2539.top = '0px';
        object2539.left = '0px';
    };
    var targetCanvas = document.getElementById('target');
    var targetCtx = targetCanvas.getContext('2d');
    var p = makeParticle(0, height / 2, 10, 0);
    targetCanvas.width = WIDTH;
    targetCanvas.height = HEIGHT;
    targetCtx.beginPath();
    targetCtx.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
    targetCtx.fill();
    var resetParticle = function (p) {
        p.x = 0;
        p.y = height / 2;
        var _js2540 = p;
        var _js2539 = randomRange(-0.1, 0.1);
        var speed = particleSpeed(_js2540);
        _js2540.vx = Math.cos(_js2539) * speed;
        __PS_MV_REG = [];
        return _js2540.vy = Math.sin(_js2539) * speed;
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        particleUpdatebang(p);
        CTX.beginPath();
        CTX.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
        CTX.fill();
        var imageData = targetCtx.getImageData(p.x, p.y, 1, 1);
        if (imageData.data[3] > 0) {
            targetCtx.globalCompositeOperation = 'destination-out';
            targetCtx.beginPath();
            targetCtx.arc(p.x, p.y, 20, 0, Math.PI * 2, false);
            targetCtx.fill();
            resetParticle(p);
        } else if (p.x > width) {
            resetParticle(p);
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** 3D - Postcards in Space */
function ep22() {
    var fl = 300;
    var numShapes = 100;
    var shapes = (function () {
        var collect2542 = [];
        for (var _js2541 = 0; _js2541 < numShapes; _js2541 += 1) {
            collect2542.push({ x : randomRange(-1000, 1000),
                               y : randomRange(-1000, 1000),
                               z : randomRange(0, 10000)
                             });
        };
        __PS_MV_REG = [];
        return collect2542;
    })();
    CTX.translate(width / 2, height / 2);
    function update() {
        CTX.clearRect(width / -2, height / -2, width, height);
        for (var shape = null, _js_idx2543 = 0; _js_idx2543 < shapes.length; _js_idx2543 += 1) {
            shape = shapes[_js_idx2543];
            var perspective = fl / (fl + shape.z);
            CTX.save();
            CTX.translate(shape.x * perspective, shape.y * perspective);
            CTX.scale(perspective, perspective);
            CTX.fillRect(-100, -100, 200, 200);
            CTX.restore();
            shape.z += 5;
            if (shape.z > 10000) {
                shape.z = 0;
            };
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** 3D Carousel */
function ep23() {
    var fl = 300;
    var numCards = 7;
    var centerZ = 1000;
    var radius = 1000;
    var baseAngle = 0;
    var rotationSpeed = 0.01;
    var cards = [];
    var _js2544 = numCards - 1;
    for (var i = 0; i <= _js2544; i += 1) {
        var y = 0;
        var angle = (Math.PI * 2 * i) / numCards;
        var img = document.createElement('img');
        var x = Math.cos(angle + baseAngle) * radius;
        var z = centerZ + Math.sin(angle + baseAngle) * radius;
        img.src = 'http://picsum.photos/id/' + i + '/300/200';
        cards.push({ x : x,
                     y : y,
                     z : z,
                     angle : angle,
                     img : img
                   });
    };
    CTX.translate(width / 2, height / 2);
    document.body.addEventListener('mousemove', function (evt) {
        return rotationSpeed = (evt.clientX - width / 2) * 0.00005;
    });
    var zsort = function (cardA, cardB) {
        return cardB.z - cardA.z;
    };
    function update() {
        baseAngle += rotationSpeed;
        cards.sort(zsort);
        CTX.clearRect(width / -2, height / -2, width, height);
        for (var card = null, _js_idx2545 = 0; _js_idx2545 < cards.length; _js_idx2545 += 1) {
            card = cards[_js_idx2545];
            var perspective = fl / (fl + card.z);
            CTX.save();
            CTX.scale(perspective, perspective);
            CTX.translate(card.x, card.y);
            CTX.translate(card.img.width / -2, card.img.height / -2);
            CTX.drawImage(card.img, 0, 0);
            CTX.restore();
            card.x = Math.cos(card.angle + baseAngle) * radius;
            card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** 3D Points and Lines */
function ep24() {
    var fl = 300;
    var numPoints = 200;
    var centerZ = 2000;
    var radius = 1000;
    var baseAngle = 0;
    var rotationSpeed = 0.01;
    var points = (function () {
        var angle;
        var y;
        var x;
        var z;
        var _js2546 = numPoints - 1;
        var collect2547 = [];
        for (var i = 0; i <= _js2546; i += 1) {
            collect2547.push((angle = 0.2 * i, (y = (2000 - (4000 * i) / numPoints) + Math.random() * 500, (x = Math.cos(angle + baseAngle) * radius, (z = centerZ + Math.sin(angle + baseAngle) * radius, { x : x,
                                                                                                                                                  y : y,
                                                                                                                                                  z : z,
                                                                                                                                                  angle : angle
                                                                                                                                                })))));
        };
        __PS_MV_REG = [];
        return collect2547;
    })();
    CTX.translate(width / 2, height / 2);
    document.body.addEventListener('mousemove', function (evt) {
        rotationSpeed = (evt.clientX - width / 2) * 0.00005;
        return ypos = (evt.clientY - height / 2) * 2;
    });
    function update() {
        baseAngle += rotationSpeed;
        CTX.clearRect(width / -2, height / -2, width, height);
        CTX.beginPath();
        for (var i = 0; i < points.length; i += 1) {
            var object2548 = points[i];
            var perspective = fl / (fl + object2548.z);
            CTX.save();
            CTX.scale(perspective, perspective);
            CTX.translate(object2548.x, object2548.y);
            if (0 === i) {
                CTX.moveTo(0, 0);
            } else {
                CTX.lineTo(0, 0);
            };
            CTX.restore();
            object2548.x = Math.cos(object2548.angle + baseAngle) * radius;
            object2548.z = centerZ + Math.sin(object2548.angle + baseAngle) * radius;
        };
        CTX.stroke();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** 3D Modeling, Points and Lines Part 2 */
function ep25() {
    var fl = 300;
    var points = [{ x : -500,
                    y : -500,
                    z : 1000
                  }, { x : 500,
                       y : -500,
                       z : 1000
                     }, { x : 500,
                          y : -500,
                          z : 500
                        }, { x : -500,
                             y : -500,
                             z : 500
                           }, { x : -500,
                                y : 500,
                                z : 1000
                              }, { x : 500,
                                   y : 500,
                                   z : 1000
                                 }, { x : 500,
                                      y : 500,
                                      z : 500
                                    }, { x : -500,
                                         y : 500,
                                         z : 500
                                       }];
    var needsUpdate = true;
    CTX.translate(width / 2, height / 2);
    var project = function () {
        for (var p = null, _js_idx2548 = 0; _js_idx2548 < points.length; _js_idx2548 += 1) {
            p = points[_js_idx2548];
            var scale = fl / (fl + p.z);
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        };
    };
    var drawLine = function () {
        var p = points[arguments[0]];
        CTX.moveTo(p.sx, p.sy);
        var _js2549 = arguments.length - 1;
        for (var i = 1; i <= _js2549; i += 1) {
            var p2550 = points[arguments[i]];
            CTX.lineTo(p2550.sx, p2550.sy);
        };
    };
    var translateModel = function (x, y, z) {
        for (var p = null, _js_idx2550 = 0; _js_idx2550 < points.length; _js_idx2550 += 1) {
            p = points[_js_idx2550];
            p.x += x;
            p.y += y;
            p.z += z;
        };
        return needsUpdate = true;
    };
    document.body.addEventListener('keydown', function (evt) {
        switch (evt.keyCode) {
        case 37:
            __PS_MV_REG = [];
            return translateModel(-20, 0, 0);
        case 39:
            __PS_MV_REG = [];
            return translateModel(20, 0, 0);
        case 38:
            __PS_MV_REG = [];
            return evt.shiftKey ? translateModel(0, 0, 20) : translateModel(0, -20, 0);
        case 40:
            __PS_MV_REG = [];
            return evt.shiftKey ? translateModel(0, 0, -20) : translateModel(0, 20, 0);
        };
    });
    function update() {
        if (needsUpdate) {
            CTX.clearRect(width / -2, height / -2, width, height);
            project();
            CTX.beginPath();
            drawLine(0, 1, 2, 3, 0);
            drawLine(4, 5, 6, 7, 4);
            drawLine(0, 4);
            drawLine(1, 5);
            drawLine(2, 6);
            drawLine(3, 7);
            CTX.stroke();
            needsUpdate = null;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** 2D and 3D Coordinate Rotation */
function ep26() {
    var fl = 300;
    var centerZ = 1500;
    var points = [{ x : -500,
                    y : -500,
                    z : 500
                  }, { x : 500,
                       y : -500,
                       z : 500
                     }, { x : 500,
                          y : -500,
                          z : -500
                        }, { x : -500,
                             y : -500,
                             z : -500
                           }, { x : -500,
                                y : 500,
                                z : 500
                              }, { x : 500,
                                   y : 500,
                                   z : 500
                                 }, { x : 500,
                                      y : 500,
                                      z : -500
                                    }, { x : -500,
                                         y : 500,
                                         z : -500
                                       }];
    var needsUpdate = true;
    CTX.translate(width / 2, height / 2);
    var project = function () {
        for (var p = null, _js_idx2551 = 0; _js_idx2551 < points.length; _js_idx2551 += 1) {
            p = points[_js_idx2551];
            var scale = fl / (fl + p.z + centerZ);
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        };
    };
    var drawLine = function () {
        var p = points[arguments[0]];
        CTX.moveTo(p.sx, p.sy);
        var _js2552 = arguments.length - 1;
        for (var i = 1; i <= _js2552; i += 1) {
            var p2553 = points[arguments[i]];
            CTX.lineTo(p2553.sx, p2553.sy);
        };
    };
    var translateModel = function (x, y, z) {
        for (var p = null, _js_idx2553 = 0; _js_idx2553 < points.length; _js_idx2553 += 1) {
            p = points[_js_idx2553];
            p.x += x;
            p.y += y;
            p.z += z;
        };
        return needsUpdate = true;
    };
    var rotateX = function (angle) {
        var cos2554 = Math.cos(angle);
        var sin2555 = Math.sin(angle);
        for (var p = null, _js_idx2556 = 0; _js_idx2556 < points.length; _js_idx2556 += 1) {
            p = points[_js_idx2556];
            p.y = p.y * cos2554 - p.z * sin2555;
            p.z = p.z * cos2554 + p.y * sin2555;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    var rotateY = function (angle) {
        var cos2557 = Math.cos(angle);
        var sin2558 = Math.sin(angle);
        for (var p = null, _js_idx2559 = 0; _js_idx2559 < points.length; _js_idx2559 += 1) {
            p = points[_js_idx2559];
            p.x = p.x * cos2557 - p.z * sin2558;
            p.z = p.z * cos2557 + p.x * sin2558;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    var rotateZ = function (angle) {
        var cos2560 = Math.cos(angle);
        var sin2561 = Math.sin(angle);
        for (var p = null, _js_idx2562 = 0; _js_idx2562 < points.length; _js_idx2562 += 1) {
            p = points[_js_idx2562];
            p.x = p.x * cos2560 - p.y * sin2561;
            p.y = p.y * cos2560 + p.x * sin2561;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    document.body.addEventListener('keydown', function (evt) {
        switch (evt.keyCode) {
        case 37:
            __PS_MV_REG = [];
            return evt.ctrlKey ? rotateY(0.05) : translateModel(-20, 0, 0);
        case 39:
            __PS_MV_REG = [];
            return evt.ctrlKey ? rotateY(-0.05) : translateModel(20, 0, 0);
        case 38:
            if (evt.shiftKey) {
                __PS_MV_REG = [];
                return translateModel(0, 0, 20);
            } else if (evt.ctrlKey) {
                __PS_MV_REG = [];
                return rotateX(0.05);
            } else {
                __PS_MV_REG = [];
                return translateModel(0, -20, 0);
            };
        case 40:
            if (evt.shiftKey) {
                __PS_MV_REG = [];
                return translateModel(0, 0, -20);
            } else if (evt.ctrlKey) {
                __PS_MV_REG = [];
                return rotateX(-0.05);
            } else {
                __PS_MV_REG = [];
                return translateModel(0, 20, 0);
            };
        };
    });
    function update() {
        if (needsUpdate) {
            CTX.clearRect(width / -2, height / -2, width, height);
            project();
            CTX.beginPath();
            drawLine(0, 1, 2, 3, 0);
            drawLine(4, 5, 6, 7, 4);
            drawLine(0, 4);
            drawLine(1, 5);
            drawLine(2, 6);
            drawLine(3, 7);
            CTX.stroke();
            needsUpdate = null;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Easing and Tweening */
function ep27() {
    var target = makeVector(width, Math.random() * height);
    var position = makeVector(0, Math.random() * height);
    var ease = 0.1;
    document.body.addEventListener('mousemove', function (evt) {
        target.x = evt.clientX;
        return target.y = evt.clientY;
    });
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        CTX.beginPath();
        CTX.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
        CTX.fill();
        var _ps_incr_place2563 = (target.x - position.x) * ease;
        position.x += _ps_incr_place2563;
        var _ps_incr_place2564 = (target.y - position.y) * ease;
        position.y += _ps_incr_place2564;
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** More on Easing */
function ep28() {
    var target = makeVector(width, Math.random() * height);
    var numPoints = 100;
    var points = (function () {
        var collect2566 = [];
        for (var _js2565 = 0; _js2565 < numPoints; _js2565 += 1) {
            collect2566.push(makeVector(0, 0));
        };
        __PS_MV_REG = [];
        return collect2566;
    })();
    var ease = 0.5;
    document.body.addEventListener('mousemove', function (evt) {
        target.x = evt.clientX;
        return target.y = evt.clientY;
    });
    var easeTo = function (position, target, ease) {
        var _ps_incr_place2568;
        var _ps_incr_place2567 = (target.x - position.x) * ease;
        position.x += _ps_incr_place2567;
        return (_ps_incr_place2568 = (target.y - position.y) * ease, position.y += _ps_incr_place2568);
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        var leader = makeVector(target.x, target.y);
        var _js2569 = numPoints - 1;
        for (var i = 1; i <= _js2569; i += 1) {
            var point = points[i];
            easeTo(point, leader, ease);
            CTX.beginPath();
            CTX.arc(point.x, point.y, 10, 0, Math.PI * 2, false);
            CTX.fill();
            leader.x = point.x;
            leader.y = point.y;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Tweening Part I */
function ep29() {
    var start = { x : 100, y : 100 };
    var target = {  };
    var change = {  };
    var startTime = null;
    var duration = 1000;
    var drawCircle = function (x, y) {
        CTX.beginPath();
        CTX.arc(x, y, 20, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    var linearTween = function (k, b, c, d) {
        return (c * k) / d + b;
    };
    var easeInQuad = function (k, b, c, d) {
        var k2570 = k / d;
        return c * k2570 * k2570 + b;
    };
    var easeOutQuad = function (k, b, c, d) {
        var k2571 = k / d;
        return -c * k2571 * (k2571 - 2) + b;
    };
    var easeInOutQuad = function (k, b, c, d) {
        var k2572 = k / (d / 2);
        return k2572 < 1 ? (c * k2572 * k2572) / 2 + b : (c / -2) * ((k2572 - 1) * (k2572 - 3) - 1) + b;
    };
    drawCircle(start.x, start.y);
    document.body.addEventListener('click', function (evt) {
        target.x = evt.clientX;
        target.y = evt.clientY;
        change.x = target.x - start.x;
        change.y = target.y - start.y;
        startTime = new Date();
        __PS_MV_REG = [];
        return update();
    });
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        var time = new Date() - startTime;
        if (time < duration) {
            var x2573 = easeInOutQuad(time, start.x, change.x, duration);
            var y2574 = easeInOutQuad(time, start.y, change.y, duration);
            drawCircle(x2573, y2574);
        } else {
            drawCircle(target.x, target.y);
            start.x = target.x;
            start.y = target.y;
        };
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
};
/** Tweening Part II */
function ep30() {
    var ball = { x : 100,
                 y : 100,
                 alpha : 1
               };
    var duration = 1000;
    var drawCircle = function (x, y) {
        CTX.beginPath();
        CTX.arc(x, y, 20, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    var linearTween = function (k, b, c, d) {
        return (c * k) / d + b;
    };
    var easeInQuad = function (k, b, c, d) {
        var k2575 = k / d;
        return c * k2575 * k2575 + b;
    };
    var easeOutQuad = function (k, b, c, d) {
        var k2576 = k / d;
        return -c * k2576 * (k2576 - 2) + b;
    };
    var easeInOutQuad = function (k, b, c, d) {
        var k2577 = k / (d / 2);
        return k2577 < 1 ? (c * k2577 * k2577) / 2 + b : (c / -2) * ((k2577 - 1) * (k2577 - 3) - 1) + b;
    };
    var render = function () {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        CTX.beginPath();
        CTX.globalAlpha = ball.alpha;
        CTX.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    var tween = function (obj, props, duration, easingFunc, onProgress, onComplete) {
        var starts = {  };
        var changes = {  };
        var startTime = new Date();
        for (var prop in props) {
            starts[prop] = obj[prop];
            changes[prop] = props[prop] - starts[prop];
        };
        var update = function () {
            var time = new Date() - startTime;
            if (time < duration) {
                for (var prop in props) {
                    obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
                };
                onProgress();
                __PS_MV_REG = [];
                return requestAnimationFrame(update);
            } else {
                time = duration;
                for (var prop in props) {
                    obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
                };
                __PS_MV_REG = [];
                return onComplete();
            };
        };
        __PS_MV_REG = [];
        return update();
    };
    var tweenBack = function () {
        __PS_MV_REG = [];
        return tween(ball, { x : 100,
                             y : 100,
                             alpha : 1
                           }, 1000, easeInOutQuad, render, render);
    };
    __PS_MV_REG = [];
    return tween(ball, { x : 900,
                         y : 700,
                         alpha : 0
                       }, 1000, easeInOutQuad, render, tweenBack);
};
window.onload = ep30;
