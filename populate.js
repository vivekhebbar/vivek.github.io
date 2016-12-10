var idTitle = 'title-enlighten';
var idPresentation = 'presentation-enlighten';
var idNavi = 'navi-enlighten';
window.onload = function() {populate('intro', opq)};

function populate(slide) {
	var nextTime = changeOpacityById(idTitle, titleHTMLDict[slide], 0);
	nextTime = changeOpacityById(idPresentation, presHTMLDict[slide], nextTime + 100);
	changeOpacityById(idNavi, naviHTMLDict[slide], nextTime + 20);
	if (slide === game) {
		console.log("here");
		setTimeout(function(){
			var conn4 = document.getElementById('conn4-container');
			if(conn4) {
				conn4.addEventListener("click", getClickPosition, false);
			}
		}, nextTime + 1);
	}
}

function getClickPosition(e) {
	console.log("here2");
	var x = e.clientX;
	var y = e.clientY;
	alert(x);
	alert(y);
}
// Slide names
var intro = 'intro';
var game = 'game';
var about = 'about';
var projects = 'projects';
var info = 'info';

// Transition options
var opq = 1;
var hgt = 2;

// HTML dictionaries for titles, presentations, navigation
var titleHTMLDict = {
	intro : 'HELLO AND WELCOME',
	game : 'CONNECT FOUR',
	about : 'ABOUT &#39;&#39;V&#39;&#39;',
	projects : 'COMPLETED/IN PROGRESS PROJECTS',
	info : 'RESUME + GITHUB + LINKEDIN'
}
var gamePresHTML = '<div class="container" id="conn4-container">'
for (i = 0; i < 7; i++) {
	for(j = 0; j < 6; j++) {
		gamePresHTML += '<div class="conn4-circle" id="conn4-' + i.toString() + j.toString() + '"><i class="fa fa-check-circle" aria-hidden="true"></i></div>';
	}
} 
gamePresHTML += '</div>'
var presHTMLDict = {
	intro : '<h2>My name is Vivek Hebbar, and this is my website. Care to play a game?</h2></br>',
	game : gamePresHTML,
	about : "<h2>I am a fourth year EECS major at Cal. I was born and raised in good old Raleigh, North Carolina. <br><br>I am very interested in artificial intelligence and machine learning, especially consumer-facing applications of AI found in products such as Apple's Siri and Amazon's Echo. <br><br> In my free time (and when I have the motivation), I try to apply the concepts I learn in the classrooms of Berkeley to projects and ideas that intrigue me. One such example is applying machine learning and advanced algorithms to optimizing daily fantasy sports (DraftKings) lineups. With a group of friends, I built a program that scraped the web for player statistics, used linear regression to predict the fantasy points each player may score for a given day, and scripted an algorithm to choose the best players when supplied salary constraints. <br><br> I am also currently working on (1) a conversational chatbot that can provide personalized recommendations on provided subject matters, and (2) an artificial intelligence agent which will not require cue commands (i.e. Hey Siri, Alexa, etc.), and which will provide contextual insight to users before, during, and after their interactions with the people in their lives.</h2>",
	projects : '',
	info : ''
}
var naviHTMLDict = {
	intro : '<h2><a class="link" onclick="populate(game, opq)"><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m Game!</a><br><br><a class="link" onclick="populate(about, opq)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;No, I Hate Fun</a></h2>',
	game : '<h2><a class="link" onclick="populate(intro, opq)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a><br><br><a class="link" onclick="populate(about, opq)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Who Is Vivek?</a></h2>',
	about : '<h2><a class="link" onclick="populate(intro, opq)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a><br><br><a class="link" onclick="populate(projects, opq)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;See My Projects</a></h2>',
	projects : '<h2><a class="link" onclick="populate(about, opq)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to About V</a><br><br><a class="link" onclick="populate(info, opq)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Want to Get in Touch?</a></h2>',
	info : '<h2><a class="link" onclick="populate(projects, opq)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to My Projects</a></h2>'
}