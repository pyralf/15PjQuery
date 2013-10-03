function Cell(i, j) {
    this.i = i;
    this.j = j;
}

function initBoard() {
    board = [];
    var cellVal = 0;
    for (i = 0; i < edgeSize; i++) {
        var row = [];
        for (j = 0; j < edgeSize; j++) {
            if (i === edgeSize - 1 && j === edgeSize - 1) {
                row.push(0);
                emptyCell = new Cell(i, j);
            } else {
                row.push(++cellVal);
            }
        }
        board.push(row);
    }
}

function scrambleBoard() {
    for (var n = 1; n <= 142; n++) {
        //drawBoard();
        var i = emptyCell.i;
        var j = emptyCell.j;
        var possibilities = [];
        if (i > 0) 
                possibilities.push(new Cell(i - 1, j));
        if (j > 0) 
                possibilities.push(new Cell(i, j - 1));
        if (i < edgeSize - 1) 
                possibilities.push(new Cell(i + 1, j));
        if (j < edgeSize - 1) 
                possibilities.push(new Cell(i, j + 1));

        rand = Math.ceil(Math.random() * (possibilities.length)) - 1;
        var newCell = possibilities[rand];
        log("newCell: " + newCell.i + ", " + newCell.j);
        board[i][j] = board[newCell.i][newCell.j];
        board[newCell.i][newCell.j] = 0;
        emptyCell = newCell;
    }
}

function drawBoard() {
    var top = 2;
    for (var i = 0; i < edgeSize; i++) {
        var left = 2;
        for (var j = 0; j < edgeSize; j++) {
            if (board[i][j] !== 0) {
                var elem = document.getElementById('p' + board[i][j]);
                elem.style.top = top + "px";
                elem.style.left = left + "px";
                //log("Position p" + board[i][j] + " at " + top + "px, " + left + "px");
            }
            left += pieceSize;
        }
        top += pieceSize;
    }
}

function log(message) {
    //var output = document.getElementById("messages");
    //output.value += message + "\n";
    console.log(message);
}

function move(pieceID) {
    var id = parseInt(pieceID);
    for (i = 0; i < edgeSize; i++) {
        for (j = 0; j < edgeSize; j++) {
            if (board[i][j] === id) {
                log("Clicked on " + i + " " + j + " element");
                if (i > 0)
                    if (board[i - 1][j] === 0) {
                        board[i - 1][j] = id;
                        board[i][j] = 0;
                        return {top:'-=' + pieceSize + 'px'}; // up
                    }
                if (i + 1 < edgeSize)
                    if (board[i + 1][j] === 0) {
                        board[i + 1][j] = id;
                        board[i][j] = 0;
                        return {top:'+=' + pieceSize + 'px'}; // down
                    }
                if (j > 0)
                    if (board[i][j - 1] === 0) {
                        board[i][j - 1] = id;
                        board[i][j] = 0;
                        return {left:'-=' + pieceSize + 'px'}; // left
                    }
                if (j + 1 < edgeSize)
                    if (board[i][j + 1] === 0) {
                        board[i][j + 1] = id;
                        board[i][j] = 0;
                        return {left:'+=' + pieceSize + 'px'}; // right
                    }
                log("Can't move!");
            }
        }
    } 
}

var pieceSize = 90; // in px
var edgeSize = 4; // edge size of board in pieces
var board = [];
var emptyCell;

$(document).ready(function() {
    initBoard();
    drawBoard();
    $('.piece').click(function() {
        var p = $(this).children()[0];
	var id = typeof (p.innerText) === "undefined" ? p.textContent : p.innerText;
        log("Clicked on " + p + " : " + id);
        $(this).animate(move(id),300);
    });
    $('#start').click(function() {
        log("clicked on start");
        initBoard();
        scrambleBoard();
        drawBoard();
    });
});
