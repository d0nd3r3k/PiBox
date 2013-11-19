Zepto(function($){
  
  //Adjust Zoom Ratio based on screen's height and width
	(function(){
		var w = screen.width,
		h = screen.height,
		bw = $(window).width(),
		bh = $(window).height(),
		wRatio = bw/w,
		hRatio = bh/h,
		ratio = (wRatio + hRatio) / 2;
		$('body').css('zoom', ratio);
	})();

	//Connect client via websockets
	var socket = io.connect()
	socket.on('connect', function () {  
		console.log("ready")
	});


	//Remote action
	//Move down
	document.onkeydown = function(e) {
	e = e || window.event;
	var selected = $('.selected');
	var open = $('.open');
	switch(e.which || e.keyCode) {

	        case 38: // up
	        	if(selected.parent().prev().length > 0){
		        	selected.removeClass("selected")
		        	open.removeClass('open')
		        	selected.parent().prev().find('i').addClass('selected')
		        	open.prev().addClass('open')
				}
				else {
					selected.removeClass("selected")
					open.removeClass('open')
					$(".ba-2:last-child").find('i').addClass('selected')
					$(".hr9-b:last-child").addClass('open')
				}
	        break;

	        case 40: // down
	        	if(selected.parent().next().length > 0){
		        	selected.removeClass('selected')
		        	open.removeClass('open')
		        	selected.parent().next().find('i').addClass('selected')
		        	open.next().addClass('open')
				}
				else {
					selected.removeClass("selected")
					open.removeClass('open')
					$(".ba-2:first-child").find('i').addClass('selected')
					$(".hr9-b:first-child").addClass('open')
				}
	        break;

	        //enter
	        case 13:

	        break;

	    	default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	}


})
