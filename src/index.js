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
        var _js964 = i - 1;
        i = _js964;
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
        var _js964 = angle + 0.01;
        angle = _js964;
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
    var _js965 = v;
    var _js964 = Math.PI / 6;
    var length = vecLength(_js965);
    var _js967 = _js965;
    var _js966 = Math.cos(_js964) * length;
    _js967.x = _js966;
    var _js969 = _js965;
    var _js968 = Math.sin(_js964) * length;
    _js969.y = _js968;
    var _js971 = v;
    var _js970 = 100;
    var angle = vecAngle(_js971);
    var _js973 = _js971;
    var _js972 = Math.cos(angle) * _js970;
    _js973.x = _js972;
    var _js975 = _js971;
    var _js974 = Math.sin(angle) * _js970;
    _js975.y = _js974;
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
        var collect977 = [];
        for (var _js976 = 0; _js976 < numParticles; _js976 += 1) {
            collect977.push(makeParticle(width / 2, height / 2, randomRange(1, 5), randomRange(0, Math.PI * 2)));
        };
        __PS_MV_REG = [];
        return collect977;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx978 = 0; _js_idx978 < particles.length; _js_idx978 += 1) {
            p = particles[_js_idx978];
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
        var collect980 = [];
        for (var _js979 = 0; _js979 < numParticles; _js979 += 1) {
            collect980.push(makeParticle(width / 2, height / 3, randomRange(2, 7), randomRange(0, Math.PI * 2), 0.1));
        };
        __PS_MV_REG = [];
        return collect980;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx981 = 0; _js_idx981 < particles.length; _js_idx981 += 1) {
            p = particles[_js_idx981];
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
        var _js983 = thrust;
        var _js982 = angle;
        var length = vecLength(_js983);
        var _js987 = _js983;
        var _js986 = Math.cos(_js982) * length;
        _js987.x = _js986;
        var _js989 = _js983;
        var _js988 = Math.sin(_js982) * length;
        _js989.y = _js988;
        var _js985 = thrust;
        var _js984 = thrusting ? 0.1 : 0;
        var angle990 = vecAngle(_js985);
        var _js992 = _js985;
        var _js991 = Math.cos(angle990) * _js984;
        _js992.x = _js991;
        var _js994 = _js985;
        var _js993 = Math.sin(angle990) * _js984;
        _js994.y = _js993;
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
        var collect996 = [];
        for (var _js995 = 0; _js995 < numParticles; _js995 += 1) {
            collect996.push((particle = makeParticle(width / 2, height, randomRange(5, 13), Math.PI / -2 + randomRange(-0.1, 0.1), 0.1), ((particle.radius = randomRange(2, 12), particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect996;
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
        for (var p = null, _js_idx997 = 0; _js_idx997 < particles.length; _js_idx997 += 1) {
            p = particles[_js_idx997];
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
        var _js999 = springPoint;
        var _js998 = evt.clientX;
        _js999.x = _js998;
        var _js1001 = springPoint;
        var _js1000 = evt.clientY;
        return _js1001.y = _js1000;
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
        var collect1003 = [];
        for (var _js1002 = 0; _js1002 < numParticles; _js1002 += 1) {
            collect1003.push((p = makeParticle(emitter.x, emitter.y, randomRange(7, 8), Math.PI / 2 + randomRange(-0.1, 0.1)), (particleGravitationAddbang(p, sun1), particleGravitationAddbang(p, sun2), p.radius = 3, p)));
        };
        __PS_MV_REG = [];
        return collect1003;
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
        for (var p = null, _js_idx1004 = 0; _js_idx1004 < particles.length; _js_idx1004 += 1) {
            p = particles[_js_idx1004];
            particleUpdatebang(p);
            draw(p, 'black');
            if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
                p.x = emitter.x;
                p.y = emitter.y;
                var _js1006 = p;
                var _js1005 = randomRange(7, 8);
                var heading = particleHeading(_js1006);
                _js1006.vx = Math.cos(heading) * _js1005;
                _js1006.vy = Math.sin(heading) * _js1005;
                var _js1008 = p;
                var _js1007 = Math.PI / 2 + randomRange(-0.1, 0.1);
                var speed = particleSpeed(_js1008);
                _js1008.vx = Math.cos(_js1007) * speed;
                _js1008.vy = Math.sin(_js1007) * speed;
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
        var collect1006 = [];
        for (var _js1005 = 0; _js1005 < numPoints; _js1005 += 1) {
            collect1006.push(makeVector(randomRange(0, width), randomRange(0, height)));
        };
        __PS_MV_REG = [];
        return collect1006;
    })();
    var drawPoint = function (p) {
        CTX.beginPath();
        CTX.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    for (var p = null, _js_idx1007 = 0; _js_idx1007 < points.length; _js_idx1007 += 1) {
        p = points[_js_idx1007];
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
    for (var el = null, _js_arrvar1009 = document.querySelectorAll('canvas'), _js_idx1008 = 0; _js_idx1008 < _js_arrvar1009.length; _js_idx1008 += 1) {
        el = _js_arrvar1009[_js_idx1008];
        var object1010 = el.style;
        object1010.display = 'block';
        object1010.position = 'absolute';
        object1010.top = '0px';
        object1010.left = '0px';
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
        var _js1011 = p;
        var _js1010 = randomRange(-0.1, 0.1);
        var speed = particleSpeed(_js1011);
        _js1011.vx = Math.cos(_js1010) * speed;
        __PS_MV_REG = [];
        return _js1011.vy = Math.sin(_js1010) * speed;
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
        var collect1013 = [];
        for (var _js1012 = 0; _js1012 < numShapes; _js1012 += 1) {
            collect1013.push({ x : randomRange(-1000, 1000),
                               y : randomRange(-1000, 1000),
                               z : randomRange(0, 10000)
                             });
        };
        __PS_MV_REG = [];
        return collect1013;
    })();
    CTX.translate(width / 2, height / 2);
    function update() {
        CTX.clearRect(width / -2, height / -2, width, height);
        for (var shape = null, _js_idx1014 = 0; _js_idx1014 < shapes.length; _js_idx1014 += 1) {
            shape = shapes[_js_idx1014];
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
    var _js1015 = numCards - 1;
    for (var i = 0; i <= _js1015; i += 1) {
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
        for (var card = null, _js_idx1016 = 0; _js_idx1016 < cards.length; _js_idx1016 += 1) {
            card = cards[_js_idx1016];
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
        var _js1017 = numPoints - 1;
        var collect1018 = [];
        for (var i = 0; i <= _js1017; i += 1) {
            collect1018.push((angle = 0.2 * i, (y = (2000 - (4000 * i) / numPoints) + Math.random() * 500, (x = Math.cos(angle + baseAngle) * radius, (z = centerZ + Math.sin(angle + baseAngle) * radius, { x : x,
                                                                                                                                                  y : y,
                                                                                                                                                  z : z,
                                                                                                                                                  angle : angle
                                                                                                                                                })))));
        };
        __PS_MV_REG = [];
        return collect1018;
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
            var object1019 = points[i];
            var perspective = fl / (fl + object1019.z);
            CTX.save();
            CTX.scale(perspective, perspective);
            CTX.translate(object1019.x, object1019.y);
            if (0 === i) {
                CTX.moveTo(0, 0);
            } else {
                CTX.lineTo(0, 0);
            };
            CTX.restore();
            object1019.x = Math.cos(object1019.angle + baseAngle) * radius;
            object1019.z = centerZ + Math.sin(object1019.angle + baseAngle) * radius;
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
        for (var p = null, _js_idx1019 = 0; _js_idx1019 < points.length; _js_idx1019 += 1) {
            p = points[_js_idx1019];
            var scale = fl / (fl + p.z);
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        };
    };
    var drawLine = function () {
        var p = points[arguments[0]];
        CTX.moveTo(p.sx, p.sy);
        var _js1020 = arguments.length - 1;
        for (var i = 1; i <= _js1020; i += 1) {
            var p1021 = points[arguments[i]];
            CTX.lineTo(p1021.sx, p1021.sy);
        };
    };
    var translateModel = function (x, y, z) {
        for (var p = null, _js_idx1021 = 0; _js_idx1021 < points.length; _js_idx1021 += 1) {
            p = points[_js_idx1021];
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
        for (var p = null, _js_idx1022 = 0; _js_idx1022 < points.length; _js_idx1022 += 1) {
            p = points[_js_idx1022];
            var scale = fl / (fl + p.z + centerZ);
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        };
    };
    var drawLine = function () {
        var p = points[arguments[0]];
        CTX.moveTo(p.sx, p.sy);
        var _js1023 = arguments.length - 1;
        for (var i = 1; i <= _js1023; i += 1) {
            var p1024 = points[arguments[i]];
            CTX.lineTo(p1024.sx, p1024.sy);
        };
    };
    var translateModel = function (x, y, z) {
        for (var p = null, _js_idx1024 = 0; _js_idx1024 < points.length; _js_idx1024 += 1) {
            p = points[_js_idx1024];
            p.x += x;
            p.y += y;
            p.z += z;
        };
        return needsUpdate = true;
    };
    var rotateX = function (angle) {
        var cos1025 = Math.cos(angle);
        var sin1026 = Math.sin(angle);
        for (var p = null, _js_idx1027 = 0; _js_idx1027 < points.length; _js_idx1027 += 1) {
            p = points[_js_idx1027];
            p.y = p.y * cos1025 - p.z * sin1026;
            p.z = p.z * cos1025 + p.y * sin1026;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    var rotateY = function (angle) {
        var cos1028 = Math.cos(angle);
        var sin1029 = Math.sin(angle);
        for (var p = null, _js_idx1030 = 0; _js_idx1030 < points.length; _js_idx1030 += 1) {
            p = points[_js_idx1030];
            p.x = p.x * cos1028 - p.z * sin1029;
            p.z = p.z * cos1028 + p.x * sin1029;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    var rotateZ = function (angle) {
        var cos1031 = Math.cos(angle);
        var sin1032 = Math.sin(angle);
        for (var p = null, _js_idx1033 = 0; _js_idx1033 < points.length; _js_idx1033 += 1) {
            p = points[_js_idx1033];
            p.x = p.x * cos1031 - p.y * sin1032;
            p.y = p.y * cos1031 + p.x * sin1032;
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
        CTX.clearRect(0, 0, width, height);
        CTX.beginPath();
        CTX.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
        CTX.fill();
        var _ps_incr_place1034 = (target.x - position.x) * ease;
        position.x += _ps_incr_place1034;
        var _ps_incr_place1035 = (target.y - position.y) * ease;
        position.y += _ps_incr_place1035;
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
        var collect1037 = [];
        for (var _js1036 = 0; _js1036 < numPoints; _js1036 += 1) {
            collect1037.push(makeVector(0, 0));
        };
        __PS_MV_REG = [];
        return collect1037;
    })();
    var ease = 0.5;
    document.body.addEventListener('mousemove', function (evt) {
        target.x = evt.clientX;
        return target.y = evt.clientY;
    });
    var easeTo = function (position, target, ease) {
        var _ps_incr_place1039;
        var _ps_incr_place1038 = (target.x - position.x) * ease;
        position.x += _ps_incr_place1038;
        return (_ps_incr_place1039 = (target.y - position.y) * ease, position.y += _ps_incr_place1039);
    };
    function update() {
        CTX.clearRect(0, 0, width, height);
        var leader = makeVector(target.x, target.y);
        var _js1040 = numPoints - 1;
        for (var i = 1; i <= _js1040; i += 1) {
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
window.onload = ep28;
