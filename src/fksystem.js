function makeFkSystem(x, y) {
    return { arms : [],
             lastArm : null,
             x : x,
             y : y,
             phase : 0,
             speed : 0.05
           };
};
function fkSystemUpdatebang(fkSystem) {
    for (var arm = null, _js_idx19 = 0; _js_idx19 < fkSystem.arms.length; _js_idx19 += 1) {
        arm = fkSystem.arms[_js_idx19];
        var _js21 = arm;
        var _js20 = fkSystem.phase;
        arm.angle = arm.centerAngle + Math.sin(fkSystem.phase + arm.phaseOffset) * arm.rotationRange;
        if (arm.parent) {
            arm.x = armEndX(arm.parent);
            arm.y = armEndY(arm.parent);
        } else {
            arm.x = fkSystem.x;
            arm.y = fkSystem.y;
        };
    };
    __PS_MV_REG = [];
    return fkSystem.phase += fkSystem.speed;
};
function fkSystemAddArmbang(fkSystem, length, centerAngle, rotationRange, phaseOffset) {
    var arm = makeArm(length, centerAngle, rotationRange, phaseOffset);
    fkSystem.arms.push(arm);
    arm.parent = fkSystem.lastArm;
    fkSystem.lastArm = arm;
    __PS_MV_REG = [];
    return fkSystemUpdatebang(fkSystem);
};
function fkSystemRotateArmbang(fkSystem, index, angle) {
    return fkSystem.arms[index].angle = angle;
};
window.makeFkSystem = makeFkSystem;
window.fkSystemUpdatebang = fkSystemUpdatebang;
window.fkSystemAddArmbang = fkSystemAddArmbang;
window.fkSystemRotateArmbang = fkSystemRotateArmbang;
