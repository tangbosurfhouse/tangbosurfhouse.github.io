/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Set to true to restore the homepage's blue loading intro.
			var enableHomepageLoadingEffect = false;

		// Keep the existing loading behavior on other pages.
			if (enableHomepageLoadingEffect || !$body.hasClass('landing')) {
				$body.addClass('is-loading');

				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});
			}

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Crew member carousel (photo + name + role swap together).
			$('.crew-spotlight').each(function() {
				var $spotlight = $(this),
					$img = $spotlight.find('.crew-photo-frame img'),
					$name = $spotlight.find('.crew-name'),
					$role = $spotlight.find('.crew-role'),
					$dots = $spotlight.find('.crew-dots'),
					team = [];

				try {
					team = JSON.parse($spotlight.attr('data-team') || '[]');
				} catch (e) {
					team = [];
				}

				var index = 0;

				function render() {
					var member = team[index];
					if (!member) return;
					$img.attr('src', member.image).attr('alt', member.name || '');
					$name.text(member.name || '');
					$role.text(member.role || '');
					$dots.find('span').removeClass('active').eq(index).addClass('active');
				}

				if (team.length === 0) return;

				if (team.length <= 1) {
					$spotlight.find('.crew-nav').hide();
				} else {
					team.forEach(function(_, i) {
						$('<span></span>')
							.toggleClass('active', i === 0)
							.on('click', function() {
								index = i;
								render();
							})
							.appendTo($dots);
					});

					$spotlight.find('.crew-nav.prev').on('click', function(event) {
						event.preventDefault();
						index = (index - 1 + team.length) % team.length;
						render();
					});

					$spotlight.find('.crew-nav.next').on('click', function(event) {
						event.preventDefault();
						index = (index + 1) % team.length;
						render();
					});
				}

				render();
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Video Banner Controls
			var $bgVideo = $('#bg-video');
			if ($bgVideo.length > 0) {
				var videoElem = $bgVideo[0];
				
				$('#play-pause-btn').on('click', function(e) {
					e.preventDefault();
					if (videoElem.paused) {
						videoElem.play();
						$(this).html('<i class="fa fa-pause"></i>');
					} else {
						videoElem.pause();
						$(this).html('<i class="fa fa-play"></i>');
					}
				});

				$('#mute-unmute-btn').on('click', function(e) {
					e.preventDefault();
					if (videoElem.muted) {
						videoElem.muted = false;
						$(this).html('<i class="fa fa-volume-up"></i>');
					} else {
						videoElem.muted = true;
						$(this).html('<i class="fa fa-volume-off"></i>');
					}
				});
				
				$('#watch-story-btn').on('click', function(e) {
					e.preventDefault();
					videoElem.currentTime = 0;
					videoElem.muted = false;
					$('#mute-unmute-btn').html('<i class="fa fa-volume-up"></i>');
					if (videoElem.paused) {
						videoElem.play();
						$('#play-pause-btn').html('<i class="fa fa-pause"></i>');
					}
				});
			}

	});

})(jQuery);
