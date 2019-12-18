function norm(value, min, max) {
    return (value - min) / (max - min);
};
function lerp(norm, min, max) {
    return (max - min) * norm + min;
};
function map(value, sourceMin, sourceMax, destMin, destMax) {
    __PS_MV_REG = [];
    return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
};
function clamp(value, min, max) {
    __PS_MV_REG = [];
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
};
function distanceXy(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    __PS_MV_REG = [];
    return Math.sqrt(dx * dx + dy * dy);
};
function distance(p1, p2) {
    __PS_MV_REG = [];
    return distanceXy(p1.x, p1.y, p2.x, p2.y);
};
function circleCollision(c0, c1) {
    __PS_MV_REG = [];
    return distance(c0, c1) <= c0.radius + c1.radius;
};
function circlePointCollision(x, y, circle) {
    __PS_MV_REG = [];
    return distanceXy(x, y, circle.x, circle.y) < circle.radius;
};
function pointInRect(x, y, rect) {
    __PS_MV_REG = [];
    return inRange(x, rect.x, rect.x + rect.width) && inRange(y, rect.y, rect.y + rect.height);
};
function inRange(value, min, max) {
    __PS_MV_REG = [];
    return value >= Math.min(min, max) && value <= Math.max(min, max);
};
function rangeIntersect(min0, max0, min1, max1) {
    __PS_MV_REG = [];
    return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
};
function rectIntersect(r0, r1) {
    __PS_MV_REG = [];
    return rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) && rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
};
window.norm = norm;
window.lerp = lerp;
window.map = map;
window.clamp = clamp;
window.distance = distance;
window.distanceXy = distanceXy;
window.circleCollision = circleCollision;
window.circlePointCollision = circlePointCollision;
window.pointInRect = pointInRect;
window.inRange = inRange;
window.rangeIntersect = rangeIntersect;
window.rectIntersect = rectIntersect;
