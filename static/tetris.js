const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

const board = Array.from(
    { length: ROWS },
    () => Array(COLS).fill(0)
);

const SHAPES = [
    [[1,1,1,1]],

    [[1,1],
     [1,1]],

    [[0,1,0],
     [1,1,1]]
];

let piece = createPiece();

function createPiece() {
    const shape =
        SHAPES[Math.floor(Math.random() * SHAPES.length)];

    return {
        x: Math.floor(COLS / 2) - 1,
        y: 0,
        shape: shape
    };
}

function drawCell(x, y) {
    ctx.fillRect(
        x * BLOCK,
        y * BLOCK,
        BLOCK - 1,
        BLOCK - 1
    );
}

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                drawCell(x, y);
            }
        }
    }

    for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {

            if (piece.shape[r][c]) {
                drawCell(
                    piece.x + c,
                    piece.y + r
                );
            }
        }
    }
}

function collision() {

    for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {

            if (!piece.shape[r][c]) continue;

            let newY = piece.y + r + 1;
            let newX = piece.x + c;

            if (newY >= ROWS) {
                return true;
            }

            if (board[newY][newX]) {
                return true;
            }
        }
    }

    return false;
}

function mergePiece() {

    for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {

            if (piece.shape[r][c]) {
                board[piece.y + r][piece.x + c] = 1;
            }
        }
    }
}

function clearLines() {

    for (let y = ROWS - 1; y >= 0; y--) {

        if (board[y].every(cell => cell === 1)) {

            board.splice(y, 1);

            board.unshift(
                Array(COLS).fill(0)
            );

            y++;
        }
    }
}

function update() {

    if (collision()) {

        mergePiece();

        clearLines();

        piece = createPiece();

    } else {

        piece.y++;
    }

    draw();
}

document.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") {
        piece.x--;
    }

    if (e.key === "ArrowRight") {
        piece.x++;
    }

    if (e.key === "ArrowDown") {
        piece.y++;
    }

    draw();
});

draw();

setInterval(update, 500);
