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
    var _js2559 = v;
    var _js2558 = v.x * scalar;
    _js2559.x = _js2558;
    var _js2561 = v;
    var _js2560 = v.y * scalar;
    return _js2561.y = _js2560;
};
function vslashbang(v, scalar) {
    __PS_MV_REG = [];
    return vstarbang(v, 1 / scalar);
};
function makeParticle(x, y, speed, direction, gravity, mass, radius) {
    if (gravity === undefined) {
        gravity = 0;
    };
    if (mass === undefined) {
        mass = 1;
    };
    if (radius === undefined) {
        radius = 0;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js2563 = velocity;
    var _js2562 = speed;
    var angle = vecAngle(_js2563);
    var _js2567 = _js2563;
    var _js2566 = Math.cos(angle) * _js2562;
    _js2567.x = _js2566;
    var _js2569 = _js2563;
    var _js2568 = Math.sin(angle) * _js2562;
    _js2569.y = _js2568;
    var _js2565 = velocity;
    var _js2564 = direction;
    var length = vecLength(_js2565);
    var _js2571 = _js2565;
    var _js2570 = Math.cos(_js2564) * length;
    _js2571.x = _js2570;
    var _js2573 = _js2565;
    var _js2572 = Math.sin(_js2564) * length;
    _js2573.y = _js2572;
    __PS_MV_REG = [];
    return { position : position,
             velocity : velocity,
             mass : mass,
             radius : radius,
             bounce : -1,
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
        var _js2575 = grav;
        var _js2574 = p2.mass / (dist * dist);
        var angle = vecAngle(_js2575);
        var _js2579 = _js2575;
        var _js2578 = Math.cos(angle) * _js2574;
        _js2579.x = _js2578;
        var _js2581 = _js2575;
        var _js2580 = Math.sin(angle) * _js2574;
        _js2581.y = _js2580;
        var _js2577 = grav;
        var _js2576 = this.angleTo(p2);
        var length = vecLength(_js2577);
        var _js2583 = _js2577;
        var _js2582 = Math.cos(_js2576) * length;
        _js2583.x = _js2582;
        var _js2585 = _js2577;
        var _js2584 = Math.sin(_js2576) * length;
        _js2585.y = _js2584;
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
        var _js2586 = angle + 0.01;
        angle = _js2586;
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
    var _js2587 = v;
    var _js2586 = Math.PI / 6;
    var length = vecLength(_js2587);
    var _js2589 = _js2587;
    var _js2588 = Math.cos(_js2586) * length;
    _js2589.x = _js2588;
    var _js2591 = _js2587;
    var _js2590 = Math.sin(_js2586) * length;
    _js2591.y = _js2590;
    var _js2593 = v;
    var _js2592 = 100;
    var angle = vecAngle(_js2593);
    var _js2595 = _js2593;
    var _js2594 = Math.cos(angle) * _js2592;
    _js2595.x = _js2594;
    var _js2597 = _js2593;
    var _js2596 = Math.sin(angle) * _js2592;
    _js2597.y = _js2596;
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
        var collect2599 = [];
        for (var _js2598 = 0; _js2598 < numParticles; _js2598 += 1) {
            collect2599.push(makeParticle(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2 + 1));
        };
        __PS_MV_REG = [];
        return collect2599;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx2600 = 0; _js_idx2600 < particles.length; _js_idx2600 += 1) {
            p = particles[_js_idx2600];
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
        var collect2602 = [];
        for (var _js2601 = 0; _js2601 < numParticles; _js2601 += 1) {
            collect2602.push(makeParticle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2 + 1, 0.1));
        };
        __PS_MV_REG = [];
        return collect2602;
    })();
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx2603 = 0; _js_idx2603 < particles.length; _js_idx2603 += 1) {
            p = particles[_js_idx2603];
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
        var _js2605 = thrust;
        var _js2604 = angle;
        var length = vecLength(_js2605);
        var _js2609 = _js2605;
        var _js2608 = Math.cos(_js2604) * length;
        _js2609.x = _js2608;
        var _js2611 = _js2605;
        var _js2610 = Math.sin(_js2604) * length;
        _js2611.y = _js2610;
        var _js2607 = thrust;
        var _js2606 = thrusting ? 0.1 : 0;
        var angle2612 = vecAngle(_js2607);
        var _js2614 = _js2607;
        var _js2613 = Math.cos(angle2612) * _js2606;
        _js2614.x = _js2613;
        var _js2616 = _js2607;
        var _js2615 = Math.sin(angle2612) * _js2606;
        _js2616.y = _js2615;
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
            var _js2618 = ship.position;
            var _js2617 = 0;
            _js2618.x = _js2617;
        };
        if (ship.position.x < 0) {
            var _js2620 = ship.position;
            var _js2619 = width;
            _js2620.x = _js2619;
        };
        if (ship.position.y > height) {
            var _js2622 = ship.position;
            var _js2621 = 0;
            _js2622.y = _js2621;
        };
        if (ship.position.y < 0) {
            var _js2624 = ship.position;
            var _js2623 = height;
            _js2624.y = _js2623;
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
/** Edge Handling */
function ep12() {
    var numParticles = 100;
    var particles = (function () {
        var particle;
        var collect2626 = [];
        for (var _js2625 = 0; _js2625 < numParticles; _js2625 += 1) {
            collect2626.push((particle = makeParticle(width / 2, height, Math.random() * 8 + 5, Math.PI / -2 + (Math.random() * 0.2 - 0.1), 0.1, 1, Math.random() * 10 + 2), (particle.bounce = -0.9, particle)));
        };
        __PS_MV_REG = [];
        return collect2626;
    })();
    function wrap(p) {
        if (p.position.x - p.radius > width) {
            var _js2628 = p.position;
            var _js2627 = -p.radius;
            _js2628.x = _js2627;
        };
        if (p.position.x + p.radius < 0) {
            var _js2630 = p.position;
            var _js2629 = width + p.radius;
            _js2630.x = _js2629;
        };
        if (p.position.y - p.radius > height) {
            var _js2632 = p.position;
            var _js2631 = -p.radius;
            _js2632.y = _js2631;
        };
        if (p.position.y + p.radius < 0) {
            var _js2636 = p.position;
            var _js2635 = height + p.radius;
            return _js2636.y = _js2635;
        };
    };
    function removeDeadParticles(particles) {
        var i = particles.length - 1;
        for (; i >= 0; ) {
            var p = particles[i];
            if (p.position.x - p.radius > width || p.position.x + p.radius < 0 || p.position.y - p.radius > height || p.position.y + p.radius < 0) {
                particles.splice(i, 1);
            };
            var _js2637 = i - 1;
            i = _js2637;
        };
    };
    function regenerate(p) {
        if (p.position.y - p.radius > height) {
            var _js2646 = p.position;
            var _js2645 = width / 2;
            _js2646.x = _js2645;
            var _js2648 = p.position;
            var _js2647 = height;
            _js2648.y = _js2647;
            var _js2650 = p.velocity;
            var _js2649 = Math.random() * 8 + 5;
            var angle = vecAngle(_js2650);
            var _js2654 = _js2650;
            var _js2653 = Math.cos(angle) * _js2649;
            _js2654.x = _js2653;
            var _js2656 = _js2650;
            var _js2655 = Math.sin(angle) * _js2649;
            _js2656.y = _js2655;
            var _js2652 = p.velocity;
            var _js2651 = Math.PI / -2 + (Math.random() * 0.2 - 0.1);
            var length = vecLength(_js2652);
            var _js2658 = _js2652;
            var _js2657 = Math.cos(_js2651) * length;
            _js2658.x = _js2657;
            var _js2660 = _js2652;
            var _js2659 = Math.sin(_js2651) * length;
            __PS_MV_REG = [];
            return _js2660.y = _js2659;
        };
    };
    function bounce(p) {
        if (p.position.x + p.radius > width) {
            var _js2662 = p.position;
            var _js2661 = width - p.radius;
            _js2662.x = _js2661;
            var _js2664 = p.velocity;
            var _js2663 = p.velocity.x * p.bounce;
            _js2664.x = _js2663;
        };
        if (p.position.x - p.radius < 0) {
            var _js2666 = p.position;
            var _js2665 = p.radius;
            _js2666.x = _js2665;
            var _js2668 = p.velocity;
            var _js2667 = p.velocity.x * p.bounce;
            _js2668.x = _js2667;
        };
        if (p.position.y + p.radius > height) {
            var _js2670 = p.position;
            var _js2669 = height - p.radius;
            _js2670.y = _js2669;
            var _js2672 = p.velocity;
            var _js2671 = p.velocity.y * p.bounce;
            _js2672.y = _js2671;
        };
        if (p.position.y - p.radius < 0) {
            var _js2678 = p.position;
            var _js2677 = p.radius;
            _js2678.y = _js2677;
            var _js2680 = p.velocity;
            var _js2679 = p.velocity.y * p.bounce;
            return _js2680.y = _js2679;
        };
    };
    function update() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        for (var p = null, _js_idx2681 = 0; _js_idx2681 < particles.length; _js_idx2681 += 1) {
            p = particles[_js_idx2681];
            p.update();
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