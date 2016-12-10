// conn4 turn tracking
var client = 0;
var comp = 1;
var undef = -1;
var turn = client;
var counter = 0;

var conn4Stack = [];
var internal = [];
for (i = 0; i < 6; i++) {
	internal = internal.concat([[-1,-1,-1,-1,-1,-1,-1]]);
}
var directionAmortizeClient = [], directionAmortizeComp = [];
for (i = 0; i < 6; i++) {
	for (j = 0; j < 7; j++) {
		directionAmortizeClient = directionAmortizeClient.concat({h:0, v:0, p:0, n:0});
		directionAmortizeComp = directionAmortizeComp.concat({h:0, v:0, p:0, n:0});
	}
}

// Eval-check Directions. Array of array of xy dictionaries.
var directions = [[{x:1,y:0},{x:-1,y:0}],[{x:0,y:1},{x:0,y:-1}],[{x:1,y:1},{x:-1,y:-1}],[{x:1,y:-1}, ,{x:-1,y:1}]];

// Set up board game AI
function setup() {
	counter = 0;
}
// When the client clicks and it is client's turn, color the chosen column, 
// switch turns, and call the board AI.
function clientClick(click_id) {
	if (document.getElementById(idTitle).innerHTML == titleHTMLDict[game]) {
		changeOpacityById(idTitle, "CONNECT FOUR", 0, 500);
	}
	console.log(click_id);
	if (turn == client) {
		var y = parseInt(click_id.substring(7,8));
		var clientColumn = {y:y, player:client};
		conn4Stack.push(clientColumn);
		var x = color(clientColumn);
		lineUpdate(clientColumn, x);
		turn = comp;
		boardAI();
	}
}
// Logic to color the conn4 dot for column.player in column column.y
function color(column) {
	var x = 5;
	while ((internal[x][column.y] != -1) && (x > 0)) {x -= 1;}
	if (internal[0][column.y] == -1) {
		internal[x][column.y] = column.player;
		var newDot = document.getElementById("conn4-" + x.toString() + (column.y).toString()); 
		if (column.player == client) {
			newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:white;"></i>';
		}
		if (column.player == comp) {
			newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:black;"></i>';
		}
		return x;
	}
}
// 
function lineUpdate(column, x){
	counter += 1;
	if (x) {
		
	}
}
// Board AI that colors the comp's chosen column and switches turns
function boardAI() {
	// logic to find optimal y placement
	var possibleMoves = generateNeighboringMoves();
	var copy = JSON.parse(JSON.stringify(internal));


	var y = Math.floor(Math.random() * 6.99);
	var compColumn = {y:y, player:comp};
	conn4Stack.push(compColumn);
	var x = color(compColumn);
	lineUpdate(compColumn, x);
	turn = client;
}
// Undoes last client move. If there is a computer move before the last 
// client move, it undoes this computer move before undoing the penultimate 
// move which is the client's.
function undo() {
	if(conn4Stack.length) {
		var undoColumn = conn4Stack.pop();
		remove(undoColumn);
		if(undoColumn.player == comp) {
			undoColumn = conn4Stack.pop();
			remove(undoColumn);
		}
		turn = client;
	}
}
// logic to uncolor the conn4 dot for column.player in column column.y
function remove(column) {
	var x = 0;
	while ((internal[x][column.y] == -1) && (x < 5)) { x += 1;}
	// record it on internal board
	internal[x][column.y] = undef;
	var newDot = document.getElementById("conn4-" + x.toString() + (column.y).toString()); 
	newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:gray;"></i>';
}
//
function generateNeighboringMoves() {
	var neighbors = [];
	for (y = 0; y < 7; y++) {
		var x = 5;
		while ((internal[x][y] != -1) && (x > 0)) {x -= 1;}
		if (internal[0][y] == -1) {
			neighbors.push({y: y, player: comp});
		}
	}
	return neighbors;
}
// evaluates board from 
function evaluateBoard(board) {
	var visited = JSON.parse(JSON.stringify(board));
	for (x = 0; i < 6; i++) {
		for(y = 0; j < 7; j++) {
			if (visited[x][y] == -1) {
				visited[x][y] = 1;
				for (var dir in directions) {
					var dir1 = dir[0], dir2 = dir[1];
					var dirCount = lineCount(x, y, dir1, board) + lineCount(x, y, dir2, board);
					if (dirCount > 3) {
						return 1000;
					}
				}
			}
		}
	}
}
//
function lineCount(x, y, dir, board) {
	if (!boundsCheck(x, y)) {return 0;}
	if (board[x + dir.x][y + dir.y] == board[x][y]) {
		return min(4, 1 + lineCount(x + dir.x, y + dir.y, dir, board));
	}
	return min(4, lineCount(x + dir.x, y + dir.y, dir, board));
}
//
function boundsCheck(x, y) {return (x < 0) && (x > 6) && (y < 0) && ( y > 7);}
