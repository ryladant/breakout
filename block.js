export class Block{
    constructor(ctx, x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draw(ctx);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collision_with_ball(ball) {
        if (this.x < ball.x + ball.radius &&
            this.x + this.width > ball.x - ball.radius &&
            this.y < ball.y + ball.radius &&
            this.y + this.height > ball.y - ball.radius) {
            return true;
        }
        return false;
    }

    update(ctx){
        this.draw(ctx);
    }

}