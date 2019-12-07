function main() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    for (var _ = 0; _ < 100; _ += 1) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    };
};
window.onload = main;