export class Player{
    constructor(ctx, x, y, width, height, speed, color, ai){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed
        this.color = color;
        this.ai = ai;
    }

    collision_with_ball(ballX, ballY, ballRadius){
        if(this.x < ballX + ballRadius && 
            this.x + this.width > ballX - ballRadius && 
            this.y < ballY + ballRadius && 
            this.y + this.height > ballY - ballRadius){
                return true;
        }
        return false;
    }

    move(keys){
        if(!this.ai){
            if(keys["a"]) this.x -= this.speed;
            if(keys["d"])this.x += this.speed;
        }

    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(ctx, keys){
        this.move(keys);
        this.draw(ctx);
    }
}