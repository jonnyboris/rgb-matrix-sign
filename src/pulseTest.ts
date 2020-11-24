import { LedMatrix, GpioMapping } from 'rpi-led-matrix';
// const wait = (t: number) => new Promise(ok => setTimeout(ok, t));
const matrix = new LedMatrix(
    {
        ...LedMatrix.defaultMatrixOptions(),
        rows: 64,
        cols: 64,
        chainLength: 1,
        hardwareMapping: GpioMapping.AdafruitHat,
        rowAddressType: 0
    },
    {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 4,
    }
);

class Pulser {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly f: number
    ) { }

    nextColor(t: number): number {
        /** You could easily work position-dependent logic into this expression */
        const brightness = 0xFF & Math.max(0, 255 * (Math.sin(this.f * t / 1000)));
        return  (brightness << 16) | (brightness << 8) | brightness;
    }
}

const pulsers: Pulser[] = [];

for (let x = 0; x < matrix.width(); x++) {
    for (let y = 0; y < matrix.height(); y++) {
        pulsers.push(new Pulser(x, y, 5 * Math.random()));
    }
}

let current = 0;

matrix.afterSync((mat, dt, t) => {
    pulsers.forEach((pulser, i) => {
        matrix
            .fgColor(0x00FF00)
            .brightness(Math.floor(Math.random() * 100) + 20 )
            .setPixel(pulser.x, pulser.y);
    });

    setTimeout(() => {
        current += 1;
        if (current > pulsers.length) {
            current = 0;
        }
        matrix.sync()
    }, 0);
});

// Get it started
matrix.sync();


