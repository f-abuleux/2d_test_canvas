'use strict';

function LayupDrawer() {
    /**
     * Canvas element
     */
    this.canvas = null;
    this.ctx = null
}

LayupDrawer.prototype = {
    /**
     * Configure the canvas
     *
     * @param {HTMLCanvasElement} canvas  Canvas element
     */
    init: function (canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

    },

    /**
     * Draw a layup configuration on the canvas
     *
     * @param {Object} layup Layup object structure
     * @param {Number} length Layup length in mm
     */
    drawLayup: async function (layup, length) {
        const ctx = this.ctx;

        const lebarCanvas = 1000
        this.canvas.width = lebarCanvas
        const heightCanvas = 750
        this.canvas.height = heightCanvas

        const lebarGambar = 250

        const textContainer = document.getElementById('text-container');
        textContainer.innerHTML = ''
        let currentY = 0;

        for (const layer of Object.values(layup)) {
            const layerHeight = 150

            const image = await this.loadImage(
                layer.angle === 0 ? 'images/paralel-grain-0.jpg' : 'images/perpendicular-grain-90.jpg'
            )
            for (let i = 0; i < 5; i++) {
                ctx.drawImage(image, i * lebarGambar, currentY, lebarGambar, layerHeight);

            }

            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, currentY);
            ctx.lineTo(lebarCanvas, currentY);
            ctx.moveTo(0, currentY + layerHeight);
            ctx.lineTo(lebarCanvas, currentY + layerHeight);
            ctx.stroke();

            const textDiv = document.createElement('div');
            // textDiv.style.marginTop = heightCanvas/7 + 'px';
            textDiv.style.height = layerHeight + 'px';
            textDiv.style.justifyContent = 'center';
            textDiv.style.placeContent = 'center';
            textDiv.style.marginLeft = '60px';
            textDiv.textContent = `${layer.label}: ${layer.thickness}mm ${layer.grade}`;
            textContainer.appendChild(textDiv);

            currentY += layerHeight
        }
    },


    /**
     * Add more functions as you need
     */
    loadImage: function (src) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(img)
            img.onerror = reject
        });
    }
};