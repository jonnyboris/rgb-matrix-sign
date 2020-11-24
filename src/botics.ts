var LedMatrix = require("easybotics-rpi-rgb-led-matrix");

//init a 16 rows  by 16 cols led matrix
//default hardware mapping is 'regular', could be 'adafruit-hat-pwm' ect
var matrix = new LedMatrix(64, 64, 1, 1, 100, 'adafruit-hat');
const font  =  './node_modules/rpi-led-matrix/fonts/8x13B.bdf';


let pos = 0;
let reverse = false;

setInterval(() => {
    matrix.clear();
    matrix.brightness(100);

    matrix.drawLine(0, pos, 64, pos, 0, 255, 0);
    matrix.drawLine(0, 64 - pos, 64, 64 - pos, 0, 255, 0);



    matrix.drawLine(pos, 0, pos, 64, 0, 255, 0);
    matrix.drawLine(64 - pos, 0, 64 - pos, 64, 0, 255, 0);

    matrix.update();

    if (reverse) {
        pos -= 1;
    } else {
        pos += 1;
    }

    if(pos >= 64) {
        reverse = true
    } else if(pos <= 1) {
        reverse = false;
    }

}, 50)



// let pos = 0;
// let reverse = false;
//
// matrix.clear();
// matrix.brightness(100);
//
// matrix.drawLine(0, pos, 64, pos, 0, 255, 0);
// matrix.drawLine(0, 64 - pos, 64, 64 - pos, 0, 255, 0);
//
//
//
// matrix.drawLine(pos, 0, pos, 64, 0, 255, 0);
// matrix.drawLine(64 - pos, 0, 64 - pos, 64, 0, 255, 0);
//
// matrix.update();
//
// if (reverse) {
//     pos -= 1;
// } else {
//     pos += 1;
// }
//
// if(pos >= 64) {
//     reverse = true
// } else if(pos <= 1) {
//     reverse = false;
// }

// function bounce() => {
//     let x = 10;
//     let reverse = false;
//
//     matrix.brightness(100);
//     matrix.fill(255, 50, 100);
//     matrix.drawText(x, x, "test", font, 255, 255, 255);
//
//     if (reverse) {
//         x -= 1;
//     } else {
//         x += 1;
//     }
//
//     if (x > 30) {
//         reverse = true;
//     } else if (x < 11) {
//         reverse = false;
//     }
//
//     matrix.update();
// }
