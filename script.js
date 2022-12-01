let fields = [];
let gameOver = false;

let currentShape = 'cross'

function fillshape(id) {
    if (!fields[id] && !gameOver) {
        switchPlayers();
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}

function switchPlayers(){
    if (currentShape == 'cross') {
        currentShape = 'circle';
       document.getElementById('player-2').classList.remove('player-inactive');
       document.getElementById('player-1').classList.add('player-inactive');
    } else {
        currentShape = 'cross';
        document.getElementById('player-1').classList.remove('player-inactive');
        document.getElementById('player-2').classList.add('player-inactive');
    }
}



function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }

        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}

function checkForWin() {
    let winner;
    checkHorizontalWins(winner);
    checkVerticalWins(winner);
    checkDiagonalWins(winner);
    checkDrawAtGame(winner);
}

function checkDrawAtGame(winner){
    if (fields[0] && fields[1] && fields[3] && fields[4] && fields[5] &&
        fields[6] && fields[7] && fields[8] && fields[2] && fields[0]) {
        winner = fields[0];
    }

    win(winner);
}

function win(winner) {
    if (winner) {
        gameOver = true;
        document.getElementById('player-2').classList.add('player-inactive');
        document.getElementById('player-1').classList.add('player-inactive');
        setTimeout(function () {
            document.getElementById('end-screen').classList.remove('d-none');
            document.getElementById('restart-btn').classList.remove('d-none')
        }, 1500);
    }
}

function checkHorizontalWins(winner) {
    checkWin(0, 1, 2, 0, 'scaleX(1)', winner);
    checkWin(3, 4, 5, 1, 'scaleX(1)', winner);
    checkWin(6, 7, 8, 2, 'scaleX(1)', winner);
}

function checkVerticalWins(winner) {
    checkWin(0, 3, 6, 3, 'rotate(90deg) scaleX(1)', winner);
    checkWin(1, 4, 7, 4, 'rotate(90deg) scaleX(1)', winner);
    checkWin(2, 5, 8, 5, 'rotate(90deg) scaleX(1)', winner);
}

function checkDiagonalWins(winner) {
    checkWin(0, 4, 8, 6, 'rotate(45deg) scaleX(1)', winner);
    checkWin(2, 4, 6, 7, 'rotate(-45deg) scaleX(1)', winner);
}

function checkWin(field1, field2, field3, id, style, winner){
    if (fields[field1] == fields[field2] && fields[field2] == fields[field3] && fields[field1]) {
        winner = fields[field1];
        document.getElementById('line-' +id).classList.remove('d-none');
        document.getElementById('line-' +id).style.transform = style;
    }
    win(winner);
}


function restart() {
    gameOver = false;
    
    fields = [];
    fillshape();

    hideForRestart();

}

function hideForRestart(){
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    for (let i = 0; i < 8; i++) {
        document.getElementById('line-' + i).classList.add('d-none');
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
}