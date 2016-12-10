function changeOpacityById(id, newText, startTime, delta=1000) {
	var c = document.getElementById(id);
	var time = delta / 2000;
	c.style.transition = "all " + time.toString() + "s";
	c.style.WebKitTransition = "all " + time.toString() + "s";
	setTimeout(function(){c.style.opacity = 0;}, startTime + delta/2);
	setTimeout(function(){c.style.opacity = 1;}, startTime + delta - 1);
	setTimeout(function(){c.innerHTML = newText;}, startTime + delta);
}

function changeHeightById(id, newText, nextTime, newHeight) {
	var c = document.getElementById(id);
	c.style.transition = "all 0.5s";
	c.style.WebKitTransition = "all 0.5s";
	setTimeout(function(){c.height = 0;}, nextTime + 500);
	setTimeout(function(){c.innerHTML = newText;}, nextTime + 999);
	setTimeout(function(){c.height = newHeight;}, nextTime + 1000);
	return nextTime + 1000;
}

function changeBackgroundImage(newImage) {
	var body = document.getElementsByTagName('body')[0];
	body.style.backgroundImage = newImage + 'no-repeat center center fixed;';
}