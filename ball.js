export class Ball {
    constructor(ctx, x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = {
            x: speed.x,
            y: speed.y
        };
        this.color = color;
        this.collision_wall_x = false;
        this.collision_wall_y = false;
        this.collision_player = false;
        this.collision_block = false;
    }

    collision_with_blocks(blocks) {
        blocks.forEach(block => {
            if (
                this.x + this.radius > block.x && 
                this.x - this.radius < block.x + block.width &&
                this.y + this.radius > block.y &&
                this.y - this.radius < block.y + block.height &&
                !block.destroyed && !this.collision_block
            ) {
                this.speed.y *= -1;
                this.collision_block = true;
                block.destroyed = true;
                blocks.splice(blocks.indexOf(block), 1); // Remove o bloco destruído
                console.log(blocks)
                return; // Evita múltiplas colisões
            }else{
                this.collision_block = false;
            }
        });
    }

    move(player, blocks) {
        if (this.x + this.radius + this.speed.x > 300 || 
            this.x - this.radius - this.speed.x < 0) {
                if(!this.collision_wall_x){
                    this.speed.x *= -1;
                    this.collision_wall_x = true;
                }
        }else{
            this.collision_wall_x = false;
        }

        if (this.y - this.radius - this.speed.y < 0 || 
            this.y + this.radius+this.speed.y > 300) {
                if(!this.collision_wall_y){
                    this.speed.y *= -1;
                    this.collision_wall_y = true;
                }
        }else{
            this.collision_wall_y = false;
        }
        let ballX = 0
        if(this.speed.x > 0)
            ballX = this.x+this.speed.x
        else
            ballX = this.x-Math.abs(this.speed.x)

        let ballY = 0
        if(this.speed.y > 0)
            ballY = this.y+this.speed.y
        else
            ballY = this.y-Math.abs(this.speed.y)
        
        let collision = player.collision_with_ball(
            ballX, 
            ballY,
            this.radius
        );

        if (collision) {
            this.speed.y *= -1;
            this.collision_player = true
        }else{
            this.collision_player = false
        }

        this.collision_with_blocks(blocks);

        // Limita a velocidade máxima da bola
        if (this.speed.x > 5) this.speed.x = 5;

        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(ctx, player, blocks) {
        this.move(player, blocks);
        this.draw(ctx);
    }
}
