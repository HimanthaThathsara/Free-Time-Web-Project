jQuery(function ($) {

	/*--------------------------------------------------
	Function Scroll Effects
	---------------------------------------------------*/


	window.ScrollEffects = function () {

		gsap.defaults({ overwrite: "auto" });
		gsap.registerPlugin(ScrollTrigger, Flip);
		gsap.config({ nullTargetWarn: false });

		const sliders = [
			'.showcase-gallery',
			'.showcase-lists'
		];

		const body = $('body');
		let hasSlider = false;

		sliders.forEach(slider => {
			if ($(slider).length > 0) {
				hasSlider = true;
				return false; // Exit the loop early if a slider is found
			}
		});

		if (hasSlider) {
			body.addClass('has-slider');
		} else {
			body.removeClass('has-slider');
		}

		setTimeout(function () {
			var threeapp = document.getElementById("app");
			threeapp.className += "active";
			$("body").append(threeapp)
		}, 1500);

		if ($('.highlights-gallery').length > 0) {
			setTimeout(function () {
				var threeSlider = document.getElementById("canvas-slider");
				threeSlider.className += " active";
				$("body").append(threeSlider)
			}, 1500);
		}


		if (!$("body").hasClass("project-nav-text")) {
			if ($('#project-nav').length > 0) {
				$('#main-content').addClass('solid-color');
				$('#main-page-content').addClass('project-page');
			}
		}

		if ($('.portfolio').length > 0) {
			$('#main-content').addClass('portfolio-page');
		}




		let enableSmoothScrollMobile = true;
		if (isMobile()) {

			if (!enableSmoothScrollMobile) {

				document.body.classList.remove("smooth-scroll");
			}
		}

		if (document.body.classList.contains("smooth-scroll")) {

			const ScrollArea = document.querySelector('#content-scroll');
			class EdgeEasingPlugin extends Scrollbar.ScrollbarPlugin {
				constructor() {
					super(...arguments);
					this._remainMomentum = {
						x: 0,
						y: 0,
					};
				}
				transformDelta(delta) {
					const { limit, offset, } = this.scrollbar;
					const x = this._remainMomentum.x + delta.x;
					const y = this._remainMomentum.y + delta.y;
					// clamps momentum within [-offset, limit - offset]
					this.scrollbar.setMomentum(Math.max(-offset.x, Math.min(x, limit.x - offset.x)), Math.max(-offset.y, Math.min(y, limit.y - offset.y)));
					return { x: 0, y: 0 };
				}
				onRender(remainMomentum) {
					Object.assign(this._remainMomentum, remainMomentum);
				}
			}

			EdgeEasingPlugin.pluginName = 'edgeEasing';
			Scrollbar.use(EdgeEasingPlugin);

			// Config


			if (!isMobile()) {

				var ScrollbarOptions = {
					damping: 0.1,
					renderByPixel: true,
					continuousScrolling: true,
					syncCallbacks: true,
				};
			}

			if (isMobile()) {

				var ScrollbarOptions = {
					damping: 0.2,
					renderByPixel: true,
					continuousScrolling: true,
					syncCallbacks: true,
				};
			}

			// Initialise
			var scrollbar = Scrollbar.init(ScrollArea, /*ScrollbarOptions*/);


			ScrollTrigger.scrollerProxy("#content-scroll", {
				scrollTop(value) {
					if (arguments.length) { scrollbar.scrollTop = value; }
					return scrollbar.scrollTop;
				}
			});

			scrollbar.addListener(ScrollTrigger.update);
			ScrollTrigger.defaults({ scroller: ScrollArea });


		}// End Smooth Scroll


		// Anchor Link
		$("a[href*='#']").on('click', function (e) {
			if (e.currentTarget && e.currentTarget.hash) {
				e.preventDefault();
				var hash = e.currentTarget.hash.substring(1);

				//Puts hash in variable, and removes the # character
				let id = document.getElementById(hash);

				if ($("body").hasClass("smooth-scroll")) {
					scrollbar.scrollIntoView(id, {
						offsetTop: -scrollbar.containerEl.scrollTop,
					});
				} else {
					id.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

				}
			}

		});


		const goHereOnLoad = document.querySelector('#go-here-onload');
		if (goHereOnLoad) {
			const id = document.querySelector('#' + goHereOnLoad.id);

			if (id) {

				if (document.body.classList.contains("smooth-scroll")) {
					gsap.to(scrollbar, {
						duration: 0.7,
						delay: 1,
						scrollTop: id.getBoundingClientRect().top + scrollbar.scrollTop,
						ease: Power2.easeInOut
					});
				} else {

					gsap.to(window, {
						duration: 0.7,
						scrollTo: {
							y: id,
						},
						ease: "power2.inOut"
					});
				}
			}
		}


		//Create Pixel Wrappers

		function wrapPixels() {
			var pixelsCovers = document.querySelectorAll('.pixels-cover, .hero-pixels-cover');

			pixelsCovers.forEach(function (pixelsCover) {
				var pixelsWrapper = document.createElement('div');
				pixelsWrapper.className = 'pixels-wrapper';
				pixelsCover.appendChild(pixelsWrapper);
			});
		}

		function calculatePixels() {
			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;
			var pixelsPerRow = 0;

			// Define breakpoints and corresponding pixels per row
			if (windowWidth >= 1920) {
				pixelsPerRow = 20;
			} else if (windowWidth >= 1600) {
				pixelsPerRow = 18;
			} else if (windowWidth >= 1280) {
				pixelsPerRow = 16;
			} else if (windowWidth >= 1024) {
				pixelsPerRow = 14;
			} else if (windowWidth >= 768) {
				pixelsPerRow = 12;
			} else {
				pixelsPerRow = 10;
			}

			// Assuming pixels are square, calculate pixel size in pixels
			var pixelSize = windowWidth / pixelsPerRow;

			var pixelsWrappers = document.querySelectorAll('.pixels-wrapper');

			var pixelsCovers = document.querySelectorAll('.pixels-cover');

			var pixelsCovers = document.querySelectorAll('.pixels-cover');

			pixelsCovers.forEach(function (pixelsCover) {
				// Obținem părintele imediat al fiecărui .pixels-cover
				var parent = pixelsCover.closest('.content-row'); // Căutăm părintele cel mai apropiat cu clasa .content-row

				if (parent) {
					// Adăugăm o clasă părintelui (opțional)
					parent.classList.add('pixels-parent');

					// Obținem atributul 'data-bgcolor' al părintelui
					var parentData = parent.getAttribute('data-bgcolor');
				}
			});

			// Stabilim bgColor global doar pentru un element relevant
			var pixelsWrappers = document.querySelectorAll('.pixels-wrapper');
			var bgColor;

			// Verificăm dacă există un părinte .content-row pentru prima instanță a .pixels-wrapper
			var firstWrapper = document.querySelector('.pixels-wrapper');
			if (firstWrapper) {
				var parentRow = firstWrapper.closest('.content-row');
				if (parentRow) {
					bgColor = parentRow.getAttribute('data-bgcolor');
				} else {
					bgColor = document.getElementById('clapat-page-content').getAttribute('data-bgcolor');
				}
			} else {
				bgColor = document.getElementById('clapat-page-content').getAttribute('data-bgcolor');
			}

			pixelsWrappers.forEach(function (wrapper) {
				// Clear previous pixels if any
				wrapper.innerHTML = '';

				// Calculate the size of the parent .pixels-cover element
				var parentWidth = wrapper.parentElement.offsetWidth;
				var parentHeight = wrapper.parentElement.offsetHeight;

				// Set the width and height of the pixels-wrapper to match the parent element
				// wrapper.style.width = parentWidth + 'px';
				//wrapper.style.height = parentHeight + 'px';

				// Calculate the number of pixels needed to cover the parent element
				var cols = Math.ceil(parentWidth / pixelSize);
				var rows = Math.ceil(parentHeight / pixelSize);
				rows += 1; // Increment rows by 1

				// Calculate pixel size in percentage relative to wrapper width
				var pixelSizePercent = (100 / cols) + '%';

				// Create and append the pixel elements
				for (var i = 0; i < rows * cols; i++) {
					var pixel = document.createElement('div');
					pixel.className = 'pixel';
					pixel.style.width = pixelSizePercent;
					pixel.style.backgroundColor = bgColor;
					wrapper.appendChild(pixel);
				}
			});
		}

		// Call functions
		// Verificăm dacă body nu are clasele 'load-project-thumbs' și 'load-page'
		if (!document.body.classList.contains('load-project-thumb') && !document.body.classList.contains('load-project-thumb-from-slider')) {
			wrapPixels();
			calculatePixels();
		}


		// Recalculate on window resize
		window.addEventListener('resize', calculatePixels);


		gsap.utils.toArray('.pixels-cover1').forEach((pixelWrapper, index) => {
			const pixelAnimation = pixelWrapper.querySelectorAll(".pixel");

			gsap.to(pixelAnimation, {
				scrollTrigger: {
					trigger: pixelWrapper,
					start: "top 90%",
					onEnter: function () {
						pixelWrapper.classList.add('animated');
					},
				},
				duration: 0.2,
				opacity: 0,
				delay: function () {
					// Generăm un delay random între 0 și 0.5 secunde
					return gsap.utils.random(0, 0.4);
				},
				ease: Power4.easeOut,
				onComplete: function () {
					pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
						pixels.remove();
					});
				}
			});
		});



		if (isMobile()) {

			$(".icon-wrap").removeClass("parallax-wrap");

			function setViewPortHeight() {
				var winHeight = $(window).height();
				gsap.set(".smooth-scroll main, .has-parallax, .clapat-slider-wrapper:not(.content-slider), .showcase-lists .clapat-sync-slider, .slider-fixed-content", { height: winHeight });
			}

			setViewPortHeight();

			$(window).on('resize', setViewPortHeight);

		}


		// Hero AutoScroll On Page Load
		let autoScroll = null;

		if ($('body').hasClass("load-project-thumb") || $('body').hasClass("load-project-thumb-with-title") || $('body').hasClass("load-project-thumb-from-slider")) {
			const delayTime = $('body').hasClass("load-project-thumb-with-title") ? 0.6 : 1.8;

			if ($('#hero.has-image').hasClass('autoscroll')) {
				if ($("body").hasClass("smooth-scroll")) {
					scrollbar.scrollTop = 0; // Reset the scrollbar position to 0
					autoScroll = gsap.to(scrollbar, { duration: 0.7, scrollTop: 80, overwrite: true, delay: delayTime, ease: Power2.easeInOut });
				} else {
					autoScroll = gsap.to(window, { duration: 0.7, scrollTo: 80, overwrite: true, delay: delayTime, ease: Power2.easeInOut });
				}
			}
		}

		// Slider Center on click
		$('.autocenter').on('click', function () {
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);
			if ($("body").hasClass("smooth-scroll")) {
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height / 2);
				autoScroll = gsap.to(scrollbar, { duration: 0.8, scrollTop: scrollOffset + elementHeight / 2, ease: Power4.easeInOut });
			}
			else {
				$("html, body").animate({ scrollTop: scrollIt }, 350);
			}
		});

		// Add an event listener for the mousewheel event
		window.addEventListener('wheel', function (event) {
			if (autoScroll !== null) {
				// Kill the scroll trigger animation
				autoScroll.kill();
				autoScroll = null;
			}
		});



		if ($('body').hasClass("swap-logo")) {

			var imgLogoWhite = document.querySelector('.white-logo');
			var originalSrcWhite = 'images/logo-white.png';
			var updatedSrcWhite = 'images/logo-white-symbol.png';

			var imgLogoBlack = document.querySelector('.black-logo');
			var originalSrcBlack = 'images/logo.png';
			var updatedSrcBlack = 'images/logo-symbol.png';

			// Create a scroll trigger

			ScrollTrigger.create({
				trigger: '.clapat-header', // Set the trigger element
				start: 'top 120px',
				onEnter: function () {
					//Restore the original image source			
					imgLogoWhite.src = originalSrcWhite;
					imgLogoBlack.src = originalSrcBlack;
					gsap.to($("#clapat-logo"), { duration: 0.2, opacity: 1 });
				},
				onEnterBack: function () {
					// Restore the original image source
					gsap.to($("#clapat-logo"), {
						duration: 0.2, opacity: 0, onComplete: function () {
							imgLogoWhite.src = originalSrcWhite;
							imgLogoBlack.src = originalSrcBlack;
							gsap.to($("#clapat-logo"), { duration: 0.2, opacity: 1 });
						}
					});

					$('.clapat-header').removeClass('swapped-logo');
				},
				onLeave: function () {
					// Change the image source
					gsap.to($("#clapat-logo"), {
						duration: 0.2, opacity: 0, onComplete: function () {
							imgLogoWhite.src = updatedSrcWhite;
							imgLogoBlack.src = updatedSrcBlack;
							gsap.to($("#clapat-logo"), { duration: 0.2, opacity: 1 });
						}
					});

					$('.clapat-header').addClass('swapped-logo');
				},
				onLeaveBack: function () {
					// Change the image source
					gsap.to($("#clapat-logo"), {
						duration: 0.2, opacity: 0, onComplete: function () {
							imgLogoWhite.src = updatedSrcWhite;
							imgLogoBlack.src = updatedSrcBlack;
							gsap.to($("#clapat-logo"), { duration: 0.2, opacity: 1 });
						}
					});

					$('.clapat-header').addClass('swapped-logo');
				}
			});

			$('a.ajax-link, a.slide-link, a.next-ajax-link-page').on('click', function () {
				// Restore the original image source when you leave the page
				if ($(".clapat-header").hasClass("swapped-logo")) {

					gsap.to($("#clapat-logo"), {
						duration: 0.2, opacity: 0, onComplete: function () {
							imgLogoWhite.src = originalSrcWhite;
							imgLogoBlack.src = originalSrcBlack;
							gsap.to($("#clapat-logo"), { duration: 0.2, opacity: 1 });
						}
					});

				}
			});

		}


		// Back To Top
		$('#backtotop').on('click', function () {
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, { duration: 1.5, scrollTop: 0, delay: 0.1, ease: Power4.easeInOut });
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', delay: 0.15 });
			} else {
				$("html,body").animate({ scrollTop: 0 }, 800);
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', delay: 0.15 });
			}
		});


		//Scroll Down
		$('.scroll-down, .hero-arrow').on('click', function () {
			$(this).addClass("no-events");
			setTimeout(() => {
				$(this).removeClass("no-events");
			}, 1000);
			var heroheight = $("#hero").height();
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, { duration: 1.5, scrollTop: heroheight, ease: Power4.easeInOut });
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', delay: 0.15 });
			} else {
				$("html,body").animate({ scrollTop: heroheight }, 800);
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', delay: 0.15 });
			}
		});

		//Filters
		$('.show-filters').on('click', function () {
			var heroheight = $("#hero").height() * 0.8;
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, { duration: 1, scrollTop: heroheight, ease: Power4.easeInOut });
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', delay: 0.15 });
			} else {
				$("html,body").animate({ scrollTop: heroheight }, 800);
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', delay: 0.15 });
			}
		});


		// Content Row Options

		if ($(".content-row").hasClass("light-section")) {
			$(".light-section").each(function (i) {
				$(this).wrap("<div class='light-section-wrapper'><div class='light-section-container content-max-width'></div></div>");
				$("body").find(".light-section-wrapper").each(function (i) {
					$(this).css('background-color', function () {
						return $(this).children().children().data('bgcolor')
					});
				});
			});
		}

		if ($(".content-row").hasClass("dark-section")) {
			$(".dark-section").each(function (i) {
				$(this).wrap("<div class='dark-section-wrapper'><div class='dark-section-container content-max-width'></div></div>");
				$("body").find(".dark-section-wrapper").each(function (i) {
					$(this).css('background-color', function () {
						return $(this).children().children().data('bgcolor')
					});
				});
			});
		}

		$('.content-row.has-clip-path').parent().parent().addClass('clip-effects');

		var hasClipPath = gsap.utils.toArray('.has-clip-path');
		hasClipPath.forEach(function (hClipPath) {
			var clipEffects = hClipPath.closest('.clip-effects');
			var initialClipPath = window.getComputedStyle(clipEffects).clipPath;

			var clipPath = gsap.to(clipEffects, {
				clipPath: 'inset(0% 0% round 0px)',
				duration: 1,
				ease: 'power1.inOut',
			});

			var clipPathScene = ScrollTrigger.create({
				trigger: hClipPath,
				start: 'top 90%',
				end: `+=${window.innerHeight * 0.8}`,
				animation: clipPath,
				scrub: true,
			});
		});


		// Hero Section Effects
		if ($('#hero').hasClass('has-image')) {

			const heroFullCaption = document.querySelector('#hero.has-image #hero-caption.hero-full-caption');
			const heroPinCaption = document.querySelector('#hero.has-image #hero-caption.hero-pin-caption');
			const heroCaptionInner = document.querySelector("#hero.has-image #hero-caption .inner");
			const heroCaptionTitle = document.querySelector("#hero.has-image #hero-caption .hero-title");
			const heroCaptionSubTitle = document.querySelector("#hero.has-image #hero-caption .hero-subtitle");
			const heroImage = document.querySelector('#hero-image-wrapper');

			// Set Full Height Hero Elements

			function setheroImageProperties() {
				gsap.set(heroPinCaption, { height: window.innerHeight });
				gsap.set(heroFullCaption, { height: window.innerHeight });
				gsap.set(heroImage, { height: window.innerHeight });
			}

			setheroImageProperties();
			window.addEventListener('resize', setheroImageProperties);

			// Set Hero Image Effects

			var heroImageParallax = gsap.to('.parallax-scroll-image #hero-bg-image', {
				duration: 1,
				top: "20%",
				ease: Linear.easeNone,
				scrollTrigger: {
					trigger: '#hero-image-wrapper',
					start: "top top",
					end: function () {
						var heroImagenDurationEnd = $('#hero-image-wrapper').outerHeight();
						return "+=" + heroImagenDurationEnd;
					},
					scrub: true,
				}
			});

			var heroCaptionParallax = gsap.to('#hero-caption.parallax-scroll-caption .inner', {
				duration: 1,
				yPercent: 35,
				opacity: 0,
				ease: Linear.easeNone,
				scrollTrigger: {
					trigger: '#hero',
					start: "top top",
					end: () => `+=${$('#hero').outerHeight()}`,
					scrub: true,
				}
			});

			//End Hero Section Effects

		} else {

			function setHeroProperties() {
				gsap.set("#hero-caption.hero-full-caption", { height: window.innerHeight });
			}

			setHeroProperties();

			window.addEventListener('resize', setHeroProperties);


			if ($('.new-hero-title').length > 0) {

				gsap.to("#hero-caption .hero-subtitle span", {
					yPercent: -100,
					color: "transparent",
					duration: 1,
					stagger: 0.2,
					ease: "power4.inOut",
					scrollTrigger: {
						trigger: '#hero',
						start: "top -10%",
						end: () => `+=${$('#hero').outerHeight() * 0.3}`,
						scrub: true,
					},
				});

				var heroFooterParallax = gsap.to('#hero-footer', {
					duration: 1,
					opacity: 0,
					ease: Linear.easeNone,
					scrollTrigger: {
						trigger: '#hero',
						start: "top 0%",
						end: function () {
							var durationHeight = $('#hero-caption').outerHeight() * 0.3;
							return "+=" + durationHeight;
						},
						scrub: true,
					}
				});

				var heroCaptionParallax = gsap.to('#hero-caption.parallax-scroll-caption', {
					duration: 1,
					opacity: 0,
					ease: Linear.easeNone,
					scrollTrigger: {
						trigger: '#hero',
						start: "top top",
						end: () => `+=${$('#hero').outerHeight() * 0.3}`,
						scrub: true,
						pin: true
					}
				});



			} else {

				gsap.to("#hero-caption .hero-title", {
					duration: 1,
					yPercent: 60,
					opacity: 0.2,
					filter: "blur(5px)",
					ease: Linear.easeNone,
					scrollTrigger: {
						trigger: '#hero',
						start: "top 0%",
						end: () => `+=${$('#hero').outerHeight()}`,
						scrub: true,
					},
				});

				gsap.to("#hero-caption .hero-subtitle span", {
					yPercent: -30,
					color: "transparent",
					duration: 1,
					stagger: 0.05,
					ease: "power4.inOut",
					scrollTrigger: {
						trigger: '#hero',
						start: "top -5%",
						end: () => `+=${$('#hero').outerHeight() * 0.6}`,
						scrub: true,
					},
				});

			}

		}


		// New Hero Title

		if ($('.new-hero-title').length > 0) {

			$('#main-page-content').addClass('no-overflow');

			const heroTitle = document.querySelector(".hero-title");
			const currentWidth = gsap.getProperty(heroTitle, "width");
			const currentHeight = gsap.getProperty(heroTitle, "height");
			gsap.set(heroTitle, { width: currentWidth, height: currentHeight });

			// Flip Hero Title
			const heroCaption = document.querySelector('#hero #hero-caption');
			const heroCaptionInner = document.querySelector("#hero-caption .hero-title div");
			const heroPlaceholder = document.querySelector(".new-hero-title .hero-title-placeholder");
			const heroNewTitle = document.querySelector(".new-hero-title");




			const state = Flip.getState(heroCaptionInner);
			heroPlaceholder.classList.add("align-start");
			heroPlaceholder.appendChild(heroCaptionInner);

			if (!$('body').hasClass("show-loader")) {
				let preloaderTimeout = 3000;
				if (typeof window.preloaderTimeout !== 'undefined') {
					preloaderTimeout = window.preloaderTimeout;
				}

				setTimeout(function () {
					gsap.set($(".new-hero-title .hero-title-placeholder div span"), { yPercent: 50, opacity: 0 });
					gsap.to($(".new-hero-title .hero-title-placeholder div span"), { duration: 0.5, yPercent: 0, opacity: 1, stagger: 0.05, delay: 0.6, ease: Power3.easeOut });
				}, preloaderTimeout);

			} else {
				gsap.set($(".new-hero-title .hero-title-placeholder div span"), { yPercent: 50, opacity: 0 });
				gsap.to($(".new-hero-title .hero-title-placeholder div span"), { duration: 0.5, yPercent: 0, opacity: 1, stagger: 0.05, delay: 0.3, ease: Power3.easeOut });
			}

			if (heroPlaceholder) {
				const spans = heroPlaceholder.querySelectorAll('span');
				if (spans.length > 1) {
					heroPlaceholder.classList.add('multiple-spans');
				}
			}

			const flip = Flip.from(state, {
				duration: 1,
				ease: Linear.easeNone,
			});

			ScrollTrigger.create({
				trigger: heroCaption,
				pin: ".new-hero-title",
				start: "top 0%",
				end: '+=30%',
				scrub: true,
				pinSpacing: window.innerWidth > 768 ? false : true, // Valoare dinamică
			});



			gsap.utils.toArray(".new-hero-title .hero-title-placeholder div span").forEach((span) => {
				const spans = Array.from(span.parentNode.querySelectorAll("span"));
				const maxWidth = Math.max(...spans.map(s => s.offsetWidth));

				gsap.to(span, {
					scrollTrigger: {
						trigger: heroCaption,
						start: "top -30%",
						end: "+=80%",
						scrub: true,
					},
					scale: 1,
					x: () => {
						const currentWidth = span.offsetWidth;
						return -(maxWidth - currentWidth) / 2;
					},
					duration: 1,
					ease: Linear.easeNone,
				});
			});


			ScrollTrigger.create({
				trigger: heroCaption,
				start: "top -30%",
				end: '+=80%',
				scrub: true,
				animation: flip,
				onEnter: () => {
					heroPlaceholder.classList.remove("completed");
				},
				onLeaveBack: () => {
					heroPlaceholder.classList.remove("completed");
				},
				onEnterBack: () => {
					heroPlaceholder.classList.remove("completed");
				},
				onLeave: () => {
					heroPlaceholder.classList.add("completed");
				},
			});


			gsap.to(".new-hero-title > span", {
				scrollTrigger: {
					trigger: heroCaption,
					start: "bottom -10%",
					end: '+=60%',
					scrub: true,
				},
				x: 0,
				opacity: 1,
				duration: 1,
				stagger: 0.2,
				ease: "power4.out",
			});

			gsap.to(".content-timeline", {
				scrollTrigger: {
					trigger: heroCaption,
					start: "bottom 0%",
					end: '+=120%',
					scrub: true,
				},
				y: 0,
				opacity: 1,
				duration: 1,
				stagger: 0.2,
				ease: "power4.out",
			});



			ScrollTrigger.create({
				trigger: "#hero-styles",
				start: "top 100%",
				end: "1px top",
				onEnter: function () {
					$(".hero-title-placeholder").removeClass("disable");
				},
				onLeave: function () {
					$(".hero-title-placeholder").addClass("disable");
				},
				onEnterBack: function () {
					$(".hero-title-placeholder").removeClass("disable");
				},
				onLeaveBack: function () {
					$(".hero-title-placeholder").addClass("disable");
				},
			});

		}


		// Hero Interaction Images

		if ($("#hero-interaction").length) {

			let hoverTimeout;
			let changeInstance = true;

			const interactionTarget = $(".hero-title-placeholder div").length ? ".hero-title-placeholder div" : ".hero-title";

			$(interactionTarget).mouseenter(function (e) {

				gsap.to('#ball', {
					duration: 0.3,
					borderWidth: '2px',
					scale: 1.4,
					borderColor: "#fa821d",
					backgroundColor: "#fa821d"
				});
				gsap.to('#ball-loader', {
					duration: 0.2,
					borderWidth: '2px',
					top: 2,
					left: 2
				});

				$("#ball").append('<img class="eyes-icon" src="images/eyes.png" style="transform:scale(0.75);">');

				let imageIndex = 0;
				const images = [
					'<img class="eyes-icon" src="images/eyes1.png" style="transform:scale(0.75);">',
					'<img class="eyes-icon" src="images/eyes.png" style="transform:scale(0.75);">'
				];

				function switchImage() {
					const ball = $("#ball");
					ball.find('img').remove();
					ball.append(images[imageIndex]);
					imageIndex = (imageIndex + 1) % images.length;
				}

				clearTimeout(hoverTimeout);

				$("#hero-interaction").addClass("active");

				const imageInterval = setInterval(switchImage, 1000);

				$(interactionTarget).mouseleave(function () {
					clearInterval(imageInterval);
				});
			});

			$(interactionTarget).mouseleave(function () {

				hoverTimeout = setTimeout(() => {
					$("#hero-interaction").removeClass("col-normal col-reverse");
					if (changeInstance) {
						$("#hero-interaction").addClass("col-normal").removeClass("col-reverse");
					} else {
						$("#hero-interaction").addClass("col-reverse").removeClass("col-normal");
					}
					changeInstance = !changeInstance;
				}, 500);

				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon color-cursor");
				$("#ball").find('img').remove();
				$("#hero-interaction").removeClass("active");
			});

			if ($(".hero-title-placeholder div").length) {
				gsap.to("#hero-interaction", {
					yPercent: 50,
					opacity: 0,
					duration: 1,
					ease: Linear.easeNone,
					scrollTrigger: {
						trigger: "#hero-caption",
						start: "top -30%",
						end: '+=50%',
						scrub: true,
					},
				});
			} else {
				ScrollTrigger.create({
					trigger: "#hero-styles",
					start: "top 100%",
					end: "1px top",
					onEnter: function () {
						$(".hero-title").removeClass("disable");
					},
					onLeave: function () {
						$(".hero-title").addClass("disable");
					},
					onEnterBack: function () {
						$(".hero-title").removeClass("disable");
					},
					onLeaveBack: function () {
						$(".hero-title-placeholder").addClass("disable");
					},
				});

				$(".hero-title").addClass("cursor-pointer");
			}

			var timeout;

			$(interactionTarget).mousemove(function (e) {
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(callTiltSlider.bind(null, e));
			});

			function callTiltSlider(e) {
				$('.hero-column.col-left').each(function () {
					moveItLeft(e, $(this), 20);
				});
				$('.hero-column.col-right').each(function () {
					moveItRight(e, $(this), 20);
				});
			}

			function moveItLeft(e, $target, movement) {
				var $this = $(interactionTarget);
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;

				gsap.to($target, 1, {
					x: (relX - $this.width() / 2) / $this.width() * movement,
					y: (relY - $this.height() / 2) / $this.height() * movement,
					ease: "power4.out",
				});
			}

			function moveItRight(e, $target, movement) {
				var $this = $(interactionTarget);
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;

				gsap.to($target, 1, {
					x: -(relX - $this.width() / 2) / $this.width() * movement,
					y: -(relY - $this.height() / 2) / $this.height() * movement,
					ease: "power4.out",
				});
			}
		}



		// Zoom Gallery	
		gsap.utils.toArray('.zoom-gallery').forEach((zoomGallery) => {

			const zoomGalleryWrapper = zoomGallery.querySelector(".zoom-wrapper-gallery");
			const zoomWrapperThumb = zoomGallery.querySelector(".zoom-wrapper-thumb");
			const ZoomItem = zoomGallery.querySelector(".zoom-center .zoom-img-wrapper");
			const zoomImgsWrapper = zoomGallery.querySelectorAll('li:not(.zoom-center) .zoom-img-wrapper');
			const zoomImgsWrapperAll = zoomGallery.querySelectorAll('li .zoom-img-wrapper');
			const heightRatio = zoomGalleryWrapper.dataset.heightratio;
			const zoomImgsHeight = ZoomItem.offsetWidth * heightRatio;
			const paddingBottom = (window.innerHeight - zoomImgsHeight) / 2;

			gsap.set(zoomGallery, { paddingBottom: paddingBottom });
			gsap.set(zoomGalleryWrapper, { height: zoomImgsHeight });
			gsap.set(zoomWrapperThumb, { top: - paddingBottom, height: window.innerHeight });

			gsap.to(zoomGallery, {
				scrollTrigger: {
					trigger: zoomGallery,
					start: function () {
						const startPin = (window.innerHeight - zoomGalleryWrapper.offsetHeight) / 2;
						return "top +=" + startPin;
					},
					end: '+=200%',
					scrub: true,
					pin: true,
				}
			});

			gsap.to(zoomImgsWrapper, {
				scale: 0.9,
				opacity: 0,
				borderRadius: "0",
				ease: Linear.easeNone,
				scrollTrigger: {
					trigger: zoomGallery,
					start: function () {
						const startPin = (window.innerHeight - zoomGalleryWrapper.offsetHeight) / 2;
						return "top +=" + startPin;
					},
					end: '+=25%',
					scrub: true,
				}
			});

			const state = Flip.getState(ZoomItem);
			zoomWrapperThumb.appendChild(ZoomItem);

			const zoomAnimation = Flip.from(state, {
				borderRadius: "0",
				absolute: true
			});

			ScrollTrigger.create({
				trigger: zoomGalleryWrapper,
				start: function () {
					const startPin = (window.innerHeight - zoomGalleryWrapper.offsetHeight) / 2;
					return "top +=" + startPin;
				},
				end: '+=200%',
				scrub: true,
				animation: zoomAnimation,
			});

		});



		// Clipped Image 
		gsap.utils.toArray('.clipped-image-wrapper').forEach((clippedImageWrapper) => {

			const clippedImagePin = clippedImageWrapper.querySelector(".clipped-image-pin");
			const clippedImage = clippedImageWrapper.querySelector(".clipped-image");
			const clippedImageGradient = clippedImageWrapper.querySelector(".clipped-image-gradient");
			const clippedImageContent = clippedImageWrapper.querySelector(".clipped-image-content");

			gsap.set(clippedImageContent, { paddingTop: (window.innerHeight / 2) + clippedImageContent.offsetHeight });

			if ($(".elementor").length) {

				setTimeout(function () {
					const closestElement = clippedImageGradient.closest(".content-row-elementor");
					if (closestElement) {
						gsap.set(clippedImageGradient, {
							backgroundColor: $(closestElement).css("background-color")
						});
					}
				}, 1000);

			} else {

				if (clippedImageGradient.closest(".content-row")) {
					gsap.set(clippedImageGradient, {
						backgroundColor: clippedImageGradient.closest(".content-row").getAttribute("data-bgcolor")
					});
				}

			}

			function setClippedImageWrapperProperties() {
				gsap.set(clippedImageContent, { paddingTop: "" });
				gsap.set(clippedImageGradient, { height: window.innerHeight * 0.3 });
				gsap.set(clippedImage, { height: window.innerHeight - document.querySelector('.clapat-header').offsetHeight * 2 });
				gsap.set(clippedImageContent, { paddingTop: (window.innerHeight / 2) + clippedImageContent.offsetHeight });
				gsap.set(clippedImageWrapper, { height: window.innerHeight + clippedImageContent.offsetHeight - document.querySelector('.clapat-header').offsetHeight });

			}

			imagesLoaded('body', function () {
				setClippedImageWrapperProperties();
			});

			window.addEventListener('resize', setClippedImageWrapperProperties);

			gsap.to(clippedImageGradient, {
				scrollTrigger: {
					trigger: clippedImagePin,
					start: function () {
						const startPin = 0;
						return "top +=" + startPin;
					},
					end: function () {
						const endPin = clippedImageContent.offsetHeight;
						return "+=" + endPin;
					},
					scrub: true,
				},
				opacity: 1,
				y: 2
			});

			var clippedImageAnimation = gsap.to(clippedImage, {
				clipPath: 'inset(0% 0% round 10px)',
				scale: 1,
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'Linear.easeNone'
			});

			var clippedImageScene = ScrollTrigger.create({
				trigger: clippedImagePin,
				start: function () {
					const startPin = (window.innerHeight - clippedImagePin.offsetHeight) / 2;
					return "top +=" + startPin;
				},
				end: function () {
					const endPin = clippedImageContent.offsetHeight;
					return "+=" + endPin;
				},
				animation: clippedImageAnimation,
				scrub: true,
				pin: true,
				pinSpacing: false,
			});

		});


		// Horizontal Gallery
		const panelsSections = gsap.utils.toArray(".panels");
		for (var i = 0; i < panelsSections.length; i++) {

			thePanelsSection = panelsSections[i];
			const panels = gsap.utils.toArray(".panels-container .panel", thePanelsSection);
			const panelsImgs = gsap.utils.toArray(".panels-container .panel img", thePanelsSection);
			const panelsContainer = thePanelsSection.querySelector(".panels-container");
			const widthRatio = thePanelsSection.dataset.widthratio;

			gsap.set([panelsContainer, panels], { height: window.innerHeight * 0.6 });
			gsap.set(panels, { width: window.innerHeight * widthRatio });



			var totalPanelsWidth = 0;
			panels.forEach(function (panel) {
				totalPanelsWidth += $(panel).outerWidth(true);
			});
			gsap.set(panelsContainer, { width: totalPanelsWidth });

			gsap.set(thePanelsSection, { height: panelsContainer.offsetWidth - innerWidth + panelsContainer.offsetHeight });

			gsap.to(panels, {
				x: - totalPanelsWidth + innerWidth,
				ease: "none",
				scrollTrigger: {
					trigger: panelsContainer,
					pin: true,
					start: function () {
						const startPin = (window.innerHeight - panelsContainer.offsetHeight) / 2;
						return "top +=" + startPin;
					},
					end: function () {
						const endPin = panelsContainer.offsetWidth - innerWidth;
						return "+=" + endPin;
					},
					scrub: 1,
				}
			});
		}



		// Slowed Pin Section
		gsap.utils.toArray('.slowed-pin').forEach((slowedPin) => {

			const slowedText = slowedPin.querySelector('.slowed-text');
			const slowedTextWrapper = slowedPin.querySelector('.slowed-text-wrapper');
			const slowedImagesWrapper = slowedPin.querySelector('.slowed-images');
			const slowedImages = slowedPin.querySelectorAll('.slowed-image img');

			gsap.to(slowedText, {
				scrollTrigger: {
					trigger: slowedText,
					scrub: true,
					pin: true,
					start: "top top",
					end: function () {
						const durationHeight = slowedImagesWrapper.offsetHeight - window.innerHeight;
						return "+=" + durationHeight;
					},
				},
				y: window.innerHeight - slowedText.offsetHeight
			});

			gsap.from(slowedTextWrapper, {
				scrollTrigger: {
					trigger: slowedText,
					scrub: true,
					start: "top top",
					end: function () {
						const durationHeight = slowedImagesWrapper.offsetHeight - window.innerHeight;
						return "+=" + durationHeight;
					},
				},
				y: 100
			});

			slowedImages.forEach((sImage) => {
				gsap.to(sImage, {
					scrollTrigger: {
						trigger: sImage,
						scrub: true,
						start: "top 100%",
					},
					scale: 1,
					y: 0
				});
			});

		});





		//Fixed Hieght Title
		gsap.utils.toArray('.fixed-title').forEach((fixedTitle) => {

			const fixedTitleSpans = fixedTitle.querySelectorAll('span');
			const scrollDuration = 1;
			const stagger = scrollDuration / fixedTitleSpans.length;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: fixedTitle,
					start: function () {
						const startPin = (window.innerHeight - fixedTitle.offsetHeight) / 2;
						return "top +=" + startPin;
					},
					end: function () {
						const endPin = fixedTitle.offsetHeight;
						return "+=" + endPin;
					},
					pin: true,
					scrub: 1,
					pinSpacing: false,
				},
			});

			fixedTitleSpans.forEach((fixedTitleSpan, index) => {
				tl.to(fixedTitleSpan, {
					duration: scrollDuration,
					opacity: 1,
					ease: "none",
					scaleY: 1.2,
					delay: index * stagger,
				})
					.add("fixedTitleSpansPause", "+=0.1")
					.to(fixedTitleSpan, {
						duration: scrollDuration,
						ease: "none",
						scaleY: 1,
						delay: index * stagger,
					}, "fixedTitleSpansPause");
			});


		});


		// List Rotator
		gsap.utils.toArray('.list-rotator-wrapper').forEach((listRotatorWrapper) => {

			const listRotatorTitle = listRotatorWrapper.querySelector(".list-rotator-title");
			const listRotatorPin = listRotatorWrapper.querySelector(".list-rotator-pin");
			const listRotator = listRotatorWrapper.querySelector(".list-rotator");

			if (!isMobile()) {

				const rTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: listRotatorPin,
						start: function () {
							const startPin = 0;
							return "top +=" + startPin;
						},
						end: function () {
							const endPin = window.innerHeight * 3;
							return "+=" + endPin;
						},
						pin: true,
						scrub: true,
					}
				});

				const listItems = gsap.utils.toArray('.list-rotator li');
				const stagger = 0.5;

				listItems.forEach((listItem, index) => {
					rTimeline.from(listItem, {
						duration: 1,
						opacity: 0.1,
						delay: index * 0.5,
					});
				});

				gsap.to(listRotator, {
					scrollTrigger: {
						trigger: listRotatorWrapper,
						start: function () {
							const startPin = 0;
							return "top +=" + startPin;
						},
						end: function () {
							const endPin = window.innerHeight * 3;
							return "+=" + endPin;
						},
						scrub: true,
					},
					y: - (listRotator.offsetHeight - window.innerHeight)
				});

				gsap.to(listRotatorTitle, {
					scrollTrigger: {
						trigger: listRotatorTitle,
						start: function () {
							const startPin = 45;
							return "top +=" + startPin;
						},
						end: function () {
							const endPin = listRotator.offsetHeight * 2;
							return "+=" + endPin;
						},
						pin: true,
						scrub: true,
						pinSpacing: false,
						onEnter: function () {
							gsap.to(listRotatorTitle, { duration: 0.3, opacity: 1 });
						},
						onLeave: function () {
							gsap.to(listRotatorTitle, { duration: 0.3, opacity: 0 });
						},
						onEnterBack: function () {
							gsap.to(listRotatorTitle, { duration: 0.3, opacity: 1 });
						},
						onLeaveBack: function () {
							gsap.to(listRotatorTitle, { duration: 0.3, opacity: 0 });
						},
					}
				});

			}

		});


		//Pinned Lists			
		if ($('.pinned-lists').length > 0) {

			const wrappers = document.querySelectorAll('.pinned-lists-wrapper');

			wrappers.forEach(wrapper => {
				const listWrapper = wrapper.querySelector(".pinned-lists");
				const lists = wrapper.querySelectorAll(".pinned-lists li");
				const winHeight = window.innerHeight;
				const durationFactor = parseFloat(wrapper.getAttribute('data-duration'));
				const durationHeight = winHeight / lists.length;

				const tl = gsap.timeline({ paused: true });

				if (wrapper.classList.contains('brick-mode')) {

					lists.forEach((list, index) => {
						if (index !== 0) {
							gsap.set(list, {
								y: winHeight,
							});
							tl.to(list, {
								y: 0,
								duration: durationHeight,
								ease: Quint.easeOut
							});
						}

					});

				} else if (wrapper.classList.contains('zipper-mode')) {

					lists.forEach((list, index) => {
						if (index !== 0) {
							gsap.set(list, {
								x: index % 2 === 0 ? -100 : 100,
								opacity: 0,
							});
							tl.to(list, {
								x: 0,
								opacity: 1,
								duration: durationHeight,
								ease: "back.out(2)",
							});
						}

					});

				} else if (wrapper.classList.contains('left-right-mode')) {

					lists.forEach((list, index) => {
						gsap.set(list, {
							x: 0,
						});
						tl.to(list, {
							x: listWrapper.offsetWidth - list.offsetWidth,
							duration: durationHeight,
							ease: Quint.easeOut
						});
					});

				} else if (wrapper.classList.contains('right-left-mode')) {

					lists.forEach((list, index) => {
						gsap.set(list, {
							x: listWrapper.offsetWidth - list.offsetWidth,
						});
						tl.to(list, {
							x: 0,
							duration: durationHeight,
						});
					});

				} else if (wrapper.classList.contains('scale-mode')) {

					lists.forEach((list, index) => {
						gsap.set(list, {
							scale: 0.7,
							opacity: 0,
						});
						tl.to(list, {
							scale: 1,
							opacity: 1,
							ease: "back.out(2)",
							duration: durationHeight
						});
					});

				} else if (wrapper.classList.contains('opacity-mode')) {

					lists.forEach((list, index) => {
						gsap.set(list, {
							opacity: 0.2,
						});
						tl.to(list, {
							opacity: 1,
							duration: durationHeight
						});
					});

				} else if (wrapper.classList.contains('font-mode')) {

					let infoIndex = 0;

					lists.forEach((list, index) => {
						if (index === 0) {
							// Primul element are clasa 'secondary-font' și opacitatea 1
							gsap.set(list, {
								className: 'secondary-font',
								opacity: 1
							});
						} else {
							// Restul elementelor au opacitatea 0.2
							gsap.set(list, {
								opacity: 0.3
							});
						}

						if (list.hasAttribute('data-infoTextAfter')) {
							// Alternăm clasele în funcție de indexul curent
							if (infoIndex % 2 === 0) {
								list.classList.add('has-info-even');
							} else {
								list.classList.add('has-info-odd');
							}
							infoIndex++; // Incrementăm contorul doar pentru elementele cu data-infoTextAfter
						}

					});

					// Creează timeline-ul pentru mutarea clasei .secondary-font și modificarea opacității
					lists.forEach((list, index) => {
						if (index !== 0) {
							// La fiecare pas, mutăm clasa de la elementul anterior și setăm opacitatea corespunzătoare
							tl.to(lists[index - 1], {
								onComplete: () => {
									// Îndepărtează clasa de la elementul anterior
									lists[index - 1].classList.remove('secondary-font');
									// Setează opacitatea la 1 pentru elementul anterior
									lists[index - 1].style.opacity = 1;
								},
								duration: durationHeight
							}).to(list, {
								onStart: () => {
									// Adaugă clasa la elementul curent
									list.classList.add('secondary-font');
									// Setează opacitatea la 1 pentru elementul curent
									list.style.opacity = 1;
								},
								onReverseComplete: () => {
									// La scroll înapoi, mutăm clasa și opacitatea
									if (index > 0) {
										lists[index].classList.remove('secondary-font');
										lists[index - 1].classList.add('secondary-font');
										// Setează opacitatea la 1 pentru elementul anterior
										lists[index - 1].style.opacity = 1;
										// Setează opacitatea la 0.2 pentru elementul curent
										lists[index].style.opacity = 0.3;
									}
								},
								duration: durationHeight
							});
						}
					});

				}

				gsap.to(wrapper, {
					scrollTrigger: {
						trigger: wrapper,
						start: function () {
							let startPin;
							if (listWrapper.offsetHeight < winHeight) {
								startPin = (winHeight - listWrapper.offsetHeight) / 2;
							} else {
								startPin = listWrapper.offsetTop + 100;
							}
							return "top +=" + startPin;
						},
						end: function () {
							return "+=" + winHeight * durationFactor;
						},
						pin: true,
						scrub: true,
						onEnter: function () {
							wrapper.classList.add('visible');
						},
						onEnterBack: function () {
							wrapper.classList.add('visible');
						},
						onLeave: function () {
							wrapper.classList.remove('visible');
						},
						onLeaveBack: function () {
							wrapper.classList.remove('visible');
						},
						onUpdate: (self) => {
							tl.progress(self.progress);
						}
					}
				});

				if (listWrapper.offsetHeight > winHeight) {
					gsap.to(listWrapper, {
						scrollTrigger: {
							trigger: listWrapper,
							start: "top top",
							end: function () {
								return "+=" + winHeight * durationFactor;
							},
							scrub: true,
						},

						y: - (listWrapper.offsetHeight - winHeight + listWrapper.lastElementChild.offsetHeight)
					});
				}

			});

		}


		//Parallax Image List Rotator
		if ($('.parallax-image-wrapper').length > 0) {

			// Select all '.parallax-image-wrapper' elements
			const parallaxWrappers = document.querySelectorAll('.parallax-image-wrapper');

			parallaxWrappers.forEach(wrapper => {
				// Select inner elements for each wrapper
				const pinContent = wrapper.querySelector(".parallax-content-pin");
				const contentWrapper = wrapper.querySelector(".parallax-content");
				const listItems = wrapper.querySelectorAll(".parallax-list");
				const windowHeight = window.innerHeight;

				// Calculate animation factors based on the number of lists
				const durationCaptions = listItems.length * 2;
				const listDuration = windowHeight / listItems.length;

				// Select the container where the captions will be pinned
				const pinContainer = document.querySelector(".parallax-content-animation");

				// Create a caption for each list and move its content into it
				listItems.forEach(list => {
					const listCaption = document.createElement("div");
					listCaption.classList.add("list-caption");

					// Move all children (list items) into the caption
					while (list.firstChild) {
						listCaption.appendChild(list.firstChild);
					}

					// Append the new caption to the pin container
					pinContainer.appendChild(listCaption);
				});

				// Create an animation progress container <ul> with <li> items for each list
				const progressContainer = document.createElement("ul");
				progressContainer.classList.add("animation-progress");

				listItems.forEach(() => {
					const progressItem = document.createElement("li");
					progressItem.classList.add("progress-line");

					const progressSpan = document.createElement("span");
					progressItem.appendChild(progressSpan);
					progressContainer.appendChild(progressItem);
				});

				// Append the progress container to the pin container
				pinContainer.appendChild(progressContainer);

				// Create a GSAP timeline for list caption animations
				const timelineCaptions = gsap.timeline({ paused: true });
				const timelineProgress = gsap.timeline({ paused: true });

				// Select all '.list-caption' elements within the pinned content
				const captions = document.querySelectorAll(".parallax-content-animation .list-caption");
				const progressBars = document.querySelectorAll(".animation-progress .progress-line span");



				captions.forEach((caption, index) => {
					const textSpans = caption.querySelectorAll("span");

					gsap.set(textSpans, {
						opacity: 0,
						yPercent: 100,
					});

					timelineCaptions.to(textSpans, {
						opacity: 1,
						yPercent: 0,
						duration: 2,
						ease: "back.out(1.5)",
						stagger: 0.2,
					})
						.add("listPause", "+=1")
						.to(textSpans, {
							opacity: 0,
							yPercent: -100,
							duration: 1,
							ease: Power3.easeIn,
							stagger: 0.2,
						}, "listPause");
				});

				progressBars.forEach((progressBar, index) => {

					timelineProgress.to(progressBar, {
						width: "100%",
						duration: 1,
						ease: Linear.easeNone,
					});
				});

				// Apply scroll trigger to pin the content and synchronize with the timeline
				gsap.to(contentWrapper, {
					scrollTrigger: {
						trigger: pinContent,
						start: "top 0%",
						end: () => `+=${windowHeight * durationCaptions}`,
						pin: true,
						pinSpacing: false,
						scrub: true,
						onUpdate: (self) => {
							timelineCaptions.progress(self.progress);
							timelineProgress.progress(self.progress);
						},
						onEnter: () => {
							gsap.to('.animation-progress', { opacity: 1, duration: 0.2 });
						},
						onLeave: () => {
							gsap.to('.animation-progress', { opacity: 0, duration: 0.2 });
						},
						onEnterBack: () => {
							gsap.to('.animation-progress', { opacity: 1, duration: 0.2 });
						},
						onLeaveBack: () => {
							gsap.to('.animation-progress', { opacity: 0, duration: 0.2 });
						}
					}
				});



				const backgroundImage = wrapper.querySelector(".parallax-image");

				if (backgroundImage) {
					backgroundImage.style.backgroundImage = `url(${backgroundImage.dataset.bgImage})`;

					const parallaxImageAnimation = gsap.fromTo(backgroundImage, {
						backgroundPosition: `center ${5}%`,
						y: -windowHeight,
						scale: 1,
					}, {
						backgroundPosition: `center ${95}%`,
						scale: 1,
						y: windowHeight * (listItems.length * 2 + 1),
						duration: 1,
						ease: Linear.easeNone,
					});

					ScrollTrigger.create({
						trigger: wrapper,
						start: "top 100%",
						end: () => `+=${windowHeight * durationCaptions + windowHeight * 2}`,
						animation: parallaxImageAnimation,
						scrub: true,
					});
				}

				const backgroundVideo = wrapper.querySelector("video");

				if (backgroundVideo) {
					backgroundVideo.play();

					const parallaxVideoAnimation = gsap.fromTo(backgroundVideo, {
						objectPosition: `center ${5}%`,
					}, {
						objectPosition: `center ${95}%`,
						duration: 1,
						ease: Linear.easeNone,
					});

					ScrollTrigger.create({
						trigger: wrapper,
						start: "top 100%",
						end: () => `+=${windowHeight * durationCaptions + windowHeight * 2}`,
						animation: parallaxVideoAnimation,
						scrub: true,
					});
				}

			});

		}






		// Team Members Grid
		gsap.utils.toArray('.team-wrapper-grid').forEach((teamGrid) => {

			const teamIntro = teamGrid.querySelector('.team-intro-grid');
			const teamMembers = teamGrid.querySelector('.team-members-grid');



			gsap.utils.toArray('.team-member-inner .pixels-cover').forEach((pixelWrapper, index) => {
				const pixelAnimation = pixelWrapper.querySelectorAll(".pixel");

				gsap.to(pixelAnimation, {
					scrollTrigger: {
						trigger: pixelWrapper,
						start: "top 90%",
						onEnter: function () {
							pixelWrapper.classList.add('animated');
						},
					},
					duration: 0.2,
					opacity: 0,
					delay: function () {
						return gsap.utils.random(0, 0.4);
					},
					ease: Power4.easeOut,
					onComplete: function () {
						pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
							pixels.remove();
						});
					}
				});
			});

			if (window.innerWidth > 479) {

				gsap.to(teamIntro, {
					scrollTrigger: {
						trigger: teamIntro,
						scrub: true,
						pin: true,
						pinSpacing: false,
						start: function () {
							const startPin = (window.innerHeight - teamIntro.offsetHeight) / 2;
							return "top +=" + startPin;
						},
						end: function () {
							const durationHeight = teamMembers.offsetHeight - window.innerHeight;
							return "+=" + durationHeight;
						},
					},
					opacity: 0,
				});

			}

			$(".team-member-inner a").mouseenter(function (e) {
				var $this = $(this);
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: "#ffba00" });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#ball").append('<p class="center-first" style="color:#000">' + $this.data("centerline") + '</p>');
			}).mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();
			});

		});


		// Team Members Sticky List

		if ($('.team-list-wrapper').length > 0) {

			if (window.innerWidth > 767) {

				$('.team-list-captions li').first().addClass('active secondary-font');
				$('.team-list-images li').first().addClass('visible');

				$('.team-list-captions li').each(function (index) {
					$(this).on('mouseenter', function () {
						if (!$(this).hasClass('active')) {
							$('.team-list-captions li').removeClass('active secondary-font');
							$(this).addClass('active secondary-font');
							$('.team-list-images li').removeClass('visible');
							$('.team-list-images li').eq(index).addClass('visible');
						}
					})
				});

				ScrollTrigger.create({
					trigger: '.team-list-wrapper',
					start: function () {
						const startPin = (window.innerHeight - $('.team-list-images').outerHeight());
						return "top +=" + startPin;
					},
					end: function () {
						const endPin = $('.team-list-captions').outerHeight() - $('.team-list-images').outerHeight();
						return "+=" + endPin;
					},
					pin: '.team-list-images',
					pinSpacing: false,
				});

				gsap.utils.toArray('.team-list-wrapper').forEach((teamListsWrapper, index) => {
					const pixelAnimation = teamListsWrapper.querySelectorAll(".pixel");

					gsap.to(pixelAnimation, {
						scrollTrigger: {
							trigger: teamListsWrapper,
							start: "top 80%",
							end: '+=20%',
							scrub: 1,
						},
						duration: 0.05,
						opacity: 0,
						delay: function () {
							return gsap.utils.random(0, 1);
						},
						ease: "sine.inOut",
					});


					gsap.to(pixelAnimation, {
						scrollTrigger: {
							trigger: teamListsWrapper,
							start: "bottom 70%",
							end: '+=20%',
							scrub: 1,
						},
						duration: 0.05,
						opacity: 1,
						delay: function () {
							return gsap.utils.random(0, 1);
						},
						ease: "sine.inOut",
					});

				});

				if (!isMobile()) {

					$(".team-list-captions li").mouseenter(function (e) {
						$('#ball p').remove();
						var primaryColor = $('body').attr("data-primary-color");
						var $this = $(this);
						gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: primaryColor });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
						$("#ball").append('<p class="center-first" style="color:#000">' + $this.data("centerline") + '</p>');
					});

					$(".team-list-captions li").mouseleave(function (e) {
						var $this = $(this);
						gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
						$('#ball p').remove();
					});
				}

			}


		}


		if ($('.text-rotator').length > 0) {

			$(".text-rotator").each(function () {
				var textRotator = $(this);
				var textRotatorWrapper = textRotator.closest(".text-rotator-wrapper");
				var parent = textRotatorWrapper.parent();
				var parentLineHeight = parseFloat(window.getComputedStyle(parent[0]).lineHeight);

				gsap.set(parent, { y: 0 });
				gsap.set(textRotatorWrapper, { height: parentLineHeight });

				setInterval(function () {
					var spanHeight = textRotator.find("span").eq(0).height();
					var currentSpan = textRotator.find("span").eq(0);
					var nextSpan = textRotator.find("span").eq(1);
					var nextSpanWidth = nextSpan.outerWidth();

					gsap.to(textRotator, {
						duration: 0.75,
						y: spanHeight * -1,
						ease: "back.inOut(2)",
						onComplete: function () {
							textRotator.append(currentSpan);
							gsap.set(textRotator, { y: 0 });
						},
					});

					gsap.to(textRotatorWrapper, {
						duration: 0.75,
						width: nextSpanWidth,
						ease: "back.inOut(2)",
					});

				}, 3000);

			});

		}


		imagesLoaded('body', function () {


			// Pinned Gallery	
			gsap.utils.toArray('.pinned-gallery').forEach((pinnedGallery) => {

				if (pinnedGallery && pinnedGallery.classList.contains('random-img-ratation')) {
					const rotatedImages = pinnedGallery.querySelectorAll('.pinned-image:not(:first-child):not(:last-child)');
					gsap.utils.toArray(rotatedImages).forEach((pImage, i, arr) => {
						let rotation = i % 2 === 0 ? gsap.utils.random(-4, 0) : gsap.utils.random(0, 4);
						gsap.set(pImage.querySelector('img'), { rotation: rotation });
					});
				}

				const pinnedImages = pinnedGallery.querySelectorAll('.pinned-image');

				pinnedImages.forEach((pImage, i, arr) => {
					if (i < arr.length - 1) {
						const durationMultiplier = arr.length - i - 1;

						ScrollTrigger.create({
							trigger: pImage,
							start: function () {
								const centerPin = (window.innerHeight - pImage.querySelector('img').offsetHeight) / 2;
								return "top +=" + centerPin;
							},
							end: function () {
								const durationHeight = pImage.offsetHeight * durationMultiplier;
								return "+=" + durationHeight;
							},
							pin: true,
							pinSpacing: false,
							scrub: true,
							animation: gsap.to(pImage.querySelector('img'), {
								scale: 0.95,
								opacity: 1,
								zIndex: 0,
								duration: 1,
								ease: Linear.easeNone
							}),
						});
					}
				});

			});


			// Pinned Sections
			if (window.innerWidth > 479) {
				var pinnedSection = gsap.utils.toArray('.pinned-element');
				pinnedSection.forEach(function (pinElement) {

					var parentNode = pinElement.parentNode;
					var scrollingElement = parentNode.querySelector('.scrolling-element');

					var pinnedScene = ScrollTrigger.create({
						trigger: pinElement,
						//start: "top top-=-50px",
						start: function () {
							const startPin = (window.innerHeight - pinElement.offsetHeight) / 2;
							return "top +=" + startPin;
						},
						end: () => `+=${scrollingElement.offsetHeight - pinElement.offsetHeight}`,
						pin: pinElement,
					});
				});
			}


			// Vertical Parallax Columns
			if (window.innerWidth > 767) {
				gsap.utils.toArray('.vertical-parallax').forEach((parallaxElement) => {
					var startMovement = -(parallaxElement.offsetHeight * parallaxElement.dataset.startparallax);
					var endMovement = -(parallaxElement.offsetHeight * parallaxElement.dataset.endparallax);
					gsap.fromTo(
						parallaxElement, { y: -startMovement }, {
							y: endMovement, ease: "none",
						scrollTrigger: {
							trigger: parallaxElement,
							scrub: 0.5,
						}
					}
					);
				});
			}


			// Moving Gallery		
			gsap.utils.toArray('.moving-gallery').forEach((section, index) => {
				const w = section.querySelector('.wrapper-gallery');
				const [x, xEnd] = (index % 2) ? [(section.offsetWidth - w.scrollWidth), 0] : [0, section.offsetWidth - w.scrollWidth];
				gsap.fromTo(w, { x }, {
					x: xEnd,
					scrollTrigger: {
						trigger: section,
						scrub: 0.5,
					}
				});
			});

			// Reveal Gallery
			gsap.utils.toArray('.reveal-gallery').forEach((revealGallery) => {

				const imgFixed = revealGallery.querySelector('.reveal-img-fixed');
				const imgRotateLeft = revealGallery.querySelector('.reveal-img:first-child');
				const imgRotateRight = revealGallery.querySelector('.reveal-img:last-child');

				gsap.set(imgRotateLeft, { left: "50%", transform: "translateX(-50%)" });
				gsap.set(imgRotateRight, { left: "50%", transform: "translateX(-50%)" });

				function setImgProperties() {
					gsap.set(imgRotateLeft, { x: -imgFixed.offsetWidth * 0.35, height: revealGallery.offsetHeight, scale: 0.9 });
					gsap.set(imgRotateRight, { x: imgFixed.offsetWidth * 0.35, height: revealGallery.offsetHeight, scale: 0.9 });
				}
				setImgProperties();

				window.addEventListener('resize', setImgProperties);

				gsap.to(imgRotateLeft, {
					scrollTrigger: {
						trigger: revealGallery,
						scrub: true,
						start: "top 100%",
						end: function () {
							const durationHeight = revealGallery.offsetHeight + window.innerHeight;
							return "+=" + durationHeight;
						},
						invalidateOnRefresh: true,
					},
					x: function () {
						return -imgFixed.offsetWidth * 0.65;
					},
					rotation: -12
				});

				gsap.to(imgRotateRight, {
					scrollTrigger: {
						trigger: revealGallery,
						scrub: true,
						start: "top 100%",
						end: function () {
							const durationHeight = revealGallery.offsetHeight + window.innerHeight;
							return "+=" + durationHeight;
						},
						invalidateOnRefresh: true,
					},
					x: function () {
						return imgFixed.offsetWidth * 0.65;
					},
					rotation: 12
				});

			});


			//Snap Slider
			if ($('.snap-slider-container1').length > 0) {

				const snapSliderWrappers = document.querySelectorAll('.snap-slider-container');

				snapSliderWrappers.forEach(snapSliderWrapper => {

					//const snapSliderWrapper = document.querySelector(".snap-slider-container");	
					const snapSlides = snapSliderWrapper.querySelectorAll(".snap-slide");
					const snapSlide = snapSliderWrapper.querySelector('.snap-slide')
					const snapCaptionWrapper = snapSliderWrapper.querySelector(".snap-slider-captions");
					const snapCaptions = snapSliderWrapper.querySelectorAll(".snap-slide-caption");
					const snapCaption = snapSliderWrapper.querySelector('.snap-slide-caption');
					const heightFromCSS = gsap.getProperty(snapSlide, 'height');
					const sliderHeight = parseFloat(snapSliderWrapper.dataset.heightpercent) / 100;

					console.log("Valoarea sliderHeight este:", sliderHeight);
					function setSnapSliderHeight() {

						gsap.set([snapSlides, snapCaptionWrapper], { height: window.innerHeight * sliderHeight });
					}
					setSnapSliderHeight();

					window.addEventListener('resize', setSnapSliderHeight);



					const snap = gsap.utils.snap(1 / (snapSlides.length - 1));

					ScrollTrigger.create({
						trigger: snapSlides,
						//start: "top 10%",
						start: function () {
							const startPin = (window.innerHeight - snapSlide.offsetHeight) / 2;
							return "top +=" + startPin;
						},
						end: "+=" + snapSlide.offsetHeight * (snapSlides.length - 1),
						snap: {
							snapTo: snap,
							duration: { min: 0.2, max: 0.7 },
							delay: 0,
							ease: "power4.inOut"
						}
					});

					snapSlides.forEach((slide, i) => {
						let imageWrappers = slide.querySelectorAll('.img-mask');

						const parentHeight = slide.offsetHeight;

						// First Slide
						if (i === 0) {
							gsap.fromTo(imageWrappers, {
								y: 0,
							}, {
								y: parentHeight,
								scrollTrigger: {
									trigger: slide,
									scrub: true,
									//start: "top 10%",
									start: function () {
										const startPin = (window.innerHeight - slide.offsetHeight) / 2;
										return "top +=" + startPin;
									},
									end: function () {
										return "+=" + slide.offsetHeight;
									},
								},
								ease: 'none'
							});
							// Last Slide   
						} else if (i === snapSlides.length - 1) {
							gsap.fromTo(imageWrappers, {
								y: -parentHeight,
							}, {
								y: 0,
								scrollTrigger: {
									trigger: slide,
									scrub: true,
									//start: "top 90%",
									start: function () {
										const startPin = window.innerHeight - (window.innerHeight - slide.offsetHeight) / 2;
										return "top +=" + startPin;
									},
									//end: "top 10%",
									end: function () {
										const endPin = (window.innerHeight - slide.offsetHeight) / 2;
										return "top +=" + endPin;
									},

								},
								ease: 'none'
							});
							// Other Slides
						} else {
							gsap.fromTo(imageWrappers, {
								y: -parentHeight,
							}, {
								y: parentHeight,
								scrollTrigger: {
									trigger: slide,
									scrub: true,
									//start: "top 90%",
									start: function () {
										const startPin = window.innerHeight - (window.innerHeight - slide.offsetHeight) / 2;
										return "top +=" + startPin;
									},
									//end: "bottom 10%",
									end: function () {
										const endPin = (window.innerHeight - slide.offsetHeight) / 2;
										return "bottom +=" + endPin;
									},
								},
								ease: 'none'
							});
						}
					});

					if (snapCaptionWrapper) {
						ScrollTrigger.create({
							trigger: snapCaptionWrapper,
							start: function () {
								const startPin = (window.innerHeight - snapCaptionWrapper.offsetHeight) / 2;
								return "top +=" + startPin;
							},
							end: function () {
								const durationHeight = snapCaptionWrapper.offsetHeight * (snapSlides.length - 1)
								return "+=" + durationHeight;
							},
							pin: true,
							scrub: true,
						});


						gsap.fromTo(snapCaptions, {
							y: 0
						}, {
							y: - snapCaption.offsetHeight * (snapCaptions.length - 1),
							scrollTrigger: {
								trigger: snapSliderWrapper,
								scrub: true,
								start: function () {
									const startPin = (window.innerHeight - snapCaptionWrapper.offsetHeight) / 2;
									return "top +=" + startPin;
								},
								end: function () {
									const durationHeight = snapCaptionWrapper.offsetHeight * (snapSlides.length - 1)
									return "+=" + durationHeight;
								},
							},
							ease: 'none'
						})
					}

				});

			}


			// Variabile pentru controlul vitezei
			const staticDuration = 30; // Durata statică a animației (viteza implicită)
			const velocityPower = 5; // Puterea efectului velocity la scroll

			let direction = 1; // Direcția animației (1 = înainte, -1 = înapoi)

			// Creează animațiile de bază
			const marqueeFw = roll(".marquee-text.fw", { duration: staticDuration });
			const marqueeBw = roll(".marquee-text.bw", { duration: staticDuration }, true);

			// Setăm viteza statică la început
			gsap.to([marqueeFw, marqueeBw], { timeScale: 1, overwrite: true });

			// ScrollTrigger pentru controlul vitezei dinamice
			const scroll = ScrollTrigger.create({
				onUpdate(self) {
					const velocity = Math.abs(self.getVelocity() / 100); // Obținem velocity
					const newTimeScale = gsap.utils.clamp(1, 10, Math.pow(velocity, velocityPower)); // Aplicăm "puterea" la velocity

					if (self.direction !== direction) {
						direction *= -1; // Schimbăm direcția
						gsap.to([marqueeFw, marqueeBw], { timeScale: direction * newTimeScale, overwrite: true });
					} else {
						gsap.to([marqueeFw, marqueeBw], { timeScale: direction * newTimeScale, overwrite: true });
					}
				},
				onLeave() {
					// Resetăm la viteza statică dacă scroll-ul se oprește
					gsap.to([marqueeFw, marqueeBw], { timeScale: 1, overwrite: true });
				}
			});

			// Funcția pentru crearea efectului de rulare
			function roll(targets, vars, reverse) {
				const tl = gsap.timeline({
					repeat: -1,
					onReverseComplete() {
						if (this.reversed()) {
							this.totalTime(this.rawTime() + this.duration() * 10);
						}
					},
				});
				vars = vars || {};
				vars.ease || (vars.ease = "none");
				gsap.utils.toArray(targets).forEach((el) => {
					let clone = el.cloneNode(true);
					el.parentNode.appendChild(clone);
					gsap.set(clone, {
						position: "absolute",
						top: el.offsetTop,
						left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
					});
					tl.to([el, clone], { xPercent: reverse ? 100 : -100, ...vars }, 0);
				});
				return tl;
			}




		});


		// Page and Project Navigation

		function setMainPageContentMargins() {
			var winHeight = $(window).height();
			var footerHeight = $('.clapat-footer').height();
			var heroTranslate = gsap.getProperty("#next-project-caption", "height");

			gsap.set("#project-nav .next-project-image-wrapper", { height: winHeight, y: heroTranslate });
			gsap.set(".page-nav-caption.nav-full-caption", { height: winHeight - footerHeight });


			if ($('#project-nav').hasClass('pinned-nav-caption')) {
				gsap.set("#main-page-content.project-page", { marginBottom: winHeight * 2 - footerHeight });
				gsap.set("#project-nav", { height: winHeight * 2, bottom: -winHeight * 2 });

			} else {
				gsap.set("#main-page-content.project-page", { marginBottom: winHeight - footerHeight });
				gsap.set("#project-nav", { height: winHeight, bottom: -winHeight });
			}
		}

		setMainPageContentMargins();

		$(window).on('resize', setMainPageContentMargins);

		gsap.to('.pinned-nav-caption .next-project-wrap', {
			duration: 1,
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '.next-project-wrap',
				start: "top top",
				end: '+=100%',
				pin: true,
				scrub: true,
			}
		});

		var startValue;

		if ($('#project-nav').hasClass('pinned-nav-caption')) {
			startValue = 'top 0%';
		} else {
			startValue = 'top 100%';
		}

		gsap.to('.next-project-image', {
			duration: 1,
			scale: 1.02,
			rotation: 0,
			y: 0,
			top: 0,
			ease: "sine.in",
			filter: "blur(0px)",
			scrollTrigger: {
				trigger: '#project-nav',
				start: startValue,
				end: '+=100%',
				scrub: true,
			}
		});

		gsap.to('.next-caption-wrapper', {
			opacity: 1,
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav',
				start: startValue,
				end: '+=100%',
				scrub: true,
			}
		});

		gsap.to('#project-nav .next-hero-title span', {
			duration: 1,
			opacity: 1,
			stagger: 0.1,
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav .next-hero-title',
				start: "top 30%",
				end: "top 0%",
				scrub: true,
			}
		});

		gsap.to('#project-nav .next-hero-subtitle span', {
			duration: 1,
			backgroundSize: "100% 100%",
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav',
				start: startValue,
				end: '+=100%',
				scrub: true,
			}
		});

		gsap.to('.next-hero-progress span', {
			duration: 1,
			width: "100%",
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#project-nav',
				start: startValue,
				end: '+=100%',
				scrub: true,
			}
		});

		var startCount = 0;
		var num = { var: startCount };
		var numbers = document.querySelector('.next-hero-counter span');
		if (numbers) {
			var nextProjectCounter = gsap.timeline({
				scrollTrigger: {
					trigger: '#project-nav',
					start: startValue,
					end: '+=100%',
					scrub: true,
				}
			}).to(num, { var: 100, duration: 1, ease: Linear.easeNone, onUpdate: changeNumber });
		}

		function changeNumber() {
			numbers.innerHTML = (num.var).toFixed();
		}

		gsap.to('.page-nav-caption', {
			duration: 1,
			top: "0",
			scale: 1,
			opacity: 1,
			ease: Linear.easeNone,
			scrollTrigger: {
				trigger: '#page-nav',
				start: startValue,
				end: () => `+=${$('#page-nav').outerHeight() + $('.clapat-footer').outerHeight()}`,
				scrub: true,
			}
		});


		// Elements Animation	


		var contentVideo = gsap.utils.toArray('.content-video-wrapper');
		contentVideo.forEach(function (videoPlay) {
			var video = videoPlay.querySelector("video");

			var videoScene = ScrollTrigger.create({
				trigger: videoPlay,
				start: "top 100%",
				end: () => `+=${videoPlay.offsetHeight + window.innerHeight * 2}`,
				onEnter: function () {
					video.play();
				},
				onLeave: function () {
					video.pause();
				},
				onEnterBack: function () {
					video.play();
				},
				onLeaveBack: function () {
					video.pause();
				},
			});
		});

		var hasParallax = gsap.utils.toArray('.has-parallax');
		hasParallax.forEach(function (hParallax) {
			var bgImage = hParallax.querySelector("img");
			var bgVideo = hParallax.querySelector("video");
			var parallax = gsap.fromTo([bgImage, bgVideo], { y: '-20%', scale: 1.15 }, { y: '20%', scale: 1, duration: 1, ease: Linear.easeNone });
			var parallaxScene = ScrollTrigger.create({
				trigger: hParallax,
				start: "top 100%",
				end: () => `+=${hParallax.offsetHeight + window.innerHeight}`,
				animation: parallax,
				scrub: true
			});
		});

		var hasAnimation = gsap.utils.toArray('.has-animation');
		hasAnimation.forEach(function (hAnimation) {
			var delayValue = parseInt(hAnimation.getAttribute("data-delay")) || 0;
			gsap.to(hAnimation, {
				scrollTrigger: {
					trigger: hAnimation,
					start: "top 85%",
					onEnter: function () {
						hAnimation.classList.add('animated');
					},
				},
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: Power2.easeOut,
				delay: delayValue / 1000,
			});
		});

		var hasAnimationButton = gsap.utils.toArray('.button-box.has-animation');
		hasAnimationButton.forEach(function (hAnimationButton) {
			var delayValue = parseInt(hAnimationButton.getAttribute("data-delay")) || 0;

			var buttonBorder = hAnimationButton.querySelector('.button-border');

			gsap.to(buttonBorder, {
				scrollTrigger: {
					trigger: hAnimationButton,
					start: "top 85%",
					onEnter: function () {
						buttonBorder.classList.add('animated');
					},
				},
				opacity: 1,
				width: "auto",
				duration: 0.7,
				ease: Power2.easeOut,
				delay: delayValue / 1000,
			});
		});

		$(".has-cover").css('background-color', function () {
			return $(this).parents(".content-row").data('bgcolor')
		});

		$('.has-mask').each(function () {
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index++) {
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		$('.has-mask span').each(function () {
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index++) {
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		var hasMask = gsap.utils.toArray('.has-mask');
		hasMask.forEach(function (hMask) {
			var delayValue = parseInt(hMask.getAttribute("data-delay")) || 0;
			var spanMask = hMask.querySelectorAll("span > span");
			gsap.to(spanMask, {
				scrollTrigger: {
					trigger: hMask,
					start: "top 85%",
					onEnter: function () {
						hMask.classList.add('animated');
					},
				},
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: Power2.easeOut,
				delay: delayValue / 1000,
			});
		});

		$('.has-mask-fill').each(function () {
			var words = $(this).text();
			var total = words;
			$(this).empty();
			$(this).append($("<span /> ").text(words));
		});

		$('.has-mask-fill.block-title').each(function () {
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index++) {
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		var hasMaskFill = gsap.utils.toArray('.has-mask-fill');
		hasMaskFill.forEach(function (hMaskFill) {
			var spanFillMask = hMaskFill.querySelectorAll("span");
			gsap.to(spanFillMask, {
				scrollTrigger: {
					trigger: hMaskFill,
					start: "top 85%",
					end: () => `+=${hMaskFill.offsetHeight * 2}`,
					scrub: 1,
				},
				duration: 1,
				backgroundSize: "200% 100%",
				stagger: 0.5,
				ease: Linear.easeNone,
			});
		});

		$('.has-opacity').each(function () {
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index++) {
				$(this).append($("<span /> ").text(words[index] + " "));
			}
		});

		var hasOpacity = gsap.utils.toArray('.has-opacity');
		hasOpacity.forEach(function (hOpacity) {
			var spanOpacity = hOpacity.querySelectorAll("span");
			gsap.to(spanOpacity, {
				scrollTrigger: {
					trigger: hOpacity,
					start: "top 85%",
					end: () => `+=${hOpacity.offsetHeight}`,
					scrub: 1,
				},
				duration: 1,
				opacity: 1,
				stagger: 0.5,
				ease: Linear.easeNone,
			});
		});

		var counter = gsap.utils.toArray('.number-counter');
		counter.forEach(function (countNumber) {
			gsap.fromTo(countNumber, { innerText: countNumber.innerText }, {
				innerText: function () { return Math.floor(parseFloat(countNumber.getAttribute('data-target'))); },
				duration: 1,
				snap: { innerText: 1 },
				scrollTrigger: {
					trigger: countNumber,
					start: "top 90%",
				}
			});
		});

		var titleMovingForward = gsap.utils.toArray('.title-moving-forward');
		titleMovingForward.forEach(function (movingTitle) {
			var parallax = gsap.to(movingTitle, 1, { x: -(movingTitle.offsetWidth - window.innerWidth), ease: Linear.easeNone });
			var parallaxScene = ScrollTrigger.create({
				trigger: movingTitle,
				end: () => `+=${movingTitle.offsetHeight + window.innerHeight}`,
				animation: parallax,
				scrub: 2,
			});
		});

		var titleMovingBackward = gsap.utils.toArray('.title-moving-backward');
		titleMovingBackward.forEach(function (movingTitle) {
			gsap.set(movingTitle, { x: -(movingTitle.offsetWidth - window.innerWidth) });
			var parallax = gsap.to(movingTitle, 1, { x: 0, ease: Linear.easeNone });
			var parallaxScene = ScrollTrigger.create({
				trigger: movingTitle,
				end: () => `+=${movingTitle.offsetHeight + window.innerHeight}`,
				animation: parallax,
				scrub: 2,
			});
		});


		if ($('.change-header-color').length > 0) {
			imagesLoaded('body', function () {
				setTimeout(function () {
					var changeHeaderColor = gsap.utils.toArray('.change-header-color');
					changeHeaderColor.forEach(function (changeHeaderElement) {
						var pageHeader = document.querySelector('.clapat-header');
						gsap.to(changeHeaderElement, {
							scrollTrigger: {
								trigger: changeHeaderElement,
								start: "top 8%",
								end: () => `+=${changeHeaderElement.offsetHeight}`,
								//markers: true,
								onEnter: function () {
									pageHeader.classList.add('white-header');
								},
								onEnterBack: function () {
									pageHeader.classList.add('white-header');
								},
								onLeave: function () {
									pageHeader.classList.remove('white-header');
								},
								onLeaveBack: function () {
									pageHeader.classList.remove('white-header');
								}
							}
						});
					});

				}, 100);
			});
		}

		var startValue;

		if ($('#project-nav').hasClass('pinned-nav-caption')) {
			startValue = `top 0%`;
		} else {
			startValue = `top 99%`;
		}


		if ($('#clapat-page-content').hasClass("light-content")) {
			if ($('#project-nav').hasClass("change-header")) {
				imagesLoaded('body', function () {
					setTimeout(function () {
						var pageNav = document.querySelector('#project-nav.change-header');
						if (pageNav) {
							var pageContent = document.querySelector('#clapat-page-content');
							var nextPageCaptionParallax = gsap.to('.page-nav-caption', {
								scrollTrigger: {
									trigger: pageNav,
									start: startValue,
									end: () => `+=${pageNav.offsetHeight}`,
									onEnter: function () {
										pageContent.classList.remove('light-content');
									},
									onEnterBack: function () {
										pageContent.classList.remove('light-content');
									},
									onLeave: function () {
										pageContent.classList.add('light-content');
									},
									onLeaveBack: function () {
										pageContent.classList.add('light-content');
									}
								}
							});
						}
					}, 100);
				});
			}
		}

		if ($('#clapat-page-content').hasClass("dark-content")) {
			if ($('#project-nav').hasClass("change-header")) {
				imagesLoaded('body', function () {
					setTimeout(function () {
						var pageNav = document.querySelector('#project-nav.change-header');
						if (pageNav) {
							var pageContent = document.querySelector('#clapat-page-content');
							var nextPageCaptionParallax = gsap.to('.page-nav-caption', {
								scrollTrigger: {
									trigger: pageNav,
									start: startValue,
									end: () => `+=${pageNav.offsetHeight}`,
									onEnter: function () {
										pageContent.classList.add('light-content');
									},
									onEnterBack: function () {
										pageContent.classList.add('light-content');
									},
									onLeave: function () {
										pageContent.classList.remove('light-content');
									},
									onLeaveBack: function () {
										pageContent.classList.remove('light-content');
									}
								}
							});
						}
					}, 100);
				});
			}
		}


		// Disable Header Gradient

		gsap.set('.header-gradient', {
			delay: 0.5,
			backgroundColor: document.getElementById('clapat-page-content').getAttribute('data-bgcolor'),
			onUpdate: function () {
				var bgColor = document.getElementById('clapat-page-content').getAttribute('data-bgcolor');
				document.querySelector('.header-gradient').style.maskImage = `linear-gradient(${bgColor}, transparent)`;
				document.querySelector('.header-gradient').style.webkitMaskImage = `linear-gradient(${bgColor}, transparent)`;
			}
		});


		var disableHeaderGradient = gsap.utils.toArray('#hero-image-wrapper, .disable-header-gradient');

		disableHeaderGradient.forEach(function (noHeaderGradient) {
			var pageHeader = document.querySelector('.clapat-header');
			gsap.to(noHeaderGradient, {
				scrollTrigger: {
					trigger: noHeaderGradient,
					start: `top ${pageHeader.offsetHeight}`,
					end: () => `+=${noHeaderGradient.offsetHeight + pageHeader.offsetHeight}`,
					onEnter: function () {
						gsap.set('.header-gradient', { opacity: 0 });
					},
					onEnterBack: function () {
						gsap.set('.header-gradient', { opacity: 0 });
					},
					onLeave: function () {
						gsap.set('.header-gradient', { opacity: 1 });
					},
					onLeaveBack: function () {
						gsap.set('.header-gradient', { opacity: 1 });
					}
				}
			});
		});

		$('a.ajax-link').on('click', function () {
			//gsap.to('.header-gradient', { duration: 0.3, delay:0, opacity: 0, ease: Linear.easeNone, });
			gsap.to('#clapat-logo img.white-logo, #clapat-logo img.black-logo', { duration: 0.5, delay: 0, opacity: "", ease: Linear.easeNone, });
			gsap.to('.classic-menu .flexnav li', { duration: 0.5, delay: 0, color: "", ease: Linear.easeNone, });
			gsap.to('.button-wrap.menu', { duration: 0.5, delay: 0, color: "", boxShadow: "", ease: Linear.easeNone, });
			gsap.to('.button-icon-link', { duration: 0.5, delay: 0, color: "", boxShadow: "", ease: Linear.easeNone, });
			gsap.to("#bg-pixels", { duration: 0.3, delay: 0, opacity: 0, ease: Power2.easeInOut });
		});

		// Reinit All Scrolltrigger After Page Load

		imagesLoaded('body', function () {
			setTimeout(function () {
				ScrollTrigger.refresh()
			}, 1000);
		});



	}// End Scroll Effects


	/*--------------------------------------------------
	Function First Load
	---------------------------------------------------*/

	window.FirstLoad = function () {

		$(window).on('popstate', function () {
			location.reload(true);
		});

		$("a.header-button .button-icon-link .button-icon").css('background-color', function () {
			return $("body").data('primary-color')
		});

		if (isMobile()) {
			if ($('a.header-button').length) {
				var url = $('a.header-button').attr('href');
				var buttonText = $('.header-button .button-text span').text();
				var listItem = `
					<li class="menu-timeline link">
						<a class="ajax-link" data-type="page-transition" href="${url}">
							<div class="before-span">
								<span data-hover="${buttonText}">${buttonText}</span>
							</div>
						</a>
					</li>
				`;
				$('ul.flexnav').append(listItem);
			}
		}


		if ($("#clapat-page-content").hasClass("light-content")) {
			$(".clapat-nav-wrapper").css('background-color', function () {
				return $(".clapat-header").data('menucolor')
			});

			gsap.to("main", { duration: 0.5, backgroundColor: document.querySelector("#clapat-page-content").getAttribute("data-bgcolor"), ease: Power2.easeInOut });

			$('#magic-cursor').addClass('light-content');
			if ($('#hero').length > 0) {
				if ($('#hero').hasClass("has-image")) {
					$(".clapat-header").css('background-color', 'transparent');
				} else {
					if ($(".clapat-header").hasClass("fullscreen-menu")) {
						$(".clapat-header").css('background-color', 'transparent');
					} else {
						if ($('#blog').length > 0) {
							$(".clapat-header").css('background-color', '#171717');
						}
						if ($('#post').length > 0) {
							$(".clapat-header").css('background-color', '#171717');
						}
					}
				}
			} else {
				$(".clapat-header").css('background-color', 'transparent');
			}
		} else {
			$(".clapat-nav-wrapper").css('background-color', function () {
				return $(".clapat-header").data('menucolor')
			});

			gsap.to("main", { duration: 0.5, backgroundColor: document.querySelector("#clapat-page-content").getAttribute("data-bgcolor"), ease: Power2.easeInOut });

			$('#magic-cursor').removeClass('light-content');
			if ($('#hero').length > 0) {
				if ($('#hero').hasClass("has-image")) {
					$(".clapat-header").css('background-color', 'transparent');
				} else {
					if ($(".clapat-header").hasClass("fullscreen-menu")) {
						$(".clapat-header").css('background-color', 'transparent');
					} else {
						if ($('#blog').length > 0) {
							$(".clapat-header").css('background-color', '#fff');
						}
						if ($('#post').length > 0) {
							$(".clapat-header").css('background-color', '#fff');
						}
					}
				}
			} else {
				$(".clapat-header").css('background-color', 'transparent');
			}
		}

		$('.video-cover').each(function () {
			var image = $(this).data('src');
			$(this).css({ 'background-image': 'url(' + image + ')' });
		});

		//Load Default Page
		$('a.ajax-link').on('click', function () {
			$("body").addClass("show-loader");
			setTimeout(function () {
				$('#header-container').removeClass('light-content-header').removeClass('dark-content-header');
			}, 50);
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");

			gsap.to("nav", { duration: 0.3, backgroundColor: document.querySelector("#clapat-page-content").getAttribute("data-bgcolor") });

			$('header').removeClass('white-header');
			$("#app").remove();
			setTimeout(function () {
				$("#canvas-slider.active").remove();
			}, 300);
			$(".temporary-hero").remove();

			gsap.to($(".fullscreen-menu .menu-timeline"), { duration: 0.2, y: -20, opacity: 0, stagger: 0.02, ease: Power2.easeIn });
			if (isMobile()) {
				gsap.to($(".classic-menu .menu-timeline"), { duration: 0.2, y: -20, opacity: 0, stagger: 0.02, ease: Power2.easeIn });
			}

			gsap.to('#ball', { duration: 0.3, borderWidth: "4px", scale: 0.5, backgroundColor: "rgba(0, 0, 0, 0)", opacity: 1 });
			gsap.to($("#main, #hero-image-wrapper, #project-nav, .next-project-image, #app, #canvas-slider, #showcase-slider-webgl-holder, .showcase-pagination-wrap, #quickmenu-scroll, #blog, .next-project-image-wrapper"), { duration: 0.3, opacity: 0, delay: 0, ease: Power0.ease });
			gsap.to($("#footer-container, .header-middle"), { duration: 0.3, opacity: 0, ease: Power0.ease });
			gsap.to('#show-filters, #counter-wrap', { duration: 0.2, opacity: 0 });
		});


		//Load Page From Menu

		$('.clapat-nav-wrapper .ajax-link').on('click', function () {
			$(this).parents('.menu-timeline').addClass('hover');
			$(this).parents('.item-with-ul').addClass('hover');
			gsap.set($(this).find('span'), { yPercent: 0 });
			$('.clapat-header').removeClass('white-header');
			$("#app").remove();
		});


		$('#burger-wrapper, .menu .button-text').on('click', function () {
			$('#menu-burger, .clapat-nav-wrapper').toggleClass('open');
			setTimeout(function () {
				if ($('#menu-burger').hasClass("open")) {

					gsap.to('.clapat-nav-wrapper', { duration: 0.3, opacity: 1, ease: Power2.easeInOut });

					$('.clapat-header').addClass('over-sidebar').addClass('over-white-section');
					if (!$('#page-content').hasClass("light-content")) {
						$('#magic-cursor').addClass('light-content');
					}
					if ($('.clapat-header').hasClass("invert-header")) {
						$('#header-container').addClass('light-content-header');
					} else {
						$('#header-container').addClass('dark-content-header');
					}
					gsap.set($(".clapat-nav-wrapper ul ul li"), { y: 0, opacity: 1 });
					//Fade In Navigation Lists
					gsap.set($(".menu-timeline .before-span"), { y: 160, opacity: 0 });
					gsap.to($(".menu-timeline .before-span"), { duration: 0.7, y: 0, opacity: 1, delay: 0.4, stagger: 0.1, ease: Power2.easeOut });

					$('.menu-timeline > .touch-button').click(function (e, bIndirect) {
						if (bIndirect == true) {
							return;
						}
						let currentItem = $(this);
						$('.menu-timeline > .touch-button.active').each(function () {
							if (currentItem.get(0) !== $(this).get(0)) {
								$(this).trigger('click', true);
							}
						});
					});

				} else {

					gsap.to('.clapat-nav-wrapper', { duration: 0.3, opacity: 0, delay: 0.6, ease: Power2.easeInOut });

					//Fade Out Navigation Lists						
					gsap.to($(".menu-timeline .before-span"), { duration: 0.5, y: -200, opacity: 1, delay: 0, stagger: 0.05, ease: Power2.easeIn });
					gsap.to($(".clapat-nav-wrapper ul ul li"), { duration: 0.5, y: -120, opacity: 0, delay: 0, stagger: 0.03, ease: Power2.easeIn });

					if (!$('#page-content').hasClass("light-content")) {
						setTimeout(function () {
							$('#magic-cursor').removeClass('light-content');
						}, 500);
					}
					if ($('.clapat-header').hasClass("invert-header")) {
						setTimeout(function () {
							$('#header-container').removeClass('light-content-header');
						}, 500);
					} else {
						setTimeout(function () {
							$('#header-container').removeClass('dark-content-header');
						}, 500);
					}
					setTimeout(function () {
						$(".touch-button.active").trigger("click");
						$('.clapat-header').removeClass('over-sidebar')
						setTimeout(function () {
							$('.clapat-header').removeClass('over-white-section');
						}, 350);
					}, 500);
				}
			}, 20);
		});

		$('.classic-menu .flexnav li').on('mouseenter', function () {
			$('.classic-menu .flexnav li').addClass('disable');
			$(this).removeClass('disable');
		})

		$('.classic-menu .flexnav').on('mouseleave', function () {
			$('.classic-menu .flexnav li').removeClass('disable'); // Reaplici clasa disable pe elementul actual
		});

		$('.classic-menu .flexnav li a').on('click', function () {
			$('.classic-menu .flexnav li a').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.item-with-ul').find('> a').addClass('active');
		});

		$('#page-nav .next-ajax-link-page').on('click', function () {
			$('.classic-menu .flexnav li a').removeClass('active');
		});

		$('.wpcf7-form-control-wrap').each(function () {
			if ($(this).has('label').length <= 0) {
				$(this).append('<label class="input_label"></label>');
			}
		});

	}// End First Load





	/*--------------------------------------------------
	Function FitThumbScreen WEBGL
	---------------------------------------------------*/

	window.FitThumbScreenWEBGL = function () {

		if (!$("body").hasClass("disable-ajaxload")) {

			if ($("#itemsWrapper").hasClass("webgl-fitthumbs")) {

				if ($('#itemsWrapper').length > 0) {

					function createDemoEffect(options) {
						const transitionEffect = new GridToFullscreenEffect(
							document.getElementById("app"),
							document.getElementById("itemsWrapper"),
							Object.assign(
								{
									scrollContainer: window,
									onToFullscreenStart: ({ index }) => { },
									onToFullscreenFinish: ({ index }) => { },
									onToGridStart: ({ index }) => { },
									onToGridFinish: ({ index, lastIndex }) => { }
								},
								options
							)
						);

						return transitionEffect;
					}

					let currentIndex;
					const itemsWrapper = document.getElementById("itemsWrapper");
					const thumbs = [...itemsWrapper.querySelectorAll("img.grid__item-img:not(.grid__item-img--large)")];

					let transitionEffectDuration = 0.0;
					let transitionEffect = null;

					if ($(".webgl-fitthumbs").hasClass("fx-one")) {

						//FX 01 ////////////////////////////// .fx-one  

						transitionEffectDuration = 2.2;
						transitionEffect = createDemoEffect({
							timing: {
								type: "sameEnd",
								sections: 0,
								duration: transitionEffectDuration,
							},
							activation: {
								type: "mouse"
							},
							transformation: {
								type: "wavy",
								props: { seed: "5000", frequency: 1, amplitude: 0 }
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Cubic.easeInOut
							}
						});

					} else if ($(".webgl-fitthumbs").hasClass("fx-two")) {

						//FX 02 ////////////////////////////// .fx-two  

						transitionEffectDuration = 1.8;
						transitionEffect = createDemoEffect({
							activation: { type: "mouse" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "simplex",
								props: {
									seed: "8000",
									frequencyX: 0.2,
									frequencyY: 0.2,
									amplitudeX: 0.3,
									amplitudeY: 0.3
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Power1.easeInOut
							}
						});

					} else if ($(".webgl-fitthumbs").hasClass("fx-three")) {

						//FX 03 ////////////////////////////// .fx-three  

						transitionEffectDuration = 1.8;
						transitionEffect = createDemoEffect({
							activation: { type: "mouse" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "flipX"
							},
							flipBeizerControls: {
								c0: {
									x: 0.4,
									y: -0.8
								},
								c1: {
									x: 0.5,
									y: 0.9
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Power1.easeInOut
							}
						});

					} else if ($(".webgl-fitthumbs").hasClass("fx-four")) {


						//FX 04 ////////////////////////////// .fx-four  

						transitionEffectDuration = 1.5;
						transitionEffect = createDemoEffect({
							activation: { type: "sinX" },
							flipX: false,
							timing: {
								type: "sections",
								sections: 4,
								duration: transitionEffectDuration
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Power3.easeIn
							}
						});

					} else if ($(".webgl-fitthumbs").hasClass("fx-five")) {


						//FX 05 ////////////////////////////// .fx-five  

						transitionEffectDuration = 1.8;
						transitionEffect = createDemoEffect({
							timing: {
								type: "sections",
								sections: 1,
								duration: transitionEffectDuration
							},
							activation: {
								type: "mouse"
							},
							transformation: {
								type: "wavy",
								props: {
									seed: "8000",
									frequency: 0.1,
									amplitude: 1
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Cubic.easeInOut
							}
						});

					} else if ($(".webgl-fitthumbs").hasClass("fx-six")) {


						//FX 06 ////////////////////////////// .fx-six  

						transitionEffectDuration = 2;
						transitionEffect = createDemoEffect({
							activation: { type: "bottom" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "wavy",
								props: {
									frequency: 1,
									amplitude: 0
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Power2.easeInOut
							}
						});

					} else if ($(".webgl-fitthumbs").hasClass("fx-seven")) {


						//FX 07 ////////////////////////////// .fx-seven  

						transitionEffectDuration = 2;
						transitionEffect = createDemoEffect({
							activation: { type: "none" },
							timing: {
								duration: transitionEffectDuration
							},
							transformation: {
								type: "none",
								props: {
									frequency: 1,
									amplitude: 0
								}
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Power2.easeInOut
							}
						});

					} else {

						//FX 01 ////////////////////////////// .fx-one  

						transitionEffectDuration = 2.2;
						transitionEffect = createDemoEffect({
							timing: {
								type: "sameEnd",
								sections: 0,
								duration: transitionEffectDuration,
							},
							activation: {
								type: "mouse"
							},
							transformation: {
								type: "wavy",
								props: { seed: "5000", frequency: 0.1, amplitude: 1 }
							},
							onToFullscreenStart: ({ index }) => {
								currentIndex = index;
								thumbs[currentIndex].style.opacity = 1;
								gsap.to(itemsWrapper, { duration: .6, ease: Power1.easeInOut, opacity: 1, delay: 0, });
								toggleFullview();
							},
							onToGridStart: ({ index }) => {
								gsap.to(itemsWrapper, { duration: 1, ease: Power3.easeInOut, scale: 1, opacity: 1, });
								toggleFullview();
							},
							onToGridFinish: ({ index, lastIndex }) => {
								thumbs[lastIndex].style.opacity = 1;
							},
							easings: {
								toFullscreen: Cubic.easeInOut
							}
						});
					}

					transitionEffect.init();

					if ($('#itemsWrapperLinks').length > 0) {

						const itemsCaptions = document.getElementById("itemsWrapperLinks");
						const thumbsLink = [...itemsCaptions.querySelectorAll(".trigger-item-link")];
						for (let idxCaption = 0; idxCaption < thumbsLink.length; idxCaption++) {
							thumbsLink[idxCaption].addEventListener("click", transitionEffect.createOnMouseDown(idxCaption));
						}
					}

					const toggleFullview = () => {
						if (transitionEffect.isFullscreen) {
							transitionEffect.toGrid();
						}
					};

					// Preload all the images in the pageI
					imagesLoaded(document.querySelectorAll(".grid__item-img"), instance => {

						let images = [];
						for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
							let image = {
								element: instance.elements[i],
								image: instance.images[i].isLoaded ? instance.images[i].img : null
							};
							if (i % 2 === 0) {
								imageSet = {};
								imageSet.small = image;
							}

							if (i % 2 === 1) {
								imageSet.large = image;
								images.push(imageSet);
							}
						}
						transitionEffect.createTextures(images);
					});

				}

				var $body = $('body');
				$body.on('mousedown', function (evt) {
					$body.on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {

							$('#itemsWrapperLinks .trigger-item-link, #itemsWrapperLinks .trigger-item-link-secondary').on('click', function () {

								let parent_item = $(this).closest('.trigger-item');
								parent_item.addClass('above');




								/*if (!$('#clapat-page-content').hasClass("light-content")) {
									
									if (!$('.portfolio').hasClass("portfolio-shortcode")) {
										if (!parent_item.hasClass("change-header")) {
											$('#clapat-page-content').delay(700).queue(function(next){							
												$(this).addClass('light-content');
												next();
											});
										}								
									} else {								
										if (!parent_item.hasClass("change-header")) {
											$('#clapat-page-content').delay(700).queue(function(next){							
												$(this).removeClass('light-content');
												next();
											});
										}
									}													
								} else {							
									if (!$('.portfolio').hasClass("portfolio-shortcode")) {
										if (parent_item.hasClass("change-header")) {
											$('#clapat-page-content').delay(700).queue(function(next){							
												$(this).removeClass('light-content');
												next();
											});
										}
									} else {
										if (!parent_item.hasClass("change-header")) {
											$('#clapat-page-content').delay(700).queue(function(next){							
												$(this).removeClass('light-content');
												next();
											});
										}
										
									}							
								}*/



								$('.clapat-slider-wrapper .trigger-item').each(function () {
									if (!$(this).hasClass("above")) {
										gsap.to($(this), { duration: 0.4, delay: 0, opacity: 0, ease: Power4.easeInOut });
									} else {
										gsap.to($(this), { duration: 0.5, delay: 0.4, opacity: 0, ease: Power4.easeInOut });
									}
								});

								gsap.to('#hero, #show-filters, .item-caption-wrapper, .showcase-portfolio .slide-caption, #page-nav, .clapat-footer, .fadeout-element', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
								gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', opacity: 1 });
								gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
								$("#ball").removeClass("with-icon");
								$('#ball p').remove();
								$('#ball i').remove();

								if ($('body').hasClass('hero-below-caption')) {
									gsap.to('#app canvas', { duration: 1, scale: 0.5, delay: 0.7, ease: Power3.easeInOut });
								}

								$(this).delay(1000).queue(function () {
									var link = $(".above").find('a');
									link.trigger('click');
								});
							});

						}

						$body.off('mouseup mousemove', handler);

					});
				});





			}
		}

	}//End FitThumbScreenWEBGL



	/*--------------------------------------------------
	Function Shortcodes
	---------------------------------------------------*/

	window.Shortcodes = function () {

		// Copy Mail

		$('#copy-email').on('click', function () {
			var email = $(this).text();
			var clickedMessage = $(this).data('clicked-message');
			var $this = $(this);
			$(this).addClass("copied");

			// Verificăm dacă navigator.clipboard este disponibil
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(email).then(function () {
					$('#ball p').remove();
					$("#ball").append('<p class="center-first" style="color:#000">' + clickedMessage + '</p>');
				}).catch(function (err) {
					$("#ball p").remove();
					$("#ball").append('<p class="center-first" style="color:#000">Failed to copy email!</p>');
					console.error('Error copying email: ', err);
				});
			} else {
				// Fallback: creăm un textarea pentru a copia emailul
				var $temp = $('<textarea>');
				$('body').append($temp);
				$temp.val(email).select();
				document.execCommand('copy');
				$temp.remove();

				$('#ball p').remove();
				$("#ball").append('<p class="center-first" style="color:#000">' + clickedMessage + '</p>');
			}
		});


		$("#copy-email").on('mouseenter', function () {
			var primaryColor = $('body').attr("data-primary-color");
			var $this = $(this);
			if (!$(this).hasClass('copied')) {
				gsap.to($this, { duration: 0.3, scale: 0.95, rotation: 0, ease: "power1.out" });
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: primaryColor, backgroundColor: primaryColor });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#ball p").remove();
				$("#ball").append('<p class="center-first" style="color:#000">' + $this.data("hover-message") + '</p>');
				gsap.to('.content-row', { opacity: 0.1, duration: 0.3 });
				gsap.to($this.closest('.content-row'), { opacity: 1, duration: 0.3 });
			} else if ($(this).hasClass('copied')) {
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: primaryColor, backgroundColor: primaryColor });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#ball p").remove();
				$("#ball").append('<p class="center-first" style="color:#000">' + $this.data("clicked-message") + '</p>');
			}
		}).on('mouseleave', function () {
			var $this = $(this);
			gsap.to($this, { duration: 0.3, scale: 1, rotation: 0, ease: "power1.out" });
			gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			$("#ball").removeClass("with-blur color-cursor");
			$('#ball p').remove();
			gsap.to('.content-row', { opacity: 1, duration: 0.3 });
		});

		// Buttons

		$('.button-border').each(function () {
			$(this).css('background-color', function () { return $(this).data('btncolor') });
			$(this).css('border-color', function () { return $(this).data('btncolor') });
			$(this).find("a").css('color', function () { return $(this).parent().data('btntextcolor') });
		});

		$('.button-border.outline').each(function () {
			$(this).css('background-color', 'transparent');
			$(this).css('border-color', function () { return $(this).data('btncolor') });
			$(this).find("a").css('color', function () { return $(this).parent().data('btncolor') });
			$(".button-border.outline").mouseenter(function (e) {
				$(this).css('background-color', function () { return $(this).data('btncolor') });
				$(this).css('border-color', function () { return $(this).data('btncolor') });
				$(this).find("a").css('color', function () { return $(this).parent().data('btntextcolor') });
			});
			$(".button-border.outline").mouseleave(function (e) {

				$(this).css('background-color', 'transparent');
				$(this).css('border-color', function () { return $(this).data('btncolor') });
				$(this).find("a").css('color', function () { return $(this).parent().data('btncolor') });
			});
		});

		// Accordion	  

		$('dd.accordion-content').slideUp(1).addClass('hide');
		$('dl.accordion').on('click', 'dt', function () {
			$(this).addClass('accordion-active').next().slideDown(350).siblings('dd.accordion-content').slideUp(350).prev().removeClass('accordion-active');
			$(this).delay(500).queue(function () {
				ScrollTrigger.refresh();
			});
		});
		$('dl.accordion').on('click', 'dt.accordion-active', function () {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(350);
			$(this).delay(500).queue(function () {
				ScrollTrigger.refresh();
			});
		});

		$(".flexnav").flexNav({ 'animationSpeed': 250 });

		// Project Share	

		$("#share").jsSocials({
			showLabel: false,
			showCount: false,
			shares: ["facebook", "twitter", "pinterest"]
		});

		$('.jssocials-share').wrap("<div class='parallax-wrap'><div class='parallax-element'></div></div>");

		if ($('.random-collage-wrap').length > 0) {

			if ($(window).width() >= 1024) {

				$(".random-collage .rc-slide .item-wrap-image").on('mouseenter', function () {
					var $this = $(this);
					gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor: $("body").data('primary-color'), backgroundColor: $("body").data('primary-color') });
					gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
					$("#ball").append('<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>');
				});

				$(".random-collage .rc-slide .item-wrap-image").on('mouseleave', function () {
					gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
					gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
					$('#ball p').remove();
				});

			}
		}


		if ($('.has-scale-image').length > 0) {
			$('.has-scale-image').each(function () {
				var imgSrc = $(this).attr('data-img');
				var bgColor = $(this).attr('data-bgcolor');
				var hiddenImageDiv = $('<div class="hidden-image"></div>');
				hiddenImageDiv.css({
					'background-image': 'url(' + imgSrc + ')',
					'background-color': bgColor // Adaugă culoarea de fundal
				});
				$(this).append(hiddenImageDiv);

				gsap.to(this, {
					opacity: 1,
					scale: 1,
					duration: 0.7,
					stagger: 0.5,
					ease: "back.out(4)",
					scrollTrigger: {
						trigger: this,
						start: "top 90%",
					}
				});

				$(this).on('mouseenter', function () {
					gsap.to(this, {
						duration: 0.3,
						borderRadius: '2px',
						scale: 4,
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' // Add box shadow here
					});
				}).on('mouseleave', function () {
					gsap.to(this, {
						duration: 0.3,
						borderRadius: '6px',
						scale: 1,
						boxShadow: 'none' // Reset box shadow on mouse leave
					});
				});

			});
		}



		if ($('.has-hover-image').length > 0) {

			var parent_row = $('.has-hover-image').closest('.content-row');
			parent_row.css("z-index", "10");

			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
					{ renderByPixels: true, damping: 0.1 });
			}

			const getMousePos = (e) => {
				let posx = 0;
				let posy = 0;
				if (!e) e = window.event;
				if (e.pageX || e.pageY) {
					posx = e.pageX;
					posy = e.pageY;
				}
				else if (e.clientX || e.clientY) {
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				return { x: posx, y: posy }
			}

			// Effect 1
			class HoverImgFx1 {
				constructor(el) {
					this.DOM = { el: el };
					this.DOM.reveal = document.createElement('div');
					this.DOM.reveal.className = 'hover-reveal';
					this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
					this.DOM.el.appendChild(this.DOM.reveal);
					this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
					this.DOM.revealInner.style.overflow = 'hidden';
					this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

					this.initEvents();
				}
				initEvents() {

					this.positionElement = (ev) => {
						const mousePos = getMousePos(ev);
						if ($("body").hasClass("smooth-scroll")) {
							const docScrolls = {
								left: document.body.scrollLeft + document.documentElement.scrollLeft,
								top: - scrollbar.scrollTop
							};

							gsap.to($('.hover-reveal'), { duration: 0.7, top: `${mousePos.y - (this.DOM.el.querySelector('.hover-reveal').offsetHeight * 0.5) - docScrolls.top}px`, left: `${mousePos.x - (this.DOM.el.querySelector('.hover-reveal').offsetWidth * 0.5) - docScrolls.left}px`, ease: Power4.easeOut });
						} else {
							const docScrolls = {
								left: document.body.scrollLeft + document.documentElement.scrollLeft,
								top: document.body.scrollTop + document.documentElement.scrollTop
							};
							gsap.to($('.hover-reveal'), { duration: 0.7, top: `${mousePos.y - (this.DOM.el.querySelector('.hover-reveal').offsetHeight * 0.5) - docScrolls.top}px`, left: `${mousePos.x - (this.DOM.el.querySelector('.hover-reveal').offsetWidth * 0.5) - docScrolls.left}px`, ease: Power4.easeOut });
						}

					};
					this.mouseenterFn = (ev) => {
						this.positionElement(ev);
						this.showImage();
					};
					this.mousemoveFn = ev => requestAnimationFrame(() => {
						this.positionElement(ev);
					});
					this.mouseleaveFn = () => {
						this.hideImage();
					};

					this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
					this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
					this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
				}
				showImage() {
					TweenMax.killTweensOf(this.DOM.revealInner);
					TweenMax.killTweensOf(this.DOM.revealImg);

					this.tl = new TimelineMax({
						onStart: () => {
							this.DOM.reveal.style.opacity = 1;
							TweenMax.set(this.DOM.el, { zIndex: 1000 });
						}
					})
						.add('begin')
						.add(new TweenMax(this.DOM.revealInner, 0.3, {
							ease: Sine.easeOut,
							startAt: { x: '-100%' },
							x: '0%'
						}), 'begin')
						.add(new TweenMax(this.DOM.revealImg, 0.3, {
							ease: Sine.easeOut,
							startAt: { x: '100%' },
							x: '0%'
						}), 'begin');
				}
				hideImage() {
					TweenMax.killTweensOf(this.DOM.revealInner);
					TweenMax.killTweensOf(this.DOM.revealImg);

					this.tl = new TimelineMax({
						onStart: () => {
							TweenMax.set(this.DOM.el, { zIndex: 999 });
						},
						onComplete: () => {
							TweenMax.set(this.DOM.el, { zIndex: '' });
							TweenMax.set(this.DOM.reveal, { opacity: 0 });
						}
					})
						.add('begin')
						.add(new TweenMax(this.DOM.revealInner, 0.3, {
							ease: Sine.easeOut,
							x: '100%'
						}), 'begin')

						.add(new TweenMax(this.DOM.revealImg, 0.3, {
							ease: Sine.easeOut,
							x: '-100%'
						}), 'begin');
				}
			}

			Array.from(document.querySelectorAll('.has-hover-image')).forEach(link => new HoverImgFx1(link));

		}

	}//End Shortcodes




	/*--------------------------------------------------
	Function Sliders
	---------------------------------------------------*/

	window.Sliders = function () {

		if ($('.content-slider').length > 0) {

			slider = new ClapatSlider('.content-slider', {
				direction: 'horizontal',
				snap: true,
				mousewheel: false,
				renderBullet: function (index, className) {
					return '<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">' +
						'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke="#FFF"' + 'stroke-opacity="1" stroke-width="2px"></circle>' + '<circle class="solid-fill" cx="10" cy="10" r="3" fill="#FFF"></circle>' + '</svg></div></div>';
				},
			});

			$(".slider-button-prev").mouseenter(function (e) {
				var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', { color: modifyMouseColor });
					gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: modifyMouseColor });
				} else {
					if ($(this).parents(".clapat-slider-wrapper").hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff', backgroundColor: '#fff' });
					} else if ($(this).parents(".clapat-slider-wrapper").hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#000', backgroundColor: '#000' });
					}
				}
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-icon").append('<i class="fa fa-chevron-left"></i>');
			}).mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon color-cursor");
				$('#ball i').remove();
				$("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
			});

			$(".slider-button-next").mouseenter(function (e) {
				var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', { color: modifyMouseColor });
					gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: modifyMouseColor });
				} else {
					if ($(this).parents(".clapat-slider-wrapper").hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff', backgroundColor: '#fff' });
					} else if ($(this).parents(".clapat-slider-wrapper").hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#000', backgroundColor: '#000' });
					}
				}
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-icon").append('<i class="fa fa-chevron-right"></i>');
			}).mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon color-cursor");
				$('#ball i').remove();
				$("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
			});

			$('.content-slider.looped-carousel .clapat-slider, .content-slider.small-looped-carousel .clapat-slider').on('mouseenter mousemove', function () {
				$("body").addClass("scale-drag-x");
				var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', { color: modifyMouseColor });
					gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: modifyMouseColor });
				} else {
					if ($(this).parent().hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff', backgroundColor: '#fff' });
					} else if ($(this).parent().hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#000', backgroundColor: '#000' });
					}
				}

			}).on('mouseleave', function () {
				$("#ball").removeClass("color-cursor");
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				$("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
			});


			imagesLoaded('body', function () {
				setTimeout(function () {
					if (slider != null) {
						slider.update();
					}
				}, 1000);
			});

		}

	}//End Sliders	


	/*--------------------------------------------------
	Function Justified Grid
	---------------------------------------------------*/

	window.JustifiedGrid = function () {

		if ($('.justified-grid').length > 0) {

			$('.justified-grid').justifiedGallery({
				rowHeight: 360,
				lastRow: 'nojustify',
				margins: 10
			});

		}

	}//End Justified Grid	


	/*--------------------------------------------------
	Function Lightbox
	---------------------------------------------------*/

	window.Lightbox = function () {

		// Image Popup
		const items = gsap.utils.toArray(".image-link");

		let sourceItem = null; // keeps track of which item is the source (clicked to open)
		let activeItem = null; // keeps track of which item is opened (details)

		// Add click listeners
		function showDetails(item) {

			if (sourceItem) { // someone could click on an element behind the open details panel in which case we should just ignore it.

				return;
			}

			event.preventDefault();

			$('body').prepend(`<div class="clapat-img-popup">
				<div class="clapat-img-popup-bg-close"></div>				
				<div class="clapat-img-popup-viewport">
					<div class="clapat-img-popup-preloader"><div></div><div></div><div></div><div></div></div>					
					<img />
					<div class="clapat-img-popup-close link"></div>						
				</div>				
				<div class="clapat-img-popup-prev link"></div>
				<div class="clapat-img-popup-next link"></div></div>`);

			const details = document.querySelector('.clapat-img-popup');
			const detailsBgClose = document.querySelector('.clapat-img-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-img-popup-close');
			const detailsPreloader = document.querySelector('.clapat-img-popup-preloader');
			const detailImage = document.querySelector('.clapat-img-popup img');
			const detailPrev = document.querySelector('.clapat-img-popup-prev');
			const detailNext = document.querySelector('.clapat-img-popup-next');

			gsap.to(detailsBgClose, { duration: 0.3, delay: 0, backgroundColor: "rgba(0,0,0,0.9)" });
			gsap.to(detailsPreloader, { duration: 0.2, opacity: 1 });
			gsap.set(detailImage, { opacity: 0 });

			$(".link, .button").mouseenter(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: "0px", scale: 1.5, backgroundColor: "rgba(153, 153, 153, 1)", opacity: 0.15 });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 4, left: 4 });
			});

			$(".link, .button").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.3, borderWidth: "4px", scale: 0.5, backgroundColor: "rgba(153, 153, 153, 0)", opacity: 1 });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			});

			let onLoad = () => {
				gsap.to(detailsPreloader, { duration: 0.2, opacity: 0 });
				gsap.set(detailImage, { opacity: 1 });
				// position the details on top of the item (scaled down)
				Flip.fit(details, item, { scale: true, fitChild: detailImage });

				// record the state				
				const state = Flip.getState(detailImage);

				// set the final state
				gsap.set(details, { clearProps: true }); // wipe out all inline stuff so it's in the native state (not scaled)

				gsap.to([detailsClose, detailPrev, detailNext], { duration: 0.3, delay: 0.6, opacity: 1 });

				Flip.from(state, {
					delay: 0.2,
					duration: 0.5,
					ease: "power2.inOut",
					scale: true,
				})

				detailImage.removeEventListener("load", onLoad);
				detailsBgClose.addEventListener('click', hideDetails);
				detailsClose.addEventListener('click', hideDetails);
				detailPrev.addEventListener('click', prevPopup);
				detailNext.addEventListener('click', nextPopup);
			};

			// change image
			detailImage.addEventListener("load", onLoad);
			detailImage.src = item.getAttribute('href');

			// set the source item that was clicked
			sourceItem = activeItem = item;
		}

		function hideDetails() {

			const details = document.querySelector('.clapat-img-popup');
			const detailsBgClose = document.querySelector('.clapat-img-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-img-popup-close');
			const detailImage = document.querySelector('.clapat-img-popup img');
			const detailPrev = document.querySelector('.clapat-img-popup-prev');
			const detailNext = document.querySelector('.clapat-img-popup-next');

			detailsBgClose.removeEventListener('click', hideDetails);
			detailsClose.removeEventListener('click', hideDetails);
			gsap.set(details, { overflow: "hidden" });

			// record the current state of details
			const state = Flip.getState(detailImage);

			// scale details down so that its detailImage fits exactly on top of sourceItem
			Flip.fit(detailImage, sourceItem, { scale: true, fitChild: detailImage });



			gsap.to([detailsClose, detailPrev, detailNext], { duration: 0.2, delay: 0, opacity: 0 });

			// animate from the original state to the current one.
			Flip.from(state, {
				scale: true,
				duration: 0.5,
				delay: 0.0, // time in ms if we want a delay before flip
				onComplete: () => gsap.to(detailsBgClose, {
					duration: 0.5, backgroundColor: "rgba(0,0,0,0)", onComplete: function () {
						$('.clapat-img-popup').remove();
					}
				}),
			});

			sourceItem = activeItem = null;
		}

		function nextPopup() {

			const detailsPreloader = document.querySelector('.clapat-img-popup-preloader');
			const detailImage = document.querySelector('.clapat-img-popup img');
			let currIndex = items.indexOf(activeItem);

			let nextIndex = currIndex + 1;
			if (nextIndex >= items.length) { nextIndex = 0; }

			gsap.to(detailsPreloader, { duration: 0.2, opacity: 1 });
			gsap.to(detailImage, { duration: 0.2, opacity: 0 });

			let onLoad = () => {
				gsap.to(detailsPreloader, { duration: 0.2, opacity: 0 });
				gsap.to(detailImage, { duration: 0.2, opacity: 1, delay: 0 });
				detailImage.removeEventListener("load", onLoad);
			}

			sourceItem = activeItem = items[nextIndex];
			detailImage.addEventListener("load", onLoad);
			detailImage.src = activeItem.getAttribute('href');
		}

		function prevPopup() {

			const detailsPreloader = document.querySelector('.clapat-img-popup-preloader');
			const detailImage = document.querySelector('.clapat-img-popup img');
			let currIndex = items.indexOf(activeItem);

			let prevIndex = currIndex - 1;
			if (prevIndex < 0) { prevIndex = items.length - 1; }

			gsap.to(detailsPreloader, { duration: 0.2, opacity: 1 });
			gsap.to(detailImage, { duration: 0.2, opacity: 0 });

			let onLoad = () => {
				gsap.to(detailsPreloader, { duration: 0.2, opacity: 0 });
				gsap.to(detailImage, { duration: 0.2, opacity: 1 });
				detailImage.removeEventListener("load", onLoad);
			}

			sourceItem = activeItem = items[prevIndex];
			detailImage.addEventListener("load", onLoad);
			detailImage.src = activeItem.getAttribute('href');
		}

		gsap.utils.toArray('.image-link').forEach(item => item.addEventListener('click', () => showDetails(item)));

		$(".image-link").mouseenter(function (e) {
			var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
			if (modifyMouseColor) {
				$("#ball").addClass("color-cursor");
				gsap.set('#ball.color-cursor', { color: modifyMouseColor });
				gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: modifyMouseColor });
			} else {
				gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff' });
			}
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
			$("#ball").addClass("with-icon").append('<i class="fa-solid fa-plus"></i>');
		});

		$(".image-link").mouseleave(function (e) {
			gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', });
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			$("#ball").removeClass("with-icon color-cursor");
			$('#ball i').remove();
		});

		// Video Popup
		const videoItems = gsap.utils.toArray(".video-link");

		let sourceVideoItem = null; // keeps track of which item is opened (details)

		// Add click listeners
		function showVideoDetails(event, item) {

			event.preventDefault();

			if (sourceVideoItem) { // someone could click on an element behind the open details panel in which case we should just ignore it.

				return;
			}

			$('body').prepend(`<div class="clapat-video-popup">
				<div class="clapat-video-popup-bg-close"></div>				
				<div class="clapat-video-popup-viewport">
					<div class="clapat-video-popup-preloader"><div></div><div></div><div></div><div></div></div>					
					<iframe class="clapat-video-popup-iframe" frameborder="0" allow="autoplay"></iframe>
					<div class="clapat-video-popup-close link"></div>						
				</div>				
				<div class="clapat-img-video-prev link"></div>
				<div class="clapat-img-video-next link"></div></div>`);

			const details = document.querySelector('.clapat-video-popup');
			const detailsBgClose = document.querySelector('.clapat-video-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-video-popup-close');
			const detailsPreloader = document.querySelector('.clapat-video-popup-preloader');
			const detailIframe = document.querySelector('.clapat-video-popup iframe');

			gsap.to(detailsBgClose, { duration: 0.3, delay: 0, backgroundColor: "rgba(0,0,0,0.9)" });
			gsap.to(detailsPreloader, { duration: 0.2, opacity: 1 });
			gsap.set(detailIframe, { opacity: 0 });

			$(".link, .button").mouseenter(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: "0px", scale: 1.5, backgroundColor: "rgba(153, 153, 153, 1)", opacity: 0.15 });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 4, left: 4 });
			});

			$(".link, .button").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.3, borderWidth: "4px", scale: 0.5, backgroundColor: "rgba(153, 153, 153, 0)", opacity: 1 });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			});

			let onVideoLoad = () => {
				gsap.to(detailsPreloader, {
					duration: 0.2, opacity: 0, onComplete: function () {
						gsap.to(detailIframe, { duration: 0.3, delay: 0, opacity: 1 });
					}
				});
				console.log('Popup Video is ready to play.');
			}

			// load the video
			detailIframe.addEventListener("load", onVideoLoad);
			let videoUrl = item.getAttribute('href');
			if (videoUrl.indexOf('vimeo.com/') >= 0) {

				// this is a vimeo url, extract the video id from it
				let regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
				let parseUrl = regExp.exec(videoUrl);
				let videoId = parseUrl[5];
				detailIframe.src = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1';
			}
			else if (videoUrl.indexOf('youtube.com/') >= 0) {

				// this is a youtube url, extract the video id from it
				let videoId = videoUrl.split('v=')[1];
				let ampersandPosition = videoId.indexOf('&');
				if (ampersandPosition != -1) {

					videoId = videoId.substring(0, ampersandPosition);
				}
				detailIframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
			}
			else {

				// give it a try anyway
				detailIframe.src = item.getAttribute('href');
			}

			// assign the current item
			sourceVideoItem = item;

			// set the final state
			gsap.set(details, { clearProps: true });
			gsap.to([detailsClose], { duration: 0.3, delay: 0.6, opacity: 1 });

			detailsBgClose.addEventListener('click', hideVideoDetails);
			detailsClose.addEventListener('click', hideVideoDetails);

		}

		function hideVideoDetails() {

			const details = document.querySelector('.clapat-video-popup');
			const detailsBgClose = document.querySelector('.clapat-video-popup-bg-close');
			const detailsClose = document.querySelector('.clapat-video-popup-close');
			const detailIframe = document.querySelector('.clapat-video-popup iframe');

			detailsBgClose.removeEventListener('click', hideDetails);
			detailsClose.removeEventListener('click', hideDetails);

			gsap.to([detailsClose, detailIframe], { duration: 0.2, delay: 0, opacity: 0 });

			gsap.to(detailsBgClose, {
				duration: 0.5, delay: 0.2, backgroundColor: "rgba(0,0,0,0)", onComplete: function () {
					$('.clapat-video-popup').remove();
				}
			}),

				sourceVideoItem = null;

		}

		gsap.utils.toArray('.video-link').forEach(item => item.addEventListener('click', (e) => showVideoDetails(e, item)));

		$(".video-link").mouseenter(function (e) {
			var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
			if (modifyMouseColor) {
				$("#ball").addClass("color-cursor");
				gsap.set('#ball.color-cursor', { color: modifyMouseColor });
				gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: modifyMouseColor });
			} else {
				gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff' });
			}
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
			$("#ball").addClass("with-icon").append('<i class="fa-solid fa-play"></i>');
		});

		$(".video-link").mouseleave(function (e) {
			gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', });
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			$("#ball").removeClass("with-icon color-cursor");
			$('#ball i').remove();
		});

	}//End Lightbox	



	/*--------------------------------------------------
	Function Page PlayVideo
	---------------------------------------------------*/

	window.PlayVideo = function () {

		if ($('.video-wrapper').length > 0) {


			$(".video-wrapper").mouseenter(function (e) {
				var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', { color: modifyMouseColor });
					gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: modifyMouseColor });
				} else {
					gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff' });
				}
				if ($(this).hasClass("play")) {
					$("#ball").addClass("pause-movie")
				}
				$("#ball").addClass("over-movie").append('<i class="fa fa-play"></i><i class="fa fa-pause"></i>');
			});

			$(".video-wrapper").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', });
				$("#ball").removeClass("over-movie pause-movie color-cursor");
				$('#ball i').remove();
			});

			$(".video-wrapper .control").mouseenter(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '20px', scale: 0 });
			});

			$(".video-wrapper .control").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff', });
			});

			var videocenter = ($(window).height() - $('.video-cover').height()) / 2

			var playpause = function (videoObj) {

				if (videoObj[0] != null) {
					if (videoObj[0].paused || videoObj[0].ended) {

						videoObj.parent().addClass('play');
						videoObj[0].play();
					}
					else {

						videoObj.parent().removeClass('play');
						videoObj[0].pause();
					}
				}
			};

			//Time format converter - 00:00
			var timeFormat = function (seconds) {
				var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
				var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
				return m + ":" + s;
			};

			// Events
			// click to video cover - will start the video
			$('.video-wrapper').on('click', function () {

				$('html,body').animate({ scrollTop: $(this).offset().top - videocenter }, 390);
				// hide the video cover in order to start playing
				$(this).find('.video-cover').addClass('hidden');

				$("#ball").toggleClass("pause-movie");

				// pause first the other videos
				var current_wrapper = $(this);
				$('#main-page-content').find('.video-wrapper').each(function () {

					if (!current_wrapper.is($(this))) {

						$(this).removeClass('play');
						$(this).find('video').each(function () {

							if (!$(this).get(0).paused && !$(this).get(0).ended) {

								$(this).get(0).pause();
							}
						});
					}

				});

				// trigger the click for the inner video
				$(this).find('video').each(function () {

					playpause($(this));
				});

			});

			//fullscreen button clicked
			$('.btnFS').on('click', function (e) {

				var parent_wrapper = $(this).closest('.video-wrapper');
				var video_object = parent_wrapper.find('video');

				if ($.isFunction(video_object[0].webkitEnterFullscreen)) {
					video_object[0].webkitEnterFullscreen();
				}
				else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
					video_object[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}


				// prevent video wrapper div responding the event
				e.stopPropagation();

			});

			//sound button clicked
			$('.sound').on('click', function (e) {

				var parent_wrapper = $(this).closest('.video-wrapper');
				var video_object = parent_wrapper.find('video');

				video_object[0].muted = !video_object[0].muted;
				$(this).toggleClass('muted');
				if (video_object[0].muted) {
					parent_wrapper.find('.volumeBar').css('width', 0);
				}
				else {
					parent_wrapper.find('.volumeBar').css('width', video_object[0].volume * 100 + '%');
				}

				// prevent video wrapper div responding the event
				e.stopPropagation();
			});

			//progress bar (video timebar) clicked
			$('.progress').on('click', function (e) {

				var parent_wrapper = $(this).closest('.video-wrapper');
				var video_object = parent_wrapper.find('video');

				// calculate click position
				// and update video current time
				// as well as progress bar
				var maxduration = video_object[0].duration;
				var position = e.pageX - $(this).offset().left;
				var percentage = 100 * position / $(this).width();
				if (percentage > 100) {

					percentage = 100;
				}
				if (percentage < 0) {

					percentage = 0;
				}
				$('.timeBar').css('width', percentage + '%');
				video_object[0].currentTime = maxduration * percentage / 100;

				// prevent video wrapper div responding the event
				e.stopPropagation();
			});

			$('#main-page-content').find('video').each(function () {

				var video = $(this);
				var video_wrapper = $(this).parent();

				//remove default control when JS loaded
				video[0].removeAttribute("controls");
				video_wrapper.find('.control').fadeIn(500);
				video_wrapper.find('.caption').fadeIn(500);

				//before everything get started and we have the info about the video such as duration
				video.on('loadedmetadata', function () {

					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					//set video properties
					parent_wrapper.find('.current').text(timeFormat(0));
					parent_wrapper.find('.duration').text(timeFormat(video[0].duration));

				});

				//display current video buffered progress
				video.on('progress', function () {

					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					var maxduration = video_object[0].duration;

					if (maxduration > 0) {
						for (var i = 0; i < video_object[0].buffered.length; i++) {
							if (video_object[0].buffered.start(video_object[0].buffered.length - 1 - i) < video_object[0].currentTime) {
								var perc = (video_object[0].buffered.end(video_object[0].buffered.length - 1 - i) / maxduration) * 100 + "%";
								parent_wrapper.find('.bufferBar').css('width', perc + '%');
								break;
							}
						}
					}

				});

				//display current video play time
				video.on('timeupdate', function () {

					var parent_wrapper = $(this).parent();
					var currentPos = $(this).get(0).currentTime;
					var maxduration = $(this).get(0).duration;
					var perc = 100 * currentPos / maxduration;
					parent_wrapper.find('.timeBar').css('width', perc + '%');
					parent_wrapper.find('.current').text(timeFormat(currentPos));
				});

				//video screen and play button clicked
				video.on('click', function () {

					playpause($(this));
				});

				//video canplay event
				video.on('canplay', function () {

					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeOut(100); //?
				});

				//video canplaythrough event
				//solve Chrome cache issue
				var completeloaded = false;
				video.on('canplaythrough', function () {

					completeloaded = true;
				});

				//video ended event
				video.on('ended', function () {

					$(this).get(0).pause();
					$(this).parent().removeClass("play");
					$("#ball").toggleClass("pause-movie");
				});

				//video seeking event
				video.on('seeking', function () {

					//if video fully loaded, ignore loading screen
					if (!completeloaded) {
						var parent_wrapper = $(this).parent();
						parent_wrapper.find('.loading').fadeIn(200); //?
					}
				});

				//video seeked event
				video.on('seeked', function () { });

				//video waiting for more data event
				video.on('waiting', function () {

					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeIn(200); //?
				});

			});

		}

	}// End PlayVideo

	window.isMobile = function () {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			$('body').addClass("disable-cursor");
			return true

		}
		else {
			if ($(window).width() <= 1024) {
				$('body').addClass("disable-cursor");
				return true
			}
		};
		return false
	};



	/*--------------------------------------------------
	Function Core
	---------------------------------------------------*/

	window.Core = function () {

		if (!isMobile() && !$('body').hasClass("disable-cursor")) {
			var mouse = { x: 0, y: 0 };
			var pos = { x: 0, y: 0 };
			var ratio = 0.65;
			var active = false;
			var ball = document.getElementById("ball");
			var ballloader = document.getElementById("ball-loader");
			var offsetX = 40;

			var multiplier = 0.25;
			var isBlurEnabled = false;  // Variabila pentru a activa/dezactiva blur-ul

			gsap.set(ball, { xPercent: -50, yPercent: -50, scale: 0.5, borderWidth: '4px' });

			document.addEventListener("mousemove", mouseMove);
			gsap.ticker.add(updatePosition);

			function mouseMove(e) {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				mouse.x = e.pageX;
				mouse.y = e.pageY - scrollTop;
			}

			function updatePosition() {
				if (!active) {
					pos.x += (mouse.x - pos.x) * ratio;
					pos.y += (mouse.y - pos.y) * ratio;

					gsap.to(ball, { duration: 0.4, x: pos.x, y: pos.y });

					// Aplicăm blur-ul doar dacă este activat
					if (isBlurEnabled) {
						var deltaX = Math.abs(mouse.x - pos.x);
						var deltaY = Math.abs(mouse.y - pos.y);
						var blurAmount = Math.max(deltaX, deltaY) * multiplier;

						gsap.to(ball, {
							duration: 0.1,
							filter: `blur(${blurAmount}px)`
						});
					} else {
						// Dacă blur-ul este dezactivat, resetăm la 0
						gsap.to(ball, {
							duration: 0.1,
							filter: `blur(0px)`
						});
					}
				}
			}


			$(".sticky.left").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.left - offsetX;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px' });
				gsap.ticker.remove(updatePosition);
			})

			$(".sticky.right").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.right + offsetX;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px' });
				gsap.ticker.remove(updatePosition);
			})

			$("#main .sticky.left").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.left - offsetX + 10;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.7, opacity: 0.6, borderWidth: '6px', borderColor: '#999999' });
				gsap.ticker.remove(updatePosition);
			})

			$("#main .sticky.right").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.right + offsetX - 10;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.7, opacity: 0.6, borderWidth: '6px', borderColor: '#999999' });
				gsap.ticker.remove(updatePosition);
			})

			$(".clapat-button .sticky.left").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.left + 22;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: '#000' });
				gsap.ticker.remove(updatePosition);
			})

			$(".clapat-button .sticky.right").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.right - 22;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: '#000' });
				gsap.ticker.remove(updatePosition);
			})

			$(".sticky").mouseleave(function (e) {
				gsap.to(ball, { duration: 0.2, scale: 0.5, borderWidth: '4px', borderColor: '#999999', opacity: 1 });
				gsap.ticker.add(updatePosition);
			})

			$(".parallax-wrap").mouseenter(function (e) {
				var currentElement = $(this);
				var primaryColor = currentElement.data('border-color') || $("body").data('primary-color');
				var scaleValue, borderWidthValue;
				if (currentElement.hasClass('1x')) {
					scaleValue = 0.6;
					borderWidthValue = '4px';
				} else {
					scaleValue = 0.9;
					borderWidthValue = '2px';
				}

				gsap.to(this, { duration: 0.3, scale: 2 });
				gsap.to(ball, { duration: 0.3, scale: scaleValue, borderWidth: borderWidthValue, opacity: 1, borderColor: primaryColor });
				gsap.to($(this).children(), { duration: 0.3, scale: 0.5 });
				active = true;
			});

			$("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.3, scale: 0.7, borderWidth: '6px', opacity: 0.6, borderColor: '#999' });
			});

			$(".clapat-button .parallax-wrap.icon-wrap").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.05, scale: 0.4, borderWidth: '0px', opacity: 1, borderColor: '#000' });
			});

			$(".parallax-wrap.bigger").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.3, scale: 1.35, borderWidth: '2px', opacity: 1 });
			});

			$(".parallax-wrap").mouseleave(function (e) {
				gsap.to(this, { duration: 0.3, scale: 1 });
				gsap.to(ball, { duration: 0.3, scale: 0.5, borderWidth: '4px', opacity: 1, borderColor: '#999999' });
				gsap.to($(this).children(), { duration: 0.3, scale: 1, x: 0, y: 0 });
				active = false;
			});

			$(".sticky").mouseenter(function (e) {
				var currentElement = $(this);
				var borderColor = currentElement.siblings(".parallax-wrap").data('border-color') || $("body").data('primary-color');

				var parallaxWrap = currentElement.siblings(".parallax-wrap");
				var scaleValue, borderWidthValue;
				if (parallaxWrap.hasClass('1x')) {
					scaleValue = 0.6;
					borderWidthValue = '4px';
				} else {
					scaleValue = 0.9;
					borderWidthValue = '2px';
				}

				gsap.to(ball, { duration: 0.5, borderColor: borderColor, scale: scaleValue, borderWidth: borderWidthValue });
			});

			$("#main .sticky").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.5, borderColor: '#999', scale: 0.7, borderWidth: "6px" });
			});

			$(".clapat-button .sticky").mouseenter(function (e) {
				if ($('#clapat-page-content').hasClass("light-content")) {
					gsap.to(ball, { duration: 0.5, borderColor: '#000' });
				} else {
					gsap.to(ball, { duration: 0.5, borderColor: '#fff' });
				}
			});

			$(".clapat-button .parallax-wrap").mouseenter(function (e) {
				if ($('#clapat-page-content').hasClass("light-content")) {
					gsap.to(ball, { duration: 0.05, borderColor: '#000' });
				} else {
					gsap.to(ball, { duration: 0.05, borderColor: '#fff' });
				}
			});
			$("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.3, borderColor: '#999' });
			});

			$(".parallax-wrap").mousemove(function (e) {
				parallaxCursor(e, this, 2);
				callParallax(e, this);
			});

			$(".button-icon-link .sticky.left").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.left + 20;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: 'transparent' });
				gsap.ticker.remove(updatePosition);
			});

			$(".button-icon-link .sticky.right").mouseenter(function (e) {
				var rcBounds = $(this)[0].getBoundingClientRect();
				var positionX = rcBounds.right - 20;
				var positionY = rcBounds.top + rcBounds.height / 2;
				gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: 'transparent' });
				gsap.ticker.remove(updatePosition);
			});

			$(".button-icon-link .parallax-wrap.icon-wrap").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.05, scale: 0.4, borderWidth: '0px', opacity: 1, borderColor: '#000' });
			});

			$(".button-icon-link .parallax-wrap").mouseenter(function (e) {
				gsap.to(ball, { duration: 0.05, borderColor: 'transparent' });
			});

			function callParallax(e, parent) {
				parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
			}

			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.pageX - boundingRect.left;
				var relY = e.pageY - boundingRect.top;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				gsap.to(target, {
					duration: 0.3,
					x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
					y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
					ease: Power2.easeOut
				});
			}

			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.pageX - rect.left;
				var relY = e.pageY - rect.top;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
				pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2 - scrollTop) / movement;
				gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
			}

			$(".hide-ball").mouseenter(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '1px', scale: 1, opacity: 0 });
			});

			$(".hide-ball").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, opacity: 1 });
			});

			$(".link, .button").mouseenter(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: "0px", scale: 1.5, backgroundColor: "rgba(153, 153, 153, 1)", opacity: 0.15 });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 4, left: 4 });
			});

			$(".link, .button").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.3, borderWidth: "4px", scale: 0.5, backgroundColor: "rgba(153, 153, 153, 0)", opacity: 1 });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			});

			//Blog Hover Effects			
			$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseenter(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '1px', scale: 1, opacity: 0 });
			});

			$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, opacity: 1 });
			});
		}

		if ($('body').hasClass("disable-ajaxload")) {
			return
		}

		jQuery(document).ready(function () {
			var isAnimating = false,
				newLocation = '';
			firstLoad = false;

			//trigger smooth transition from the actual page to the new one 
			$('main').on('click', '[data-type="page-transition"]', function (event) {
				event.preventDefault();
				//detect which page has been selected
				var newPage = $(this).attr('href');
				//if the page is not already being animated - trigger animation
				if (!isAnimating) changePage(newPage, true);
				firstLoad = true;
			});

			//detect the 'popstate' event - e.g. user clicking the back button
			$(window).on('popstate', function () {
				if (firstLoad) {

					/*
					Safari emits a popstate event on page load - check if firstLoad is true before animating
					if it's false - the page has just been loaded
					*/
					var newPage = location.href;

					if (!isAnimating && newLocation != newPage) changePage(newPage, false);
				}
				firstLoad = true;
			});

			function changePage(url, bool) {
				isAnimating = true;
				// trigger page animation
				$('body').addClass('page-is-changing');
				$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
					loadNewContent(url, bool);
					newLocation = url;
					$('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
				//if browser doesn't support CSS transitions
				if (!transitionsSupported()) {
					loadNewContent(url, bool);
					newLocation = url;
				}
			}

			function loadNewContent(url, bool) {
				url = ('' == url) ? 'index.html' : url;

				var section = $('<div class="cd-main-content "></div>');


				section.load(url + ' .cd-main-content > *', function (event) {
					// load new content and replace <main> content with the new one

					$('main').html(section);

					var clapat_title = event.match(/<title[^>]*>([^<]+)<\/title>/)[1];
					$('head title').html(clapat_title);

					// if we have Elementor inline styles in the target page
					headTags = [
						'style[id*=elementor-frontend-inline]',
						'style[id*="elementor-post"]',
						'link[id*="elementor-post"]',
						'link[id*="google-fonts"]',
					];
					var head = document.head;
					var newPageRawHead = event.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
					newPageHead = document.createElement('head');

					newPageHead.innerHTML = newPageRawHead;

					var oldHeadTags = head.querySelectorAll(headTags);
					var newHeadTags = newPageHead.querySelectorAll(headTags);

					// append new and remove old tags
					for (let i = 0; i < newHeadTags.length; i++) {
						if (typeof oldHeadTags[i] !== 'undefined') {
							head.insertBefore(newHeadTags[i], oldHeadTags[i].nextElementSibling);
							head.removeChild(oldHeadTags[i]);
						} else {
							head.insertBefore(newHeadTags[i], newHeadTags[i - 1]);
						}
					}

					$('html, body').scrollTop(0);

					//if browser doesn't support CSS transitions - dont wait for the end of transitions
					var delay = (transitionsSupported()) ? 30 : 0;
					setTimeout(function () {
						//wait for the end of the transition on the loading bar before revealing the new content				
						$('body').removeClass('page-is-changing');
						$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
							isAnimating = false;
							$('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
						})


						LoadViaAjax();

						if (!isMobile() && !$('body').hasClass("disable-cursor")) {
							$(".sticky.left").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.left - offsetX;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px' });
								gsap.ticker.remove(updatePosition);
							})

							$(".sticky.right").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.right + offsetX;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.9, borderWidth: '2px' });
								gsap.ticker.remove(updatePosition);
							})

							$("#main .sticky.left").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.left - offsetX + 10;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.7, opacity: 0.6, borderWidth: '6px', borderColor: '#999999' });
								gsap.ticker.remove(updatePosition);
							})

							$("#main .sticky.right").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.right + offsetX - 10;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.7, opacity: 0.6, borderWidth: '6px', borderColor: '#999999' });
								gsap.ticker.remove(updatePosition);
							})

							$(".clapat-button .sticky.left").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.left + 22;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: '#000' });
								gsap.ticker.remove(updatePosition);
							})

							$(".clapat-button .sticky.right").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.right - 22;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: '#000' });
								gsap.ticker.remove(updatePosition);
							})

							$(".sticky").mouseleave(function (e) {
								gsap.to(ball, { duration: 0.2, scale: 0.5, borderWidth: '4px', borderColor: '#999999', opacity: 1 });
								gsap.ticker.add(updatePosition);
							})

							$(".parallax-wrap").mouseenter(function (e) {
								var currentElement = $(this);
								var primaryColor = currentElement.data('border-color') || $("body").data('primary-color');
								var scaleValue, borderWidthValue;
								if (currentElement.hasClass('1x')) {
									scaleValue = 0.6;
									borderWidthValue = '4px';
								} else {
									scaleValue = 0.9;
									borderWidthValue = '2px';
								}

								gsap.to(this, { duration: 0.3, scale: 2 });
								gsap.to(ball, { duration: 0.3, scale: scaleValue, borderWidth: borderWidthValue, opacity: 1, borderColor: primaryColor });
								gsap.to($(this).children(), { duration: 0.3, scale: 0.5 });
								active = true;
							});

							$("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.3, scale: 0.7, borderWidth: '6px', opacity: 0.6, borderColor: '#999' });
							});

							$(".clapat-button .parallax-wrap.icon-wrap").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.05, scale: 0.4, borderWidth: '0px', opacity: 1, borderColor: '#000' });
							});

							$(".parallax-wrap.bigger").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.3, scale: 1.35, borderWidth: '2px', opacity: 1 });
							});

							$(".parallax-wrap").mouseleave(function (e) {
								gsap.to(this, { duration: 0.3, scale: 1 });
								gsap.to(ball, { duration: 0.3, scale: 0.5, borderWidth: '4px', opacity: 1, borderColor: '#999999' });
								gsap.to($(this).children(), { duration: 0.3, scale: 1, x: 0, y: 0 });
								active = false;
							});

							$(".sticky").mouseenter(function (e) {
								var currentElement = $(this);
								var borderColor = currentElement.siblings(".parallax-wrap").data('border-color') || $("body").data('primary-color');

								var parallaxWrap = currentElement.siblings(".parallax-wrap");
								var scaleValue, borderWidthValue;
								if (parallaxWrap.hasClass('1x')) {
									scaleValue = 0.6;
									borderWidthValue = '4px';
								} else {
									scaleValue = 0.9;
									borderWidthValue = '2px';
								}

								gsap.to(ball, { duration: 0.5, borderColor: borderColor, scale: scaleValue, borderWidth: borderWidthValue });
							});

							$("#main .sticky").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.5, borderColor: '#999', scale: 0.7, borderWidth: "6px" });
							});

							$(".clapat-button .sticky").mouseenter(function (e) {
								if ($('#clapat-page-content').hasClass("light-content")) {
									gsap.to(ball, { duration: 0.5, borderColor: '#000' });
								} else {
									gsap.to(ball, { duration: 0.5, borderColor: '#fff' });
								}
							});

							$(".clapat-button .parallax-wrap").mouseenter(function (e) {
								if ($('#clapat-page-content').hasClass("light-content")) {
									gsap.to(ball, { duration: 0.05, borderColor: '#000' });
								} else {
									gsap.to(ball, { duration: 0.05, borderColor: '#fff' });
								}
							});
							$("#main .parallax-wrap.icon-wrap").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.3, borderColor: '#999' });
							});

							$(".parallax-wrap").mousemove(function (e) {
								parallaxCursor(e, this, 2);
								callParallax(e, this);
							});

							$(".button-icon-link .sticky.left").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.left + 20;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: 'transparent' });
								gsap.ticker.remove(updatePosition);
							});

							$(".button-icon-link .sticky.right").mouseenter(function (e) {
								var rcBounds = $(this)[0].getBoundingClientRect();
								var positionX = rcBounds.right - 20;
								var positionY = rcBounds.top + rcBounds.height / 2;
								gsap.to(ball, { duration: 0.5, x: positionX, y: positionY, scale: 0.4, opacity: 1, borderWidth: '6px', borderColor: 'transparent' });
								gsap.ticker.remove(updatePosition);
							});

							$(".button-icon-link .parallax-wrap.icon-wrap").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.05, scale: 0.4, borderWidth: '0px', opacity: 1, borderColor: '#000' });
							});

							$(".button-icon-link .parallax-wrap").mouseenter(function (e) {
								gsap.to(ball, { duration: 0.05, borderColor: 'transparent' });
							});

							function callParallax(e, parent) {
								parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
							}

							function parallaxIt(e, parent, target, movement) {
								var boundingRect = parent.getBoundingClientRect();
								var relX = e.pageX - boundingRect.left;
								var relY = e.pageY - boundingRect.top;
								var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

								gsap.to(target, {
									duration: 0.3,
									x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
									y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
									ease: Power2.easeOut
								});
							}

							function parallaxCursor(e, parent, movement) {
								var rect = parent.getBoundingClientRect();
								var relX = e.pageX - rect.left;
								var relY = e.pageY - rect.top;
								var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
								pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
								pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2 - scrollTop) / movement;
								gsap.to(ball, { duration: 0.3, x: pos.x, y: pos.y });
							}

							$(".hide-ball").mouseenter(function (e) {
								gsap.to('#ball', { duration: 0.2, borderWidth: '1px', scale: 1, opacity: 0 });
							});

							$(".hide-ball").mouseleave(function (e) {
								gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, opacity: 1 });
							});

							$(".link, .button").mouseenter(function (e) {
								gsap.to('#ball', { duration: 0.2, borderWidth: "0px", scale: 1.5, backgroundColor: "rgba(153, 153, 153, 1)", opacity: 0.15 });
								gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 4, left: 4 });
							});

							$(".link, .button").mouseleave(function (e) {
								gsap.to('#ball', { duration: 0.3, borderWidth: "4px", scale: 0.5, backgroundColor: "rgba(153, 153, 153, 0)", opacity: 1 });
								gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
							});

							//Blog Hover Effects			
							$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseenter(function (e) {
								gsap.to('#ball', { duration: 0.2, borderWidth: '1px', scale: 1, opacity: 0 });
							});

							$("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseleave(function (e) {
								gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, opacity: 1 });
							});
						}




						if (!transitionsSupported()) isAnimating = false;
					}, delay);
					if (url != window.location && bool) {
						window.history.pushState({ path: url }, '', url);
					}
				});
			}

			function transitionsSupported() {
				return $('html').hasClass('csstransitions');
			}
		});


	}// End Core



	window.MouseCursor = function () {


		if (!isMobile()) {

			$(".cursor-blur-hover").on('mouseenter', function () {
				$('#ball p').remove();
				var $this = $(this);
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: "rgba(255,255,255,0.1)" });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#ball").append('<p class="center-first">' + $this.data("centerline") + '</p>');
				$(this).find('video').each(function () {
					$(this).get(0).play();
				});
			}).on('mouseleave', function () {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
				$(this).find('video').each(function () {
					$(this).get(0).pause();
				});
			});

		}


	}// End MouseCursor


});





// Export functions to scripts
var ScrollEffects = window.ScrollEffects;
var FitThumbScreenWEBGL = window.FitThumbScreenWEBGL;
var Shortcodes = window.Shortcodes;
var Sliders = window.Sliders;
var JustifiedGrid = window.JustifiedGrid;
var Lightbox = window.Lightbox;
var PlayVideo = window.PlayVideo;
var isMobile = window.isMobile;
var Core = window.Core;
var MouseCursor = window.MouseCursor;
var ShowcaseWebglCore = window.ShowcaseWebglCore;