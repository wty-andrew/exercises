function makeArm(x, y, length, angle) {
    return { x : x,
             y : y,
             length : length,
             angle : angle,
             parent : null
           };
};
function armEndX(arm) {
    var angle1041 = arm.angle;
    var parent1042 = arm.parent;
    for (; parent1042 != null; ) {
        var _ps_incr_place1043 = parent1042.angle;
        angle1041 += _ps_incr_place1043;
        parent1042 = parent1042.parent;
    };
    __PS_MV_REG = [];
    return arm.x + Math.cos(angle1041) * arm.length;
};
function armEndY(arm) {
    var angle1043 = arm.angle;
    var parent1044 = arm.parent;
    for (; parent1044 != null; ) {
        var _ps_incr_place1045 = parent1044.angle;
        angle1043 += _ps_incr_place1045;
        parent1044 = parent1044.parent;
    };
    __PS_MV_REG = [];
    return arm.y + Math.sin(angle1043) * arm.length;
};
window.makeArm = makeArm;
window.armEndX = armEndX;
window.armEndY = armEndY;
