$('.desc').each(function() {
	var $origin = $(this).text();
	console.log($origin +" the original");
	var $words = $(this).text().split(/(\s+)/g);
	for (i in $words) {
		console.log("index is "+$origin.indexOf('>>'));
    	if ($words[i].indexOf('http://') == 0) {
        	$words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
    	} else if ($words[i].indexOf('>>') == 0) {
    		$words[i] = '<a href="#p' + $words[i].substring(2) + '">' + $words[i] + '</a>';
    	}
	}
	$(this).html($words.join(''));
});

$(document).ready(function() {
	$(".postNo").click(function() {
		var desc = $('#desc');
		desc.val(desc.val() + '>>' + $(this).text() + '\n');
		$('#desc').focus();
	});
});
/*
var replies = $(".description");
for (var i = 0; i < replies.length; i++)` {
	var $words = replies[i].text().split(' ');
	for (i in $words) {
    	if ($words[i].indexOf('http://') == 0) {
        	$words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
    	}
	}
	replies[i].html($words.join(' '));
	word = replies[i].innerText;
	words = word.split(' ');
	/*for (i in words) {
		if (words[i].indexOf('http://') == 0) {
        words[i] = '<a href="' + words[i] + '">' + words[i] + '</a>';
    	}
	} 
	console.log(words.length);
	for (var j = 0; j < words.length; j++) {
		console.log("what on earth");
		if (words[j].indexOf('http://') == 0) {
			words[j] = '<a href="' + words[j] + '">' + words[j] + '</a>';
			console.log("new word is "+words[j]);
		}
	}
	word = words.join(' ');
	console.log("new word is "+word);
	replies[i].innerText = word;
}
replies[1].innerText = "reee";
var replies = $('.reply');
var replies = replies[0];
var $replies = $(this).find("#desc");
var $words = $('.description').text().split(' ');
for (i in $words) {
    if ($words[i].indexOf('http://') == 0) {
        $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
    }
}


$('.description').html($words.join(' '));
*/