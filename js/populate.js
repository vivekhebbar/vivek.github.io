var idTitle = 'title-enlighten';
var idPresentation = 'presentation-enlighten';
var idNavi = 'navi-enlighten';

// Slide names
var intro = 'intro';
var game = 'game';
var about = 'about';
var projects = 'projects';
var info = 'info';
window.onload = function() {populate('intro')};

// dictionary for image files
var imageDict = {
	intro : 'img/earth.jpg',
	game : 'img/arena.jpg',
	about : 'img/woods.jpg',
	projects : 'img/cabinet.jpg',
	info : 'img/hawk.jpg'
}

// HTML dictionary for titles
var titleHTMLDict = {
	intro : 'HELLO AND WELCOME',
	game : 'CONNECT FOUR! YOU START',
	about : 'ABOUT &#39;V&#39;',
	projects : 'PAST & PRESENT PROJECTS',
	info : 'CONTACT ME'
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
gamePresHTML += '</div><br><h2><a class="link" href="#" onclick=undo()>Undo Move</a>&nbsp;&nbsp;||&nbsp;&nbsp;<a href="#" class="link" onclick=populate(game)>Reset</a>&nbsp;&nbsp;||&nbsp;&nbsp;<a class="link" href="https://github.com/vivekhebbar/vivekhebbar.github.io/blob/master/js/conn4.js" target="_blank">My Code</a></h2>'
var presHTMLDict = {
	intro : '<h2>My name is Vivek Hebbar, and this is my website. Care to play a game?</h2></br>',
	game : gamePresHTML,
	about : "<h2>Hi, I'm Vivek. I was born and raised in good ol' Raleigh, NC. I am a senior EECS major at UC Berkeley.<br><br>Early on in my undergraduate journey, I asked myself what my purpose in life was. The answer, I told myself, was to further humanity through contributing to the field of space exploration.<br><br>However, as the years continued, I became more enchanted with the huge leaps in standard of living that computer science has been responsible for in recent decades. In contrast with interplanetary travel - an expensive ordeal focused around an elite few, but bankrolled by the common man - computer science and the technology of our new decade was inclusive and available to all.<br><br><b>Computer science, I discovered, was also producing immense value for society, but was doing so by empowering its constituent individuals.</b><br><br>Since this realization, I have dedicated the foreseeable future of my life to:<br><br>(1) understanding machine learning and artificial intelligence and implementing techniques in projects of interest;<br><br>(2) using these two tools to create value for individual humans by enhancing their productivity.<br><br>The influence of both (1) and (2) can be seen in my resume or on the next page dedicated to projects.</h2>",
	projects : '<h2 style="clear:left; text-align:left;"><b>SEMPER AI</b>&nbsp;|&nbsp;&nbsp;In Progress. A revolutionary contextual AI assistant, providing social network model-leveraged insight before, during, and after conversations.</h2><h2 style="clear:left;text-align:left;"><b>DRAFTKINGS AI</b>&nbsp;|&nbsp;&nbsp;Currently working on migrating from Stattleship API to the MySportsFeed API, and optimizing the DP knapsack algorithm to form winning lineups.&nbsp;<i><a class="link" href="https://github.com/skylarbrannon/stat-predictor" target="_blank">REPO&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></i></h2><h2 style="clear:left;text-align:left;"><b>XENIA</b>&nbsp;|&nbsp;&nbsp;Created for Social Challenge Lab, 2016. Cashless payment platform for international transportation and purchases.&nbsp;<i><a class="link" href="https://app.slidebean.com/p/dZHTOdbmHT/XENIA" target="_blank">SLIDE DECK&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></i></h2><h2 style="clear:left;text-align:left"><b>LuDO ChATBOT</b>&nbsp;|&nbsp;&nbsp;Visual Demo for LuDO, the activity discovery chatbot. By asking set initial questions, the chatbot narrows its dataset of featurized events. It then builds a decision tree, and utilizes the tree to chat with the client.&nbsp;<i><a class="link" href="https://github.com/ludo-chatbot/ludo-chatbot.github.io" target="_blank">MVP REPO&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></i></h2><h2 style="clear:left;text-align:left;"><b>CONNECT 4 AI</b>&nbsp;|&nbsp;&nbsp;HTML/CSS + JS, alpha beta pruning Connect 4 AI.&nbsp;<i><a class="link" href="https://github.com/vivekhebbar/vivekhebbar.github.io" target="_blank">REPO&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></i></h2>',
	info : '<h2 style="clear:left;"><a class="link" href="Vivek_Hebbar_Resume.pdf" target="_blank">Resume&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2><h2 style="clear:left;"><a class="link" href="https://github.com/vivekhebbar" target="_blank">&nbsp;GitHub&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2><h2 style="clear:left"><a class="link" href="https://www.linkedin.com/in/vivekhebbar" target="_blank">LinkedIn&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2><h2 style="clear:left;"><a class="link" href="mailto:vivek.hebbar@berkeley.edu" target="_blank">&nbsp;&nbsp;&nbsp;E-Mail&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a></h2>'
}
// HTML dictionary for navigation containers
var naviHTMLDict = {
	intro : '<h2 style="clear:left;"><a class="link" onclick="populate(game)"><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m Game!</a></h2><h2 style="clear:left"><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Skip For Now</a></h2>',
	game : '<h2 style="clear:left;"><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Who am I?</a></h2><h2 style="clear:left"><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a></h2>',
	about : '<h2 style="clear:left;"><a class="link" onclick="populate(projects)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;See My Projects</a></h2><h2 style="clear:left"><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to Landing</a></h2>',
	projects : '<h2 style="clear:left;"><a class="link" onclick="populate(info)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Want to Get in Touch?</a></h2><h2 style="clear:left"><a class="link" onclick="populate(about)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to About V</a></h2>',
	info : '<h2 style="clear:left;"><a class="link" onclick="populate(intro)"><i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;Return to Landing</a></h2><h2 style="clear:left"><a class="link" onclick="populate(projects)"><i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back to My Projects</a></h2>'
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
	changeOpacityById(idTitle, 'LOADING <i class="fa fa-circle-o-notch fa-spin fa-fw" style="color:white;font-size:85%;"></i>', 0, 20);
	var img = new Image();
	img.onload = function() {
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


