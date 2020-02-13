function makeArm(length, centerAngle, rotationRange, phaseOffset) {
    return { x : 0,
             y : 0,
             length : length,
             angle : 0,
             centerAngle : centerAngle,
             rotationRange : rotationRange,
             parent : null,
             phaseOffset : phaseOffset
           };
};
function armEndX(arm) {
    var angle9 = arm.angle;
    var parent10 = arm.parent;
    for (; parent10 != null; ) {
        var _ps_incr_place11 = parent10.angle;
        angle9 += _ps_incr_place11;
        parent10 = parent10.parent;
    };
    __PS_MV_REG = [];
    return arm.x + Math.cos(angle9) * arm.length;
};
function armEndY(arm) {
    var angle11 = arm.angle;
    var parent12 = arm.parent;
    for (; parent12 != null; ) {
        var _ps_incr_place13 = parent12.angle;
        angle11 += _ps_incr_place13;
        parent12 = parent12.parent;
    };
    __PS_MV_REG = [];
    return arm.y + Math.sin(angle11) * arm.length;
};
function dragArm(arm, x, y) {
    var _js14 = arm;
    var _js13 = { x : x, y : y };
    var dx = _js13.x - _js14.x;
    var dy = _js13.y - _js14.y;
    _js14.angle = Math.atan2(dy, dx);
    var _js16 = arm;
    var _js15 = x - Math.cos(arm.angle) * arm.length;
    _js16.x = _js15;
    var _js18 = arm;
    var _js17 = y - Math.sin(arm.angle) * arm.length;
    _js18.y = _js17;
    __PS_MV_REG = [];
    return arm.parent ? dragArm(arm.parent, arm.x, arm.y) : null;
};
window.makeArm = makeArm;
window.armEndX = armEndX;
window.armEndY = armEndY;
window.dragArm = dragArm;
