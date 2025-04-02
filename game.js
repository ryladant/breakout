import { Ball } from './ball.js';
import { Player } from './player.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.border = '1px solid red';

canvas.width = 300
canvas.height = 300

const keys = {}

const ball = new Ball(ctx, 200, 167, 5, { x: 2, y: 2 }, 'red');
let player = new Player(ctx, 50, 280, 100, 20, 5, 'red');

document.addEventListener("keydown", (event) => keys[event.key] = true);
document.addEventListener("keyup", (event) => keys[event.key] = false);

function start() {
    update(ctx);

}

function update(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update(ctx, player);
    player.update(ctx, keys);

    requestAnimationFrame(() => update(ctx));
}

start()