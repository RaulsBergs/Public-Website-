
function draw() {
    var canvas = document.getElementById('GameScreen');
    var ctx = canvas.getContext('2d');
    var img = document.getElementById("IntroScreen");
    ctx.drawImage(img, 0, 0);
}