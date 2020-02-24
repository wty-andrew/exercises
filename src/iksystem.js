function makeIkSystem(x, y) {
    return { arms : [],
             lastArm : null,
             x : x,
             y : y
           };
};
function ikSystemAddArmbang(ikSystem, length) {
    var arm = makeArm(length, 0, 0, 0);
    if (ikSystem.lastArm) {
        arm.x = armEndX(ikSystem.lastArm);
        arm.y = armEndY(ikSystem.lastArm);
        arm.parent = ikSystem.lastArm;
    } else {
        arm.x = ikSystem.x;
        arm.y = ikSystem.y;
    };
    ikSystem.arms.push(arm);
    __PS_MV_REG = [];
    return ikSystem.lastArm = arm;
};
function ikSystemReach(ikSystem, x, y) {
    dragArm(ikSystem.lastArm, x, y);
    for (var arm = null, _js_idx20 = 0; _js_idx20 < ikSystem.arms.length; _js_idx20 += 1) {
        arm = ikSystem.arms[_js_idx20];
        if (arm.parent) {
            arm.x = arm.parent.x + Math.cos(arm.parent.angle) * arm.parent.length;
            arm.y = arm.parent.y + Math.sin(arm.parent.angle) * arm.parent.length;
        } else {
            arm.x = ikSystem.x;
            arm.y = ikSystem.y;
        };
    };
};
window.makeIkSystem = makeIkSystem;
window.ikSystemAddArmbang = ikSystemAddArmbang;
window.ikSystemReach = ikSystemReach;
