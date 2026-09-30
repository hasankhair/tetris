const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const ROWS = 20;
const COLS = 10;
const BLOCK = 30;

let board = Array.from(
    { length: ROWS },
    () => Array(COLS).fill(0)
);

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                ctx.fillRect(
                    x * BLOCK,
                    y * BLOCK,
                    BLOCK,
                    BLOCK
                );
            }
        }
    }
}

function update() {
    drawBoard();
    requestAnimationFrame(update);
}

update();