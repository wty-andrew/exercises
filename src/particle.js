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
             gravity : gravity
           };
};
function particleUpdatebang(p) {
    p.vx *= p.friction;
    p.vy = p.vy * p.friction + p.gravity;
    p.x += p.vx;
    return p.y += p.vy;
};
function particleAcceleratebang(p, accel) {
    p.vx += accel.x;
    return p.vy += accel.y;
};
function particleGravitateTobang(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var distSq = dx * dx + dy * dy;
    var dist = Math.sqrt(distSq);
    var force = p2.mass / distSq;
    var ax = (dx / dist) * force;
    var ay = (dy / dist) * force;
    p1.vx += ax;
    __PS_MV_REG = [];
    return p1.vy += ay;
};
window.makeParticle = makeParticle;
window.particleUpdatebang = particleUpdatebang;
window.particleAcceleratebang = particleAcceleratebang;
window.particleGravitateTobang = particleGravitateTobang;
