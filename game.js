import { Ball } from './ball.js';
import { Player } from './player.js';
import { Block } from './block.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.style.border = '1px solid red';

canvas.width = 300
canvas.height = 300

const cellSize = 30
const gridSize = 10

const keys = {}

const ball = new Ball(ctx, 200, 167, 5, { x: 2, y: 2 }, 'red');
let player = new Player(ctx, 50, 280, 100, 20, 5, 'red');
let blocks = []

document.addEventListener("keydown", (event) => keys[event.key] = true);
document.addEventListener("keyup", (event) => keys[event.key] = false);

function start() {
    draw_blocks()
    for(let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize ; j++){
            blocks.push({
                x: i * cellSize,
                y: j * cellSize,
                width: cellSize,
                height: cellSize,
                destroyed: false,
            })

            if(j * cellSize > canvas.height/3) break
        }
    }
    console.log(blocks)
    update(ctx);

}

function draw_blocks(){
    ctx.fillStyle = "red";
    blocks.forEach(block => {
        if (!block.destroyed) {
            ctx.fillRect(block.x, block.y, block.width, block.height);
        }
    });
}

function update(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update(ctx, player, blocks);
    player.update(ctx, keys);
    draw_blocks()

    requestAnimationFrame(() => update(ctx));
}

start()