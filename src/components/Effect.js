import { Particle } from "./Particle";

export class Effect {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.particlesArray = [];
		this.image = document.querySelector("#image1");
		this.centerX = this.width * 0.5;
		this.centerY = this.height * 0.5;
		this.x = this.centerX - this.image.width * 0.5;
		this.y = this.centerX - this.image.width * 0.5;
		this.gap = 2;
		this.mouse = {
			x: null,
			y: null,
			radius: 150
		};
	}

	init(context) {
		window.addEventListener('mousemove', this.handleMouseMove);
		context.drawImage(this.image, this.x, this.y);
		const imageData = context.getImageData(0, 0, this.width, this.height);
		const pixels = new Uint8ClampedArray(imageData.data.buffer);

		for (let y = 0; y < this.height; y += this.gap) {
			for (let x = 0; x < this.width; x += this.gap) {
				const index = (y * this.width + x) * 4;
				const red = pixels[index];
				const green = pixels[index + 1];
				const blue = pixels[index + 2];
				const alpha = pixels[index + 3];
				const color = `rgb(${red},${green},${blue})`;

				if (alpha > 0) {
					this.particlesArray.push(new Particle(this, x, y, color));
				}
			}
		}
	}

	draw(context) {
		context.beginPath();
		for (let i = 0; i < this.particlesArray.length; i++) {
			const particle = this.particlesArray[i];
			particle.draw(context);
		}
		context.closePath();
	}

	update() {
		const particles = this.particlesArray;
		const mouse = this.mouse;

		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];
			particle.updateMouse(mouse);
		}
	}

	warp() {
		const particles = this.particlesArray;

		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];
			particle.warp();
		}
	}

	handleMouseMove = (event) => {
		this.mouse.x = event.x;
		this.mouse.y = event.y;
	}
}
