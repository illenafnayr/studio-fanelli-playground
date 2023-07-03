import { FlowParticle } from "./FlowParticle.js";

export class FlowEffect {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 4000;
        this.cellSize = 5;
        this.rows;
        this.cols;
        this.flowField = [];
        // this.curve = 5;
        // this.zoom = 0.01;
        this.debug = false;
        this.init();

        window.addEventListener('keydown', e => {
            if (e.key === 'd') {
                this.debug = !this.debug;
            }
        })
        // window.addEventListener('resize', e => {
        //     // this.resize(e.target.innerWidth, e.target.innerHeight);
        // })
    }
    drawText() {
        this.context.font = '500px Impact';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        // const gradient1 = this.context.createLinearGradient(0 ,0, this.width, this.height);
        // gradient1.addColorStop(0.2, 'rgb(255, 0, 0)');
        // gradient1.addColorStop(0.4, 'rgb(0, 255, 0)');
        // gradient1.addColorStop(0.6, 'rgb(150, 100, 100)');
        // gradient1.addColorStop(0.8, 'rgb(0, 25, 255)');

        const gradient2 = this.context.createLinearGradient(0 ,0, this.width, this.height);
        gradient2.addColorStop(0.2, 'rgb(255, 255, 0)');
        gradient2.addColorStop(0.4, 'rgb(200, 5, 50)');
        gradient2.addColorStop(0.6, 'rgb(150, 255, 255)');
        gradient2.addColorStop(0.8, 'rgb(255, 255, 150)');

        // const gradient3 = this.context.createRadialGradient(this.width * 0.5, this.height * 0.5, 10, this.width * 0.5, this.height * 0.5, this.width);
        // gradient3.addColorStop(0.2, 'rgb(0, 0, 255)');
        // gradient3.addColorStop(0.4, 'rgb(200, 255, 0)');
        // gradient3.addColorStop(0.6, 'rgb(0, 134, 255)');
        // gradient3.addColorStop(0.8, 'rgb(0, 0, 0)');


        this.context.fillStyle = gradient2;
        this.context.fillText('Buonanotte!', this.width * 0.5, this.height * 0.5, this.width);
    }
    init() {
        // Create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        // Draw text
        this.drawText();

        // Scan pixel data
        const pixels = this.context.getImageData(0, 0, this.width, this.height).data;
        console.log(pixels);

        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
                const index = (y * this.width + x) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                // const alpha = pixels[index + 3];
                const grayscale = (red + green + blue) / 3;
                const colorAngle = ((grayscale/255) * 6.28).toFixed(2); // Number of radians in a circle

                this.flowField.push({
                    x: x,
                    y: y,
                    colorAngle: colorAngle
                })
            }
        }

        // Create Particles
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new FlowParticle(this));
        }
        this.particles.forEach(particle => particle.reset())
    }
    drawGrid() {
        this.context.save();
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 0.3;
        for (let c = 0; c < this.cols; c++) {
            this.context.beginPath();
            this.context.moveTo(this.cellSize * c, 0);
            this.context.lineTo(this.cellSize * c, this.height);
            this.context.stroke();
        }
        for (let r = 0; r < this.rows; r++) {
            this.context.beginPath();
            this.context.moveTo(0, this.cellSize * r);
            this.context.lineTo(this.width, this.cellSize * r);
            this.context.stroke();
        }
        this.context.restore();
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }
    render() {
        if (this.debug) {
            this.drawGrid(this.context);
            this.drawText();
        }
        this.particles.forEach(particle => {
            particle.draw(this.context)
            particle.update();
        })
    }
}