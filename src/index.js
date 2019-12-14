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
        var _js1322 = angle + 0.01;
        angle = _js1322;
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
    var _js1323 = v;
    var _js1322 = Math.PI / 6;
    var length = vecLength(_js1323);
    var _js1325 = _js1323;
    var _js1324 = Math.cos(_js1322) * length;
    _js1325.x = _js1324;
    var _js1327 = _js1323;
    var _js1326 = Math.sin(_js1322) * length;
    _js1327.y = _js1326;
    var _js1329 = v;
    var _js1328 = 100;
    var angle = vecAngle(_js1329);
    var _js1331 = _js1329;
    var _js1330 = Math.cos(angle) * _js1328;
    _js1331.x = _js1330;
    var _js1333 = _js1329;
    var _js1332 = Math.sin(angle) * _js1328;
    _js1333.y = _js1332;
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
        var collect1335 = [];
        for (var _js1334 = 0; _js1334 < numParticles; _js1334 += 1) {
            collect1335.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect1335;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1336 = 0; _js_idx1336 < particles.length; _js_idx1336 += 1) {
            p = particles[_js_idx1336];
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
        var collect1338 = [];
        for (var _js1337 = 0; _js1337 < numParticles; _js1337 += 1) {
            collect1338.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect1338;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1339 = 0; _js_idx1339 < particles.length; _js_idx1339 += 1) {
            p = particles[_js_idx1339];
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
        var _js1341 = thrust;
        var _js1340 = angle;
        var length = vecLength(_js1341);
        var _js1345 = _js1341;
        var _js1344 = Math.cos(_js1340) * length;
        _js1345.x = _js1344;
        var _js1347 = _js1341;
        var _js1346 = Math.sin(_js1340) * length;
        _js1347.y = _js1346;
        var _js1343 = thrust;
        var _js1342 = thrusting ? 0.1 : 0;
        var angle1348 = vecAngle(_js1343);
        var _js1350 = _js1343;
        var _js1349 = Math.cos(angle1348) * _js1342;
        _js1350.x = _js1349;
        var _js1352 = _js1343;
        var _js1351 = Math.sin(angle1348) * _js1342;
        _js1352.y = _js1351;
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
            var _js1354 = ship;
            var _js1353 = 0;
            var _js1356 = _js1354.position;
            var _js1355 = _js1353;
            _js1356.x = _js1355;
        };
        if (ship.position.x < 0) {
            var _js1358 = ship;
            var _js1357 = width;
            var _js1360 = _js1358.position;
            var _js1359 = _js1357;
            _js1360.x = _js1359;
        };
        if (ship.position.y > height) {
            var _js1362 = ship;
            var _js1361 = 0;
            var _js1364 = _js1362.position;
            var _js1363 = _js1361;
            _js1364.y = _js1363;
        };
        if (ship.position.y < 0) {
            var _js1366 = ship;
            var _js1365 = height;
            var _js1368 = _js1366.position;
            var _js1367 = _js1365;
            _js1368.y = _js1367;
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
        var collect1370 = [];
        for (var _js1369 = 0; _js1369 < numParticles; _js1369 += 1) {
            collect1370.push((particle = makeParticle(width / 2, height, Math.random() * 8 + 5, Math.PI / -2 + (Math.random() * 0.2 - 0.1), 0.1), ((particle.radius = Math.random() * 10 + 2, particle.bounce = -0.9), particle)));
        };
        __PS_MV_REG = [];
        return collect1370;
    })();
    function wrap(p) {
        if (p.position.x - p.radius > width) {
            var _js1372 = p;
            var _js1371 = -p.radius;
            var _js1374 = _js1372.position;
            var _js1373 = _js1371;
            _js1374.x = _js1373;
        };
        if (p.position.x + p.radius < 0) {
            var _js1376 = p;
            var _js1375 = width + p.radius;
            var _js1378 = _js1376.position;
            var _js1377 = _js1375;
            _js1378.x = _js1377;
        };
        if (p.position.y - p.radius > height) {
            var _js1380 = p;
            var _js1379 = -p.radius;
            var _js1382 = _js1380.position;
            var _js1381 = _js1379;
            _js1382.y = _js1381;
        };
        if (p.position.y + p.radius < 0) {
            var _js1386 = p;
            var _js1385 = height + p.radius;
            var _js1388 = _js1386.position;
            var _js1387 = _js1385;
            return _js1388.y = _js1387;
        };
    };
    function removeDeadParticles(particles) {
        var i = particles.length - 1;
        for (; i >= 0; ) {
            var p = particles[i];
            if (p.position.x - p.radius > width || p.position.x + p.radius < 0 || p.position.y - p.radius > height || p.position.y + p.radius < 0) {
                particles.splice(i, 1);
            };
            var _js1389 = i - 1;
            i = _js1389;
        };
    };
    function regenerate(p) {
        if (p.position.y - p.radius > height) {
            var _js1398 = p;
            var _js1397 = width / 2;
            var _js1406 = _js1398.position;
            var _js1405 = _js1397;
            _js1406.x = _js1405;
            var _js1400 = p;
            var _js1399 = height;
            var _js1408 = _js1400.position;
            var _js1407 = _js1399;
            _js1408.y = _js1407;
            var _js1402 = p.velocity;
            var _js1401 = Math.random() * 8 + 5;
            var angle = vecAngle(_js1402);
            var _js1410 = _js1402;
            var _js1409 = Math.cos(angle) * _js1401;
            _js1410.x = _js1409;
            var _js1412 = _js1402;
            var _js1411 = Math.sin(angle) * _js1401;
            _js1412.y = _js1411;
            var _js1404 = p.velocity;
            var _js1403 = Math.PI / -2 + (Math.random() * 0.2 - 0.1);
            var length = vecLength(_js1404);
            var _js1414 = _js1404;
            var _js1413 = Math.cos(_js1403) * length;
            _js1414.x = _js1413;
            var _js1416 = _js1404;
            var _js1415 = Math.sin(_js1403) * length;
            __PS_MV_REG = [];
            return _js1416.y = _js1415;
        };
    };
    function bounce(p) {
        var object1417 = p.velocity;
        if (p.position.x + p.radius > width) {
            var _js1419 = p;
            var _js1418 = width - p.radius;
            var _js1421 = _js1419.position;
            var _js1420 = _js1418;
            _js1421.x = _js1420;
            object1417.x *= p.bounce;
        };
        if (p.position.x - p.radius < 0) {
            var _js1423 = p;
            var _js1422 = p.radius;
            var _js1425 = _js1423.position;
            var _js1424 = _js1422;
            _js1425.x = _js1424;
            object1417.x *= p.bounce;
        };
        if (p.position.y + p.radius > height) {
            var _js1427 = p;
            var _js1426 = height - p.radius;
            var _js1429 = _js1427.position;
            var _js1428 = _js1426;
            _js1429.y = _js1428;
            object1417.y *= p.bounce;
        };
        if (p.position.y - p.radius < 0) {
            var _js1433 = p;
            var _js1432 = p.radius;
            var _js1435 = _js1433.position;
            var _js1434 = _js1432;
            _js1435.y = _js1434;
            return object1417.y *= p.bounce;
        };
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx1436 = 0; _js_idx1436 < particles.length; _js_idx1436 += 1) {
            p = particles[_js_idx1436];
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