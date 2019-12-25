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
function distance(a, b) {
    __PS_MV_REG = [];
    return distanceXy(a.x, a.y, b.x, b.y);
};
function angleBetween(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
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
function degreegreaterthanRad(deg) {
    return (deg / 180) * Math.PI;
};
function radgreaterthanDegree(rad) {
    return (rad * 180) / Math.PI;
};
function randomRange(min, max) {
    __PS_MV_REG = [];
    return lerp(Math.random(), min, max);
};
function randomInt(min, max) {
    __PS_MV_REG = [];
    return Math.floor(randomRange(min, max + 1));
};
function quadraticBezier(p0, p1, p2, k, pFinal) {
    if (pFinal === undefined) {
        pFinal = {  };
    };
    pFinal.x = Math.pow(1 - k, 2) * p0.x + (1 - k) * 2 * k * p1.x + k * k * p2.x;
    pFinal.y = Math.pow(1 - k, 2) * p0.y + (1 - k) * 2 * k * p1.y + k * k * p2.y;
    return pFinal;
};
function cubicBezier(p0, p1, p2, p3, k, pFinal) {
    if (pFinal === undefined) {
        pFinal = {  };
    };
    pFinal.x = Math.pow(1 - k, 3) * p0.x + Math.pow(1 - k, 2) * 3 * k * p1.x + (1 - k) * 3 * k * k * p2.x + k * k * k * p3.x;
    pFinal.y = Math.pow(1 - k, 3) * p0.y + Math.pow(1 - k, 2) * 3 * k * p1.y + (1 - k) * 3 * k * k * p2.y + k * k * k * p3.y;
    return pFinal;
};
function multicurve(points, context) {
    var numPoints = points.length;
    context.moveTo(points[0].x, points[0].y);
    var i = 1;
    for (; i < numPoints - 2; ) {
        var p0 = points[i];
        var p1 = points[i + 1];
        var midx = (p0.x + p1.x) / 2;
        var midy = (p0.y + p1.y) / 2;
        context.quadraticCurveTo(p0.x, p0.y, midx, midy);
        var _js637 = i + 1;
        i = _js637;
    };
    var p0_637 = points[numPoints - 2];
    var p1_638 = points[numPoints - 1];
    return context.quadraticCurveTo(p0_637.x, p0_637.y, p1_638.x, p1_638.y);
};
window.norm = norm;
window.lerp = lerp;
window.map = map;
window.clamp = clamp;
window.distance = distance;
window.distanceXy = distanceXy;
window.angleBetween = angleBetween;
window.circleCollision = circleCollision;
window.circlePointCollision = circlePointCollision;
window.pointInRect = pointInRect;
window.inRange = inRange;
window.rangeIntersect = rangeIntersect;
window.rectIntersect = rectIntersect;
window.degreegreaterthanRad = degreegreaterthanRad;
window.radgreaterthanDegree = radgreaterthanDegree;
window.randomRange = randomRange;
window.randomInt = randomInt;
window.quadraticBezier = quadraticBezier;
window.cubicBezier = cubicBezier;
window.multicurve = multicurve;
