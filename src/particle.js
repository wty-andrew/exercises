function makeParticle(x, y, speed, direction, gravity) {
    if (gravity === undefined) {
        gravity = 0;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js21 = velocity;
    var _js20 = speed;
    var angle = vecAngle(_js21);
    var _js25 = _js21;
    var _js24 = Math.cos(angle) * _js20;
    _js25.x = _js24;
    var _js27 = _js21;
    var _js26 = Math.sin(angle) * _js20;
    _js27.y = _js26;
    var _js23 = velocity;
    var _js22 = direction;
    var length = vecLength(_js23);
    var _js29 = _js23;
    var _js28 = Math.cos(_js22) * length;
    _js29.x = _js28;
    var _js31 = _js23;
    var _js30 = Math.sin(_js22) * length;
    _js31.y = _js30;
    __PS_MV_REG = [];
    return { position : position,
             velocity : velocity,
             mass : 1,
             radius : 0,
             bounce : -1,
             friction : 1,
             gravity : makeVector(0, gravity)
           };
};
function particleUpdatebang(p) {
    vstarbang(p.velocity, p.friction);
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
    var _js33 = grav;
    var _js32 = p2.mass / (dist * dist);
    var angle = vecAngle(_js33);
    var _js37 = _js33;
    var _js36 = Math.cos(angle) * _js32;
    _js37.x = _js36;
    var _js39 = _js33;
    var _js38 = Math.sin(angle) * _js32;
    _js39.y = _js38;
    var _js35 = grav;
    var _js34 = angleBetween(p1.position, p2.position);
    var length = vecLength(_js35);
    var _js41 = _js35;
    var _js40 = Math.cos(_js34) * length;
    _js41.x = _js40;
    var _js43 = _js35;
    var _js42 = Math.sin(_js34) * length;
    _js43.y = _js42;
    __PS_MV_REG = [];
    return vplusbang(p1.velocity, grav);
};
window.makeParticle = makeParticle;
window.particleUpdatebang = particleUpdatebang;
window.particleAcceleratebang = particleAcceleratebang;
window.particleGravitateTobang = particleGravitateTobang;
