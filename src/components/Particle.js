export class Particle {
    constructor(effect, x, y, color) {
        this.effect = effect;
        // this.x = Math.random() * this.effect.width;
        // this.y = Math.random() * this.effect.height;
        this.x = x;
        this.y = y;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.density = (Math.random() * 40) + 1;
        this.color = color;
        this.originColor = color;
        this.size = this.effect.gap;
        this.vx = 1;
        this.vy = 1;
        this.ease = 0.03;

    }
    draw(context) {
        // context.fillStyle = this.color;
        // context.fillRect(this.x, this.y, this.size, this.size)
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
    update() {
        this.x += (this.originX - this.x) * this.ease;
        this.y += (this.originY - this.y) * this.ease;
    }
    updateMouse(mouse) {
        // let red = Math.random() * 255;
        // let green = Math.random() * 255;
        // let blue = Math.random() * 255;
        // let alpha = Math.random();
        // this.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x += directionX * 3;
            this.y += directionY * 3;
        } else {
            if (this.x !== this.originX) {
                let dx = this.x - this.originX;
                this.x -= dx / 10;
            }
            if (this.y !== this.originY) {
                let dy = this.y - this.originY;
                this.y -= dy / 10;
            }
        }
    }
    warp() {
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.ease = 0.05;
    }
}