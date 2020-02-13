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
        var _js3186 = i - 1;
        i = _js3186;
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
function renderArm(arm) {
    CTX.strokeStyle = '#000000';
    CTX.lineWidth = 5;
    CTX.beginPath();
    CTX.moveTo(arm.x, arm.y);
    CTX.lineTo(armEndX(arm), armEndY(arm));
    __PS_MV_REG = [];
    return CTX.stroke();
};
function renderFkSystem(fkSystem) {
    for (var arm = null, _js_arrvar3187 = fkSystem.arms, _js_idx3186 = 0; _js_idx3186 < _js_arrvar3187.length; _js_idx3186 += 1) {
        arm = _js_arrvar3187[_js_idx3186];
        renderArm(arm);
    };
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
        var _js3188 = angle + 0.01;
        angle = _js3188;
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
    var _js3189 = v;
    var _js3188 = Math.PI / 6;
    var length = vecLength(_js3189);
    var _js3191 = _js3189;
    var _js3190 = Math.cos(_js3188) * length;
    _js3191.x = _js3190;
    var _js3193 = _js3189;
    var _js3192 = Math.sin(_js3188) * length;
    _js3193.y = _js3192;
    var _js3195 = v;
    var _js3194 = 100;
    var angle = vecAngle(_js3195);
    var _js3197 = _js3195;
    var _js3196 = Math.cos(angle) * _js3194;
    _js3197.x = _js3196;
    var _js3199 = _js3195;
    var _js3198 = Math.sin(angle) * _js3194;
    _js3199.y = _js3198;
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
        var collect3201 = [];
        for (var _js3200 = 0; _js3200 < numParticles; _js3200 += 1) {
            collect3201.push(makeParticle(width / 2, height / 2, randomRange(1, 5), randomRange(0, Math.PI * 2)));
        };
        __PS_MV_REG = [];
        return collect3201;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3202 = 0; _js_idx3202 < particles.length; _js_idx3202 += 1) {
            p = particles[_js_idx3202];
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
        var collect3204 = [];
        for (var _js3203 = 0; _js3203 < numParticles; _js3203 += 1) {
            collect3204.push(makeParticle(width / 2, height / 3, randomRange(2, 7), randomRange(0, Math.PI * 2), 0.1));
        };
        __PS_MV_REG = [];
        return collect3204;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3205 = 0; _js_idx3205 < particles.length; _js_idx3205 += 1) {
            p = particles[_js_idx3205];
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
        var _js3207 = thrust;
        var _js3206 = angle;
        var length = vecLength(_js3207);
        var _js3211 = _js3207;
        var _js3210 = Math.cos(_js3206) * length;
        _js3211.x = _js3210;
        var _js3213 = _js3207;
        var _js3212 = Math.sin(_js3206) * length;
        _js3213.y = _js3212;
        var _js3209 = thrust;
        var _js3208 = thrusting ? 0.1 : 0;
        var angle3214 = vecAngle(_js3209);
        var _js3216 = _js3209;
        var _js3215 = Math.cos(angle3214) * _js3208;
        _js3216.x = _js3215;
        var _js3218 = _js3209;
        var _js3217 = Math.sin(angle3214) * _js3208;
        _js3218.y = _js3217;
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
        var collect3220 = [];
        for (var _js3219 = 0; _js3219 < numParticles; _js3219 += 1) {
            collect3220.push((particle = makeParticle(width / 2, height, randomRange(5, 13), Math.PI / -2 + randomRange(-0.1, 0.1), 0.1), ((particle.radius = randomRange(2, 12), particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect3220;
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
        for (var p = null, _js_idx3221 = 0; _js_idx3221 < particles.length; _js_idx3221 += 1) {
            p = particles[_js_idx3221];
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
        var _js3223 = springPoint;
        var _js3222 = evt.clientX;
        _js3223.x = _js3222;
        var _js3225 = springPoint;
        var _js3224 = evt.clientY;
        return _js3225.y = _js3224;
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
        var collect3227 = [];
        for (var _js3226 = 0; _js3226 < numParticles; _js3226 += 1) {
            collect3227.push((p = makeParticle(emitter.x, emitter.y, randomRange(7, 8), Math.PI / 2 + randomRange(-0.1, 0.1)), (particleGravitationAddbang(p, sun1), particleGravitationAddbang(p, sun2), p.radius = 3, p)));
        };
        __PS_MV_REG = [];
        return collect3227;
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
        for (var p = null, _js_idx3228 = 0; _js_idx3228 < particles.length; _js_idx3228 += 1) {
            p = particles[_js_idx3228];
            particleUpdatebang(p);
            draw(p, 'black');
            if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
                p.x = emitter.x;
                p.y = emitter.y;
                var _js3230 = p;
                var _js3229 = randomRange(7, 8);
                var heading = particleHeading(_js3230);
                _js3230.vx = Math.cos(heading) * _js3229;
                _js3230.vy = Math.sin(heading) * _js3229;
                var _js3232 = p;
                var _js3231 = Math.PI / 2 + randomRange(-0.1, 0.1);
                var speed = particleSpeed(_js3232);
                _js3232.vx = Math.cos(_js3231) * speed;
                _js3232.vy = Math.sin(_js3231) * speed;
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
        var collect3230 = [];
        for (var _js3229 = 0; _js3229 < numPoints; _js3229 += 1) {
            collect3230.push(makeVector(randomRange(0, width), randomRange(0, height)));
        };
        __PS_MV_REG = [];
        return collect3230;
    })();
    var drawPoint = function (p) {
        CTX.beginPath();
        CTX.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    for (var p = null, _js_idx3231 = 0; _js_idx3231 < points.length; _js_idx3231 += 1) {
        p = points[_js_idx3231];
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
    for (var el = null, _js_arrvar3233 = document.querySelectorAll('canvas'), _js_idx3232 = 0; _js_idx3232 < _js_arrvar3233.length; _js_idx3232 += 1) {
        el = _js_arrvar3233[_js_idx3232];
        var object3234 = el.style;
        object3234.display = 'block';
        object3234.position = 'absolute';
        object3234.top = '0px';
        object3234.left = '0px';
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
        var _js3235 = p;
        var _js3234 = randomRange(-0.1, 0.1);
        var speed = particleSpeed(_js3235);
        _js3235.vx = Math.cos(_js3234) * speed;
        __PS_MV_REG = [];
        return _js3235.vy = Math.sin(_js3234) * speed;
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
        var collect3237 = [];
        for (var _js3236 = 0; _js3236 < numShapes; _js3236 += 1) {
            collect3237.push({ x : randomRange(-1000, 1000),
                               y : randomRange(-1000, 1000),
                               z : randomRange(0, 10000)
                             });
        };
        __PS_MV_REG = [];
        return collect3237;
    })();
    CTX.translate(width / 2, height / 2);
    function update() {
        CTX.clearRect(width / -2, height / -2, width, height);
        for (var shape = null, _js_idx3238 = 0; _js_idx3238 < shapes.length; _js_idx3238 += 1) {
            shape = shapes[_js_idx3238];
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
    var _js3239 = numCards - 1;
    for (var i = 0; i <= _js3239; i += 1) {
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
        for (var card = null, _js_idx3240 = 0; _js_idx3240 < cards.length; _js_idx3240 += 1) {
            card = cards[_js_idx3240];
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
        var _js3241 = numPoints - 1;
        var collect3242 = [];
        for (var i = 0; i <= _js3241; i += 1) {
            collect3242.push((angle = 0.2 * i, (y = (2000 - (4000 * i) / numPoints) + Math.random() * 500, (x = Math.cos(angle + baseAngle) * radius, (z = centerZ + Math.sin(angle + baseAngle) * radius, { x : x,
                                                                                                                                                  y : y,
                                                                                                                                                  z : z,
                                                                                                                                                  angle : angle
                                                                                                                                                })))));
        };
        __PS_MV_REG = [];
        return collect3242;
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
            var object3243 = points[i];
            var perspective = fl / (fl + object3243.z);
            CTX.save();
            CTX.scale(perspective, perspective);
            CTX.translate(object3243.x, object3243.y);
            if (0 === i) {
                CTX.moveTo(0, 0);
            } else {
                CTX.lineTo(0, 0);
            };
            CTX.restore();
            object3243.x = Math.cos(object3243.angle + baseAngle) * radius;
            object3243.z = centerZ + Math.sin(object3243.angle + baseAngle) * radius;
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
        for (var p = null, _js_idx3243 = 0; _js_idx3243 < points.length; _js_idx3243 += 1) {
            p = points[_js_idx3243];
            var scale = fl / (fl + p.z);
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        };
    };
    var drawLine = function () {
        var p = points[arguments[0]];
        CTX.moveTo(p.sx, p.sy);
        var _js3244 = arguments.length - 1;
        for (var i = 1; i <= _js3244; i += 1) {
            var p3245 = points[arguments[i]];
            CTX.lineTo(p3245.sx, p3245.sy);
        };
    };
    var translateModel = function (x, y, z) {
        for (var p = null, _js_idx3245 = 0; _js_idx3245 < points.length; _js_idx3245 += 1) {
            p = points[_js_idx3245];
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
        for (var p = null, _js_idx3246 = 0; _js_idx3246 < points.length; _js_idx3246 += 1) {
            p = points[_js_idx3246];
            var scale = fl / (fl + p.z + centerZ);
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        };
    };
    var drawLine = function () {
        var p = points[arguments[0]];
        CTX.moveTo(p.sx, p.sy);
        var _js3247 = arguments.length - 1;
        for (var i = 1; i <= _js3247; i += 1) {
            var p3248 = points[arguments[i]];
            CTX.lineTo(p3248.sx, p3248.sy);
        };
    };
    var translateModel = function (x, y, z) {
        for (var p = null, _js_idx3248 = 0; _js_idx3248 < points.length; _js_idx3248 += 1) {
            p = points[_js_idx3248];
            p.x += x;
            p.y += y;
            p.z += z;
        };
        return needsUpdate = true;
    };
    var rotateX = function (angle) {
        var cos3249 = Math.cos(angle);
        var sin3250 = Math.sin(angle);
        for (var p = null, _js_idx3251 = 0; _js_idx3251 < points.length; _js_idx3251 += 1) {
            p = points[_js_idx3251];
            p.y = p.y * cos3249 - p.z * sin3250;
            p.z = p.z * cos3249 + p.y * sin3250;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    var rotateY = function (angle) {
        var cos3252 = Math.cos(angle);
        var sin3253 = Math.sin(angle);
        for (var p = null, _js_idx3254 = 0; _js_idx3254 < points.length; _js_idx3254 += 1) {
            p = points[_js_idx3254];
            p.x = p.x * cos3252 - p.z * sin3253;
            p.z = p.z * cos3252 + p.x * sin3253;
        };
        __PS_MV_REG = [];
        return needsUpdate = true;
    };
    var rotateZ = function (angle) {
        var cos3255 = Math.cos(angle);
        var sin3256 = Math.sin(angle);
        for (var p = null, _js_idx3257 = 0; _js_idx3257 < points.length; _js_idx3257 += 1) {
            p = points[_js_idx3257];
            p.x = p.x * cos3255 - p.y * sin3256;
            p.y = p.y * cos3255 + p.x * sin3256;
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
        var _ps_incr_place3258 = (target.x - position.x) * ease;
        position.x += _ps_incr_place3258;
        var _ps_incr_place3259 = (target.y - position.y) * ease;
        position.y += _ps_incr_place3259;
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
        var collect3261 = [];
        for (var _js3260 = 0; _js3260 < numPoints; _js3260 += 1) {
            collect3261.push(makeVector(0, 0));
        };
        __PS_MV_REG = [];
        return collect3261;
    })();
    var ease = 0.5;
    document.body.addEventListener('mousemove', function (evt) {
        target.x = evt.clientX;
        return target.y = evt.clientY;
    });
    var easeTo = function (position, target, ease) {
        var _ps_incr_place3263;
        var _ps_incr_place3262 = (target.x - position.x) * ease;
        position.x += _ps_incr_place3262;
        return (_ps_incr_place3263 = (target.y - position.y) * ease, position.y += _ps_incr_place3263);
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        var leader = makeVector(target.x, target.y);
        var _js3264 = numPoints - 1;
        for (var i = 1; i <= _js3264; i += 1) {
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
        var k3265 = k / d;
        return c * k3265 * k3265 + b;
    };
    var easeOutQuad = function (k, b, c, d) {
        var k3266 = k / d;
        return -c * k3266 * (k3266 - 2) + b;
    };
    var easeInOutQuad = function (k, b, c, d) {
        var k3267 = k / (d / 2);
        return k3267 < 1 ? (c * k3267 * k3267) / 2 + b : (c / -2) * ((k3267 - 1) * (k3267 - 3) - 1) + b;
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
            var x3268 = easeInOutQuad(time, start.x, change.x, duration);
            var y3269 = easeInOutQuad(time, start.y, change.y, duration);
            drawCircle(x3268, y3269);
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
        var k3270 = k / d;
        return c * k3270 * k3270 + b;
    };
    var easeOutQuad = function (k, b, c, d) {
        var k3271 = k / d;
        return -c * k3271 * (k3271 - 2) + b;
    };
    var easeInOutQuad = function (k, b, c, d) {
        var k3272 = k / (d / 2);
        return k3272 < 1 ? (c * k3272 * k3272) / 2 + b : (c / -2) * ((k3272 - 1) * (k3272 - 3) - 1) + b;
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
function ep31() {
    return 'Tweening Part III';
};
/** Line Intersections Part I */
function ep32() {
    var lineIntersect = function (p0, p1, p2, p3) {
        var a1 = p1.y - p0.y;
        var b1 = p0.x - p1.x;
        var c1 = a1 * p0.x + b1 * p0.y;
        var a2 = p3.y - p2.y;
        var b2 = p2.x - p3.x;
        var c2 = a2 * p2.x + b2 * p2.y;
        var denominator = a1 * b2 - a2 * b1;
        return { x : (b2 * c1 - b1 * c2) / denominator, y : (a1 * c2 - a2 * c1) / denominator };
    };
    var p0 = { x : 100, y : 100 };
    var p1 = { x : 500, y : 500 };
    var p2 = { x : 600, y : 50 };
    var p3 = { x : 80, y : 600 };
    var intersect = lineIntersect(p0, p1, p2, p3);
    CTX.beginPath();
    CTX.moveTo(p0.x, p0.y);
    CTX.lineTo(p1.x, p1.y);
    CTX.moveTo(p2.x, p2.y);
    CTX.lineTo(p3.x, p3.y);
    CTX.stroke();
    CTX.beginPath();
    CTX.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
    __PS_MV_REG = [];
    return CTX.stroke();
};
/** Line Intersections Part II */
function ep33() {
    var p0 = { x : 100, y : 100 };
    var p1 = { x : 500, y : 500 };
    var p2 = { x : 600, y : 50 };
    var p3 = { x : 80, y : 600 };
    var clickPoint = null;
    var lineIntersect = function (p0, p1, p2, p3) {
        var a1 = p1.y - p0.y;
        var b1 = p0.x - p1.x;
        var c1 = a1 * p0.x + b1 * p0.y;
        var a2 = p3.y - p2.y;
        var b2 = p2.x - p3.x;
        var c2 = a2 * p2.x + b2 * p2.y;
        var denominator = a1 * b2 - a2 * b1;
        return denominator === 0 ? null : { x : (b2 * c1 - b1 * c2) / denominator, y : (a1 * c2 - a2 * c1) / denominator };
    };
    var segmentIntersect = function (p0, p1, p2, p3) {
        var a1 = p1.y - p0.y;
        var b1 = p0.x - p1.x;
        var c1 = a1 * p0.x + b1 * p0.y;
        var a2 = p3.y - p2.y;
        var b2 = p2.x - p3.x;
        var c2 = a2 * p2.x + b2 * p2.y;
        var denominator = a1 * b2 - a2 * b1;
        if (denominator === 0) {
            return null;
        } else {
            var intersectX = (b2 * c1 - b1 * c2) / denominator;
            var intersectY = (a1 * c2 - a2 * c1) / denominator;
            var rx0 = (intersectX - p0.x) / (p1.x - p0.x);
            var ry0 = (intersectY - p0.y) / (p1.y - p0.y);
            var rx1 = (intersectX - p2.x) / (p3.x - p2.x);
            var ry1 = (intersectY - p2.y) / (p3.y - p2.y);
            return (rx0 >= 0 && rx0 <= 1 || ry0 >= 0 && ry0 <= 1) && (rx1 >= 0 && rx1 <= 1 || ry1 >= 0 && ry1 <= 1) ? { x : intersectX, y : intersectY } : null;
        };
    };
    var getClickPoint = function (x, y) {
        var points = [p0, p1, p2, p3];
        for (var p = null, _js_idx3273 = 0; _js_idx3273 < points.length; _js_idx3273 += 1) {
            p = points[_js_idx3273];
            var dx = p.x - x;
            var dy = p.y - y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) {
                __PS_MV_REG = [];
                return p;
            };
        };
    };
    var onMouseDown = function (evt) {
        clickPoint = getClickPoint(evt.clientX, evt.clientY);
        if (clickPoint) {
            document.body.addEventListener('mousemove', onMouseMove);
            __PS_MV_REG = [];
            return document.body.addEventListener('mouseup', onMouseUp);
        };
    };
    var onMouseMove = function (evt) {
        clickPoint.x = evt.clientX;
        clickPoint.y = evt.clientY;
        __PS_MV_REG = [];
        return render();
    };
    var onMouseUp = function (evt) {
        document.body.removeEventListener('mousemove', onMouseMove);
        return document.body.removeEventListener('mouseup', onMouseUp);
    };
    var drawPoint = function (p) {
        CTX.beginPath();
        CTX.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
        return CTX.fill();
    };
    var render = function () {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        drawPoint(p0);
        drawPoint(p1);
        drawPoint(p2);
        drawPoint(p3);
        CTX.beginPath();
        CTX.moveTo(p0.x, p0.y);
        CTX.lineTo(p1.x, p1.y);
        CTX.moveTo(p2.x, p2.y);
        CTX.lineTo(p3.x, p3.y);
        CTX.stroke();
        var intersect = segmentIntersect(p0, p1, p2, p3);
        if (intersect) {
            CTX.beginPath();
            CTX.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
            __PS_MV_REG = [];
            return CTX.stroke();
        };
    };
    document.body.addEventListener('mousedown', onMouseDown);
    __PS_MV_REG = [];
    return render();
};
/** Line Intersections Part III */
function ep34() {
    var star0 = { x : 200,
                  y : 200,
                  points : [{ x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }],
                  offset : [{ x : 100, y : 0 }, { x : 40, y : 29 }, { x : 31, y : 95 }, { x : -15, y : 48 }, { x : -81, y : 59 }, { x : -50, y : 0 }, { x : -81, y : -59 }, { x : -15, y : -48 }, { x : 31, y : -95 }, { x : 40, y : -29 }]
                };
    var star1 = { x : 600,
                  y : 500,
                  points : [{ x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }, { x : 0, y : 0 }],
                  offset : [{ x : 100, y : 0 }, { x : 40, y : 29 }, { x : 31, y : 95 }, { x : -15, y : 48 }, { x : -81, y : 59 }, { x : -50, y : 0 }, { x : -81, y : -59 }, { x : -15, y : -48 }, { x : 31, y : -95 }, { x : 40, y : -29 }]
                };
    var updateStar = function (star) {
        for (var i = 0; i < star.points.length; i += 1) {
            star.points[i].x = star.x + star.offset[i].x;
            star.points[i].y = star.y + star.offset[i].y;
        };
    };
    var drawStar = function (star) {
        CTX.beginPath();
        CTX.moveTo(star.points[0].x, star.points[0].y);
        for (var p = null, _js_arrvar3275 = star.points.slice(1), _js_idx3274 = 0; _js_idx3274 < _js_arrvar3275.length; _js_idx3274 += 1) {
            p = _js_arrvar3275[_js_idx3274];
            CTX.lineTo(p.x, p.y);
        };
        CTX.closePath();
        return CTX.fill();
    };
    var segmentIntersect = function (p0, p1, p2, p3) {
        var a1 = p1.y - p0.y;
        var b1 = p0.x - p1.x;
        var c1 = a1 * p0.x + b1 * p0.y;
        var a2 = p3.y - p2.y;
        var b2 = p2.x - p3.x;
        var c2 = a2 * p2.x + b2 * p2.y;
        var denominator = a1 * b2 - a2 * b1;
        if (denominator === 0) {
            return null;
        } else {
            var intersectX = (b2 * c1 - b1 * c2) / denominator;
            var intersectY = (a1 * c2 - a2 * c1) / denominator;
            var rx0 = (intersectX - p0.x) / (p1.x - p0.x);
            var ry0 = (intersectY - p0.y) / (p1.y - p0.y);
            var rx1 = (intersectX - p2.x) / (p3.x - p2.x);
            var ry1 = (intersectY - p2.y) / (p3.y - p2.y);
            return (rx0 >= 0 && rx0 <= 1 || ry0 >= 0 && ry0 <= 1) && (rx1 >= 0 && rx1 <= 1 || ry1 >= 0 && ry1 <= 1) ? { x : intersectX, y : intersectY } : null;
        };
    };
    var checkStarCollision = function (starA, starB) {
        var numPoints = starA.points.length;
        for (var i = 0; i < numPoints; i += 1) {
            var p0 = starA.points[i];
            var p1 = starA.points[((i + 1) % numPoints + numPoints) % numPoints];
            for (var j = 0; j < numPoints; j += 1) {
                var p2 = starB.points[j];
                var p3 = starB.points[((j + 1) % numPoints + numPoints) % numPoints];
                if (segmentIntersect(p0, p1, p2, p3)) {
                    __PS_MV_REG = [];
                    return true;
                };
            };
        };
        __PS_MV_REG = [];
        return false;
    };
    return document.body.addEventListener('mousemove', function (evt) {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        star0.x = evt.clientX;
        star0.y = evt.clientY;
        updateStar(star0);
        updateStar(star1);
        CTX.fillStyle = checkStarCollision(star0, star1) ? 'red' : 'black';
        drawStar(star0);
        __PS_MV_REG = [];
        return drawStar(star1);
    });
};
/** Intro to Fractals */
function ep35() {
    var drawTriangle = function (p0, p1, p2) {
        CTX.moveTo(p0.x, p0.y);
        CTX.lineTo(p1.x, p1.y);
        CTX.lineTo(p2.x, p2.y);
        return CTX.fill();
    };
    var sierpinski = function (p0, p1, p2, limit) {
        if (limit > 0) {
            var pA = { x : (p0.x + p1.x) / 2, y : (p0.y + p1.y) / 2 };
            var pB = { x : (p1.x + p2.x) / 2, y : (p1.y + p2.y) / 2 };
            var pC = { x : (p2.x + p0.x) / 2, y : (p2.y + p0.y) / 2 };
            sierpinski(p0, pA, pC, limit - 1);
            sierpinski(pA, p1, pB, limit - 1);
            __PS_MV_REG = [];
            return sierpinski(pC, pB, p2, limit - 1);
        } else {
            __PS_MV_REG = [];
            return drawTriangle(p0, p1, p2);
        };
    };
    var koch = function (p0, p1, limit) {
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var unit = dist / 3;
        var angle = Math.atan2(dy, dx);
        var pA = { x : p0.x + dx / 3, y : p0.y + dy / 3 };
        var pC = { x : p1.x - dx / 3, y : p1.y - dy / 3 };
        var pB = { x : pA.x + Math.cos(angle - Math.PI / 3) * unit, y : pA.y + Math.sin(angle - Math.PI / 3) * unit };
        if (limit > 0) {
            koch(p0, pA, limit - 1);
            koch(pA, pB, limit - 1);
            koch(pB, pC, limit - 1);
            __PS_MV_REG = [];
            return koch(pC, p1, limit - 1);
        } else {
            CTX.beginPath();
            CTX.moveTo(p0.x, p0.y);
            CTX.lineTo(pA.x, pA.y);
            CTX.lineTo(pB.x, pB.y);
            CTX.lineTo(pC.x, pC.y);
            CTX.lineTo(p1.x, p1.y);
            __PS_MV_REG = [];
            return CTX.stroke();
        };
    };
    var p0 = { x : 0, y : -321 };
    var p1 = { x : 278, y : 160 };
    var p2 = { x : -278, y : 160 };
    CTX.translate(width / 2, height / 2);
    koch(p0, p1, 5);
    koch(p1, p2, 5);
    __PS_MV_REG = [];
    return koch(p2, p0, 5);
};
/** Verlet Integration Part I */
function ep36() {
    var points = [{ x : 100,
                    y : 100,
                    oldx : 95,
                    oldy : 95
                  }];
    var bounce = 0.9;
    var gravity = 0.5;
    var friction = 0.999;
    var updatePoints = function () {
        for (var p = null, _js_idx3276 = 0; _js_idx3276 < points.length; _js_idx3276 += 1) {
            p = points[_js_idx3276];
            var vx = (p.x - p.oldx) * friction;
            var vy = (p.y - p.oldy) * friction;
            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y = p.y + vy + gravity;
            if (p.x > width) {
                p.x = width;
                p.oldx = p.x + vx * bounce;
            };
            if (p.x < 0) {
                p.x = 0;
                p.oldx = p.x + vx * bounce;
            };
            if (p.y > height) {
                p.y = height;
                p.oldy = p.y + vy * bounce;
            };
            if (p.y < 0) {
                p.y = 0;
                p.oldy = p.y + vy * bounce;
            };
        };
    };
    var renderPoints = function () {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3277 = 0; _js_idx3277 < points.length; _js_idx3277 += 1) {
            p = points[_js_idx3277];
            CTX.beginPath();
            CTX.arc(p.x, p.y, 5, 0, Math.PI * 2);
            CTX.fill();
        };
    };
    function update() {
        updatePoints();
        renderPoints();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Verlet Integration Part II */
function ep37() {
    var points = [{ x : 100,
                    y : 100,
                    oldx : 85,
                    oldy : 95
                  }, { x : 200,
                       y : 100,
                       oldx : 200,
                       oldy : 100
                     }, { x : 200,
                          y : 200,
                          oldx : 200,
                          oldy : 200
                        }, { x : 100,
                             y : 200,
                             oldx : 100,
                             oldy : 200
                           }];
    var sticks = [];
    var bounce = 0.9;
    var gravity = 0.5;
    var friction = 0.999;
    var updatePoints = function () {
        for (var p = null, _js_idx3278 = 0; _js_idx3278 < points.length; _js_idx3278 += 1) {
            p = points[_js_idx3278];
            var vx = (p.x - p.oldx) * friction;
            var vy = (p.y - p.oldy) * friction;
            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y = p.y + vy + gravity;
        };
    };
    var constraintPoints = function () {
        for (var p = null, _js_idx3279 = 0; _js_idx3279 < points.length; _js_idx3279 += 1) {
            p = points[_js_idx3279];
            var vx = (p.x - p.oldx) * friction;
            var vy = (p.y - p.oldy) * friction;
            if (p.x > width) {
                p.x = width;
                p.oldx = p.x + vx * bounce;
            };
            if (p.x < 0) {
                p.x = 0;
                p.oldx = p.x + vx * bounce;
            };
            if (p.y > height) {
                p.y = height;
                p.oldy = p.y + vy * bounce;
            };
            if (p.y < 0) {
                p.y = 0;
                p.oldy = p.y + vy * bounce;
            };
        };
    };
    var updateSticks = function () {
        for (var s = null, _js_idx3280 = 0; _js_idx3280 < sticks.length; _js_idx3280 += 1) {
            s = sticks[_js_idx3280];
            var dx = s.p1.x - s.p0.x;
            var dy = s.p1.y - s.p0.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var diff = s.length - dist;
            var percent = diff / dist / 2;
            var offsetX = dx * percent;
            var offsetY = dy * percent;
            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
            s.p1.x += offsetX;
            s.p1.y += offsetY;
        };
    };
    var renderPoints = function () {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3281 = 0; _js_idx3281 < points.length; _js_idx3281 += 1) {
            p = points[_js_idx3281];
            CTX.beginPath();
            CTX.arc(p.x, p.y, 5, 0, Math.PI * 2);
            CTX.fill();
        };
    };
    var renderSticks = function () {
        CTX.beginPath();
        for (var s = null, _js_idx3282 = 0; _js_idx3282 < sticks.length; _js_idx3282 += 1) {
            s = sticks[_js_idx3282];
            CTX.moveTo(s.p0.x, s.p0.y);
            CTX.lineTo(s.p1.x, s.p1.y);
        };
        return CTX.stroke();
    };
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    var p3 = points[3];
    sticks.push({ p0 : p0,
                  p1 : p1,
                  length : distance(p0, p1)
                });
    sticks.push({ p0 : p1,
                  p1 : p2,
                  length : distance(p1, p2)
                });
    sticks.push({ p0 : p2,
                  p1 : p3,
                  length : distance(p2, p3)
                });
    sticks.push({ p0 : p3,
                  p1 : p0,
                  length : distance(p3, p0)
                });
    sticks.push({ p0 : p0,
                  p1 : p2,
                  length : distance(p0, p2)
                });
    function update() {
        updatePoints();
        for (var _js3283 = 0; _js3283 < 3; _js3283 += 1) {
            updateSticks();
            constraintPoints();
        };
        renderPoints();
        renderSticks();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Verlet Integration Part III */
function ep38() {
    var points = [{ x : 100,
                    y : 100,
                    oldx : 50 + Math.random() * 100,
                    oldy : 50 + Math.random() * 100
                  }, { x : 420,
                       y : 100,
                       oldx : 420,
                       oldy : 100
                     }, { x : 420,
                          y : 340,
                          oldx : 420,
                          oldy : 340
                        }, { x : 100,
                             y : 340,
                             oldx : 100,
                             oldy : 340
                           }];
    var sticks = [];
    var forms = [];
    var images = [];
    var bounce = 0.9;
    var gravity = 0.5;
    var friction = 0.999;
    var updatePoints = function () {
        for (var p = null, _js_idx3284 = 0; _js_idx3284 < points.length; _js_idx3284 += 1) {
            p = points[_js_idx3284];
            var vx = (p.x - p.oldx) * friction;
            var vy = (p.y - p.oldy) * friction;
            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y = p.y + vy + gravity;
        };
    };
    var constraintPoints = function () {
        for (var p = null, _js_idx3285 = 0; _js_idx3285 < points.length; _js_idx3285 += 1) {
            p = points[_js_idx3285];
            var vx = (p.x - p.oldx) * friction;
            var vy = (p.y - p.oldy) * friction;
            if (p.x > width) {
                p.x = width;
                p.oldx = p.x + vx * bounce;
            };
            if (p.x < 0) {
                p.x = 0;
                p.oldx = p.x + vx * bounce;
            };
            if (p.y > height) {
                p.y = height;
                p.oldy = p.y + vy * bounce;
            };
            if (p.y < 0) {
                p.y = 0;
                p.oldy = p.y + vy * bounce;
            };
        };
    };
    var updateSticks = function () {
        for (var s = null, _js_idx3286 = 0; _js_idx3286 < sticks.length; _js_idx3286 += 1) {
            s = sticks[_js_idx3286];
            var dx = s.p1.x - s.p0.x;
            var dy = s.p1.y - s.p0.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var diff = s.length - dist;
            var percent = diff / dist / 2;
            var offsetX = dx * percent;
            var offsetY = dy * percent;
            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
            s.p1.x += offsetX;
            s.p1.y += offsetY;
        };
    };
    var renderPoints = function () {
        for (var p = null, _js_idx3287 = 0; _js_idx3287 < points.length; _js_idx3287 += 1) {
            p = points[_js_idx3287];
            CTX.beginPath();
            CTX.arc(p.x, p.y, 5, 0, Math.PI * 2);
            CTX.fill();
        };
    };
    var renderSticks = function () {
        for (var s = null, _js_idx3288 = 0; _js_idx3288 < sticks.length; _js_idx3288 += 1) {
            s = sticks[_js_idx3288];
            if (!s.hidden) {
                CTX.beginPath();
                CTX.strokeStyle = s.color ? s.color : 'black';
                CTX.lineWidth = s.width ? s.width : 1;
                CTX.moveTo(s.p0.x, s.p0.y);
                CTX.lineTo(s.p1.x, s.p1.y);
                CTX.stroke();
            };
        };
    };
    var renderForms = function () {
        for (var form = null, _js_idx3289 = 0; _js_idx3289 < forms.length; _js_idx3289 += 1) {
            form = forms[_js_idx3289];
            CTX.beginPath();
            CTX.fillStyle = form.color;
            CTX.moveTo(form.path[0].x, form.path[0].y);
            var _js3290 = form.path.length - 1;
            for (var i = 1; i <= _js3290; i += 1) {
                CTX.lineTo(form.path[i].x, form.path[i].y);
            };
            CTX.fill();
        };
    };
    var renderImages = function () {
        for (var img = null, _js_idx3290 = 0; _js_idx3290 < images.length; _js_idx3290 += 1) {
            img = images[_js_idx3290];
            var p0 = img.path[0];
            var p1 = img.path[1];
            var p3 = img.path[3];
            var w = distance(p0, p1);
            var h = distance(p0, p3);
            var dx = p1.x - p0.x;
            var dy = p1.y - p0.y;
            var angle = Math.atan2(dy, dx);
            CTX.save();
            CTX.translate(p0.x, p0.y);
            CTX.rotate(angle);
            CTX.drawImage(img.img, 0, 0, w, h);
            CTX.restore();
        };
    };
    var loadImage = function (url) {
        var img = document.createElement('img');
        img.src = url;
        return img;
    };
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    var p3 = points[3];
    sticks.push({ p0 : p0,
                  p1 : p1,
                  length : distance(p0, p1),
                  color : 'red',
                  width : 5
                });
    sticks.push({ p0 : p1,
                  p1 : p2,
                  length : distance(p1, p2)
                });
    sticks.push({ p0 : p2,
                  p1 : p3,
                  length : distance(p2, p3)
                });
    sticks.push({ p0 : p3,
                  p1 : p0,
                  length : distance(p3, p0)
                });
    sticks.push({ p0 : p0,
                  p1 : p2,
                  length : distance(p0, p2),
                  hidden : true
                });
    forms.push({ path : [p0, p1, p2, p3], color : 'green' });
    images.push({ path : [p0, p1, p2, p3], img : loadImage('https://picsum.photos/id/1074/320/240') });
    function update() {
        updatePoints();
        for (var _js3291 = 0; _js3291 < 3; _js3291 += 1) {
            updateSticks();
            constraintPoints();
        };
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        renderImages();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Verlet Integration Part IV */
function ep39() {
    var points = [{ x : 100,
                    y : 100,
                    oldx : 75 + Math.random() * 50,
                    oldy : 75 + Math.random() * 50
                  }, { x : 200,
                       y : 100,
                       oldx : 200,
                       oldy : 100
                     }, { x : 200,
                          y : 200,
                          oldx : 200,
                          oldy : 200
                        }, { x : 100,
                             y : 200,
                             oldx : 100,
                             oldy : 200
                           }, { x : 400,
                                y : 100,
                                oldx : 400,
                                oldy : 100
                              }, { x : 250,
                                   y : 100,
                                   oldx : 250,
                                   oldy : 100
                                 }];
    var sticks = [];
    var bounce = 0.9;
    var gravity = 0.5;
    var friction = 0.999;
    var engine = { baseX : 450,
                   baseY : 100,
                   range : 100,
                   angle : 0,
                   speed : 0.05,
                   x : 550,
                   y : 100,
                   pinned : true
                 };
    var updateEngine = function () {
        engine.x = engine.baseX + Math.cos(engine.angle) * engine.range;
        engine.y = engine.baseY + Math.sin(engine.angle) * engine.range;
        __PS_MV_REG = [];
        return engine.angle += engine.speed;
    };
    var updatePoints = function () {
        for (var p = null, _js_idx3292 = 0; _js_idx3292 < points.length; _js_idx3292 += 1) {
            p = points[_js_idx3292];
            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction;
                var vy = (p.y - p.oldy) * friction;
                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y = p.y + vy + gravity;
            };
        };
    };
    var constraintPoints = function () {
        for (var p = null, _js_idx3293 = 0; _js_idx3293 < points.length; _js_idx3293 += 1) {
            p = points[_js_idx3293];
            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction;
                var vy = (p.y - p.oldy) * friction;
                if (p.x > width) {
                    p.x = width;
                    p.oldx = p.x + vx * bounce;
                };
                if (p.x < 0) {
                    p.x = 0;
                    p.oldx = p.x + vx * bounce;
                };
                if (p.y > height) {
                    p.y = height;
                    p.oldy = p.y + vy * bounce;
                };
                if (p.y < 0) {
                    p.y = 0;
                    p.oldy = p.y + vy * bounce;
                };
            };
        };
    };
    var updateSticks = function () {
        for (var s = null, _js_idx3294 = 0; _js_idx3294 < sticks.length; _js_idx3294 += 1) {
            s = sticks[_js_idx3294];
            var dx = s.p1.x - s.p0.x;
            var dy = s.p1.y - s.p0.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var diff = s.length - dist;
            var percent = diff / dist / 2;
            var offsetX = dx * percent;
            var offsetY = dy * percent;
            if (!s.p0.pinned) {
                s.p0.x -= offsetX;
                s.p0.y -= offsetY;
            };
            if (!s.p1.pinned) {
                s.p1.x += offsetX;
                s.p1.y += offsetY;
            };
        };
    };
    var renderPoints = function () {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx3295 = 0; _js_idx3295 < points.length; _js_idx3295 += 1) {
            p = points[_js_idx3295];
            CTX.beginPath();
            CTX.arc(p.x, p.y, 5, 0, Math.PI * 2);
            CTX.fill();
        };
    };
    var renderSticks = function () {
        CTX.beginPath();
        for (var s = null, _js_idx3296 = 0; _js_idx3296 < sticks.length; _js_idx3296 += 1) {
            s = sticks[_js_idx3296];
            CTX.moveTo(s.p0.x, s.p0.y);
            CTX.lineTo(s.p1.x, s.p1.y);
        };
        return CTX.stroke();
    };
    var renderEngine = function () {
        CTX.beginPath();
        CTX.arc(engine.baseX, engine.baseY, engine.range, 0, Math.PI * 2);
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(engine.x, engine.y, 5, 0, Math.PI * 2);
        return CTX.fill();
    };
    var p0 = points[0];
    var p1 = points[1];
    var p2 = points[2];
    var p3 = points[3];
    var p4 = points[4];
    var p5 = points[5];
    sticks.push({ p0 : p0,
                  p1 : p1,
                  length : distance(p0, p1)
                });
    sticks.push({ p0 : p1,
                  p1 : p2,
                  length : distance(p1, p2)
                });
    sticks.push({ p0 : p2,
                  p1 : p3,
                  length : distance(p2, p3)
                });
    sticks.push({ p0 : p3,
                  p1 : p0,
                  length : distance(p3, p0)
                });
    sticks.push({ p0 : p0,
                  p1 : p2,
                  length : distance(p0, p2)
                });
    sticks.push({ p0 : engine,
                  p1 : p4,
                  length : distance(engine, p4)
                });
    sticks.push({ p0 : p4,
                  p1 : p5,
                  length : distance(p4, p5)
                });
    sticks.push({ p0 : p5,
                  p1 : p0,
                  length : distance(p5, p0)
                });
    function update() {
        updateEngine();
        updatePoints();
        for (var _js3297 = 0; _js3297 < 3; _js3297 += 1) {
            updateSticks();
            constraintPoints();
        };
        renderPoints();
        renderSticks();
        renderEngine();
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Fractal Trees */
function ep40() {
    var branchAngleA = randomRange(0, Math.PI / -2);
    var tree = function (x, y, size, angle, limit) {
        CTX.save();
        CTX.translate(x, y);
        CTX.rotate(angle);
        CTX.fillRect(0, 0, size, -size);
        var x0 = 0;
        var y0 = -size;
        var size0 = Math.abs(Math.cos(branchAngleA) * size);
        var angle0 = branchAngleA;
        if (limit > 0) {
            tree(x0, y0, size0, angle0, limit - 1);
        } else {
            CTX.save();
            CTX.translate(x0, y0);
            CTX.rotate(angle0);
            CTX.fillRect(0, 0, size0, -size0);
            CTX.restore();
        };
        var x1 = x0 + Math.cos(angle0) * size0;
        var y1 = y0 + Math.sin(angle0) * size0;
        var size1 = Math.abs(Math.sin(branchAngleA) * size);
        var angle1 = angle0 + Math.PI / 2;
        if (limit > 0) {
            tree(x1, y1, size1, angle1, limit - 1);
        } else {
            CTX.save();
            CTX.translate(x1, y1);
            CTX.rotate(angle1);
            CTX.fillRect(0, 0, size1, -size1);
            CTX.restore();
        };
        __PS_MV_REG = [];
        return CTX.restore();
    };
    __PS_MV_REG = [];
    return tree(width / 2 - 75, height, 150, 0, 8);
};
/** Isometric 3D Part I */
function ep41() {
    var tileWidth = 100;
    var tileHeight = 50;
    var drawTile = function (x, y, color) {
        CTX.save();
        CTX.translate((x - y) * (tileWidth / 2), (x + y) * (tileHeight / 2));
        CTX.beginPath();
        CTX.moveTo(0, 0);
        CTX.lineTo(tileWidth / 2, tileHeight / 2);
        CTX.lineTo(0, tileHeight);
        CTX.lineTo(tileWidth / -2, tileHeight / 2);
        CTX.closePath();
        CTX.fillStyle = color;
        CTX.fill();
        return CTX.restore();
    };
    var drawBlock = function (x, y, z) {
        var top = '#eeeeee';
        var right = '#cccccc';
        var left = '#999999';
        CTX.save();
        CTX.translate((x - y) * (tileWidth / 2), (x + y) * (tileHeight / 2));
        CTX.beginPath();
        CTX.moveTo(0, -(z * tileHeight));
        CTX.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
        CTX.lineTo(0, tileHeight - z * tileHeight);
        CTX.lineTo(tileWidth / -2, tileHeight / 2 - z * tileHeight);
        CTX.closePath();
        CTX.fillStyle = top;
        CTX.fill();
        CTX.beginPath();
        CTX.moveTo(tileWidth / -2, tileHeight / 2 - z * tileHeight);
        CTX.lineTo(0, tileHeight - z * tileHeight);
        CTX.lineTo(0, tileHeight);
        CTX.lineTo(tileWidth / -2, tileHeight / 2);
        CTX.closePath();
        CTX.fillStyle = left;
        CTX.fill();
        CTX.beginPath();
        CTX.moveTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
        CTX.lineTo(0, tileHeight - z * tileHeight);
        CTX.lineTo(0, tileHeight);
        CTX.lineTo(tileWidth / 2, tileHeight / 2);
        CTX.closePath();
        CTX.fillStyle = right;
        CTX.fill();
        return CTX.restore();
    };
    var randomColor = function () {
        var r = randomInt(0, 255);
        var g = randomInt(0, 255);
        var b = randomInt(0, 255);
        __PS_MV_REG = [];
        return ['rgb(', r, ',', g, ',', b, ')'].join('');
    };
    CTX.translate(width / 2, 200);
    for (var x = 0; x < 10; x += 1) {
        for (var y = 0; y < 10; y += 1) {
            drawBlock(x, y, randomInt(0, 4));
        };
    };
};
/** Isometric 3D Part II */
function ep42() {
    var characterCanvas = document.createElement('canvas');
    var characterCtx = characterCanvas.getContext('2d');
    var tileWidth = 100;
    var tileHeight = 50;
    var charX = 0.5;
    var charY = 9.5;
    var grid = [[1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 2, 0, 0, 0, 0, 0, 0], [1, 1, 2, 2, 0, 0, 0, 0, 0, 0], [1, 2, 2, 2, 0, 0, 0, 0, 0, 0], [2, 2, 2, 2, 0, 0, 0, 0, 0, 0], [2, 2, 2, 0, 0, 0, 0, 0, 0, 0], [2, 2, 2, 0, 0, 0, 0, 0, 0, 0], [2, 2, 2, 2, 2, 2, 2, 2, 2, 0]];
    characterCanvas.id = 'character-canvas';
    characterCanvas.width = width;
    characterCanvas.height = height;
    document.body.appendChild(characterCanvas);
    for (var el = null, _js_arrvar3299 = document.querySelectorAll('canvas'), _js_idx3298 = 0; _js_idx3298 < _js_arrvar3299.length; _js_idx3298 += 1) {
        el = _js_arrvar3299[_js_idx3298];
        var object3300 = el.style;
        object3300.display = 'block';
        object3300.position = 'absolute';
        object3300.top = '0px';
        object3300.left = '0px';
    };
    var drawTile = function (x, y, color) {
        CTX.save();
        CTX.translate((x - y) * (tileWidth / 2), (x + y) * (tileHeight / 2));
        CTX.beginPath();
        CTX.moveTo(0, 0);
        CTX.lineTo(tileWidth / 2, tileHeight / 2);
        CTX.lineTo(0, tileHeight);
        CTX.lineTo(tileWidth / -2, tileHeight / 2);
        CTX.closePath();
        CTX.fillStyle = (function () {
            switch (color) {
            case 0:
                return 'blue';
            case 1:
                return 'red';
            case 2:
                return 'yellow';
            };
        })();
        CTX.fill();
        __PS_MV_REG = [];
        return CTX.restore();
    };
    var drawCharacter = function (x, y) {
        characterCtx.clearRect(width / -2, -50, width, height);
        characterCtx.save();
        characterCtx.translate((x - y) * (tileWidth / 2), (x + y) * (tileHeight / 2));
        characterCtx.beginPath();
        characterCtx.arc(0, 0, 10, 0, Math.PI * 2, false);
        characterCtx.fill();
        return characterCtx.restore();
    };
    var canMove = function (x, y) {
        var _cmp3300;
        var _cmp3301;
        x = Math.floor(x);
        y = Math.floor(y);
        __PS_MV_REG = [];
        return (_cmp3300 = y, -1 < _cmp3300 && _cmp3300 < grid.length) && (_cmp3301 = x, -1 < _cmp3301 && _cmp3301 < grid[y].length) && grid[y][x] !== 0;
    };
    var moveCharacter = function (evt) {
        switch (evt.keyCode) {
        case 37:
            if (canMove(charX - 1, charY)) {
                --charX;
            };
            break;
        case 38:
            if (canMove(charX, charY - 1)) {
                --charY;
            };
            break;
        case 39:
            if (canMove(charX + 1, charY)) {
                ++charX;
            };
            break;
        case 40:
            if (canMove(charX, charY + 1)) {
                ++charY;
            };
        };
        __PS_MV_REG = [];
        return drawCharacter(charX, charY);
    };
    CTX.translate(width / 2, 200);
    characterCtx.translate(width / 2, 200);
    document.addEventListener('keydown', moveCharacter);
    for (var x = 0; x < 10; x += 1) {
        for (var y = 0; y < 10; y += 1) {
            drawTile(x, y, grid[y][x]);
        };
    };
    __PS_MV_REG = [];
    return drawCharacter(charX, charY);
};
/** Kinematics Part I */
function ep43() {
    var arm = makeArm(100, 0, 0, 0);
    var arm2 = makeArm(100, 0, 0, 0);
    var arm3 = makeArm(100, 0, 0, 0);
    var angle = 0;
    arm.x = width / 2;
    arm.y = height / 2;
    arm.angle = 0;
    arm2.x = armEndX(arm);
    arm2.y = armEndY(arm);
    arm2.angle = 1.3;
    arm2.parent = arm;
    arm3.x = armEndX(arm2);
    arm3.y = armEndY(arm2);
    arm3.angle = 1.3;
    arm3.parent = arm2;
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        arm.angle = Math.sin(angle) * 1.2;
        arm2.angle = Math.cos(angle * 0.5) * 0.92;
        arm3.angle = Math.sin(angle * 1.5) * 1.34;
        arm2.x = armEndX(arm);
        arm2.y = armEndY(arm);
        arm3.x = armEndX(arm2);
        arm3.y = armEndY(arm2);
        angle += 0.05;
        renderArm(arm);
        renderArm(arm2);
        renderArm(arm3);
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
/** Kinematics Part II */
function ep44() {
    var leg0 = makeFkSystem(width / 2, height / 2);
    var leg1 = makeFkSystem(width / 2, height / 2);
    leg1.phase = Math.PI;
    fkSystemAddArmbang(leg0, 200, Math.PI / 2, Math.PI / 4, 0);
    fkSystemAddArmbang(leg0, 180, 0.87, 0.87, -1.5);
    fkSystemAddArmbang(leg1, 200, Math.PI / 2, Math.PI / 4, 0);
    fkSystemAddArmbang(leg1, 180, 0.87, 0.87, -1.5);
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        fkSystemUpdatebang(leg0);
        renderFkSystem(leg0);
        fkSystemUpdatebang(leg1);
        renderFkSystem(leg1);
        __PS_MV_REG = [];
        return requestAnimationFrame(update);
    };
    __PS_MV_REG = [];
    return update();
};
window.onload = ep44;
