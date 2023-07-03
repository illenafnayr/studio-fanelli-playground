export class Bar {
    constructor(x, y, width, height, color, i){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.index = i;
    }
    update(micInput) {
        const sound = micInput * 1000;
        if(sound > this.height) {
            this.height = sound;
        } else {
            this.height -= this.height * 0.03
        }
    }
    draw(context, canvas, volume){
        // context.fillStyle = this.color;
        // context.fillRect(this.x, this.y, this.width, this.height)
        context.strokeStyle = this.color;
        context.save();

        context.translate(0, 0);
        context.rotate(this.index * 0.03);
        context.scale(1 + volume * 0.2, 8 + volume * 0.2)
        context.beginPath();
        // context.moveTo(this.x, this.y);
        // context.lineTo(this.y, this.height);
        // context.bezierCurveTo(0,0, this.height, this.height, this.x, this.y)
        context.stroke();
        context.rotate(this.index * 0.02);
        context.beginPath();
        context.arc(this.x + this.index * 2.5, this.y, this.height * 0.5, 0, Math.PI * 2)
        context.strokeRect(this.x, this.y, this.height/2, this.height);

        context.restore();
    }
}