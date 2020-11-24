import { LedMatrix, GpioMapping, Font } from 'rpi-led-matrix';
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

const wait = (t: number) => new Promise(ok => setTimeout(ok, t));

(async () => {
    matrix.clear()            // clear the display
        .brightness(100)
        .fgColor(0x00FFFF)
        .font(new Font('font', './node_modules/rpi-led-matrix/fonts/8x13B.bdf'))
        .drawText("Jonathan", 10, 10, 1)
        .sync();

    await wait(500000);
})();
