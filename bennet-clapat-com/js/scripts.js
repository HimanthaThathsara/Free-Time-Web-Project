jQuery(function ($) {

	$(document).ready(function () {

		"use strict";

		PageLoad();
		ScrollEffects();
		Sliders();
		FirstLoad();
		PageLoadActions();
		ShowcasePortfolio();
		ShowcaseHighlights();
		ShowcaseGallery();
		ShowcaseSnapSlider();
		FitThumbScreenWEBGL();
		Shortcodes();
		Core();
		MouseCursor();
		JustifiedGrid();
		Lightbox();
		ContactForm();
		PlayVideo();
		ContactMap();
		CustomFunction();
		ShuffleElementsFunction();
		InitShuffleElements();
	});

	/*--------------------------------------------------
	Function Shuffle Elements Function
	---------------------------------------------------*/

	function ShuffleElementsFunction() {

		function shuffle(o) {
			for (var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}

		function shuffleText(element, originalText, settings) {
			var elementTextArray = Array.from(originalText);
			var shuffleTimeouts = [];

			var repeatShuffle = function (times, index) {
				if (index === times) {
					element.innerText = originalText;
					return;
				}

				var timeout = setTimeout(function () {
					var randomTextArray = shuffle(elementTextArray.slice());
					element.innerText = randomTextArray.join('');
					index++;
					repeatShuffle(times, index);
				}, settings.velocity);
				shuffleTimeouts.push(timeout);
			}

			return {
				start: function () {
					shuffleTimeouts.forEach(function (timeout) {
						clearTimeout(timeout);
					});
					shuffleTimeouts = [];

					repeatShuffle(settings.shuffleIterations, 1);
				},
				stop: function () {
					shuffleTimeouts.forEach(function (timeout) {
						clearTimeout(timeout);
					});
					shuffleTimeouts = [];
					element.innerText = originalText;
				}
			};
		}

		function startShuffle(selector, options) {
			$(selector).each(function () {
				var shuffleElement = this;
				var originalText = shuffleElement.getAttribute('data-text') || shuffleElement.innerText;
				shuffleElement.setAttribute('data-text', originalText);
				var shuffleActions = shuffleText(shuffleElement, originalText, options);
				shuffleActions.start();
			});
		}

		function stopShuffle(selector, options) {
			$(selector).each(function () {
				var shuffleElement = this;
				var originalText = shuffleElement.getAttribute('data-text');
				var shuffleActions = shuffleText(shuffleElement, originalText, options);
				shuffleActions.stop();
			});
		}

		function applyShuffleEffect(selector, options) {
			var defaults = {
				velocity: 40,
				shuffleIterations: 6,
				childSelector: 'span'
			};

			var settings = Object.assign({}, defaults, options);

			$(selector).each(function () {
				var parentHover = $(this);
				var shuffleElements = parentHover.find(settings.childSelector).toArray();

				shuffleElements.forEach(function (shuffleElement) {
					shuffleElement.setAttribute('data-text', shuffleElement.innerText);
					var originalText = shuffleElement.getAttribute('data-text');

					var shuffleActions = shuffleText(shuffleElement, originalText, settings);

					parentHover.on('mouseenter', function () {
						shuffleActions.start();
					});

					parentHover.on('mouseleave', function () {
						shuffleActions.stop();
					});
				});
			});
		}

		return {
			startShuffle: startShuffle,
			stopShuffle: stopShuffle,
			applyShuffleEffect: applyShuffleEffect
		};

	}


	function shuffleSubtitle(customDelay = 1) {
		if (!document.body.classList.contains('load-next-page1')) {
			var onloadShuffle = gsap.utils.toArray('.onload-shuffle');
			onloadShuffle.forEach(function (shuffleTitleLoad, index) {
				var spans = shuffleTitleLoad.querySelectorAll('span');
				//gsap.set(spans, { opacity: 0 });			
				gsap.to(spans, {
					opacity: 1,
					duration: 0.4,
					stagger: 0.1,
					delay: customDelay,
					onStart: function () {
						if (!shuffleTitleLoad.classList.contains('animated')) {
							spans.forEach(function (span, spanIndex) {
								var spanDelay = spanIndex * 0.1;
								setTimeout(function () {
									shuffleFunctions.startShuffle(span, {
										velocity: 60,
										shuffleIterations: 8,
										childSelector: 'span'
									});
									gsap.to(span, { opacity: 1, duration: 0.4 });
								}, spanDelay * 1000);
							});
							shuffleTitleLoad.classList.add('animated');
						}
					}
				});
			});

		} else {
			gsap.set('.onload-shuffle span', { opacity: 1 });
		}
	}


	function InitShuffleElements() {

		shuffleFunctions.applyShuffleEffect(".fullscreen-menu .menu-timeline", {
			velocity: 50,
			shuffleIterations: 5,
			childSelector: 'span'
		});

		shuffleFunctions.applyShuffleEffect(".team-list-captions li", {
			velocity: 50,
			shuffleIterations: 5,
			childSelector: 'span'
		});

		shuffleFunctions.applyShuffleEffect(".showcase-portfolio .clapat-item .slide-inner", {
			velocity: 30,
			shuffleIterations: 8,
			childSelector: '.slide-title span, .slide-cat span'
		});

		shuffleFunctions.applyShuffleEffect(".showcase-gallery .clapat-slide", {
			velocity: 30,
			shuffleIterations: 8,
			childSelector: '.slide-title span, .slide-cat span'
		});

		shuffleFunctions.applyShuffleEffect("#page-nav .next-hero-title", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span'
		});

		shuffleFunctions.applyShuffleEffect(".filters-text", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span'
		});

		shuffleFunctions.applyShuffleEffect(".team-member-inner", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span'
		});

		shuffleFunctions.applyShuffleEffect("#filters li a", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span'
		});


		var hasShuffle = gsap.utils.toArray('.has-shuffle');
		hasShuffle.forEach(function (shuffleTitle, index) {

			var words = shuffleTitle.innerText.split(' ');
			shuffleTitle.innerHTML = '';

			words.forEach(function (word, wordIndex) {
				var span = document.createElement('span');
				span.classList.add('shuffle-word');
				span.setAttribute('data-text', word);
				span.innerText = word;
				shuffleTitle.appendChild(span);

				gsap.set(span, { opacity: 0 });

				if (wordIndex < words.length - 1) {
					shuffleTitle.appendChild(document.createTextNode(' '));
				}

			});

			var delayValue = parseInt(shuffleTitle.getAttribute("data-delay")) || 0;
			gsap.to(shuffleTitle, {
				scrollTrigger: {
					trigger: shuffleTitle,
					start: "top 85%",
					onEnter: function () {
						if (!shuffleTitle.classList.contains('animated')) {
							var spans = shuffleTitle.querySelectorAll('span');
							spans.forEach(function (span, spanIndex) {
								var spanDelay = spanIndex * 0.1;
								setTimeout(function () {
									shuffleFunctions.startShuffle(span, {
										velocity: 60,
										shuffleIterations: 8,
										childSelector: 'span'
									});
									gsap.to(span, { opacity: 1, duration: 0.4 });
								}, spanDelay * 1000);
							});
							shuffleTitle.classList.add('animated');
						}
					}
				},
				delay: delayValue / 1000
			});

		});


		var projectTitleShuffle = gsap.utils.toArray('#project-nav .has-shuffle-title');
		projectTitleShuffle.forEach(function (shuffleNextTitle, index) {

			var spans = shuffleNextTitle.querySelectorAll('span');

			spans.forEach(function (span) {

				if (!span.classList.contains('shuffle-word')) {
					span.classList.add('shuffle-word');
					span.setAttribute('data-text', span.innerText.trim());
				}
			});

			var delayValue = parseInt(shuffleNextTitle.getAttribute("data-delay")) || 0;
			gsap.to(shuffleNextTitle, {
				scrollTrigger: {
					trigger: shuffleNextTitle,
					start: "top 30%",
					scrub: true,
					onEnter: function () {
						spans.forEach(function (span, spanIndex) {
							var spanDelay = spanIndex * 0;
							setTimeout(function () {
								shuffleFunctions.startShuffle(span, {
									velocity: 60,
									shuffleIterations: 10,
									childSelector: 'span'
								});
							}, spanDelay * 1000);
						});
					}
				},
				delay: delayValue / 1000
			});
		});


		var hasShuffleOnScroll = gsap.utils.toArray('.has-shuffle-onscroll');
		hasShuffleOnScroll.forEach(function (shuffleTitle, index) {

			var words = shuffleTitle.innerText.split(' ');
			shuffleTitle.innerHTML = '';

			words.forEach(function (word, wordIndex) {
				var span = document.createElement('span');
				span.classList.add('shuffle-word');
				span.setAttribute('data-text', word);
				span.innerText = word;
				shuffleTitle.appendChild(span);

				gsap.set(span, { opacity: 0 });

				if (wordIndex < words.length - 1) {
					shuffleTitle.appendChild(document.createTextNode(' '));
				}
			});

			var spans = shuffleTitle.querySelectorAll('span');
			var totalDuration = 2;
			var individualDelay = 0.075;
			var opacityDuration = 0.1;

			gsap.to(shuffleTitle, {
				scrollTrigger: {
					trigger: shuffleTitle,
					start: "top 80%",
					scrub: true,
					onUpdate: function (self) {
						var progress = self.progress;

						spans.forEach(function (span, spanIndex) {
							var spanStart = spanIndex * individualDelay;
							var spanEnd = spanStart + opacityDuration;

							var opacity = gsap.utils.clamp(0, 0.6, gsap.utils.mapRange(spanStart, spanEnd, 0, 0.6, progress));

							gsap.set(span, { opacity: opacity });

							if (progress >= spanStart && progress <= spanEnd && !span.classList.contains('shuffled')) {
								shuffleFunctions.startShuffle(span, {
									velocity: 40,
									shuffleIterations: 4,
									duration: opacityDuration,
									childSelector: 'span'
								});
							}
						});
					},
				},
				duration: totalDuration
			});
		});




	}

	var shuffleFunctions = ShuffleElementsFunction();


	/*--------------------------------------------------
		Function Cleanup Before Ajax
	---------------------------------------------------*/

	function CleanupBeforeAjax() {
		// reset all scroll triggers
		let triggers = ScrollTrigger.getAll();
		triggers.forEach(trigger => {
			trigger.kill();
		});

		ClapatSlider.instances.forEach(slider => slider.off());
		ClapatSlider.instances = [];
	}


	/*--------------------------------------------------
	Function Page Load
	---------------------------------------------------*/

	function PageLoad() {

		gsap.set($(".menu-timeline .before-span"), { y: "100%", opacity: 0 });
		gsap.set($(".clapat-header"), { yPercent: -50, opacity: 0 });

		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function () {
			var $this = $(this);
			gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: "rgba(255,255,255,0.1)" });
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
			$("#ball").addClass("with-blur");
			$("#ball").append('<p class="center-first">' + $this.data("centerline") + '</p>');
		});

		$(".preloader-wrap").on('mouseleave', function () {
			gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
			gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
			$("#ball").removeClass("with-blur");
			$('#ball p').remove();
		});

		$('body').removeClass('hidden').removeClass('hidden-ball');


		function initOnFirstLoad() {


			imagesLoaded('body', function () {

				//Animate Preloader


				gsap.to($(".percentage-intro"), { duration: 0.5, opacity: 0, delay: 0, ease: Power4.easeInOut });
				gsap.to($(".preloader-intro span"), { duration: 0.7, opacity: 0, xPercent: -101, delay: 0.3, ease: Power4.easeOut });
				gsap.to($(".trackbar"), { duration: 0.7, clipPath: 'inset(0% 0%)', delay: 0.3, ease: Power3.easeOut });
				gsap.to($(".preloader-wrap"), { duration: 0.3, opacity: 0, delay: 0, ease: Power2.easeInOut });
				gsap.set($(".preloader-wrap"), { visibility: 'hidden', delay: 0.3, yPercent: -101 });


				gsap.set($(".hero-title.caption-timeline span"), { yPercent: 50, opacity: 0 });

				gsap.to($(".hero-title.caption-timeline span"), {
					duration: 0.5, yPercent: 0, opacity: 1, stagger: 0.05, delay: 0.6, ease: Power3.easeOut, onComplete: function () {
						gsap.to($(".hero-footer-left, .hero-footer-right"), { duration: 0.3, y: 0, opacity: 1, ease: Power2.easeOut });
						gsap.set($(".page-nav-caption .caption-timeline span"), { yPercent: 0, opacity: 1 });
						$("#hero-caption").addClass("caption-animated");
					}
				});

				if ($('.hero-subtitle').length > 0) {
					shuffleSubtitle();
				}

				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = gsap.getProperty("#hero.has-image", "height");

				}

				if ($('.hero-video-wrapper').length > 0) {
					$('#hero-image-wrapper').find('video').each(function () {
						$(this).get(0).play();
					});
				}

				gsap.set($("#hero-bg-image"), { scale: 1.1, opacity: 0 });
				gsap.to($("#hero-bg-image"), { duration: 1, force3D: true, scale: 1, opacity: 1, delay: 0.8, ease: Power2.easeOut });

				gsap.utils.toArray('.hero-pixels-cover').forEach((pixelWrapper, index) => {
					const pixelAnimation = pixelWrapper.querySelectorAll(".pixel");

					gsap.to(pixelAnimation, {
						duration: 0.2,
						opacity: 0,
						delay: function () {
							return gsap.utils.random(1, 1.5);
						},
						ease: Power4.easeOut,
						onComplete: function () {
							pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
								pixels.remove();
							});
						}
					});

				});


				gsap.to($(".clapat-header"), { duration: 0.45, opacity: 1, yPercent: 0, delay: 0.25, ease: Power2.easeOut, });

				gsap.to($(".hero-footer-left, .hero-footer-right"), {
					duration: 0.45, y: 0, opacity: 1, delay: 0.25, ease: Power2.easeOut, onComplete: function () {
						$("#hero-footer.has-border").addClass("visible");
					}
				});

				gsap.set($("#main-page-content"), { opacity: 0 });

				gsap.to($("#main-page-content, #page-nav"), {
					duration: 1.7, opacity: 1, delay: 0.5, ease: Power3.easeOut, onComplete: function () {
						gsap.set($("#main-page-content"), { clearProps: "y" });
						gsap.set($(".page-nav-caption .caption-timeline span"), { yPercent: 0, opacity: 1 });
						gsap.set($(".next-caption .caption-timeline span"), { yPercent: 0, opacity: 1 });
					}
				});

			});

		}


		if (!$('body').hasClass("disable-ajaxload")) {


			var perfData = performance.getEntriesByType('navigation')[0] || performance.timing;
			var EstimatedTime = -(perfData.loadEventEnd - perfData.startTime);
			var time = Math.min(Math.max(((EstimatedTime / 100) % 50) * 1000, 5000), 20000);
			var timeSeconds = time / 1000 - 1.5
			window.preloaderTimeout = time;

			var tl = gsap.timeline({
				paused: true,
			});

			tl.to('.percentage-first span', {
				y: 0,
				duration: 1.5,
				ease: 'expo.out',

			}, timeSeconds - 1)

			tl.to('.number_2', {
				yPercent: -900,
				duration: timeSeconds - 1,
				ease: 'expo.inOut'
			}, .75)

			tl.to('.number_3', {
				yPercent: -900,
				duration: timeSeconds - 1,
				ease: 'expo.inOut'

			}, 1)

			tl.play()

			gsap.to($(".percentage, .percentage-first"), { duration: 1.2, delay: timeSeconds, opacity: 0, y: - $('.percentage-wrapper').height(), ease: 'expo.inOut' });
			gsap.to($(".percentage-last span"), {
				duration: 1.2, delay: timeSeconds, opacity: 1, y: 0, ease: 'expo.inOut', onComplete: function () {
					gsap.to($(".percentage-last"), { duration: 0.5, opacity: 0, y: -30 });
				}
			});


			// Fading Out Loadbar on Finised
			setTimeout(function () {
				initOnFirstLoad();
			}, time);

		} else {
			initOnFirstLoad();
		}


	}// End Page Load



	/*--------------------------------------------------
	Page Load Actions
	---------------------------------------------------*/

	function PageLoadActions() {

		// Default Page Navigation Load Events

		if (!isMobile()) {

			$("#page-nav .next-ajax-link-page").on('mouseenter', function () {
				var primaryColor = $('body').attr("data-primary-color");
				var $this = $(this);
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: primaryColor });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#ball").append('<p class="center-first" style="color:#000">' + $this.data("centerline") + '</p>');
			});

			$("#page-nav .next-ajax-link-page").on('mouseleave', function () {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();
			});

		}

		if (!$("body").hasClass("disable-ajaxload")) {

			$('#page-nav .next-ajax-link-page').on('click', function () {
				$("body").addClass("show-loader");
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();

				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon with-blur color-cursor");
				$('#ball p').remove();
				$('#ball i').remove();

				gsap.to($("#main-page-content, #hero, .clapat-footer, .clapat-footer-nav"), { duration: 0.3, opacity: 0, ease: Power4.easeOut });

				if ($("#page-nav").hasClass("move-nav-onload")) {
					$("body").addClass("load-next-page");
					if ($("body").hasClass("smooth-scroll")) {
						var moveNav = $("#content-scroll").height() - ($("#hero").height() / 2) - ($("#page-nav").height()) / 2 - $(".clapat-footer").height() / 2
					} else {
						var moveNav = window.innerHeight - ($("#hero").height() / 2) - ($("#page-nav").height()) / 2 - $(".clapat-footer").height() / 2
					}
					gsap.to($("#page-nav"), { duration: 0.7, y: - moveNav, delay: 0, ease: Power4.easeOut });
				} else {
					gsap.to('.page-nav-caption .caption-timeline span', { duration: 0.3, y: -100, opacity: 0, delay: 0, stagger: 0.05, ease: Power2.easeInOut });
				}
			});

		} else if ($("body").hasClass("disable-ajaxload")) {

			$('#page-nav .next-ajax-link-page').on('click', function () {
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();


				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon with-blur color-cursor");
				$('#ball p').remove();
				$('#ball i').remove();

				gsap.to($("#main-page-content, #hero, #page-nav"), { duration: 0.3, opacity: 0 });
				gsap.to($(".clapat-footer, .clapat-footer-nav"), { duration: 0.3, opacity: 0, delay: 0, ease: Power2.easeInOut });
			});

		}


		// Project Page Navigation Load Events
		if (!isMobile()) {

			$("#project-nav .next-ajax-link-project").mouseenter(function (e) {
				var modifyMouseColor = $('#project-nav').attr("data-next-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', { color: modifyMouseColor });
				}
				var $this = $(this);
				$("#ball").append('<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>');
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: "rgba(255,255,255,0.1)" });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#project-nav .next-hero-title").addClass('hover-title');
			});

			$("#project-nav .next-ajax-link-project").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
				$("#ball").removeClass("with-blur color-cursor");
			});

			$("#project-nav:not(.auto-trigger) .next-hero-title").mouseenter(function (e) {
				var modifyMouseColor = $('#project-nav').attr("data-next-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', { color: modifyMouseColor });
				}
				var $this = $(this);
				$("#ball").append('<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>');
				gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: "rgba(255,255,255,0.1)" });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
				$("#ball").addClass("with-blur");
				$("#project-nav .next-hero-title").addClass('hover-title');
			});

			$("#project-nav:not(.auto-trigger) .next-hero-title").mouseleave(function (e) {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
				$("#ball").removeClass("with-blur color-cursor");
			});
		}

		if (!$("body").hasClass("disable-ajaxload")) {

			if ($("#project-nav").hasClass("auto-trigger")) {

				if (!(typeof window.ReachBottomArr === 'undefined' || window.ReachBottomArr === null) && Array.isArray(window.ReachBottomArr)) {
					window.ReachBottomArr.forEach(element => {
						element.kill();
					});
				}

				var startValue;

				if ($('#project-nav').hasClass('pinned-nav-caption')) {
					startValue = `top+=${window.innerHeight - 10}px`;
				} else {
					startValue = `top+=${- 10}px`;
				}

				window.ReachBottomArr = new Array();

				setTimeout(function () {
					$('#project-nav').each(function () {
						var $this = $(this);
						const ReachBottom = ScrollTrigger.create({
							id: Math.floor(Math.random() * 100),
							trigger: $("#project-nav"),
							start: () => startValue,
							onEnter: function (st) {
								$("body").addClass("show-loader");
								$this.delay(500).queue(function () {

									gsap.set($("#project-nav.change-header, .next-hero-progress"), { backgroundColor: "transparent" });
									gsap.to($(".next-hero-progress"), {
										duration: 0.4, width: "0%", ease: Power4.easeOut, onComplete: function () {
											gsap.set($(".next-hero-progress"), { opacity: 0 });
										}
									});

									var link = $this.find('.next-ajax-link-project');
									link.trigger('click');

								});
							},
							onLeaveBack: function () {
								$("body").removeClass("show-loader");
								$this.clearQueue();
							}
						});
						window.ReachBottomArr.push(ReachBottom);
						imagesLoaded('body', function () {
							setTimeout(function () {
								ReachBottom.refresh()
							}, 1200);
						});
					});
				}, 100);

			} else {

				var startValue;

				if ($('#project-nav').hasClass('pinned-nav-caption')) {
					startValue = `top+=${window.innerHeight - 10}px`;
				} else {
					startValue = `top+=${- 10}px`;
				}

				gsap.to($("#project-nav"), {
					scrollTrigger: {
						trigger: $("#project-nav"), // Elementul care declanșează efectul
						start: () => startValue,
						toggleClass: "active-link", // Clasa pe care o adaugă și o șterge
					}
				});

			}//End Auto Trigger

			if ($('#hero-image-wrapper').hasClass("change-header-color")) {
				//$('#hero-footer').addClass("white-header");	
			}

			$('.next-ajax-link-project').on('click', function () {

				if (!$("#project-nav").hasClass("auto-trigger")) {
					$("body").addClass("show-loader");
				}

				if ($(".clapat-header").hasClass("swapped-logo")) {
					var imgLogoWhite = document.querySelector('.white-logo');
					var originalSrcWhite = 'images/logo-white.png';
					var updatedSrcWhite = 'images/logo-white-symbol.png';

					var imgLogoBlack = document.querySelector('.black-logo');
					var originalSrcBlack = 'images/logo.png';
					var updatedSrcBlack = 'images/logo-symbol.png';
					gsap.to($("#clapat-logo"), {
						duration: 0.2, opacity: 0, onComplete: function () {
							imgLogoWhite.src = originalSrcWhite;
							imgLogoBlack.src = originalSrcBlack;
							gsap.to($("#clapat-logo"), { duration: 0.2, opacity: 1 });
						}
					});

				}

				$('.clapat-header').removeClass('white-header');
				$("#app").remove();

				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon").find('p, i').remove();

				$('.next-project-image-wrapper').addClass("temporary").appendTo('body');

				if ($("#project-nav").hasClass("move-title-onload")) {
					$("body").addClass("load-project-thumb-from-slider").append('<div class="temporary-hero"><div class="outer ' + $('#next-project-caption').attr('class') + '"><div class="inner"></div></div></div>')
					$("body").find('.next-caption').appendTo('.temporary-hero .inner');

				} else {
					$("body").addClass("load-project-thumb");
					gsap.to('#next-project-caption .caption-timeline span', { duration: 0.6, yPercent: -100, opacity: 0, delay: 0, stagger: 0.05, ease: Power2.easeInOut });

				}
				gsap.to($(".next-hero-subtitle span"), { duration: 0.3, y: -40, opacity: 0, ease: Power2.easeInOut });
				gsap.set($("#project-nav.change-header, next-hero-progress"), { backgroundColor: "transparent" });
				gsap.to($(".next-hero-counter span"), { duration: 0.3, y: -20, opacity: 0, ease: Power2.easeInOut });
				gsap.to($(".clapat-footer, .all-works"), { duration: 0.3, opacity: 0, ease: Power2.easeInOut });
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper"), { duration: 0.3, opacity: 0 });

				gsap.to($(".next-project-image"), {
					duration: 0.6, scale: 1.02, clipPath: 'inset(0 0%)', opacity: 1, ease: Power2.easeInOut, onComplete: function () {
						$('.temporary .next-project-image').addClass("visible")
					}
				});

				gsap.to($(".next-hero-progress span"), {
					duration: 0.4, width: "100%", ease: Power2.easeInOut, onComplete: function () {
						gsap.to($(".next-hero-progress"), { duration: 0.4, width: "0%", ease: Power2.easeInOut });
					}
				});



			});

		} else if ($("body").hasClass("disable-ajaxload")) {

			$('.next-ajax-link-project').on('click', function () {
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon with-blur");
				$('#ball p').remove();
				$('#ball i').remove();
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper, #project-nav"), { duration: 0.3, opacity: 0 });
				gsap.to($(".next-project-image"), { duration: 0.6, scale: 1, opacity: 0, ease: Power2.easeOut });
				gsap.to($(".clapat-footer, .all-works"), { duration: 0.3, opacity: 0, ease: Power2.easeInOut });
			});

		}


		if ($('#project-nav').length > 0) {

			const pageContent = document.getElementById("clapat-page-content");
			const projectNav = document.getElementById("project-nav");

			gsap.set(".next-hero-title", { color: gsap.getProperty(".next-hero-title", "color") });
			gsap.set(".next-hero-subtitle", { color: gsap.getProperty(".next-hero-subtitle", "color") });

			var startColorValue;

			if ($('#project-nav').hasClass('pinned-nav-caption')) {
				startColorValue = `top 0%`;
			} else {
				startColorValue = `top 100%`;
			}

			ScrollTrigger.create({
				trigger: '#project-nav',
				start: startColorValue,
				end: '+=100%',
				onEnter: function (st) {
					if (projectNav.hasAttribute("data-next-bgcolor")) {
						gsap.to('main', {
							duration: 1,
							backgroundColor: document.getElementById('project-nav').getAttribute('data-next-bgcolor'),
							ease: Linear.easeNone,
							scrollTrigger: {
								trigger: '#project-nav',
								start: startColorValue,
								end: '+=100%',
								scrub: true,
							}
						});
					}
					gsap.set($(".header-gradient"), { opacity: 0 });
				},
				onLeaveBack: function () {
					gsap.set($(".header-gradient"), { opacity: 1 });
					gsap.set("#clapat-logo img, .classic-menu .flexnav li, .button-wrap.menu, .button-icon-link", { clearProps: "all" });
				},
				scrub: true,
			});



			if ($("#project-nav").hasClass("change-header")) {

				var changeMainColor = document.querySelector('#project-nav.change-header');

				if (changeMainColor) {

					imagesLoaded('body', function () {

						if (pageContent.classList.contains('light-content')) {

							startLinkColor = "#fff";
							endLinkColor = "#000";
							startButtonColor = "#fff";
							endButtonColor = "#000";
							startButtonShadow = "inset 0 0 15px rgba(255,255,255,0.5)";
							endButtonShadow = "inset 0 0 15px rgba(0,0,0,0.3)";

							startTextFillColor = "rgba(255,255,255,0.2)";
							endTextFillColor = "rgba(0,0,0,0.2)";

						} else if (pageContent.classList.contains('dark-content')) {

							startLinkColor = "#000";
							endLinkColor = "#fff";

							startButtonColor = "#000";
							endButtonColor = "#fff";
							startButtonShadow = "inset 0 0 15px rgba(0,0,0,0.3)";
							endButtonShadow = "inset 0 0 15px rgba(255,255,255,0.5)";

							startTextFillColor = "rgba(0,0,0,0.2)";
							endTextFillColor = "rgba(255,255,255,0.2)";
						}

						const blackLogoOpacity = gsap.getProperty('#clapat-logo img.black-logo', 'opacity');
						const whiteLogoOpacity = gsap.getProperty('#clapat-logo img.white-logo', 'opacity');

						const scrollTriggerEnter = {
							trigger: changeMainColor,
							start: startColorValue,
							end: '+=100%',
							scrub: true,
						};


						ScrollTrigger.create({
							trigger: changeMainColor,
							start: startColorValue,
							end: '+=70%',
							onEnter: function (st) {

								gsap.fromTo('#clapat-logo img.black-logo', {
									opacity: blackLogoOpacity
								}, {
									duration: 1,
									opacity: whiteLogoOpacity,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});

								gsap.fromTo('#clapat-logo img.white-logo', {
									opacity: whiteLogoOpacity
								}, {
									duration: 1,
									opacity: blackLogoOpacity,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});

								if (!isMobile()) {

									gsap.fromTo('.classic-menu .flexnav li', {
										color: startLinkColor
									}, {
										duration: 1,
										color: endLinkColor,
										ease: Linear.easeNone,
										scrollTrigger: scrollTriggerEnter
									});

								}

								gsap.fromTo('.button-wrap.menu', {
									color: startButtonColor,
								}, {
									duration: 1,
									color: endButtonColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});

								gsap.fromTo('.button-icon-link', {
									color: startButtonColor,
									boxShadow: startButtonShadow
								}, {
									duration: 1,
									color: endButtonColor,
									boxShadow: endButtonShadow,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});

								gsap.fromTo('.next-hero-title, .next-hero-subtitle', {
									color: startLinkColor,
								}, {
									duration: 1,
									color: endLinkColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});

								gsap.fromTo('.next-hero-subtitle span', {
									textFillColor: startTextFillColor,
								}, {
									duration: 1,
									textFillColor: endTextFillColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});

							},
							scrub: true,
						});

					});

				}


			}

			// Add Temporary Styles
			$(document).on('click', '.next-ajax-link-project', function () {
				var temporaryBgColorElements = "main";
				var temporaryColorElements = ".next-hero-title, .next-hero-subtitle";
				var modifyBgColor = document.getElementById('project-nav').getAttribute('data-next-bgcolor');
				var modifyColor = gsap.getProperty(".next-hero-title", "color");
				var styleElement = document.createElement('style');



				styleElement.setAttribute('data-js-added', 'true');
				styleElement.innerHTML = `
					${temporaryBgColorElements} {
						background-color: ${modifyBgColor} !important;
					}
					${temporaryColorElements} {
						color: ${modifyColor} !important;
					}
					.header-gradient {
						opacity: 0!important;
					}
				`;
				document.head.appendChild(styleElement);

			});

			//Clean Temporary Color Styles	
			setTimeout(function () {
				imagesLoaded('body', function () {
					var styleElements = document.querySelectorAll('style[data-js-added]');
					styleElements.forEach(function (styleElement) {
						styleElement.parentNode.removeChild(styleElement);
					});
				});
			}, 1300);

		}

	}// Page Load Actions




	/*--------------------------------------------------
	Function Lazy Load
	---------------------------------------------------*/

	function LazyLoad() {

		imagesLoaded('body', function () {
			$('body').removeClass('loading hidden scale-up scale-none');
		});

		gsap.to($("#main"), { duration: 0.3, opacity: 1, delay: 0, ease: Power2.easeOut });

		// Animate Hero Section			
		if ($('#hero').hasClass("has-image")) {
			if ($('body').hasClass("load-project-thumb")) {

				if ($('body').hasClass("from-webgl")) {
					gsap.set($("#hero-bg-image"), { scale: 1, opacity: 1, delay: 1 });
				} else {
					gsap.set($("#hero-bg-image"), { scale: 1.02, opacity: 1, delay: 1 });
				}
				gsap.set($("#hero-caption .hero-title.caption-timeline span"), { yPercent: 100, opacity: 0 });

				gsap.to($("#hero-caption .hero-title.caption-timeline span"), {
					duration: 0.7, yPercent: 0, opacity: 1, stagger: 0.1, delay: 0.6, ease: Power3.easeOut, onComplete: function () {
						gsap.to($("#hero-description"), { duration: 0.6, y: 0, opacity: 1, ease: Power3.easeOut });
						gsap.to($(".hero-footer-left, .hero-footer-right"), { duration: 0.3, y: 0, opacity: 1, ease: Power2.easeOut });
						gsap.to($("#main-page-content, #page-nav"), { duration: 0.7, y: 0, opacity: 1, ease: Power3.easeOut });
						gsap.set($(".next-caption .caption-timeline span"), { yPercent: 0 });
					}
				});

				if ($('.hero-subtitle').length > 0) {
					shuffleSubtitle();
				}

			} else if ($('body').hasClass("load-project-thumb-from-slider")) {

				gsap.set($("#hero-bg-image"), { scale: 1.02, opacity: 1, delay: 0.4 });
				gsap.set($("#hero-caption .caption-timeline.hero-title span"), { yPercent: 0, opacity: 1 });

				gsap.to($("#hero-caption .caption-timeline.hero-title span"), {
					duration: 0.3, opacity: 1, yPercent: 0, ease: Power2.easeOut, onComplete: function () {
						gsap.to($(".temporary-hero"), {
							duration: 0.3, opacity: 0, delay: 0, ease: Power2.easeIn, onComplete: function () {
								$(".temporary-hero").remove();
							}
						});
						gsap.to($("#hero-description"), { duration: 0.6, y: 0, opacity: 1, ease: Power3.easeOut });
						gsap.to($("#main-page-content, #page-nav"), { duration: 0.7, y: 0, opacity: 1, ease: Power3.easeOut });
						gsap.set($(".next-caption .caption-timeline span"), { yPercent: 0 });
					}
				});

				if ($('.hero-subtitle').length > 0) {
					shuffleSubtitle(0.2);
				}

				gsap.to($(".hero-footer-left, .hero-footer-right"), { duration: 0.7, y: 0, opacity: 1, stagger: 0.2, delay: 0.5, ease: Power2.easeOut });

			} //End Hero Image and Caption Animations

		} else {

			gsap.set($("#main-page-content"), { opacity: 0 });

			gsap.set($(".hero-title.caption-timeline span"), { yPercent: 50, opacity: 0 });
			gsap.set($(".hero-subtitle.caption-timeline span"), { yPercent: 0 });

			gsap.to($("#hero-caption .caption-timeline.hero-title span"), {
				duration: 0.5, yPercent: 0, opacity: 1, stagger: 0.05, delay: 0.2, ease: Power3.easeOut, onComplete: function () {
					gsap.to($(".post-article-wrap"), { duration: 0.3, y: 0, opacity: 1, ease: Power2.easeOut });
					gsap.to($(".error-button"), { duration: 0.3, y: 0, opacity: 1, rotation: 0, delay: 0, ease: Power2.easeOut });
					$("#hero-caption").addClass("caption-animated");
				}
			});

			if ($('.hero-subtitle').length > 0) {
				shuffleSubtitle(0.6);
			}

			gsap.to($(".hero-footer-left, .hero-footer-right"), {
				duration: 1, y: 0, opacity: 1, delay: 0.3, ease: Power3.easeOut, onComplete: function () {
					$("#hero-footer.has-border").addClass("visible");
				}
			});

			gsap.to($("#main-page-content, #page-nav"), {
				duration: 1, y: 0, opacity: 1, delay: 0.4, ease: Power3.easeOut, onComplete: function () {
					gsap.set($("#main-page-content"), { clearProps: "y" });
					gsap.set($(".page-nav-caption .caption-timeline span"), { yPercent: 0 });
				}
			});

		} //End Hero Caption Animations


		if ($('.load-project-thumb').length > 0) {
			imagesLoaded('#hero-image-wrapper', function () {

				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = gsap.getProperty("#hero.has-image", "height");
					gsap.to('#app canvas', { duration: 1, y: heroTranslate, scale: 1, ease: Power3.easeInOut });
					gsap.to('#canvas-slider canvas', { duration: 1, y: heroTranslate, scale: 1, ease: Power3.easeInOut });
				}

				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function () {
						$(this).get(0).play();
					});
				}
				setTimeout(function () {
					setTimeout(function () {
						$("#app.active").remove();
						$("#canvas-slider.active").remove();
					}, 1000);
					$('.thumb-wrapper').remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {
						duration: 0.1, opacity: 0, ease: Power2.easeOut, onComplete: function () {
							$(".next-project-image-wrapper.temporary").remove();
							$(".temporary-hero").remove();
						}
					});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function () {
							$(this).get(0).play();
						});
						gsap.to($(".hero-video-wrapper"), { duration: 0.2, opacity: 1, delay: 0.1, ease: Power2.easeOut });
					} else if (isMobile()) {
						gsap.to($(".hero-video-wrapper"), { duration: 0.2, opacity: 1, delay: 0.5, ease: Power2.easeOut });
					}
				}, 450);
			});
		} else if ($('.load-project-thumb-with-title').length > 0) {
			imagesLoaded('#hero-image-wrapper', function () {

				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function () {
						$(this).get(0).play();
					});
				}
				setTimeout(function () {
					$("#app.active").remove();
					$('.thumb-wrapper').remove();
					$("#canvas-slider.active").remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {
						duration: 0.1, opacity: 0, ease: Power2.easeOut, onComplete: function () {
							$(".next-project-image-wrapper.temporary").remove();
						}
					});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function () {
							$(this).get(0).play();
						});
						gsap.to($(".hero-video-wrapper"), { duration: 0.2, opacity: 1, delay: 0.1, ease: Power2.easeOut });
					} else if (isMobile()) {
						gsap.to($(".hero-video-wrapper"), { duration: 0.2, opacity: 1, delay: 0.5, ease: Power2.easeOut });
					}
					$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");
				}, 200);
			});
		} else if ($('.load-project-thumb-from-slider').length > 0) {
			imagesLoaded('#hero-image-wrapper', function () {

				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = gsap.getProperty("#hero.has-image", "height");
					gsap.to('.next-project-image-wrapper.temporary', { duration: 0.4, y: heroTranslate, scale: 1, ease: Power2.easeOut });
				}

				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function () {
						$(this).get(0).play();
					});
				}
				setTimeout(function () {
					$("#app.active").remove();
					$('.thumb-wrapper').remove();
					$("#canvas-slider.active").remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {
						duration: 0.1, opacity: 0, delay: 0.4, ease: Power2.easeOut, onComplete: function () {
							$(".next-project-image-wrapper.temporary").remove();
						}
					});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function () {
							$(this).get(0).play();
						});
						gsap.to($(".hero-video-wrapper"), { duration: 0.2, opacity: 1, delay: 0.1, ease: Power2.easeOut });
					} else if (isMobile()) {
						gsap.to($(".hero-video-wrapper"), { duration: 0.2, opacity: 1, delay: 0.5, ease: Power2.easeOut });
					}
					$('body').removeClass("load-project-thumb-from-slider").removeClass("show-loader");
				}, 200);
			});
		} else {
			imagesLoaded('#hero-image-wrapper', function () {
				$('#hero-image-wrapper').find('video').each(function () {
					$(this).get(0).play();
				});
				setTimeout(function () {
					$("#app.active").remove();
					$("#canvas-slider.active").remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {
						duration: 0.1, opacity: 0, ease: Power2.easeOut, onComplete: function () {
							$(".next-project-image-wrapper.temporary").remove();
							$(".temporary-hero").remove();
						}
					});
				}, 500);
			});
		}

		setTimeout(function () {
			$('.clapat-header').removeClass('white-header');
			$('body').removeClass("load-project-thumb load-project-thumb-with-title load-project-thumb-from-slider load-next-page grid-open from-webgl")
			setTimeout(function () {
				imagesLoaded('body', function () {
					$('body').removeClass("show-loader disable-scroll");
				});
			}, 300);
		}, 1000);


	}// End Lazy Load




	/*--------------------------------------------------
	Function Showcase Portfolio
	---------------------------------------------------*/

	function ShowcasePortfolio() {

		gsap.utils.toArray('.clapat-item .pixels-cover').forEach((pixelWrapper, index) => {
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


		if ($('.showcase-portfolio').length > 0) {


			const pageContent = $('#clapat-page-content');
			const bgColor = pageContent.data('bgcolor');
			const filtersGradient = $('#filters-gradient');

			if (filtersGradient.length && bgColor) {
				filtersGradient.css({
					'background-color': bgColor,
					'mask-image': `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor} 30%, transparent 100%)`
				});
			}



			ScrollTrigger.create({
				trigger: "#filters-gradient",
				start: "top 95%",
				end: "bottom 40%",
				onLeave: function () {
					var closeFilters = document.getElementById("close-filters");
					if (closeFilters) {
						closeFilters.click();
					}
				},
				onLeaveBack: function () {
					var closeFilters = document.getElementById("close-filters");
					if (closeFilters) {
						closeFilters.click();
					}
				}
			});


			document.getElementById('main').addEventListener('click', function (e) {
				if (e.target.closest('.show-filters') || e.target.id === 'close-filters') {
					var showFilters = document.querySelector('.show-filters'); // Selectăm butonul principal
					var span = showFilters.querySelector('.button-text span');
					var icon = showFilters.querySelector('.button-icon i');

					// Verificăm starea curentă și alternăm
					if (span.getAttribute('data-temp') === 'Close') {
						// Revine la starea inițială
						span.setAttribute('data-temp', 'All Projects');
						span.setAttribute('data-hover', 'All Projects');
						span.textContent = 'All Projects';
						icon.classList.remove('fa-xmark');
						icon.classList.add('fa-sort');
					} else {
						// Schimbă la "Close"
						span.setAttribute('data-temp', 'Close');
						span.setAttribute('data-hover', 'Close');
						span.textContent = 'Close';
						icon.classList.remove('fa-sort');
						icon.classList.add('fa-xmark');
					}

					// Gestionarea elementului #close-filters
					var closeFiltersDiv = document.getElementById("close-filters");

					if (!closeFiltersDiv) {
						closeFiltersDiv = document.createElement("div");
						closeFiltersDiv.id = "close-filters";
						document.getElementById("itemsWrapper").appendChild(closeFiltersDiv);
					} else {
						closeFiltersDiv.parentNode.removeChild(closeFiltersDiv);
					}

					// Toggle pentru clasa `open-filters`
					var filtersGradient = document.getElementById('filters-gradient');
					filtersGradient.classList.toggle('open-filters');

					// Gestionarea animațiilor GSAP
					setTimeout(function () {
						if (filtersGradient.classList.contains("open-filters")) {
							gsap.to('#filters-gradient', { duration: 0.3, opacity: 1, ease: Power2.easeInOut });
							gsap.set(document.querySelectorAll("#filters li a"), { y: 100, opacity: 0 });
							gsap.to(document.querySelectorAll("#filters li a"), { duration: 0.5, y: 0, opacity: 1, delay: 0.4, stagger: 0.05, ease: Power2.easeOut });
						} else {
							gsap.to('#filters-gradient', { duration: 0.3, opacity: 0, delay: 0.4, ease: Power2.easeInOut });
							gsap.to(document.querySelectorAll("#filters li a"), { duration: 0.3, y: -100, opacity: 0, delay: 0, stagger: 0.03, ease: Power2.easeIn });
						}
					}, 20);
				}
			});



			function filter() {

				var state = Flip.getState('.clapat-item');
				var projects = document.querySelectorAll('.clapat-item');
				var startHeight = gsap.getProperty(".showcase-portfolio", "height");

				var filters = document.querySelectorAll('.filter-option.is_active');
				var parallaxItems = document.querySelectorAll('.showcase-portfolio .clapat-item.vertical-parallax .slide-inner');

				var hasFilteredItems = false;

				if (filters.length) {
					projects.forEach(function (project) {
						gsap.set(project, { display: 'block' });
						project.classList.remove('filtered');
						project.classList.remove('not-filtered');
					});
					filters.forEach(function (filter) {
						var colorClass = filter.dataset.filter;

						if (colorClass !== '') {
							projects.forEach(function (project) {
								if (!project.classList.contains(colorClass)) {
									gsap.set(project, { display: 'none' });
									project.classList.remove('filtered');
									project.classList.add('not-filtered');
								} else {
									gsap.set(project, { display: 'block' });

									project.classList.add('filtered');
									project.classList.remove('not-filtered');
									hasFilteredItems = true; // Elemente filtrate găsite
								}
							});
						} else {
							projects.forEach(function (project) {
								gsap.set(project, { display: 'block' });
								project.classList.remove('filtered');
								project.classList.remove('not-filtered');
							});
						}
					});
				} else {
					projects.forEach(function (project) {
						gsap.set(project, { display: 'block' });
						project.classList.remove('filtered');
					});
				}


				var showcasePortfolio = document.querySelector('.showcase-portfolio');

				if (hasFilteredItems) {
					showcasePortfolio.classList.add('items-filtered');
				} else {
					showcasePortfolio.classList.remove('items-filtered');
				}

				showcasePortfolio.classList.add('ease-transform');

				var endHeight = gsap.getProperty(".showcase-portfolio", "height");



				var flip = Flip.from(state, {
					duration: 0.6,
					ease: "power3.inOut",
					absolute: true,
					stagger: 0,
					onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .5 }),
					onLeave: elements => gsap.fromTo(elements, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0, duration: .5 }),
					onComplete: function () {
						ScrollTrigger.refresh();
						showcasePortfolio.classList.remove('ease-transform');
					}
				})

				flip.fromTo(".showcase-portfolio", { height: startHeight }, { height: endHeight, clearProps: "height", ease: "power3.inOut", duration: flip.duration() }, 0);
			}

			const filtersOptionDiv = document.querySelector('.filters-options-wrapper');

			if (filtersOptionDiv) {
				document.querySelectorAll('.filter-option').forEach(function (option) {
					option.addEventListener('click', function (event) {
						event.preventDefault();
						document.querySelector('.filter-option.is_active').classList.remove('is_active');
						event.currentTarget.classList.add('is_active');
						filter();
					});
				});
			}







			if (!isMobile()) {

				$(".showcase-portfolio .clapat-item .slide-inner").on('mouseenter', function () {
					$('#ball p').remove();
					var $this = $(this);
					gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(0,0,0,0)", backgroundColor: "rgba(0,0,0,0.3)" });
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



			$('.trigger-item').on('click', function () {
				if (!$('.showcase-portfolio').hasClass('list-grid')) {
					$("body").addClass("load-project-thumb");
				}
				$('.showcase-portfolio .trigger-item').each(function () {
					if (!$(this).hasClass("above")) {
						gsap.to($(this), { duration: 0.5, delay: 0, opacity: 0, ease: Power4.easeInOut });
					} else {
						gsap.to($(this), { duration: 0.5, delay: 0.6, opacity: 0, ease: Power4.easeInOut });
					}
				});
				setTimeout(function () {
					$("body").addClass("show-loader");
				}, 300);
				gsap.to(".showcase-portfolio .slide-caption", { duration: 0.2, opacity: 0, ease: Power2.easeIn });


				gsap.to('.showcase-portfolio .above .section-thumb', { duration: 0.35, delay: 0.05, clipPath: 'inset(0% 0% 100% 0%)', ease: "sine.out" });
				gsap.to('.showcase-portfolio .above .section-thumb img', { duration: 0.35, delay: 0.05, scale: 1.3, rotation: -5, ease: "sine.out" });


				gsap.to('footer, .carousel-nav-wrapper, .showcase-portfolio.list-grid', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
				gsap.to('#filters-wrapper', { scale: 0.1, opacity: 0, borderRadius: '0px', duration: 0.2, delay: 0.2 });
				gsap.to('#filters li', { scale: 0.7, opacity: 0, duration: 0.2, delay: 0 });
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});

		}

	}//End Showcase Portfolio	



	/*--------------------------------------------------
	Function Showcase Highlights
	---------------------------------------------------*/

	function ShowcaseHighlights() {

		if ($('.highlights-gallery').length > 0) {

			$("footer").addClass("showcase-footer");
			gsap.to('.header-gradient', { duration: 0.3, opacity: 0, ease: Power2.easeInOut });


			var slideElements = $(".clapat-slide");
			var externalTitlesElement = $(".external-titles");
			var externalCategoriesElement = $(".external-categories");

			function processSlideElement(slideElement, selector, externalContainer, slideIndex) {
				var element = slideElement.find(selector).eq(0);

				if (element.length) {
					element.attr("data-caption", slideIndex);

					if (slideElement.hasClass("change-header")) {
						element.addClass("change-header");
					}

					var clonedElement = element.clone(true);
					externalContainer.append(clonedElement);
				}
			}

			slideElements.each(function (i) {
				var slideIndex = i + 1;
				var slideElement = $(this);

				slideElement.attr("data-slide", slideIndex);

				processSlideElement(slideElement, ".slide-title", externalTitlesElement, slideIndex);
				processSlideElement(slideElement, ".slide-cat", externalCategoriesElement, slideIndex);
			});



			function shuffleAnimation(slideElement, categorySelector, delay = 0.8) {
				if (!slideElement) {
					console.error("Slide element is not defined!");
					return;
				}

				let slideData = slideElement.getAttribute('data-slide');
				if (!slideData) {
					console.error("Slide data not found!");
					return;
				}

				let shuffleElements = gsap.utils.toArray(`${categorySelector}[data-caption="${slideData}"]`);

				shuffleElements.forEach(function (shuffleTitleLoad) {
					let spans = shuffleTitleLoad.querySelectorAll('span');
					gsap.to(spans, {
						opacity: 1,
						duration: 0.4,
						stagger: 0.1,
						delay: delay,
						onStart: function () {
							spans.forEach(function (span, spanIndex) {
								let spanDelay = spanIndex * 0.1;
								setTimeout(function () {
									shuffleFunctions.startShuffle(span, {
										velocity: 60,
										shuffleIterations: 8,
										childSelector: 'span',
									});
									gsap.to(span, { opacity: 1, duration: 0.4 });
								}, spanDelay * 1000);
							});
						}
					});
				});
			}



			if (!$('body').hasClass("show-loader")) {
				let preloaderTimeout = 3000;
				if (window.preloaderTimeout !== 'undefined') {
					preloaderTimeout = window.preloaderTimeout;
				}
				setTimeout(function () {

					gsap.to($('#canvas-slider'), { duration: 0.7, opacity: 1, scale: 1, ease: "circ.out" });
					gsap.set($(".fade-slide-element"), { y: 20, opacity: 0 });
					gsap.to($(".fade-slide-element"), { duration: 1, y: 0, opacity: 1, delay: 0.6, stagger: 0.05, ease: Power2.easeOut });

					gsap.to($(".external-titles"), { duration: 0.4, y: 0, opacity: 1, delay: 0.4, stagger: 0.05, ease: "circ.out" });

					let firstSlide = document.querySelector(".clapat-slide");
					shuffleAnimation(firstSlide, ".external-categories .slide-cat", 0.8);

				}, preloaderTimeout);
			}


			slider = new ClapatSlider('.highlights-gallery', {
				ease: 0.05,
				direction: 'vertical',
				snap: true,
				outer: '.clapat-slider',
				inner: '.clapat-slider-viewport',
				webgl: true,
				webgl_direction: 'horizontal',
				//autoplay: { speed: 5000 },
				pagination: true,
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				on: {
					init: function (slide) {

						if ($('body').hasClass("show-loader")) {

							imagesLoaded('body', function () {

								gsap.to($('#canvas-slider'), { duration: 0.7, delay: 0.2, opacity: 1, scale: 1, ease: "circ.out" });
								gsap.set($(".fade-slide-element"), { y: 20, opacity: 0 });
								gsap.to($(".fade-slide-element"), { duration: 1, y: 0, opacity: 1, delay: 0.6, stagger: 0.05, ease: Power2.easeOut });
								gsap.to($(".external-titles"), { duration: 0.4, y: 0, opacity: 1, delay: 0.4, stagger: 0.05, ease: "circ.out" });

								let firstSlide = document.querySelector(".clapat-slide");
								shuffleAnimation(firstSlide, ".external-categories .slide-cat", 0.8);

							});
						}

						let firstSlide = document.querySelector(".clapat-slide");

						if (firstSlide.classList.contains("change-header")) {

							gsap.to('#clapat-logo img.black-logo', { duration: 0.3, opacity: 1, ease: Power2.easeInOut });
							gsap.to('#clapat-logo img.white-logo', { duration: 0.3, opacity: 0, ease: Power2.easeInOut });
							gsap.to('.classic-menu .flexnav li', { duration: 0.3, color: "#000", ease: Power2.easeInOut });
							gsap.to('header .button-wrap.menu', { duration: 0.3, color: "#000", ease: Power2.easeInOut });
							gsap.to('header .button-icon-link', { duration: 0.3, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease: Power2.easeInOut });
							gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.3, color: "#000", ease: Power2.easeInOut });
							gsap.to('.progress-info', { duration: 0.3, filter: 'invert(1)', ease: Power2.easeInOut });
						} else {

							gsap.to('#clapat-logo img.black-logo', { duration: 0.3, opacity: 0, ease: Power2.easeInOut });
							gsap.to('#clapat-logo img.white-logo', { duration: 0.3, opacity: 1, ease: Power2.easeInOut });
							gsap.to('.classic-menu .flexnav li', { duration: 0.3, color: "#fff", ease: Power2.easeInOut });
							gsap.to('header .button-wrap.menu', { duration: 0.3, color: "#fff", ease: Power2.easeInOut });
							gsap.to('header .button-icon-link', { duration: 0.3, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease: Power2.easeInOut });
							gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.3, color: "#fff", ease: Power2.easeInOut });
							gsap.to('.progress-info', { duration: 0.3, filter: 'invert(0)', ease: Power2.easeInOut });
						}


					},
					activeSlideChanged: function (activeSlide, prevSlide, nextSlide) {

						if (activeSlide.classList.contains("change-header")) {

							gsap.to('#clapat-logo img.black-logo', { duration: 0.3, opacity: 1, ease: Power2.easeInOut });
							gsap.to('#clapat-logo img.white-logo', { duration: 0.3, opacity: 0, ease: Power2.easeInOut });
							gsap.to('.classic-menu .flexnav li', { duration: 0.3, color: "#000", ease: Power2.easeInOut });
							gsap.to('header .button-wrap.menu', { duration: 0.3, color: "#000", ease: Power2.easeInOut });
							gsap.to('header .button-icon-link', { duration: 0.3, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease: Power2.easeInOut });
							gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.3, color: "#000", ease: Power2.easeInOut });
							gsap.to('.progress-info', { duration: 0.3, filter: 'invert(1)', ease: Power2.easeInOut });
						} else {

							gsap.to('#clapat-logo img.black-logo', { duration: 0.3, opacity: 0, ease: Power2.easeInOut });
							gsap.to('#clapat-logo img.white-logo', { duration: 0.3, opacity: 1, ease: Power2.easeInOut });
							gsap.to('.classic-menu .flexnav li', { duration: 0.3, color: "#fff", ease: Power2.easeInOut });
							gsap.to('header .button-wrap.menu', { duration: 0.3, color: "#fff", ease: Power2.easeInOut });
							gsap.to('header .button-icon-link', { duration: 0.3, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease: Power2.easeInOut });
							gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.3, color: "#fff", ease: Power2.easeInOut });
							gsap.to('.progress-info', { duration: 0.3, filter: 'invert(0)', ease: Power2.easeInOut });
						}

						shuffleAnimation(activeSlide, ".external-categories .slide-cat", 0);

					},

				}
			});

			function animateSlides(slider, arrElements, type = "translate", durationMultiplier = 1) {
				const slideDuration = (1 / arrElements.length) * durationMultiplier;
				const transitionDuration = slideDuration / 3;
				const staticDuration = slideDuration / 3;

				for (let i = 0; i < arrElements.length; i++) {
					const slideElement = arrElements[i];

					if (type === "opacity") {
						// Animație bazată pe opacitate
						if (i === 0) {
							slider.tl.to(slideElement, { opacity: 1, duration: staticDuration * 0.5 }, 0) // Fade in
								.to(slideElement, { opacity: 0, duration: transitionDuration }, '>'); // Fade out
						} else {
							gsap.set(slideElement, { opacity: 0 }); // Invizibil la început

							slider.tl.to(slideElement, { opacity: 1, duration: transitionDuration, ease: "circ.out" }, '>') // Fade in
								.to(slideElement, { opacity: 1, duration: staticDuration }, '>') // Static
								.to(slideElement, { opacity: 0, duration: transitionDuration, ease: "circ.in" }, '>'); // Fade out
						}
					} else {
						// Animație bazată pe yPercent
						if (i === 0) {
							slider.tl.to(slideElement, { yPercent: 0, duration: staticDuration * 0.5 }, 0) // În view
								.to(slideElement, { yPercent: -100, duration: transitionDuration }, '>'); // Fade out
						} else {
							gsap.set(slideElement, { yPercent: 100 }); // În afara ecranului

							slider.tl.to(slideElement, { yPercent: 0, duration: transitionDuration, ease: "circ.out" }, '>') // Fade in
								.to(slideElement, { yPercent: 0, duration: staticDuration }, '>') // Static
								.to(slideElement, { yPercent: -100, duration: transitionDuration, ease: "circ.in" }, '>'); // Fade out
						}
					}
				}

				// Gestionăm primul slide separat, dacă este necesar
				const firstElement = arrElements[0];
				if (type === "opacity") {
					slider.tl.fromTo(firstElement, { opacity: 0 }, { opacity: 1, duration: transitionDuration, ease: "circ.out" }, '>')
						.to(firstElement, { opacity: 1, duration: staticDuration * 0.5 }, '>');
					gsap.set(firstElement, { opacity: 1 });
				} else {
					slider.tl.fromTo(firstElement, { yPercent: 100 }, { yPercent: 0, duration: transitionDuration, ease: "circ.out" }, '>')
						.to(firstElement, { yPercent: 0, duration: staticDuration * 0.5 }, '>');
					gsap.set(firstElement, { yPercent: 0 });
				}
			}

			// Apelăm funcția pentru fiecare set de elemente
			const arrTitles = gsap.utils.toArray('.clapat-caption-wrapper .external-titles .slide-title');
			const arrCategories = gsap.utils.toArray('.clapat-caption-wrapper .external-categories .slide-cat');

			// Titles: translate (yPercent)
			animateSlides(slider, arrTitles, "translate");

			// Categories: opacity
			animateSlides(slider, arrCategories, "opacity");




			slider.tl
				.fromTo('.progress-info-fill', { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', { backgroundSize: "100% 100%" }, { backgroundSize: "0% 100%", duration: 0.3, ease: 'power3' }, 0);


			if (!isMobile()) {


				$('.clapat-slider').on('mousedown', function (evt) {
					$('.clapat-slider').on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {
							// click
							gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
							$("body").removeClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();

						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff', backgroundColor: '#fff' });
							} else {
								gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#000', backgroundColor: '#000' });
							}
							$("body").addClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
						}
						$('.clapat-slider').off('mouseup mousemove', handler);
					});
				});


				$('.clapat-slider').on('mouseup touchend', function () {
					gsap.to('#ball', { duration: 1, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', ease: Elastic.easeOut });
					$("body").removeClass("scale-drag-y");
				});

				$("body").on('mouseleave', function () {
					gsap.to('#ball', { duration: 1, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', ease: Elastic.easeOut });
					$("body").removeClass("scale-drag-y");
				});

				$(".external-titles .slide-title").on('mouseenter', function () {
					if (!$('body').hasClass('scale-drag-y')) {
						var $this = $(this);
						let dataCaption = $this.attr("data-caption");
						let relatedSlide = $('.clapat-slide[data-slide="' + dataCaption + '"]');
						let centerlineText = relatedSlide.find('.trigger-item').data("centerline");

						gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(170,170,170,0)", backgroundColor: "rgba(170,170,170,0.3)" });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
						$("#ball").addClass("with-blur");
						$("#ball").append('<p class="center-first">' + centerlineText + '</p>');
					}
				}).on('mouseleave', function () {
					if (!$('body').hasClass('scale-drag-y')) {
						gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
						$("#ball").removeClass("with-blur color-cursor");
						$('#ball p').remove();
					}
				});

			} // End Mobile

			$('.external-titles .slide-title').on('click', function () {

				$("body").addClass("load-project-thumb show-loader from-webgl");

				if ($('body').hasClass('hero-below-caption')) {
					gsap.to('#canvas-slider canvas', { duration: 1.2, scale: 0.5, delay: 0, ease: "back.inOut(1)" });
				}

				let dataCaption = $(this).attr('data-caption');
				let parentSlide = $('.clapat-slide[data-slide="' + dataCaption + '"]');

				parentSlide.addClass('above');

				setTimeout(function () {
					let link = parentSlide.find('a');
					if (link.length) {
						link.trigger('click');
					} else {
						console.warn('No link found in the selected slide.');
					}
				}, 350);

				let triggeredSlide = parentSlide[0];
				shuffleAnimation(triggeredSlide, ".external-titles .slide-title", 0);
				shuffleAnimation(triggeredSlide, ".external-categories .slide-cat", 0.2);

				gsap.to('.clapat-caption-wrapper', { duration: 0.5, opacity: 0, filter: "blur(5px)", ease: Power4.easeInOut });
				gsap.to('footer', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();

			});


		}

	}//End Showcase Highlights	



	/*--------------------------------------------------
	Function Showcase Gallery
	---------------------------------------------------*/

	function ShowcaseGallery() {

		if ($('.showcase-gallery').length > 0) {

			$("footer").addClass("showcase-footer");

			gsap.set($(".showcase-gallery .clapat-slider .slide-effects"), { opacity: 0 });

			if (!$('body').hasClass("show-loader")) {
				let preloaderTimeout = 3000;
				if (window.preloaderTimeout !== 'undefined') {
					preloaderTimeout = window.preloaderTimeout + 300;
				}
				setTimeout(function () {

					gsap.to($(".showcase-gallery .clapat-slide .slide-effects"), {
						duration: 0.5, opacity: 1, delay: 1.1, ease: Power4.easeIn, onComplete: function () {
							$(".showcase-gallery").addClass("active");
						}
					});

					var gallerySlideClasses = [".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next"];
					gallerySlideClasses.forEach(function (gallerySlideClass, index) {
						var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-effects");
						var delay = 1.2 + index * 0.1;
						gsap.set(gallerySlide, { xPercent: 75 });
						gsap.to(gallerySlide, {
							duration: 2, xPercent: 0, delay: delay, ease: Power4.easeOut, onComplete: function () {
								gsap.set(gallerySlide, { clearProps: "x,y" });
							}
						});
					});

					gsap.to($(".hero-title"), { opacity: 0.05, filter: "blur(5px)", duration: 0.5, delay: 0.7, ease: Power2.easeInOut });
					shuffleSubtitle(0.7);

					gsap.set($(".fade-slide-element, .header-middle span"), { y: 20, opacity: 0 });
					gsap.to($(".fade-slide-element, .header-middle span"), { duration: 1, y: 0, opacity: 1, delay: 0.6, stagger: 0.05, ease: Power2.easeOut });
				}, preloaderTimeout);
			}




			const slidesRoot = document.querySelector('.clapat-sync-slider .clapat-sync-slider-wrapper .clapat-sync-slider-viewport');
			const slidesList = slidesRoot.querySelectorAll('.clapat-sync-slider .clapat-sync-slide');

			let slidesHeight = 0;

			for (const clapatSyncSlide of slidesList) {
				slidesHeight += clapatSyncSlide.offsetHeight;
			}

			let iterCloning = Math.floor(window.innerHeight / slidesHeight);

			iterCloning *= 2;

			if (iterCloning >= 1) {
				iterCloning--;

				if ((window.innerHeight % slidesHeight) > 0) {
					iterCloning++;
				}

				for (let i = 0; i < iterCloning; i++) {
					for (const clapatSyncSlide of slidesList) {
						let cloneSlide = clapatSyncSlide.cloneNode(true);
						slidesRoot.appendChild(cloneSlide);
					}
				}
			}

			const clapatSyncSlider = document.querySelector('.clapat-slider-wrapper.showcase-gallery .clapat-sync-slider-viewport');
			const syncSliderClone = clapatSyncSlider.cloneNode(true);
			document.querySelector(".clapat-slider-wrapper.showcase-gallery .clapat-sync-slider-wrapper").appendChild(syncSliderClone);




			slider = new ClapatSlider('.clapat-slider-wrapper', {
				direction: 'horizontal',
				ease: 0.075,
				outer: '.clapat-slider',
				inner: '.clapat-slider-viewport',
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				snap: false,
				parallax: [{
					element: '.speed-50',
					margin: -80
				}],
				on: {
					init: function (slide) {

						if ($('body').hasClass("show-loader")) {

							imagesLoaded('body', function () {

								gsap.to($(".showcase-gallery .clapat-slide .slide-effects"), {
									duration: 0.5, opacity: 1, delay: 0.7, ease: Power4.easeIn, onComplete: function () {
										$(".showcase-gallery").addClass("active");
									}
								});

								var gallerySlideClasses = [".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next"];
								gallerySlideClasses.forEach(function (gallerySlideClass, index) {
									var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-effects");
									var delay = 0.8 + index * 0.1;
									gsap.set(gallerySlide, { xPercent: 75 });
									gsap.to(gallerySlide, {
										duration: 2, xPercent: 0, delay: delay, ease: Power4.easeOut, onComplete: function () {
											gsap.set(gallerySlide, { clearProps: "x,y" });
										}
									});
								});

								gsap.to($(".hero-title"), { opacity: 0.05, filter: "blur(5px)", duration: 0.7, delay: 0.3 });
								shuffleSubtitle(0.5);

								gsap.set($(".fade-slide-element, .header-middle span"), { y: 20, opacity: 0 });
								gsap.to($(".fade-slide-element, .header-middle span"), { duration: 0.7, y: 0, opacity: 1, delay: 0.2, stagger: 0.05, ease: Power4.easeOut });

							});

						}

					},
					slideLeaveViewport: function (slide) {
						gsap.set($('.clapat-slider div:not(.clapat-slide-visible) .slide-effects'), { x: "" });
					},
				},
			});

			const syncSliderCloneTranslate = document.querySelectorAll('.clapat-slider-wrapper.showcase-gallery .clapat-sync-slider-wrapper > .clapat-sync-slider-viewport');
			const titleWrapper = document.querySelector('.clapat-sync-slider-wrapper');

			slider.tl
				.fromTo('.clapat-slider-wrapper.showcase-gallery .clapat-sync-slider-wrapper', { yPercent: 0 }, { yPercent: -(100 - (100 / syncSliderCloneTranslate.length)) }, 0)
				.fromTo('.hover-reveal', { y: 0 }, { y: + (titleWrapper.offsetHeight / 2) }, 0)


			//Slider Hover Events

			$('.clapat-sync-slide').on('mouseenter', function () {
				$('.clapat-sync-slide').addClass('disable');
				$(this).removeClass('disable').addClass('active');
			}).on('mouseleave', function () {
				$('.clapat-sync-slide').removeClass('disable active');
			});


			//Slider Image Change

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

			class HoverImgFx {
				constructor(el) {
					this.DOM = { el: el };
					this.DOM.reveal = this.DOM.el.querySelector('.hover-reveal');
					this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
					this.DOM.revealInner.style.overflow = 'hidden';
					this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
					this.initEvents();
				}
				initEvents() {
					this.positionElement = (ev) => {
						const mousePos = getMousePos(ev);
						gsap.to($('.hover-reveal'), {
							duration: 0.7,
							top: `${mousePos.y - (this.DOM.el.querySelector('.hover-reveal').offsetHeight * 0.5)}px`,
							left: `${mousePos.x - (this.DOM.el.querySelector('.hover-reveal').offsetWidth * 0.5)}px`,

							//top: `${window.innerHeight*0.5-(this.DOM.el.querySelector('.hover-reveal').offsetHeight*0.5)}px`, 
							//left: `${window.innerWidth*0.5-(this.DOM.el.querySelector('.hover-reveal').offsetWidth*0.5)}px`, 

							ease: Power4.easeOut
						});
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
					gsap.killTweensOf(this.DOM.revealInner);
					gsap.killTweensOf(this.DOM.revealImg);

					this.tl = gsap.timeline({
						onStart: () => {
							this.DOM.reveal.style.opacity = 1;
							gsap.set(this.DOM.el, { zIndex: 1000 });
						}
					})
						.add('begin')
						.add(gsap.to(this.DOM.revealInner, {
							duration: 0.4,
							ease: Sine.easeOut,
							startAt: { x: '-100%' },
							x: '0%'
						}), 'begin')
						.add(gsap.to(this.DOM.revealImg, {
							duration: 0.4,
							ease: Sine.easeOut,
							startAt: { x: '100%' },
							x: '0%'
						}), 'begin');
				}
				hideImage() {
					gsap.killTweensOf(this.DOM.revealInner);
					gsap.killTweensOf(this.DOM.revealImg);

					this.tl = gsap.timeline({
						onStart: () => {
							gsap.set(this.DOM.el, { zIndex: 999 });
						},
						onComplete: () => {
							gsap.set(this.DOM.el, { zIndex: '' });
							gsap.set(this.DOM.reveal, { opacity: 0 });
						}
					})
						.add('begin')
						.add(gsap.to(this.DOM.revealInner, {
							duration: 0.4,
							ease: Sine.easeOut,
							x: '100%'
						}), 'begin')

						.add(gsap.to(this.DOM.revealImg, {
							duration: 0.4,
							ease: Sine.easeOut,
							x: '-100%'
						}), 'begin');
				}
			}

			Array.from(document.querySelectorAll('.clapat-sync-slide')).forEach(link => new HoverImgFx(link));




			// Placeholder for the grid items (.item__image). We'll use the gsap FLIP plugin to move the "".item .item__image" inside the grid element
			const grid = document.querySelector('.gallery-thumbs-wrapper');
			const triggeredImage = document.querySelector('.gallery-zoom-wrapper');


			/* start grid preview callbacks */
			let gridPreview = new ClapatGridPreview(slider, {
				selContainer: '.showcase-gallery',
				limit: {
					prev: 1,
					next: 1
				}
			});

			// before showing the grid callback
			gridPreview.on.beforeShowGrid = () => {

				document.body.classList.add('disable-scroll');

				slider.enabled = false;

				gsap.to($(".grid-list-option"), { duration: 0.2, opacity: 0, ease: Power2.easeIn });
				gsap.to($(".clapat-slide.hovered .slide-caption span"), { duration: 0.15, y: -30, opacity: 0, stagger: 0.05, ease: Power2.easeIn });
				gsap.to($(".clapat-slide .slide-caption"), { duration: 0.2, opacity: 0, delay: 0, ease: Power2.easeIn });
				gsap.to($(".clapat-slide .slide-thumb img"), {
					duration: 0.3, scale: 0, opacity: 0, ease: Power2.easeIn, onComplete: function () {
						gsap.set(".clapat-slide .slide-thumb", { scale: 0, opacity: 0 });
					}
				});
				gsap.to($("#hero-caption"), { duration: 0.3, opacity: 0, ease: Power2.easeIn });


			}

			// show grid flip animation callback
			gridPreview.on.flipShowGrid = (flipstateAllImages, flipstateCurrentImage) => {

				gsap.to(".clapat-slider .clapat-slide .trigger-item", { duration: 1, opacity: 0, scale: 0.7, ease: Power2.easeOut });

				const projectBgColor = gridPreview.currentImage.dataset.projectbgcolor;

				gsap.to('.header-gradient', { duration: 0.5, delay: 0.15, backgroundColor: projectBgColor, ease: Power2.easeInOut });
				gsap.to("main", { duration: 0.5, delay: 0.15, backgroundColor: projectBgColor, ease: Power2.easeInOut });



				if (document.getElementById('clapat-page-content').classList.contains('dark-content')) {
					if (gridPreview.currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.5, delay: 0.15, opacity: 0, ease: Power2.easeInOut });
						gsap.to('#clapat-logo img.white-logo', { duration: 0.5, delay: 0.15, opacity: 1, ease: Power2.easeInOut });
						gsap.to('.classic-menu .flexnav li', { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut });
						gsap.to('header .button-wrap.menu', { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut });
						gsap.to('header .button-icon-link', { duration: 0.5, delay: 0.15, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease: Power2.easeInOut });
						gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.5, delay: 0.15, color: "#fff", ease: Power2.easeInOut });
					}
				} else if (document.getElementById('clapat-page-content').classList.contains('light-content')) {
					if (gridPreview.currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.5, delay: 0.15, opacity: 1, ease: Power2.easeInOut });
						gsap.to('#clapat-logo img.white-logo', { duration: 0.5, delay: 0.15, opacity: 0, ease: Power2.easeInOut });
						gsap.to('.classic-menu .flexnav li', { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut });
						gsap.to('header .button-wrap.menu', { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut });
						gsap.to('header .button-icon-link', { duration: 0.5, delay: 0.15, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease: Power2.easeInOut });
						gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.5, delay: 0.15, color: "#000", ease: Power2.easeInOut });
					}
				}

				// Flip it
				Flip.from(flipstateAllImages, {
					duration: 0.7,
					stagger: 0.02,
					ease: 'power3.inOut',
					absolute: true,
				})
					.to(gridPreview.currentImageInner, {
						duration: 0.7,
						ease: 'power3.inOut',
						scale: 1,
						onComplete: () => {
							document.body.classList.add('enable-trigger');
						}
					}, 0)
					.to(gridPreview.allImagesInner, {
						duration: 0.7,
						ease: 'power3.inOut',
						scale: 1,
					}, 0)
					.to(".img-mask", {
						duration: 0.7,
						ease: 'power3.inOut',
						opacity: 1
					}, 0)

				Flip.from(flipstateCurrentImage, {
					duration: 0.7,
					ease: 'power3.inOut',
					absolute: true
				});

			}

			// before hiding the grid callback
			gridPreview.on.beforeHideGrid = () => {

				gsap.to(".clapat-slider .clapat-slide .trigger-item", { duration: 0.5, opacity: 1, scale: 1, delay: 0.2, ease: 'power3.inOut' });
				gsap.set(".grid-list-option", { y: 10 });
				gsap.to(".grid-list-option", { duration: 0.4, y: 0, delay: 0.6, opacity: 1, stagger: 0.1, ease: Power2.easeOut });
				gsap.to(".progress-info", { duration: 0.4, opacity: 1, y: 0, delay: 1, opacity: 1, });

				gsap.set($(".clapat-slide.hovered .slide-caption span"), { y: 30 });
				gsap.to($(".clapat-slide.hovered .slide-caption span"), {
					duration: 0.5,
					y: 0,
					opacity: 1,
					delay: 0.5,
					stagger: 0.05,
					ease: Power2.easeOut,
					onComplete: function () {
						gsap.set($(".clapat-slide .slide-caption span"), { clearProps: "all" });
					}
				});
				gsap.to($(".clapat-slide .slide-caption"), { duration: 0.3, opacity: 1, delay: 0.5, ease: Power2.easeIn });
				gsap.set(".clapat-slide .slide-thumb img", {
					scale: 1, opacity: 1, onComplete: function () {
						gsap.to($(".clapat-slide .slide-thumb"), { duration: 0.5, scale: 1, delay: 0.5, opacity: 1, ease: "back.out(2)" });
					}
				});

				gsap.to($("#hero-caption"), { duration: 0.4, delay: 0.4, opacity: 1, ease: Power2.easeOut });

				$(".slider-zoom-wrapper").find('video').each(function () {
					$(this).get(0).pause();
				});

			}

			// hide grid flip animation callback
			gridPreview.on.flipHideGrid = (flipstateAllImages, flipstateCurrentImage) => {

				Flip.from(flipstateAllImages, {
					duration: 0.7,
					stagger: 0.02,
					ease: 'power3.inOut'
				});

				Flip.from(flipstateCurrentImage, {
					duration: 0.7,
					stagger: 0.02,
					ease: 'power3.inOut',
					onComplete: function () {

						//gridPreview.DOM.currentItem.DOM.imageWrap.appendChild(gridPreview.currentImageCaption);	

						const triggeredItem = document.querySelector('.clapat-slide.triggered-item');
						if (triggeredItem != null) {
							triggeredItem.classList.remove('triggered-item');
						}

						const clapatSlides = document.querySelectorAll('.clapat-slide');
						clapatSlides.forEach(slide => {
							slide.style.zIndex = '';
							slideInner = slide.querySelector('.slide-inner-height');
							slideInner.classList.remove('disabled');

						});

						document.body.classList.remove('disable-scroll', 'enable-trigger');
						gsap.set($(".showcase-gallery .slide-caption"), { clearProps: "opacity" });

						slider.enabled = true;

					}
				})


				gsap.to('.header-gradient', { duration: 0.4, backgroundColor: $("#clapat-page-content").data("bgcolor"), ease: Power2.easeInOut });
				gsap.to("main", { duration: 0.4, backgroundColor: $("#clapat-page-content").data("bgcolor"), ease: Power2.easeInOut });


				if (document.getElementById('clapat-page-content').classList.contains('dark-content')) {
					if (gridPreview.currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.4, opacity: 1, ease: Power2.easeInOut });
						gsap.to('#clapat-logo img.white-logo', { duration: 0.4, opacity: 0, ease: Power2.easeInOut });
						gsap.to('.classic-menu .flexnav li', { duration: 0.4, color: "#000", ease: Power2.easeInOut });
						gsap.to('header .button-wrap.menu', { duration: 0.4, color: "#000", ease: Power2.easeInOut });
						gsap.to('header .button-icon-link', { duration: 0.3, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease: Power2.easeInOut });
						gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.4, color: "#000", ease: Power2.easeInOut });
					}
				} else if (document.getElementById('clapat-page-content').classList.contains('light-content')) {
					if (gridPreview.currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.4, opacity: 0, ease: Power2.easeInOut });
						gsap.to('#clapat-logo img.white-logo', { duration: 0.4, opacity: 1, ease: Power2.easeInOut });
						gsap.to('.classic-menu .flexnav li', { duration: 0.5, color: "#fff", ease: Power2.easeInOut });
						gsap.to('header .button-wrap.menu', { duration: 0.4, color: "#fff", ease: Power2.easeInOut });
						gsap.to('header .button-icon-link', { duration: 0.3, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease: Power2.easeInOut });
						gsap.to('.button-icon-link.cp-button-prev, .button-icon-link.cp-button-next', { duration: 0.4, color: "#fff", ease: Power2.easeInOut });
					}
				}


				gsap.to($("footer .link-text, .clapat-pagination, .progress-info, #filters-wrapper"), { duration: 0.3, opacity: 1, y: 0, stagger: 0.05, delay: 0.4, ease: Power2.easeInOut });
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			}

			// grid preview navigation flip animation callback
			gridPreview.on.navigate = (flipstate, flipstateThumbs) => {

				Flip.from(flipstate, {
					duration: 0.5,
					stagger: 0,
					ease: 'power3.inOut',
					absolute: true,
					onComplete: function () {
						gsap.to(".showcase-gallery .gallery-zoom-wrapper a.slide-link", { duration: 0.3, opacity: 1, scale: 1, delay: 0, ease: Power2.easeOut });
					}
				});

				Flip.from(flipstateThumbs, {
					duration: 0.5,
					stagger: 0,
					ease: 'power3.inOut',

				});
			}

			/* end grid preview callbacks */


			if (!isMobile()) {


				$('.clapat-slider').on('mousedown', function (evt) {
					$('.clapat-slider').on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {
							// click
							gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
							$("body").removeClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();

						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#fff', backgroundColor: '#fff' });
							} else {
								gsap.to('#ball', { duration: 0.2, borderWidth: '2px', scale: 1, borderColor: '#000', backgroundColor: '#000' });
							}
							$("body").addClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
						}
						$('.clapat-slider').off('mouseup mousemove', handler);
					});
				});


				$('.clapat-slider').on('mouseup touchend', function () {
					gsap.to('#ball', { duration: 1, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', ease: Elastic.easeOut });
					$("body").removeClass("scale-drag-x");
				});

				$("body").on('mouseleave', function () {
					gsap.to('#ball', { duration: 1, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent', ease: Elastic.easeOut });
					$("body").removeClass("scale-drag-x");
				});


				$('.clapat-slide').on('mouseenter', function () {
					$('.clapat-slide').removeClass('hovered');
					$(this).addClass('hovered');
				});


				$(".showcase-gallery.preview-mode-enabled .clapat-slide .slide-inner-height").on('mouseenter', function () {
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);
						gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(170,170,170,0)", backgroundColor: "rgba(170,170,170,0.3)" });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
						$("#ball").addClass("with-blur");
						$("#ball").append('<p class="center-first">' + $this.data("centerline") + '</p>');
						$(this).find('video').each(function () {
							$(this).get(0).play();
						});
					}
				}).on('mouseleave', function () {
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();
						$(this).find('video').each(function () {
							$(this).get(0).pause();
						});
					}
				});

				$(".trigger-item").on('mouseenter', function () {
					if (!$('body').hasClass('scale-drag-x')) {
						var $this = $(this);
						gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(170,170,170,0)", backgroundColor: "rgba(170,170,170,0.3)" });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
						$("#ball").addClass("with-blur");
						$("#ball").append('<p class="center-first">' + $this.data("centerline") + '</p>');
						$(this).find('video').each(function () {
							$(this).get(0).play();
						});
					}
				}).on('mouseleave', function () {
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
						$("#ball").removeClass("with-blur color-cursor");
						$('#ball p').remove();
						$(this).find('video').each(function () {
							$(this).get(0).pause();
						});
					}
				});

				$(".showcase-gallery .clapat-sync-slide .trigger-item").on('mouseenter', function () {
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);
						gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(170,170,170,0)", backgroundColor: "rgba(170,170,170,0.3)" });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
						$("#ball").addClass("with-blur");
						$("#ball").append('<p class="center-first">' + $this.data("centerline") + '</p>');
						$(this).find('video').each(function () {
							$(this).get(0).play();
						});
					}
				}).on('mouseleave', function () {
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
						gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();
						$(this).find('video').each(function () {
							$(this).get(0).pause();
						});
					}
				});

			}




			function updateCurrentOption() {
				const $active = $('.grid-list-option .active');
				const $currentOption = $('.current-option');

				if ($active.length && $currentOption.length) {
					const width = $active.outerWidth();
					const left = $active.position().left;

					// Animație cu GSAP
					gsap.to($currentOption, {
						width: width,
						x: left,
						ease: "expo.out",
						duration: 0.5
					});
				}
			}

			// Inițializează poziția și dimensiunea lui .current-option
			updateCurrentOption();

			// Funcție pentru gestionarea clasei `disable`
			function setDisableState(state) {
				const $parent = $('.grid-list-option');
				if (state) {
					$parent.addClass('disable'); // Adaugă clasa disable
				} else {
					$parent.removeClass('disable'); // Elimină clasa disable
				}
			}

			// Eveniment click pe .grid-option
			$('.grid-option').on('click', function () {
				const $this = $(this);

				if (!$this.hasClass('active')) {
					setDisableState(true); // Adaugă clasa `disable` la început

					$(".clapat-sync-slider").removeClass("active");

					gsap.to($(".showcase-gallery .clapat-sync-slide .slide-title span"), {
						duration: 0.5,
						yPercent: -100,
						opacity: 0,
						stagger: 0.01,
						ease: Power2.easeIn
					});

					gsap.to($(".showcase-gallery .clapat-slide .slide-effects"), {
						duration: 0.5,
						opacity: 1,
						delay: 0.5,
						ease: Power4.easeIn,
						onComplete: function () {
							$(".showcase-gallery").addClass("active");
						}
					});

					var gallerySlideClasses = [".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next"];
					let animationsCompleted = 0;

					gallerySlideClasses.forEach(function (gallerySlideClass, index) {
						var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-effects");
						var delay = 0.5 + index * 0.1;

						gsap.set(gallerySlide, { xPercent: 75 });
						gsap.to(gallerySlide, {
							duration: 2,
							xPercent: 0,
							delay: delay,
							ease: Power4.easeOut,
							onComplete: function () {
								gsap.set(gallerySlide, { clearProps: "x,y" });

								// Când toate animațiile sunt complete, elimină clasa `disable`
								animationsCompleted++;
								if (animationsCompleted === gallerySlideClasses.length) {
									setDisableState(false); // Elimină clasa `disable`
								}
							}
						});
					});

					$this.addClass('active').siblings().removeClass('active');
					updateCurrentOption();
				}
			});

			// Eveniment click pe .list-option
			$('.list-option').on('click', function () {
				const $this = $(this);

				if (!$this.hasClass('active')) {
					setDisableState(true); // Adaugă clasa `disable` la început

					$this.addClass('active').siblings().removeClass('active');
					updateCurrentOption();

					gsap.to($(".showcase-gallery .clapat-slide .slide-effects"), {
						duration: 0.5,
						opacity: 0,
						delay: 0,
						ease: Power4.easeIn,
						onComplete: function () {
							$(".showcase-gallery").addClass("active");
						}
					});

					var gallerySlideClasses = [".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next"];
					let animationsCompleted = 0;

					gallerySlideClasses.forEach(function (gallerySlideClass, index) {
						var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-effects");
						var delay = 0 + index * 0.05;

						gsap.to(gallerySlide, {
							duration: 0.6,
							xPercent: -75,
							delay: delay,
							ease: Power4.easeIn,
							onComplete: function () {
								gsap.set(gallerySlide, { clearProps: "x,y" });

								// Când toate animațiile sunt complete, elimină clasa `disable`
								animationsCompleted++;
								if (animationsCompleted === gallerySlideClasses.length) {
									setDisableState(false); // Elimină clasa `disable`
								}
							}
						});
					});

					gsap.set($(".clapat-sync-slide .slide-title span"), { yPercent: 100, opacity: 0 });

					gsap.to($(".clapat-sync-slide .slide-title span"), {
						duration: 0.7,
						yPercent: 0,
						opacity: 1,
						stagger: 0.02,
						delay: 0.5,
						ease: Power2.easeOut
					});

					setTimeout(function () {
						$(".clapat-sync-slider").addClass("active");
					}, 1200);
				}
			});



			$('.trigger-item').on('click', function () {

				$("body").addClass("load-project-thumb");
				$("body").removeClass("enable-trigger");
				$("body").append('<div class="temporary-hero"><div class="outer content-full-width text-align-center"><div class="inner"></div></div></div>');

				gsap.to(".slider-zoom-wrapper .slide-cat span, .slider-zoom-wrapper .slide-date span", { duration: 0.3, y: 30, opacity: 0, delay: 0, stagger: 0, ease: Power2.easeIn });
				gsap.to(".showcase-gallery a.slide-link", { duration: 0.3, opacity: 0, scale: 0.8, delay: 0, ease: Power2.easeIn });
				gsap.to($(".slider-thumbs-wrapper .trigger-item"), { duration: 0.3, y: 160, x: 0, opacity: 1, stagger: 0.05, delay: 0, ease: Power2.easeIn });

				gsap.to($(".showcase-gallery .clapat-sync-slide .slide-title span"), { duration: 0.3, y: -70, opacity: 0, ease: Power2.easeIn });

				setTimeout(function () {
					$("body").addClass("show-loader");
				}, 300);

				gsap.to("#bg-pixels", { duration: 0.3, delay: 0, opacity: 0, ease: Power2.easeInOut });
				gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
				gsap.to(".showcase-gallery .slide-caption", { duration: 0.2, opacity: 0, ease: Power2.easeIn });
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();
			});


		}

	}//End Showcase Gallery


	/*--------------------------------------------------
	Function Showcase Snap Slider
	---------------------------------------------------*/

	function ShowcaseSnapSlider() {

		if ($('.snap-slider-holder').length > 0) {

			// Selectors and utilities
			const snapSliderHolder = document.querySelector(".snap-slider-holder");
			const snapSlides = gsap.utils.toArray(".snap-slide");
			const snapSlidesImgMask = gsap.utils.toArray(".snap-slide .img-mask");
			const snapCaptionWrapper = document.querySelector(".snap-slider-captions");
			const snapCaptions = gsap.utils.toArray(".snap-slide-caption");
			const snapThumbsWrapper = document.querySelector(".snap-slider-thumbs");
			const snapThumbs = gsap.utils.toArray(".thumb-slide");
			const snapThumbImg = gsap.utils.toArray(".thumb-slide img");


			gsap.fromTo(snapSlidesImgMask,
				{ opacity: 0.1 },
				{
					duration: 1,
					opacity: 1,
					ease: "sine.out",
					scrollTrigger: {
						trigger: snapSliderHolder,
						start: 'top 100%',
						end: '+=100%',
						scrub: true,
					},
				}
			);


			gsap.fromTo(snapSlidesImgMask,
				{ opacity: 1 },
				{
					duration: 1,
					opacity: 0.1,
					ease: "sine.out",
					scrollTrigger: {
						trigger: snapSliderHolder,
						start: 'bottom 100%',
						end: '+=100%',
						scrub: true,
					},
				}
			);



			// Utility function for playing/pausing videos
			const toggleVideo = ($slide, play) => {
				$slide.find('video').each(function () {
					const video = $(this).get(0);
					play ? video.play() : video.pause();
				});
			};

			// Initialize animations for each slide
			$('.snap-slide').each(function () {
				const $this = $(this);
				const index = $this.index();

				gsap.to($this, {
					scrollTrigger: {
						trigger: $this,
						start: "top 50%",
						end: "+=" + innerHeight,
						onEnter: () => {
							$(".snap-slider-captions").children().children().eq(index).addClass("in-view");
							toggleVideo($this, true);
						},
						onLeave: () => {
							$(".snap-slider-captions").children().children().eq(index).removeClass("in-view");
							toggleVideo($this, false);
						},
						onEnterBack: () => {
							$(".snap-slider-captions").children().children().eq(index).addClass("in-view");
							toggleVideo($this, true);
						},
						onLeaveBack: () => {
							$(".snap-slider-captions").children().children().eq(index).removeClass("in-view");
							toggleVideo($this, false);
						},
					},
				});
			});

			// Pin and animate thumbnails
			ScrollTrigger.create({
				trigger: snapSlides,
				start: "top top",
				end: () => "+=" + innerHeight * (snapSlides.length - 1),
				pin: snapThumbsWrapper,
				scrub: true,
			});

			gsap.fromTo(
				snapThumbs,
				{ y: 0 },
				{
					y: -snapThumbs[0].offsetHeight * (snapThumbs.length - 1),
					scrollTrigger: {
						trigger: snapSliderHolder,
						scrub: true,
						start: "top top",
						end: "+=" + innerHeight * (snapSlides.length - 1),
					},
					ease: "none",
				}
			);

			// Pin and animate captions
			ScrollTrigger.create({
				trigger: snapCaptionWrapper,
				start: "top top",
				end: () => "+=" + innerHeight * (snapSlides.length - 1),
				pin: true,
				scrub: true,
			});

			gsap.fromTo(
				snapCaptions,
				{ y: 0 },
				{
					y: -snapCaptions[0].offsetHeight * (snapCaptions.length - 1),
					scrollTrigger: {
						trigger: snapSliderHolder,
						scrub: true,
						start: "top top",
						end: "+=" + innerHeight * (snapSlides.length - 1),
					},
					ease: "none",
				}
			);

			// Set initial heights for slides
			gsap.set(snapSlides, { height: window.innerHeight });

			// Create snapping effect
			const snapPoints = gsap.utils.snap(1 / (snapSlides.length - 1));
			ScrollTrigger.create({
				trigger: snapSlides,
				start: "top top",
				end: "+=" + innerHeight * (snapSlides.length - 1),
				snap: {
					snapTo: snapPoints,
					duration: { min: 0.2, max: 0.7 },
					delay: 0,
					ease: "power4.inOut",
				},
			});

			// Animate image transitions within slides
			snapSlides.forEach((slide, i) => {
				const imageWrappers = slide.querySelectorAll(".img-mask");
				const isLastSlide = i === snapSlides.length - 1;
				const isFirstSlide = i === 0;

				gsap.fromTo(
					imageWrappers,
					{ y: isFirstSlide ? 0 : -window.innerHeight },
					{
						y: isLastSlide ? 0 : window.innerHeight,
						scrollTrigger: {
							trigger: slide,
							scrub: true,
							start: isFirstSlide ? "top top" : "top bottom",
							end: isLastSlide ? "top top" : undefined,
						},
						ease: "none",
					}
				);

				if (snapThumbImg[i]) {
					gsap.fromTo(
						snapThumbImg[i],
						{ y: isFirstSlide ? 0 : -snapThumbImg[i].offsetHeight / 2 },
						{
							y: isLastSlide ? 0 : snapThumbImg[i].offsetHeight / 2,
							scrollTrigger: {
								trigger: slide,
								scrub: true,
								start: isFirstSlide ? "top top" : "top bottom",
								end: isLastSlide ? "top top" : undefined,
							},
							ease: "none",
						}
					);
				}
			});




			// Snap Slider Mouse Events
			if (!isMobile()) {
				$(".thumb-slide").mouseenter(function (e) {
					$('#ball p').remove();
					var $this = $(this);
					gsap.to('#ball', { duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor: "rgba(255,255,255,0)", backgroundColor: "rgba(255,255,255,0.1)" });
					gsap.to('#ball-loader', { duration: 0.2, borderWidth: '2px', top: 2, left: 2 });
					$("#ball").addClass("with-blur");
					$("#ball").append('<p class="center-first">' + $this.data("centerline") + '</p>');
				});

				$(".thumb-slide").mouseleave(function (e) {
					gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
					gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();
				});
			}


			// Snap Slider Project Load Events
			if (!$("body").hasClass("disable-ajaxload")) {
				$('.snap-slider-thumbs-wrapper .thumb-slide').on('click', function () {

					var index = $(this).index();

					let triggered_slide = $(this);
					triggered_slide.addClass('above');
					$("body").addClass("load-project-thumb").addClass("show-loader");
					if (!$("#clapat-page-content").hasClass("light-content")) {
						setTimeout(function () {
							$("header").removeClass("white-header");
						}, 1100);
					}

					//setTimeout(function() {
					$('.snap-slider-images .snap-slide').eq(index).find('.trigger-item-link').click();
					//}, 700);

					gsap.set('.snap-slide', { delay: 0.8, opacity: 0 });

					gsap.to('.snap-slide-caption.in-view span', { duration: 0.5, y: -50, opacity: 0, ease: "sine.inOut" });
					gsap.to('.snap-slide .img-mask', { duration: 0.35, delay: 0.05, opacity: 1, scale: 1, ease: "sine.inOut" });
					gsap.to('.snap-slide .section-image', { duration: 0.35, delay: 0.05, filter: "blur(0px)", scale: 1, ease: "sine.inOut" });
					gsap.to('.snap-slider-thumbs-wrapper', { duration: 0.2, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", ease: "sine.inOut" });

					gsap.to('.snap-slider-thumbs-wrapper .thumb-slide-img', { duration: 0.35, delay: 0.05, clipPath: 'inset(0% 0% 100% 0%)', ease: "sine.inOut" });
					gsap.to('.snap-slider-thumbs-wrapper .thumb-slide-img img', { duration: 0.35, delay: 0.05, scale: 1.3, rotation: -5, ease: "sine.inOut" });

					gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
					gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
					$("#ball").removeClass("with-icon with-blur");
					$('#ball p').remove();
					$('#ball i').remove();
				});
			} else {
				gsap.to('#ball', { duration: 0.2, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-icon with-blur");
				$('#ball p').remove();
				$('#ball i').remove();
			}


		}

	}//End Showcase Parallax




	window.LoadViaAjax = function () {
		CleanupBeforeAjax();
		FirstLoad();
		ScrollEffects();
		Sliders();
		PageLoadActions();
		ShowcasePortfolio();
		ShowcaseHighlights();
		ShowcaseGallery();
		ShowcaseSnapSlider();
		FitThumbScreenWEBGL();
		LazyLoad();
		Shortcodes();
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		ContactForm();
		ContactMap();
		CustomFunction();
		ShuffleElementsFunction();
		InitShuffleElements();

	}//End Load Via Ajax

});


var LoadViaAjax = window.LoadViaAjax;


