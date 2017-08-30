(function($) {

	/* ----- Function to prevent Default Events ----- */
	function pde(e){
		if(e.preventDefault)
			e.preventDefault();
		else
			e.returnValue = false;
	}

	/* ----- Variables and user agent check ----- */
	isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);


	
	$(document).ready(function(){

		if (isMobile) { $('html').addClass('is-mobile') };


		/* ----- Inizialize the Tooltips ----- */
		 $('[data-toggle="tooltip"]').tooltip();
		 $('[data-toggle="popover"]').popover();


		/* ----- Initialize Parallax effect ----- */
		parallaxed('.parallax');


		/* ----- Side menu ----- */
		var sideMenu = new $.slidebars();


		$('.menu-toggle').on('click', function(){
			var btn = $(this);
			setTimeout(function(){
				if ( sideMenu.slidebars.active('left') ) {
					btn.addClass('menu-open');
				} else {
					btn.removeClass('menu-open');
				}
			}, 500);
		});



		/* ----- Show "Back to Botom" button ----- */
		var showToTop = $('body').waypoint(function(direction) {
			if (direction === 'down') {
				$('.upArrow').addClass('upArrow-show');
			} else {
				$('.upArrow').removeClass('upArrow-show');
			}
		}, {
			offset: '-600px'
		});

		// Scroll on Top
		$('.upArrow').click(function(e) {
			$('html, body').animate({scrollTop: '0'}, 1200, 'easeInOutCubic');
			pde(e);
		});


		/* ----- Fire the main slider script ----- */
		$(".head-slider").on({
			init: function(event, slick){
				changeBg(event, slick);
				addImages(event, slick);
			}
		});

		var headerSlider = $(".head-slider").slick({
			arrows: true,
			draggable: true,
			fade: false,
			easing: 'easeOutExpo',
			slide: 'div.slide',
			slidesToShow: 1,
		});

		function changeBg(event, slick, currentSlide, nextSlide) {

			currentSlide = currentSlide || '';
			nextSlide = nextSlide || 0;

			var color =  $(slick.$slides.get(nextSlide)).data('bg');
			var opacity = $(slick.$slides.get(nextSlide)).data('bg-opacity');
			var header =  $(slick.$slides.get(nextSlide)).data('header-color');
			$('.head-section .overlay').css({background: color, opacity: opacity});
			if ( !$('.head-bar').hasClass('matte') ) {
				$('.head-bar').removeClass('light dark').addClass(header);
				$('meta[name="theme-color"]').attr('content', color);
			}
			
		}

		function addImages(event, slick) {
			var image = '';
			for (var i = 0; i < slick.$slides.length; i++) {
				image = $(slick.$slides.get(i)).data('image');
				if (image) {
					$(slick.$slides.get(i)).find('.slide-content').css({backgroundImage: 'url('+image+')'});
				}
			}
		}

		headerSlider.on({
			beforeChange: function(event, slick, currentSlide, nextSlide){
				changeBg(event, slick, currentSlide, nextSlide);
			}
		});



		/* ----- Fire the carousel script ----- */
		var imageCarousel = $(".carousel").slick({
			arrows: true,
			draggable: true,
			fade: false,
			speed: 800,
			easing: 'easeOutExpo',
			slide: 'li',
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});


		/* ----- Testimonials slider script ----- */
		var updatePhoto = function(slide){
			var image =  $(slide).data('image');
			var photoPath = 'url(' + image.toString() + ')';
			$('.photo-holder').animate({opacity: 0}, function(){
				$(this).css({backgroundImage: photoPath});
				$(this).animate({opacity: 1});
			});
		}

		$(".testimonials").on('init', function(event, slick){
			var slide = slick.$slides.get(0);
			updatePhoto(slide);
		});

		var testimonialsSlider = $(".testimonials").slick({
			arrows: true,
			draggable: true,
			fade: false,
			easing: 'easeOutExpo',
			slide: 'li',
			slidesToShow: 1,
			adaptiveHeight: true,
			speed: 800
		});

		testimonialsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var slide = slick.$slides.get(nextSlide);
			updatePhoto(slide);
		});



		/* ----- Side menu ----- */
		var sideMenu = new $.slidebars();



		/* ----- Portfolio isotope ----- */
		$('.portfolio-items').imagesLoaded( function(){
			$('.portfolio-items').isotope({
				itemSelector: '.item',
				transitionDuration: '0.8s',
				layoutMode: 'fitRows',
				fitRows: {
					gutter: 20
				}
			});
		});

		$('.filter-list li a').on("click", function(e) {

			var $this = $(this),
				filter = $this.attr("data-id");

			$this.closest(".filter-list").find("li.current").removeClass("current");
			$this.parent('li').addClass("current");
			$this.closest('.portfolio').find('.portfolio-items').isotope({ filter: '.' + filter });

			pde(e);
		});



		/* ----- Check if input is filled ----- */
		$('.cr-input input, .cr-input textarea').each(function(){
			$(this).on('blur', function(){
				if (!$(this).val() == '') {
					$(this).parent('.cr-input').addClass('cr-filled');
					$(this).siblings('label').removeAttr('style');
				} else {
					$(this).parent('.cr-input').removeClass('cr-filled');
				};
			});
		});



		/* ----- PrettyPhoto ----- */
		$("a[rel^='prettyPhoto']").prettyPhoto({
			theme: 'picseel_lightbox',
			deeplinking: false,
			social_tools: false,
			show_title: false
		});

		

		/* ----- Nice scroll to Sections ----- */
		$('.navigation li a').click(function(evt){
			var place = $(this).attr('href');

			if (place == '#welcome') {
				var off = 0;
			} else {
				var off = $(place).offset().top - 70;
			};
			$('html, body').animate({
				scrollTop: off
			}, 1600, 'easeInOutExpo');
			pde(evt);
		});

		$('.side-menu a').click(function(evt){
			var place = $(this).attr('href');

			if (place == '#welcome') {
				var off = 0;
			} else {
				var off = $(place).offset().top - 70;
			};

			sideMenu.slidebars.close();
			$('.menu-switch').removeClass('menu-open');

			$('html, body').animate({
				scrollTop: off
			}, 1600, 'easeInOutExpo');

			pde(evt);
		});

		

		/* ---- Entrance Animations ----- */
		$('.animated-entrance').each(function(){
			if ($(this).hasClass('portfolio')) { // Special script for Portfolio entrance animations
				var el = $(this);
				el.removeAttr('style').css('opacity', '1');
				el.find('.portfolio-item').addClass('animated-entrance');
				el.waypoint(function(){
					var animationEffect = el.data('animation');
					var delay = 100;
					el.find('.portfolio-item').each(function(index){
						$(this).delay(delay).queue(function() {
							$(this).addClass('animated '+animationEffect);
							$(this).css({opacity: '1'});
							$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
								$(this).removeClass('animated-entrance animated '+animationEffect).css({opacity: '1'});
							});
						});
						delay += 150;
					});
				}, {offset: '80%'});
			} else {
				if ($(this).siblings('.animated-entrance').length) { // Special script for animationg multiple elements inside the same parent
					var el = $(this);
					var elParent = el.parent();
					el.removeAttr('style');
					elParent.waypoint(function(direction){
						var delay = 100;
						elParent.children('.animated-entrance').each(function(){
							var animationEffect = $(this).data('animation');
							$(this).delay(delay).queue(function() {
								$(this).addClass('animated '+animationEffect);
								$(this).css({opacity: '1'});
								$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$(this).removeClass('animated-entrance animated '+animationEffect).css({opacity: '1'});
								});
							});
							delay += 250;
						});
					}, {offset: '80%'});
				} else { // Script for animated entrance of single element
					var el = $(this);
					el.waypoint(function(){
						var animEffect = el.data('animation');
						el.addClass('animated '+animEffect);
						el.css({opacity: '1'});
						el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							el.removeClass('animated-entrance animated '+animEffect).css({opacity: '1'});
						});
					}, {offset: '80%'});
				}
			};
		});
		
	});



	/* ----- Parallax function ----- */

	function parallaxed(obj) {
		$(window).on("load debouncedresize scroll",function() {
			$(obj).each(function(){
				var windowHeight = $(window).height();
				var windowWidth = $(window).width();
				var scrollPos = $(window).scrollTop();
				var objectPos = $(this).offset().top;
				var position = objectPos - scrollPos;

				if (!isMobile && windowWidth >= 768) {
					$(this).css({
						backgroundPosition: '50% ' + parseInt(position*0.2) + 'px',
						backgroundAttachment: 'fixed'
					});
				} else {
					$(this).css({
						backgroundPosition: 'center center',
						backgroundSize: 'cover',
						backgroundAttachment: 'scroll'
					});
				}
			});
		});
	}

	
	/* ----- Center the Bootstrap modal ----- */

	// function centerModals($element) {
	// 	var $modals;
	// 	if ($element.length) {
	// 		$modals = $element;
	// 	} else {
	// 		$modals = $('.modal-vcenter:visible');
	// 	}
	// 	$modals.each( function(i) {
	// 		var $clone = $(this).clone().css('display', 'block').appendTo('body');
	// 		var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	// 		top = top > 0 ? top : 0;
	// 		$clone.remove();
	// 		$(this).find('.modal-content').css("margin-top", top);
	// 	});
	// }

	/* ----- Contact form ----- */
	$('#contact_form #submit_btn').click(function(e){
			pde(e);

			$('#submit_btn').text('').append('<i class="fa fa-spinner fa-spin"></i>');

			//get input field values
			var name       = $('#contact_form input[name=name]').val(); 
			var email      = $('#contact_form input[name=email]').val();
			var message    = $('#contact_form textarea[name=message]').val();

			//simple validation at client's end
			var proceed = true;
			if(name == ""){ 
				$('#contact_form input[name=name]').css('background-color','#FFDBD5');
				$('#submit_btn').remove('i').text('Send');
				proceed = false;
			} else {
				$('#contact_form input[name=name]').removeAttr('style');
			}

			if(email == ""){ 
				$('input[name=email]').css('background-color','#FFDBD5');
				$('#submit_btn').remove('i').text('Send');
				proceed = false;
			} else {
				$('#contact_form input[name=email]').removeAttr('style');
			}
			
			if(message == "") {  
				$('textarea[name=message]').css('background-color','#FFDBD5');
				$('#submit_btn').remove('i').text('Send');
				proceed = false;
			} else {
				$('#contact_form textarea[name=message]').removeAttr('style');
			}

			if (proceed == true) {
				$.ajax({
					cache: false,
					type:$('#contact_form').attr('method'),
					url: $('#contact_form').attr('action'),
					data: $('#contact_form').serialize(),
					dataType: 'json',
					success: function(response){
						console.log(response.type);
						if(response.type == 'error') {
							output = '<div class="error">'+response.text+'</div>';
							$('#submit_btn').remove('i').text('Submit');
						} else {
							output = '<div class="success">'+response.text+'</div>';

							$('#submit_btn').remove('i').text('Message sent!');
							$('#submit_btn').attr("disabled", true);

							//reset values in all input fields
							$('#contact_form input').val(''); 
							$('#contact_form textarea').val('');
						}
						$("#result").hide().html(output).slideDown();
					},
					error: function(err){
						console.log(err.responseText);
					}
				});
			}
		});
		
		//reset previously set border colors and hide all message on .keyup()
		$("#contact_form input, #contact_form textarea").keyup(function() { 
			$("#contact_form input, #contact_form textarea").css('background-color',''); 
			$("#result").slideUp();
		});


/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

	var $event = $.event,
		$special,
		resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function() {
			$( this ).on( "resize", $special.handler );
		},
		teardown: function() {
			$( this ).off( "resize", $special.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function() {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply( context, args );
				};

			if ( resizeTimeout ) {
				clearTimeout( resizeTimeout );
			}

			execAsap ?
				dispatch() :
				resizeTimeout = setTimeout( dispatch, $special.threshold );
		},
		threshold: 150
	};
});

})(jQuery);