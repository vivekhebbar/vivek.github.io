var idTitle = 'title-enlighten';
var idPresentation = 'presentation-enlighten';
var idNavi = 'navi-enlighten';
// conn4 turn tracking
var client = 0;
var comp = 1;
var undef = -1;
var turn = client;

var conn4Stack = [];
var internal = [];
for (i = 0; i < 6; i++) {
	internal = internal.concat([[-1,-1,-1,-1,-1,-1,-1]]);
}

// Slide names
var intro = 'intro';
var game = 'game';
var about = 'about';
var projects = 'projects';
var info = 'info';

window.onload = function() {populate('intro')};

// HTML dictionary for titles
var titleHTMLDict = {
	intro : 'HELLO AND WELCOME',
	game : 'CONNECT FOUR, YOU START',
	about : 'ABOUT &#39;&#39;V&#39;&#39;',
	projects : 'COMPLETED/IN PROGRESS PROJECTS',
	info : 'RESUME + GITHUB + LINKEDIN'
}
// HTML dictionary for presentation containers
var gamePresHTML = '<div class="container" id="conn4-container">'
for (i = 0; i < 6; i++) {
	gamePresHTML += '<div class="row" style="clear: left">';
	for(j = 0; j < 7; j++) {
		gamePresHTML += '<div class="conn4-circle" id="conn4-' + i.toString() + j.toString() + '" onclick="clientClick(this.id);"><i class="fa fa-check-circle" aria-hidden="true" style="color:gray"></i></div>';
	}
	gamePresHTML += '</div>';
} 
gamePresHTML += '</div><br><h2 onclick=undo()>Undo</h2>'
var presHTMLDict = {
	intro : '<h2>My name is Vivek Hebbar, and this is my website. Care to play a game?</h2></br>',
	game : gamePresHTML,
	about : "<h2>I am a fourth year EECS major at Cal. I was born and raised in good old Raleigh, North Carolina. <br><br>I am very interested in artificial intelligence and machine learning, especially consumer-facing applications of AI found in products such as Apple's Siri and Amazon's Echo. <br><br> In my free time (and when I have the motivation), I try to apply the concepts I learn in the classrooms of Berkeley to projects and ideas that intrigue me. One such example is applying machine learning and advanced algorithms to optimizing daily fantasy sports (DraftKings) lineups. With a group of friends, I built a program that scraped the web for player statistics, used linear regression to predict the fantasy points each player may score for a given day, and scripted an algorithm to choose the best players when supplied salary constraints. <br><br> I am also currently working on (1) a conversational chatbot that can provide personalized recommendations on provided subject matters, and (2) an artificial intelligence agent which will not require cue commands (i.e. Hey Siri, Alexa, etc.), and which will provide contextual insight to users before, during, and after their interactions with the people in their lives.</h2>",
	projects : '',
	info : ''
}
// HTML dictionary for navigation containers
var naviHTMLDict = {
	intro : '<h2><a class="link" onclick="populate(game)"><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m Game!</a><br><br><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;No, I Hate Fun</a></h2>',
	game : '<h2><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a><br><br><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Who Is Vivek?</a></h2>',
	about : '<h2><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a><br><br><a class="link" onclick="populate(projects)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;See My Projects</a></h2>',
	projects : '<h2><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to About V</a><br><br><a class="link" onclick="populate(info)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Want to Get in Touch?</a></h2>',
	info : '<h2><a class="link" onclick="populate(projects)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to My Projects</a></h2>'
}
// Main slide loading logic. First clear everything,
// then quickly bring in title, and then after some time
// the presentation container and shortly thereafter the
// navigation container. If it is the game slide, initialize
// the board AI.
function populate(slide) {
	changeOpacityById(idTitle, titleHTMLDict[slide], 0, 500);
	changeOpacityById(idPresentation, presHTMLDict[slide], 0, 1000);
	changeOpacityById(idNavi, naviHTMLDict[slide], 0, 1200);
	if (slide == game) {
		setTimeout(function(){setup();}, 1200 + 1);
	}
}
// Set up board game AI
function setup() {
	var x = 1;
}
// When the client clicks and it is client's turn,
// color the chosen column, switch turns, and call the board AI.
function clientClick(click_id) {
	if (document.getElementById(idTitle).innerHTML == titleHTMLDict[game]) {
		changeOpacityById(idTitle, "CONNECT FOUR", 0, 500);
	}
	console.log(click_id);
	if (turn == client) {
		var y = parseInt(click_id.substring(7,8));
		var clientColumn = {y:y, player:client};
		conn4Stack.push(clientColumn);
		color(clientColumn);
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
			newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:white"></i>';
		}
		if (column.player == comp) {
			newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:black"></i>';
		}
	}
}
// Board AI that colors the comp's chosen column
// and switches turns
function boardAI() {
	// logic to find optimal y placement
	var y = 1;
	var compColumn = {y:y, player:comp};
	conn4Stack.push(compColumn);
	color(compColumn);
	turn = client;
}
// Undoes last client move. If there is a 
// computer move before the last client move,
// it undoes this computer move before undoing
// the penultimate move which is the client's.
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
	console.log(conn4Stack.length);
}
// logic to uncolor the conn4 dot for column.player in column column.y
function remove(column) {
	var x = 0;
	while ((internal[x][column.y] == -1) && (x < 5)) { x += 1;}
	// record it on internal board
	internal[x][column.y] = undef;
	var newDot = document.getElementById("conn4-" + x.toString() + (column.y).toString()); 
	newDot.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true" style="color:gray"></i>';
}















