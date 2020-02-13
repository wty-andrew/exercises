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
    var angle3182 = arm.angle;
    var parent3183 = arm.parent;
    for (; parent3183 != null; ) {
        var _ps_incr_place3184 = parent3183.angle;
        angle3182 += _ps_incr_place3184;
        parent3183 = parent3183.parent;
    };
    __PS_MV_REG = [];
    return arm.x + Math.cos(angle3182) * arm.length;
};
function armEndY(arm) {
    var angle3184 = arm.angle;
    var parent3185 = arm.parent;
    for (; parent3185 != null; ) {
        var _ps_incr_place3186 = parent3185.angle;
        angle3184 += _ps_incr_place3186;
        parent3185 = parent3185.parent;
    };
    __PS_MV_REG = [];
    return arm.y + Math.sin(angle3184) * arm.length;
};
window.makeArm = makeArm;
window.armEndX = armEndX;
window.armEndY = armEndY;
