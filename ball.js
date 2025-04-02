export class Ball{
    constructor(ctx, x, y, radius, speed, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = {
            x: speed.x,
            y: speed.y
        };
        this.color = color;
        this.collision = false
    }

    move(player){
        if(this.x + this.radius > 300 || this.x - this.radius < 0){
            this.speed.x *= -1;
            this.collision = false
        }
        if(this.y + this.radius > 300 || this.y - this.radius < 0){
            this.speed.y *= -1
            this.collision = false
        }

        let collision = player.collision_with_ball(this);

        if(collision && !this.collision){
            this.collision = true
            this.speed.y *= -1;
            this.speed.x = this.speed.x + Math.abs(this.x - player.x - player.width / 2)*0.05;
        }

        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(ctx, player){
        this.move(player);
        this.draw(ctx);
    }

}