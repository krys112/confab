// Detects whether a post has a hyperlink or quote to previous post, creates appropriate anchor if detected
$('.desc').each(function() {
	var $origin = $(this).text();
	var $words = $(this).text().split(/(\s+)/g);
	for (i in $words) {
    	if ($words[i].indexOf('http') == 0) {
        	$words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
    	} else if ($words[i].indexOf('>>') == 0) {
    		if($(".show").length) {
    			var thread = $(this).attr('id');
    			$words[i] = '<a class="link" href="/threads/' + thread + '/#p' + $words[i].substring(2) + '">' + $words[i] + '</a>';
    		} else {
    			$words[i] = '<a class="link" href="#p' + $words[i].substring(2) + '">' + $words[i] + '</a>';
    		}
    	}
	}
	$(this).html($words.join(''));
});

$(document).ready(function() {
	$(".postNo").click(function() {
		var desc = $('#desc');
		$('#qreply').removeClass('hide');
		if($('#overlay').attr('class') == 'hide') {
			desc.val(desc.val() + '>>' + $(this).text() + '\n');
			$('#desc').focus();
		};
	});
	$("#reply_button").click(function() {
		$('#qreply').removeClass('hide');
		if($('#overlay').attr('class') == 'hide') {
			$('#desc').focus();
		};
	})
	$("#creply").click(function() {
		$('#qreply').addClass('hide');
		$('#desc').val("");
	});
	$(".link").click(function() {
		var href = $(this).attr('href');
		var href = href.substring(1);
		if(!$('#'+href).length) {
			$(this).addClass('strike');
		};
	});
	$(".expand").click(function() {
		$(this).parent().toggleClass('visible');
		$(this).toggleClass('fa-plus-square');
		$(this).toggleClass('fa-minus-square');
		if($(this).hasClass('fa-plus-square')) {
			var reply = $(this).next().attr('data-replynum');
			$(this).next().text(reply +' replies omitted');
		} else {
			$(this).next().text('Showing all replies');
		}
	});

	var num = $(".reply").length;
	if(num > 4) {
		$('#overlay').removeClass('hide');
	}

	$(".author").click(function() {
		$('#overlay').removeClass('hide');
		console.log("this works");
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