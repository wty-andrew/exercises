function makeParticle(x, y, speed, direction, gravity) {
    if (gravity === undefined) {
        gravity = 0;
    };
    var position = makeVector(x, y);
    var velocity = makeVector(0, 0);
    var _js826 = velocity;
    var _js825 = speed;
    var angle = vecAngle(_js826);
    var _js830 = _js826;
    var _js829 = Math.cos(angle) * _js825;
    _js830.x = _js829;
    var _js832 = _js826;
    var _js831 = Math.sin(angle) * _js825;
    _js832.y = _js831;
    var _js828 = velocity;
    var _js827 = direction;
    var length = vecLength(_js828);
    var _js834 = _js828;
    var _js833 = Math.cos(_js827) * length;
    _js834.x = _js833;
    var _js836 = _js828;
    var _js835 = Math.sin(_js827) * length;
    _js836.y = _js835;
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
    var _js838 = grav;
    var _js837 = p2.mass / (dist * dist);
    var angle = vecAngle(_js838);
    var _js842 = _js838;
    var _js841 = Math.cos(angle) * _js837;
    _js842.x = _js841;
    var _js844 = _js838;
    var _js843 = Math.sin(angle) * _js837;
    _js844.y = _js843;
    var _js840 = grav;
    var _js839 = angleBetween(p1.position, p2.position);
    var length = vecLength(_js840);
    var _js846 = _js840;
    var _js845 = Math.cos(_js839) * length;
    _js846.x = _js845;
    var _js848 = _js840;
    var _js847 = Math.sin(_js839) * length;
    _js848.y = _js847;
    __PS_MV_REG = [];
    return vplusbang(p1.velocity, grav);
};
window.makeParticle = makeParticle;
window.particleUpdatebang = particleUpdatebang;
window.particleAcceleratebang = particleAcceleratebang;
window.particleGravitateTobang = particleGravitateTobang;
