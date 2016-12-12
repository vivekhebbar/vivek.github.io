// conn4 constants
var CLIENT = 1;
var COMP = -1;
var UNDEF = 0;
var turn = CLIENT;
var counter = 0;
var WIDTH = 7;
var HEIGHT = 6;
var MAXINT = 10000;
var dpth = 4;

var conn4Stack = [];
var internal = [];

// Set up board game AI
function setup() {
	counter = 0;
	internal = [];
	for (i = 0; i < HEIGHT; i++) {
		internal = internal.concat([[0,0,0,0,0,0,0]]);
	}
}
// When the CLIENT clicks and it is CLIENT's turn, color the chosen column, 
// switch turns, and call the board AI.
function clientClick(click_id) {
	if (document.getElementById(idTitle).innerHTML == titleHTMLDict[game]) {changeOpacityById(idTitle, "CONNECT FOUR", 0, 500);}
	if (turn == CLIENT && counter != WIDTH * HEIGHT) {
		var y = parseInt(click_id.substring(7,8));
		var clientColumn = {y:y, player:CLIENT};
		conn4Stack.push(clientColumn);
		color(clientColumn);
		turn = COMP;
		counter += 1;
		boardAI();
	}
}
// Logic to color the conn4 dot for column.player in column column.y
function color(column) {
	var x = HEIGHT - 1;
	while ((internal[x][column.y] != UNDEF) && (x > 0)) {x -= 1;}
	if (internal[0][column.y] == UNDEF) {
		internal[x][column.y] = column.player;
		var newDot = document.getElementById("conn4-" + x.toString() + column.y.toString()); 
		if (column.player == CLIENT) {
			newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:white;"></i>';
		}
		if (column.player == COMP) {
			newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:black;"></i>';
		}
		return x;
	}
}
// Board AI that colors the COMP's chosen column and switches turns
function boardAI() {
	if (eval(internal) == MAXINT) {alert("You win! Congrats");return;}
	var possibleMoves = generateNeighboringMoves(internal);
	var bestSoFar = -MAXINT, bestMove = {}, score = 0;
	for (var i = 0; i < possibleMoves.length; i++) {
		var move = possibleMoves[i];
		internal[move.x][move.y] = COMP;
		score = minVal(internal, dpth);
		if (score > bestSoFar) {bestMove = move; bestSoFar = score;}
		internal[move.x][move.y] = UNDEF;
	}
	// If there is a move, make it
	if(bestMove != {}) {
		var compColumn = {y:bestMove.y,player:COMP};
		conn4Stack.push(compColumn);
		color(compColumn);
		turn = CLIENT;
		counter += 1;
		if (Math.abs(bestSoFar) == MAXINT && eval(internal) == MAXINT) {alert("I win! You lose. Try again!");return;}
		if (counter == WIDTH * HEIGHT) {alert("Draw! Good game");}
	} else {
		alert("Out of moves - You win!");
		return;
	}
}
// AI minimax
function minVal(board, depth) {
	var score = eval(board);
	if (terminal(score, depth)){
		return score;
	}
	var possibleMoves = generateNeighboringMoves(board);
	score = MAXINT;
	for (var i = 0; i < possibleMoves.length; i++) {
		var move = possibleMoves[i];
		board[move.x][move.y] = CLIENT;
		score = Math.min(score, maxVal(board, depth - 1));
		board[move.x][move.y] = UNDEF;
	}
	return score;
}
//AI minimax
function maxVal(board, depth) {
	var score = eval(board);
	if (terminal(score, depth)) {
		return score;
	}
	var possibleMoves = generateNeighboringMoves(board);
	score = -MAXINT;
	for (var i = 0; i < possibleMoves.length; i++) {
		var move = possibleMoves[i];
		board[move.x][move.y] = COMP;
		score = Math.max(score, minVal(board, depth - 1));
		board[move.x][move.y] = UNDEF;
	}
	return score;
}
// is leaf node or someone won
function terminal(eval, depth) {return (depth == 0) || (Math.abs(eval) == MAXINT);}

// board heuristic
function eval(board) {
	var result = 0, player = UNDEF, h = 0, v = 0, n = 0, p = 0, square = 0;
	for (r = 0; r < HEIGHT; r++) {
		for ( c = 0; c < WIDTH; c++) {
			if (board[r][c] == UNDEF){continue;}
			player = board[r][c];
			h = (c+1 < WIDTH && board[r][c+1] == player) + (c+2 < WIDTH && board[r][c+2] == player) + (c+3 < WIDTH && board[r][c+3] == player);
			v = (r+1 < HEIGHT && board[r+1][c] == player) + (r+2 < HEIGHT && board[r+2][c] == player) + (r+3 < HEIGHT && board[r+3][c] == player);
			p = (r+1 < HEIGHT && c+1 < WIDTH && board[r+1][c+1] == player) + (r+2 < HEIGHT && c+2 < WIDTH && board[r+2][c+2] == player) + (r+3 < HEIGHT && c+3 < WIDTH && board[r+3][c+3] == player);
			n = (r+1 < HEIGHT && c-1 >= 0 && board[r+1][c-1] == player) + (r+2 < HEIGHT && c-2 >= 0 && board[r+2][c-2] == player) + (r+3 < HEIGHT && c-3 >= 0 && board[r+3][c-3] == player);
			square = Math.max(h, v, p, n) + 1;
			if (square == 4) { return player * MAXINT;}
			result += (player * (h+v+p+n));
		}
	}
	return result;
}
// Undoes last CLIENT move. If there is a COMPuter move before the last 
// CLIENT move, it undoes this COMPuter move before undoing the penultimate 
// move which is the CLIENT's.
function undo() {
	if(conn4Stack.length) {
		var undoColumn = conn4Stack.pop();
		remove(undoColumn);
		counter -= 1;
		if(undoColumn.player == COMP) {
			undoColumn = conn4Stack.pop();
			remove(undoColumn);
			counter -= 1;
		}
		turn = CLIENT;
	}
}
// Logic to uncolor the conn4 dot for column.player in column column.y
function remove(column) {
	var x = 0;
	while ((internal[x][column.y] == UNDEF) && (x < HEIGHT - 1)) { x += 1;}
	// record it on internal board
	internal[x][column.y] = UNDEF;
	var newDot = document.getElementById("conn4-" + x.toString() + column.y.toString()); 
	newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:gray;"></i>';
}
// Returns list of (x,y) possible next moves
function generateNeighboringMoves(board) {
	var neighbors = [];
	for (y = 0; y < WIDTH; y++) {
		var x = HEIGHT - 1;
		while ((board[x][y] != UNDEF) && (x > 0)) {x -= 1;}
		if (board[0][y] == UNDEF) {neighbors.push({x:x, y:y});}
	}
	return neighbors;
}
