'use strict';

function LayupDrawer() {
    this.canvas = null;
    this.ctx = null;
    this.images = {
        parallel: null,
        perpendicular: null,
    };
}

LayupDrawer.prototype = {
    /**
     * Inisialisasi canvas dan memuat gambar
     * @param {HTMLCanvasElement} canvas
     */
    init: function (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Memuat gambar
        this.images.parallel = new Image();
        this.images.parallel.src = './2D/javascript-test/images/paralel-grain-0.jpg';

        this.images.perpendicular = new Image();
        this.images.perpendicular.src = './2D/javascript-test/images/perpendicular-grain-90.jpg';
    },

    /**
     * Gambar pola lapisan CLT
     * @param {Array} pattern
     */
    drawPattern: function (pattern) {
        const ctx = this.ctx;
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        let currentY = 0; // Posisi vertikal saat ini di canvas

        // Tunggu gambar selesai dimuat
        this.images.parallel.onload = this.images.perpendicular.onload = () => {
            const layerHeight = canvasHeight / pattern.length; // Tinggi tiap lapisan

            pattern.forEach((layer) => {
                const img = layer.type === 'parallel' ? this.images.parallel : this.images.perpendicular;

                for (let i = 0; i < layer.count; i++) {
                    ctx.drawImage(img, 0, currentY, canvasWidth, layerHeight);
                }

                currentY += layerHeight;
            });
        };
    },
};
