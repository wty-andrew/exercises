function makeParticle(x, y, speed, direction, gravity) {
    if (gravity === undefined) {
        gravity = 0;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js260 = velocity;
    var _js259 = speed;
    var angle = vecAngle(_js260);
    var _js264 = _js260;
    var _js263 = Math.cos(angle) * _js259;
    _js264.x = _js263;
    var _js266 = _js260;
    var _js265 = Math.sin(angle) * _js259;
    _js266.y = _js265;
    var _js262 = velocity;
    var _js261 = direction;
    var length = vecLength(_js262);
    var _js268 = _js262;
    var _js267 = Math.cos(_js261) * length;
    _js268.x = _js267;
    var _js270 = _js262;
    var _js269 = Math.sin(_js261) * length;
    _js270.y = _js269;
    __PS_MV_REG = [];
    return { position : position,
             velocity : velocity,
             mass : 1,
             radius : 0,
             bounce : -1,
             gravity : makeVector(0, gravity)
           };
};
function particleUpdatebang(p) {
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
    var _js272 = grav;
    var _js271 = p2.mass / (dist * dist);
    var angle = vecAngle(_js272);
    var _js276 = _js272;
    var _js275 = Math.cos(angle) * _js271;
    _js276.x = _js275;
    var _js278 = _js272;
    var _js277 = Math.sin(angle) * _js271;
    _js278.y = _js277;
    var _js274 = grav;
    var _js273 = angleBetween(p1.position, p2.position);
    var length = vecLength(_js274);
    var _js280 = _js274;
    var _js279 = Math.cos(_js273) * length;
    _js280.x = _js279;
    var _js282 = _js274;
    var _js281 = Math.sin(_js273) * length;
    _js282.y = _js281;
    __PS_MV_REG = [];
    return vplusbang(p1.velocity, grav);
};
window.makeParticle = makeParticle;
window.particleUpdatebang = particleUpdatebang;
window.particleAcceleratebang = particleAcceleratebang;
window.particleGravitateTobang = particleGravitateTobang;