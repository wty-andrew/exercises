function makeParticle(x, y, speed, direction, gravity) {
    if (gravity === undefined) {
        gravity = 0;
    };
    __PS_MV_REG = [];
    return { x : x,
             y : y,
             vx : Math.cos(direction) * speed,
             vy : Math.sin(direction) * speed,
             mass : 1,
             radius : 0,
             bounce : -1,
             friction : 1,
             gravity : gravity,
             springs : [],
             gravitations : []
           };
};
function particleSpeed(p) {
    __PS_MV_REG = [];
    return Math.sqrt(p.vx * p.vx + p.vy * p.vy);
};
function particleHeading(p) {
    return Math.atan2(p.vx, p.vy);
};
function particleAcceleratebang(p, accel) {
    p.vx += accel.x;
    return p.vy += accel.y;
};
function particleGravitateTobang(self, target) {
    var dx = target.x - self.x;
    var dy = target.y - self.y;
    var distSq = dx * dx + dy * dy;
    var dist = Math.sqrt(distSq);
    var force = target.mass / distSq;
    var ax = (dx / dist) * force;
    var ay = (dy / dist) * force;
    self.vx += ax;
    __PS_MV_REG = [];
    return self.vy += ay;
};
function particleGravitationAddbang(self, p) {
    particleGravitationRemovebang(self, p);
    __PS_MV_REG = [];
    return self.gravitations.push(p);
};
function particleGravitationRemovebang(self, p) {
    for (var i = 0; i < self.gravitations.length; i += 1) {
        if (p === self.gravitations[i]) {
            self.gravitations.splice(i, 1);
        };
    };
};
function particleSpringTobang(self, target, k, length) {
    if (length === undefined) {
        length = 0;
    };
    var dx = target.x - self.x;
    var dy = target.y - self.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var springForce = (distance - length) * k;
    var ax = (dx / distance) * springForce;
    var ay = (dy / distance) * springForce;
    self.vx += ax;
    __PS_MV_REG = [];
    return self.vy += ay;
};
function particleSpringAddbang(self, point, k, length) {
    if (length === undefined) {
        length = 0;
    };
    particleSpringRemovebang(self, point);
    __PS_MV_REG = [];
    return self.springs.push({ point : point,
                               k : k,
                               length : length
                             });
};
function particleSpringRemovebang(self, point) {
    for (var i = 0; i < self.springs.length; i += 1) {
        if (point === self.springs[i]) {
            self.springs.splice(i, 1);
        };
    };
};
function particleUpdatebang(p) {
    for (var spring = null, _js_idx5 = 0; _js_idx5 < p.springs.length; _js_idx5 += 1) {
        spring = p.springs[_js_idx5];
        particleSpringTobang(p, spring.point, spring.k, spring.length);
    };
    for (var target = null, _js_idx6 = 0; _js_idx6 < p.gravitations.length; _js_idx6 += 1) {
        target = p.gravitations[_js_idx6];
        particleGravitateTobang(p, target);
    };
    p.vx *= p.friction;
    p.vy = p.vy * p.friction + p.gravity;
    p.x += p.vx;
    __PS_MV_REG = [];
    return p.y += p.vy;
};
window.makeParticle = makeParticle;
window.particleSpeed = particleSpeed;
window.particleHeading = particleHeading;
window.particleUpdatebang = particleUpdatebang;
window.particleAcceleratebang = particleAcceleratebang;
window.particleGravitateTobang = particleGravitateTobang;
window.particleGravitationAddbang = particleGravitationAddbang;
window.particleGravitationRemovebang = particleGravitationRemovebang;
window.particleSpringTobang = particleSpringTobang;
window.particleSpringAddbang = particleSpringAddbang;
window.particleSpringRemovebang = particleSpringRemovebang;
