var idTitle = 'title-enlighten';
var idPresentation = 'presentation-enlighten';
var idNavi = 'navi-enlighten';

// Slide names
var intro = 'intro';
var game = 'game';
var about = 'about';
var projects = 'projects';
var info = 'info';
window.onload = function() {
	//document.getElementById(idTitle).innerHTML = "LOADING...";
	populate('intro')};

// dictionary for image files
var imageDict = {
	intro : 'earth.jpg',
	game : 'woods.jpg',
	about : 'woods.jpg',
	projects : 'earth.jpg',
	info : 'station.jpg'
}

// HTML dictionary for titles
var titleHTMLDict = {
	intro : 'HELLO AND WELCOME',
	game : 'CONNECT FOUR! YOU START',
	about : 'ABOUT &#39;V&#39;',
	projects : 'PAST & PRESENT PROJECTS',
	info : 'RESUME + GITHUB + LINKEDIN'
}
// HTML dictionary for presentation containers
var gamePresHTML = '<div class="container" id="conn4-container">'
for (i = 0; i < 6; i++) {
	gamePresHTML += '<div class="row" style="clear: left">';
	for(j = 0; j < 7; j++) {
		gamePresHTML += '<div class="conn4-circle" id="conn4-' + i.toString() + j.toString() + '" onclick="clientClick(this.id);"><i class="fa fa-check-circle" aria-hidden="true" style="color:gray;"></i></div>';
	}
	gamePresHTML += '</div>';
} 
gamePresHTML += '</div><br><h2 onclick=undo()>Undo</h2>'
var presHTMLDict = {
	intro : '<h2>My name is Vivek Hebbar, and this is my website. Care to play a game?</h2></br>',
	game : gamePresHTML,
	about : "<h2>I am a fourth year EECS major at Cal. I was born and raised in good old Raleigh, North Carolina. <br><br>I am very interested in artificial intelligence and machine learning, especially consumer-facing applications of AI found in products such as Apple's Siri and Amazon's Echo. <br><br> In my free time (and when I have the motivation), I try to apply the concepts I learn in the classrooms of Berkeley to projects and ideas that intrigue me. One such example is applying machine learning and advanced algorithms to optimizing daily fantasy sports (DraftKings) lineups. With a group of friends, I built a program that scraped the web for player statistics, used linear regression to predict the fantasy points each player may score for a given day, and scripted an algorithm to choose the best players when supplied salary constraints. <br><br> I am also currently working on (1) a conversational chatbot that can provide personalized recommendations on provided subject matters, and (2) an artificial intelligence agent which will not require cue commands (i.e. Hey Siri, Alexa, etc.), and which will provide contextual insight to users before, during, and after their interactions with the people in their lives.</h2>",
	projects : '<h2>COMING SOON</h2>',
	info : '<h2><a class="link" href="resume.pdf" target="_blank">Resume&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2><br><h2><a class="link" href="https://github.com/vivekhebbar" target="_blank">GitHub&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2><br><h2><a class="link" href="https://www.linkedin.com/in/vivekhebbar" target="_blank">LinkedIn&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2><br><h2><a class="link" href="mailto:vivek.hebbar@berkeley.edu" target="_blank">E-Mail&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2>'
}
// HTML dictionary for navigation containers
var naviHTMLDict = {
	intro : '<h2><a class="link" onclick="populate(game)"><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m Game!</a><br><br><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Skip For Now</a></h2>',
	game : '<h2><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Who is Vivek?</a><br><br><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a></h2>',
	about : '<h2><a class="link" onclick="populate(projects)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;See My Projects</a><br><br><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a></h2>',
	projects : '<h2><a class="link" onclick="populate(info)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Want to Get in Touch?</a><br><br><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to About V</a></h2>',
	info : '<h2><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Return to Landing</a><br><br><a class="link" onclick="populate(projects)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to My Projects</a></h2>'
}

function changeOpacityById(id, newText, startTime, delta=1000) {
	var c = document.getElementById(id);
	var time = delta / 2000;
	c.style.transition = "all " + time.toString() + "s";
	c.style.WebKitTransition = "all " + time.toString() + "s";
	setTimeout(function(){c.style.opacity = 0;}, startTime + delta/2);
	setTimeout(function(){c.style.opacity = 1;}, startTime + delta - 1);
	setTimeout(function(){c.innerHTML = newText;}, startTime + delta);
}

// Main slide loading logic. First clear everything,
// then quickly bring in title, and then after some time
// the presentation container and shortly thereafter the
// navigation container. If it is the game slide, initialize
// the board AI.

function populate(slide) {
	changeOpacityById(idTitle, "LOADING...", 0, 20);
	var img = new Image();
	img.onload = function() {
		console.log("loaded");
		$('body').css({'background': 'url(' + imageDict[slide] + ') no-repeat center center fixed', 'background-size': 'cover'});
		changeOpacityById(idTitle, titleHTMLDict[slide], 300, 1300);
		changeOpacityById(idPresentation, presHTMLDict[slide], 300, 1800);
		changeOpacityById(idNavi, naviHTMLDict[slide], 300, 1900);
		if (slide == game) {
			setTimeout(function(){setup();}, 1900 + 1);
		};
	}
	img.src = imageDict[slide];
	
}


