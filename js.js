

	$(document).ready(function() {
		
		let list = localStorage.getItem("data") || [];
		list = JSON.parse(list);
		$('.list').html(render(list));
	});
	
	$('#button').on('click',  function(event) {
		event.preventDefault();
		const q= $('#input').val();
		const api= 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+q+'&type=video&key=AIzaSyAQ-4v-XCi_IJnNhU68JNQKczpgVHSRI7Q&maxResults=10';
		$.ajax({
			url: api,
			type: 'GET',
			data: {},
		})
		.done(function(data) {
			localStorage.setItem("data",JSON.stringify(data.items));
			
			$('.list').html(render(data.items));
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
	function render(data) {
		let html='';
		data.forEach( function(e, i) {
			html+='<div class="col-12 mb-2"><div class="row"><div class="col-6"><img class="img-fluid" src="'+e.snippet.thumbnails.high.url+'" alt=""></div><div class="col-6"><h4>'+e.snippet.title+'</h4><h6>'+e.snippet.channelTitle+'</h6><div class="d-flex"><button type="button" class="view btn btn-primary btn-custom" data-toggle="modal" data-target=".bd-example-modal-lg" data-id="'+e.id.videoId+'">Xem</button><button type="button" class="down btn btn-success btn-custom" data-toggle="modal" data-target=".bd-example-modal-lg1" data-id="'+e.id.videoId+'">Tải <i class="fas fa-cloud-download-alt"></i></button></div></div></div></div>';
		});
		return html;
	}
	$('body').on('click','.view', function(event) {
		var id = $(this).data('id');
		$('#ytb').attr('src', 'https://www.youtube.com/embed/'+id+'');
	});
	$('body').on('click','.down', function(event) {
		var id = $(this).data('id');
		$('#api').attr('src', 'https://www.yt-download.org/api/button/mp3/'+id+'');
	});
	function getURL() {
		$('.fb-comments').attr('data-href', window.location.hostname);
	}
	getURL();