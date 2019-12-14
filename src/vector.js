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
    var _js284 = v;
    var _js283 = v.x * scalar;
    _js284.x = _js283;
    var _js286 = v;
    var _js285 = v.y * scalar;
    return _js286.y = _js285;
};
function vslashbang(v, scalar) {
    __PS_MV_REG = [];
    return vstarbang(v, 1 / scalar);
};
function distance(v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    __PS_MV_REG = [];
    return Math.sqrt(dx * dx + dy * dy);
};
function angleBetween(v1, v2) {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
};
window.makeVector = makeVector;
window.vecAngle = vecAngle;
window.vecLength = vecLength;
window.vplus = vplus;
window.v = v;
window.vstar = vstar;
window.vslash = vslash;
window.vplusbang = vplusbang;
window.vbang = vbang;
window.vstarbang = vstarbang;
window.vslashbang = vslashbang;
window.distance = distance;
window.angleBetween = angleBetween;