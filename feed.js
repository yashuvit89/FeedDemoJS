//Create 
var feedModule = (function($){
	
	var counter = 0;
	var feeds = [];
	var currentPage = 0;
	var maxPages = 0;
	var numFeed = 3;
	var currentPageFeeds = [];
	var requestId = 1;
	var instance;

	//initialize feed to defaults
	var init = function(){
		currentPage = 1;
		getJsonFeed(1); //default first feed
	};

	//ajax call to get Json
	var getJsonFeed = function(id){
		requestId = id;
		$.ajax({
			url:'resources/feed'+requestId+'.json',
			type : 'GET',
			dataType : 'json'
				})
			.done(function(data){
				feeds = data.feed.item;
				maxPages = Math.ceil(feeds.length/numFeed);
				currentPage = 1;
				displayFeed();
			});
	};

	var nextFeed = function(){
		if(currentPage < maxPages){
			currentPage++;
		}
	};

	var prevFeed = function(){
		if(currentPage > 1){
			currentPage--;
		}
	};

	var feedArray = function(){
		var beg_ind = (currentPage-1)*numFeed;
		var end_ind = beg_ind + numFeed;
		currentPageFeeds = feeds.slice(beg_ind,end_ind)
	};

	var displayFeed = function(){
		feedArray();
		$('#feedList').empty();
		$.each(currentPageFeeds,function(index){
			$('#feedList').append('<li> <div class="heading"> <h3>'+currentPageFeeds[index].heading+'</h3></div> <div class="content">'+ currentPageFeeds[index].content+'</div> </li>');
		});	
		$('#pageNumber').html(currentPage +"/"+maxPages);
	};

	//public methods to access
	return {
		/*init : init,*/
		getJsonFeed : getJsonFeed,
		next : nextFeed,
		prev : prevFeed,
		display : displayFeed,
		getInstance : function(){
			if(!instance){
				instance = init();
			}
		}
	}
})(jQuery);

//Document ready
$(function(){
	//Initialize Feed
	feedModule.getInstance();

	/* Jquery Handling*/
	$('#prev').click(function(){
		feedModule.prev();
		feedModule.display();
	});

	$('#next').click(function(){
		feedModule.next();
		feedModule.display();
	});

	$('.feedLink').click(function(){
		var feedId = $(this).prop('id');
		feedModule.getJsonFeed(feedId.charAt(4));
	})

});