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
        var _js1739 = i - 1;
        i = _js1739;
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
        var _js1739 = angle + 0.01;
        angle = _js1739;
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
    var _js1740 = v;
    var _js1739 = Math.PI / 6;
    var length = vecLength(_js1740);
    var _js1742 = _js1740;
    var _js1741 = Math.cos(_js1739) * length;
    _js1742.x = _js1741;
    var _js1744 = _js1740;
    var _js1743 = Math.sin(_js1739) * length;
    _js1744.y = _js1743;
    var _js1746 = v;
    var _js1745 = 100;
    var angle = vecAngle(_js1746);
    var _js1748 = _js1746;
    var _js1747 = Math.cos(angle) * _js1745;
    _js1748.x = _js1747;
    var _js1750 = _js1746;
    var _js1749 = Math.sin(angle) * _js1745;
    _js1750.y = _js1749;
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
        var collect1752 = [];
        for (var _js1751 = 0; _js1751 < numParticles; _js1751 += 1) {
            collect1752.push(makeParticle(width / 2, height / 2, randomRange(1, 5), randomRange(0, Math.PI * 2)));
        };
        __PS_MV_REG = [];
        return collect1752;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1753 = 0; _js_idx1753 < particles.length; _js_idx1753 += 1) {
            p = particles[_js_idx1753];
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
        var collect1755 = [];
        for (var _js1754 = 0; _js1754 < numParticles; _js1754 += 1) {
            collect1755.push(makeParticle(width / 2, height / 3, randomRange(2, 7), randomRange(0, Math.PI * 2), 0.1));
        };
        __PS_MV_REG = [];
        return collect1755;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1756 = 0; _js_idx1756 < particles.length; _js_idx1756 += 1) {
            p = particles[_js_idx1756];
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
        var _js1758 = thrust;
        var _js1757 = angle;
        var length = vecLength(_js1758);
        var _js1762 = _js1758;
        var _js1761 = Math.cos(_js1757) * length;
        _js1762.x = _js1761;
        var _js1764 = _js1758;
        var _js1763 = Math.sin(_js1757) * length;
        _js1764.y = _js1763;
        var _js1760 = thrust;
        var _js1759 = thrusting ? 0.1 : 0;
        var angle1765 = vecAngle(_js1760);
        var _js1767 = _js1760;
        var _js1766 = Math.cos(angle1765) * _js1759;
        _js1767.x = _js1766;
        var _js1769 = _js1760;
        var _js1768 = Math.sin(angle1765) * _js1759;
        _js1769.y = _js1768;
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
        var collect1771 = [];
        for (var _js1770 = 0; _js1770 < numParticles; _js1770 += 1) {
            collect1771.push((particle = makeParticle(width / 2, height, randomRange(5, 13), Math.PI / -2 + randomRange(-0.1, 0.1), 0.1), ((particle.radius = randomRange(2, 12), particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect1771;
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
        for (var p = null, _js_idx1772 = 0; _js_idx1772 < particles.length; _js_idx1772 += 1) {
            p = particles[_js_idx1772];
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
        var _js1774 = springPoint;
        var _js1773 = evt.clientX;
        _js1774.x = _js1773;
        var _js1776 = springPoint;
        var _js1775 = evt.clientY;
        return _js1776.y = _js1775;
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
        var collect1778 = [];
        for (var _js1777 = 0; _js1777 < numParticles; _js1777 += 1) {
            collect1778.push((p = makeParticle(emitter.x, emitter.y, randomRange(7, 8), Math.PI / 2 + randomRange(-0.1, 0.1)), (particleGravitationAddbang(p, sun1), particleGravitationAddbang(p, sun2), p.radius = 3, p)));
        };
        __PS_MV_REG = [];
        return collect1778;
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
        for (var p = null, _js_idx1779 = 0; _js_idx1779 < particles.length; _js_idx1779 += 1) {
            p = particles[_js_idx1779];
            particleUpdatebang(p);
            draw(p, 'black');
            if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
                p.x = emitter.x;
                p.y = emitter.y;
                var _js1781 = p;
                var _js1780 = randomRange(7, 8);
                var heading = particleHeading(_js1781);
                _js1781.vx = Math.cos(heading) * _js1780;
                _js1781.vy = Math.sin(heading) * _js1780;
                var _js1783 = p;
                var _js1782 = Math.PI / 2 + randomRange(-0.1, 0.1);
                var speed = particleSpeed(_js1783);
                _js1783.vx = Math.cos(_js1782) * speed;
                _js1783.vy = Math.sin(_js1782) * speed;
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
        var collect1781 = [];
        for (var _js1780 = 0; _js1780 < numPoints; _js1780 += 1) {
            collect1781.push(makeVector(randomRange(0, width), randomRange(0, height)));
        };
        __PS_MV_REG = [];
        return collect1781;
    })();
    var drawPoint = function (p) {
        CTX.beginPath();
        CTX.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    for (var p = null, _js_idx1782 = 0; _js_idx1782 < points.length; _js_idx1782 += 1) {
        p = points[_js_idx1782];
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
    for (var el = null, _js_arrvar1784 = document.querySelectorAll('canvas'), _js_idx1783 = 0; _js_idx1783 < _js_arrvar1784.length; _js_idx1783 += 1) {
        el = _js_arrvar1784[_js_idx1783];
        var object1785 = el.style;
        object1785.display = 'block';
        object1785.position = 'absolute';
        object1785.top = '0px';
        object1785.left = '0px';
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
        var _js1786 = p;
        var _js1785 = randomRange(-0.1, 0.1);
        var speed = particleSpeed(_js1786);
        _js1786.vx = Math.cos(_js1785) * speed;
        __PS_MV_REG = [];
        return _js1786.vy = Math.sin(_js1785) * speed;
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
        var collect1788 = [];
        for (var _js1787 = 0; _js1787 < numShapes; _js1787 += 1) {
            collect1788.push({ x : randomRange(-1000, 1000),
                               y : randomRange(-1000, 1000),
                               z : randomRange(0, 10000)
                             });
        };
        __PS_MV_REG = [];
        return collect1788;
    })();
    CTX.translate(width / 2, height / 2);
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        CTX.clearRect(width / -2, height / -2, width, height);
        for (var shape = null, _js_idx1789 = 0; _js_idx1789 < shapes.length; _js_idx1789 += 1) {
            shape = shapes[_js_idx1789];
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
    var _js1790 = numCards - 1;
    for (var i = 0; i <= _js1790; i += 1) {
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
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        baseAngle += rotationSpeed;
        cards.sort(zsort);
        CTX.clearRect(width / -2, height / -2, width, height);
        for (var card = null, _js_idx1791 = 0; _js_idx1791 < cards.length; _js_idx1791 += 1) {
            card = cards[_js_idx1791];
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
        var _js1792 = numPoints - 1;
        var collect1793 = [];
        for (var i = 0; i <= _js1792; i += 1) {
            collect1793.push((angle = 0.2 * i, (y = (2000 - (4000 * i) / numPoints) + Math.random() * 500, (x = Math.cos(angle + baseAngle) * radius, (z = centerZ + Math.sin(angle + baseAngle) * radius, { x : x,
                                                                                                                                                  y : y,
                                                                                                                                                  z : z,
                                                                                                                                                  angle : angle
                                                                                                                                                })))));
        };
        __PS_MV_REG = [];
        return collect1793;
    })();
    CTX.translate(width / 2, height / 2);
    document.body.addEventListener('mousemove', function (evt) {
        rotationSpeed = (evt.clientX - width / 2) * 0.00005;
        return ypos = (evt.clientY - height / 2) * 2;
    });
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        baseAngle += rotationSpeed;
        CTX.clearRect(width / -2, height / -2, width, height);
        CTX.beginPath();
        for (var i = 0; i < points.length; i += 1) {
            var object1794 = points[i];
            var perspective = fl / (fl + object1794.z);
            CTX.save();
            CTX.scale(perspective, perspective);
            CTX.translate(object1794.x, object1794.y);
            if (0 === i) {
                CTX.moveTo(0, 0);
            } else {
                CTX.lineTo(0, 0);
            };
            CTX.restore();
            object1794.x = Math.cos(object1794.angle + baseAngle) * radius;
            object1794.z = centerZ + Math.sin(object1794.angle + baseAngle) * radius;
        };
        CTX.stroke();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
window.onload = ep24;
