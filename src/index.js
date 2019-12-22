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
        var _js728 = i - 1;
        i = _js728;
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
        var _js728 = angle + 0.01;
        angle = _js728;
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
    var _js729 = v;
    var _js728 = Math.PI / 6;
    var length = vecLength(_js729);
    var _js731 = _js729;
    var _js730 = Math.cos(_js728) * length;
    _js731.x = _js730;
    var _js733 = _js729;
    var _js732 = Math.sin(_js728) * length;
    _js733.y = _js732;
    var _js735 = v;
    var _js734 = 100;
    var angle = vecAngle(_js735);
    var _js737 = _js735;
    var _js736 = Math.cos(angle) * _js734;
    _js737.x = _js736;
    var _js739 = _js735;
    var _js738 = Math.sin(angle) * _js734;
    _js739.y = _js738;
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
        var collect741 = [];
        for (var _js740 = 0; _js740 < numParticles; _js740 += 1) {
            collect741.push(makeParticle(width / 2, height / 2, randomRange(1, 5), randomRange(0, Math.PI * 2)));
        };
        __PS_MV_REG = [];
        return collect741;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx742 = 0; _js_idx742 < particles.length; _js_idx742 += 1) {
            p = particles[_js_idx742];
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
        var collect744 = [];
        for (var _js743 = 0; _js743 < numParticles; _js743 += 1) {
            collect744.push(makeParticle(width / 2, height / 3, randomRange(2, 7), randomRange(0, Math.PI * 2), 0.1));
        };
        __PS_MV_REG = [];
        return collect744;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx745 = 0; _js_idx745 < particles.length; _js_idx745 += 1) {
            p = particles[_js_idx745];
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
        var _js747 = thrust;
        var _js746 = angle;
        var length = vecLength(_js747);
        var _js751 = _js747;
        var _js750 = Math.cos(_js746) * length;
        _js751.x = _js750;
        var _js753 = _js747;
        var _js752 = Math.sin(_js746) * length;
        _js753.y = _js752;
        var _js749 = thrust;
        var _js748 = thrusting ? 0.1 : 0;
        var angle754 = vecAngle(_js749);
        var _js756 = _js749;
        var _js755 = Math.cos(angle754) * _js748;
        _js756.x = _js755;
        var _js758 = _js749;
        var _js757 = Math.sin(angle754) * _js748;
        _js758.y = _js757;
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
        var collect760 = [];
        for (var _js759 = 0; _js759 < numParticles; _js759 += 1) {
            collect760.push((particle = makeParticle(width / 2, height, randomRange(5, 13), Math.PI / -2 + randomRange(-0.1, 0.1), 0.1), ((particle.radius = randomRange(2, 12), particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect760;
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
        for (var p = null, _js_idx761 = 0; _js_idx761 < particles.length; _js_idx761 += 1) {
            p = particles[_js_idx761];
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
        var _js763 = springPoint;
        var _js762 = evt.clientX;
        _js763.x = _js762;
        var _js765 = springPoint;
        var _js764 = evt.clientY;
        return _js765.y = _js764;
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
        var collect767 = [];
        for (var _js766 = 0; _js766 < numParticles; _js766 += 1) {
            collect767.push((p = makeParticle(emitter.x, emitter.y, randomRange(7, 8), Math.PI / 2 + randomRange(-0.1, 0.1)), (particleGravitationAddbang(p, sun1), particleGravitationAddbang(p, sun2), p.radius = 3, p)));
        };
        __PS_MV_REG = [];
        return collect767;
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
        for (var p = null, _js_idx768 = 0; _js_idx768 < particles.length; _js_idx768 += 1) {
            p = particles[_js_idx768];
            particleUpdatebang(p);
            draw(p, 'black');
            if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
                p.x = emitter.x;
                p.y = emitter.y;
                var _js770 = p;
                var _js769 = randomRange(7, 8);
                var heading = particleHeading(_js770);
                _js770.vx = Math.cos(heading) * _js769;
                _js770.vy = Math.sin(heading) * _js769;
                var _js772 = p;
                var _js771 = Math.PI / 2 + randomRange(-0.1, 0.1);
                var speed = particleSpeed(_js772);
                _js772.vx = Math.cos(_js771) * speed;
                _js772.vy = Math.sin(_js771) * speed;
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
        var collect770 = [];
        for (var _js769 = 0; _js769 < numPoints; _js769 += 1) {
            collect770.push(makeVector(randomRange(0, width), randomRange(0, height)));
        };
        __PS_MV_REG = [];
        return collect770;
    })();
    var drawPoint = function (p) {
        CTX.beginPath();
        CTX.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    for (var p = null, _js_idx771 = 0; _js_idx771 < points.length; _js_idx771 += 1) {
        p = points[_js_idx771];
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
window.onload = ep20;
