const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const BLOCK = 30;

let piece = {
    x: 4,
    y: 0,
    shape: [
        [1, 1],
        [1, 1]
    ]
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
            if (piece.shape[r][c]) {
                ctx.fillRect(
                    (piece.x + c) * BLOCK,
                    (piece.y + r) * BLOCK,
                    BLOCK,
                    BLOCK
                );
            }
        }
    }
}

function update() {
    piece.y++;
    draw();
}

draw();
setInterval(update, 500);
