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
    for (var arm = null, _js_idx3181 = 0; _js_idx3181 < fkSystem.arms.length; _js_idx3181 += 1) {
        arm = fkSystem.arms[_js_idx3181];
        var _js3183 = arm;
        var _js3182 = fkSystem.phase;
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
