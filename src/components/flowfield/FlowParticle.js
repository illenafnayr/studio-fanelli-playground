export class FlowParticle {
	constructor(effect) {
		this.effect = effect;
		this.x = Math.floor(Math.random() * this.effect.width);
		this.y = Math.floor(Math.random() * this.effect.height);
		this.speedX;
		this.speedY;
		this.speedModifier = Math.floor(Math.random() * 2 + 1);
		this.history = [{ x: this.x, y: this.y }];
		this.maxLength = Math.floor(Math.random() * 60 + 50);
		this.angle = 0;
		this.newAngle = 0;
		this.angleCorrector = Math.random() * 0.5 + 0.1;
		this.timer = this.maxLength * 2;
		this.colors = ['#4f0080', '#700cad', '#9835d4', '#b55beb', '#cf94f2', '#ecd2fc', 'white'];
		this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
	}
	draw(context) {
		context.beginPath();
		context.moveTo(this.history[0].x, this.history[0].y);
		for (let i = 0; i < this.history.length; i++) {
			context.lineTo(this.history[i].x, this.history[i].y);
		}
		context.strokeStyle = this.color;
		context.stroke()
	}
	update() {
		this.timer--;
		if (this.timer >= 1) {
			let x = Math.floor(this.x / this.effect.cellSize);
			let y = Math.floor(this.y / this.effect.cellSize);
			let index = y * this.effect.cols + x;

			if (this.effect.flowField[index]) {
				this.newAngle = this.effect.flowField[index].colorAngle;
				if (this.angle > this.newAngle) {
					this.angle -= this.angleCorrector;
				} else if (this.angle < this.newAngle) {
					this.angle += this.angleCorrector;
				}
			}
			this.speedX = Math.cos(this.angle);
			this.speedY = Math.sin(this.angle);
			this.x += this.speedX * this.speedModifier;
			this.y += this.speedY * this.speedModifier;

			this.history.push({ x: this.x, y: this.y });
			if (this.history.length > this.maxLength) {
				this.history.shift();
			}
		} else if (this.history.length > 1) {
			this.history.shift();
		} else {
			this.reset();
		}
	}
	reset() {
		let attempts = 0;
		let resetSuccess = false;

		while (attempts < 10 && !resetSuccess) {
			attempts++;
			let testIndex = Math.floor(Math.random() * this.effect.flowField.length);
			if (this.effect.flowField[testIndex].alpha > 0) {
				this.x = this.effect.flowField[testIndex].x;
				this.y = this.effect.flowField[testIndex].y;
				this.history = [{ x: this.x, y: this.y }];
				this.timer = this.maxLength * 2;
				resetSuccess = true;
			}
		}
		if (!resetSuccess) {
			this.x = Math.random() * this.effect.width;
			this.y = Math.random() * this.effect.height;
			this.history = [{ x: this.x, y: this.y }];
			this.timer = this.maxLength * 2;
		}
	}

}