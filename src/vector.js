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
    var _js17 = v;
    var _js16 = v.x * scalar;
    _js17.x = _js16;
    var _js19 = v;
    var _js18 = v.y * scalar;
    return _js19.y = _js18;
};
function vslashbang(v, scalar) {
    __PS_MV_REG = [];
    return vstarbang(v, 1 / scalar);
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
window.angleBetween = angleBetween;
