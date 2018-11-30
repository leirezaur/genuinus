function openNav(){

	$('#navigation').fadeIn(300);
	$('#back-drop').addClass('is-active');

	$('#navigation li').each(function(i, obj){
		setTimeout(function(){
			$(obj).addClass('active');
		}, 400 + (20 * i));
	});
}

function closeNav(){
	$('#back-drop').removeClass('is-active');

	$('#navigation li').removeClass('active')
	setTimeout(function(){
		$('#navigation').fadeOut(300);
	}, 300);
}
function toggleCart(){
	$('#cart-wrapper').fadeToggle(300);
	$('#cart-back-drop').toggleClass('is-active');
}
function closeCart(){
	$('#cart-back-drop').removeClass('is-active');
	setTimeout(function(){
		$('#cart-wrapper').fadeOut(300);
	}, 300);
}
function closeFormOk(e){
	e.preventDefault();
	e.stopPropagation();

	var self = this;
	$(self).parent().fadeOut(300);
}
function closeCookies(e){
	e.preventDefault();
	e.stopPropagation();

	localStorage.setItem('cookies', 'true');
	$('#cookies').fadeOut(300);

	setTimeout(function(){
		$('#cookies').remove();
	},300);
}

function formSubmit(e){
	e.preventDefault();
	e.stopPropagation();

	var self = this;
	var valid = true;
	var $form = $(self).parents('form');

	if(!$form.find('#termsconditions').is(':checked')){
		$form.find('#termsconditions').addClass('error').removeClass('valid');
		valid = false;
	}else{
		$form.find('#termsconditions').removeClass('error').addClass('valid');
	}

	$form.find('input[required]').each(function(i, obj){

		$(obj).trigger('blur');
		if($(obj).hasClass('error')){
			valid = false;
		}
	});

	if(valid){
		$(self).find('.form__button__text').fadeOut(0);
		$(self).addClass('sent');
		$form.find('#error').fadeOut(0);
		$form.find('.form__feedback').fadeIn(300);
	}else{
		$form.find('#error').fadeIn(300);
	}
}

function validateFormField(e){

	var field = this;
	if(field.value == "" || field.value == null){
		$(field).siblings('.form__validator')
		$(field).addClass('error').removeClass('valid');
		$(field).siblings('.form__validator').fadeOut(0);
		$(field).siblings('.form__validator.error').fadeIn(300);
	}else{
		$(field).removeClass('error').addClass('valid');
		$(field).siblings('.form__validator').fadeOut(0);
		$(field).siblings('.form__validator.valid').fadeIn(300);
	}
}

function validateEmail(){

	var input = this;
	var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

	if(re.test(input.value)){
		if(!$(input).hasClass('valid')){
			$(input).removeClass('error').addClass('valid');
			$(input).siblings('.form__validator').fadeOut(300);
			$(input).siblings('.form__validator.valid').fadeIn(300);
		}
	}else{
		if(!$(input).hasClass('error')){
			$(input).addClass('error').removeClass('valid');
			$(input).siblings('.form__validator').fadeOut(300);
			$(input).siblings('.form__validator.error').fadeIn(300);
		}
	}
}

function toggleProducersInfo(e){
	e.preventDefault();
	e.stopPropagation();

	var $self = $(this);
	$self.toggleClass('active');
	$self.parents('.layout__row').find('.producers__body').slideToggle();
}

function revealOnScroll(){

	var $scrolled = $(document).scrollTop();
	var footerTop = $('footer.footer').offset().top;

	$('.anim:not(.animated)').each(function(i, obj){
		if($(obj).offset().top < ($scrolled + $win_height - 50)){
			$(obj).addClass('animated');
		}
	});

	if ($scrolled > ($win_height / 4 * 3)) {
		$('#scrollTop').fadeIn(300);
	} else {
		$('#scrollTop').fadeOut(300);
	}

	if(!$('#categories').hasClass('active')){

		if($scrolled > (footerTop - ($win_height / 4 * 3))){
			$('#categories').fadeOut(300);
		}else{
			$('#categories').fadeIn(300);
		}
	}

	if($('#categories').length > 0){

		var hero_offset = $('.hero2').outerHeight();

		if($scrolled >= hero_offset){
			$('#categories').addClass('sticky');
			$('.productos').addClass('is-sticky');
		}else{
			$('#categories').removeClass('sticky');
			$('.productos').removeClass('is-sticky');
		}
	}
}

function closeCategories(selector){
	$(selector).removeClass('active')
		.parents('.categories__link').removeClass('active').siblings('.categories__subcateg').slideUp(300);
	$(selector).parents('.categories__link').siblings('.categories__subcateg')
		.find('.categories__subcateg__sub').slideUp(300);
	$(selector).parents('.categories__link').siblings('.categories__subcateg')
		.find('.js-subcategsub-toggle').removeClass('active')
		.parents('a').removeClass('active');
}

function setCustomInputNumber() {

	var spinner = jQuery(this),
		input = spinner.find('input[type="number"]'),
		btnUp = spinner.find('.number__button--up'),
		btnDown = spinner.find('.number__button--down'),
		min = input.attr('min'),
		max = input.attr('max');

	$(this).click(function(e){
		e.preventDefault();
		e.stopPropagation();
	});

	btnUp.click(function(e) {
		e.preventDefault();
		e.stopPropagation();

		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue + 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnDown.click(function(e) {
		e.preventDefault();
		e.stopPropagation();

		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		}
		else {
			var newVal = oldValue - 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});
}

var $window,
$win_height;

$(document).ready(function() {

	$window = $(window);
	$win_height = $(window).height();

	var result = [
		'Zanahoria Ecológica',
		'Tomate Zebra',
		'Pastel de Zanahoria',
		'Zumo de naranja',
		'Zarzarrosa',
		'Maíz',
		'Tomates'
	];
	var prediction = "";
	var isResult = false;

	revealOnScroll();
	/*On scroll event */
	$window.on('scroll', revealOnScroll);

	/* Resize Window */
	$(window).on('resize', function(){

		closeNav();

		if($('.categories__subcateg').length > 0){

			closeCategories('.js-subcateg-toggle');

			$('.js-categories').parents('.categories').removeClass('active');
			$('.js-categories span').html('Ver categorías');

			setTimeout(function(){
				$('.categories__subcateg').removeAttr('style');
				$('.categories__subcateg__sub').removeAttr('style');
			},300);
		}

		if($('.js-accordion-toggle').length > 0){

			$('.js-accordion-toggle').removeClass('active')
				.siblings('.js-accordion-target').slideUp(0);

			setTimeout(function(){
				$('.js-accordion-target').removeAttr('style');
			},100);
		}
	});

	/* Open / Close Nav */
	$('#nav-toggle').on('click', openNav);
	$('#back-drop').on('click', closeNav);

	/* Open / Close Cart */
	$('#cart-toggle').on('click', toggleCart);
	$('#cart-back-drop').on('click', closeCart);
	$(document).click(function (e) {
	    if ($(e.target).parents(".header__cart").length === 0) {
	        closeCart();
	    }
	});

	/* Close feedback message from contact form */
	$('#contact-form .form__feedback__close').on('click', closeFormOk);
	$('#form-submit').on('click', formSubmit);

	/* Showing baller if cookies not stored */
	if (typeof(Storage) !== "undefined") {
		if(localStorage.getItem('cookies') == null || localStorage.getItem('cookies') == "false"){
			$('#cookies').fadeIn(300);
		}
	}

	/* Close cookies banner */
	$('#cookies-btn').on('click', closeCookies);
	$('#cookies-close').on('click', closeCookies);

	/* Form validation */
	$('#contact-form').find('input').off().on('blur', validateFormField);
	$('#contact-form').find('input[type="email"]').off().on('blur', validateEmail);

	/* Producers view more */
	$('.producers .producers__more').on('click', toggleProducersInfo);

	/* Set active class to current page link */
	$("header a").each(function(){
		if (window.location.href.indexOf($(this).attr("href")) > 0){
			$(this).addClass("active");
		}
	});

	/* Set active class to categories page link */
	$(".categories a").each(function(){
		if (window.location.href.indexOf($(this).attr("href")) > 0){
			$(this).addClass("active");
		}
	});

	$('.js-header-categories').hover(function(e){
		$(this).siblings('.navigation__categories').fadeIn(300);
	}, function(e){
		$(this).siblings('.navigation__categories').fadeOut(300);
	});

	//Cestas info
	if($('.js-accordion-toggle').length > 1){
		$('.js-accordion-toggle').on('click', function(e){

			e.preventDefault();
			e.stopPropagation();

			var self = this;

			if($(self).hasClass('active')){

				$(self).removeClass('active')
					.siblings('.js-accordion-target').slideUp(300);
			}
			else if($('.js-accordion-toggle').hasClass('active')){
				$('.js-accordion-toggle').removeClass('active')
					.siblings('.js-accordion-target').slideUp(300);
				$(self).addClass('active')
					.siblings('.js-accordion-target').slideDown(300);
			}else{
				$(self).addClass('active')
					.siblings('.js-accordion-target').slideDown(300);
			}
		});
	}

	if($('.js-testimonials').length > 0){

		var $flickity = $('.js-testimonials').flickity({
			prevNextButtons: true,
			wrapAround: true,
			autoPlay: 5500,
			dragThreshold: 10,
			selectedAttraction: 0.1,
			friction: 1.1,
			arrowShape: {
				x0: 10,
				x1: 50, y1: 40,
				x2: 55, y2: 35,
				x3: 20
			}
		});

		$flickity.on( 'scroll.flickity', function( event, progress ) {
			$('.js-thumbnail[data-thumbnail="'+ $flickity.data('flickity').selectedIndex +'"]')
				.addClass('is-selected')
				.siblings()
				.removeClass('is-selected');
		});

		$('.js-thumbnail').on('click', function(){
			var $self = $(this);
			$flickity.flickity('select', $self.data('thumbnail'));
		});
	}

	if($('.js-crossup').length > 0){

		var $flickity = $('.js-crossup').flickity({
			prevNextButtons: true,
			wrapAround: true,
			autoPlay: 5500,
			dragThreshold: 10,
			selectedAttraction: 0.1,
			friction: 1.1,
			cellAlign: 'left',
			arrowShape: {
				x0: 10,
				x1: 50, y1: 40,
				x2: 55, y2: 35,
				x3: 20
			}
		});

		$flickity.on( 'scroll.flickity', function( event, progress ) {
			$('.js-thumbnail[data-thumbnail="'+ $flickity.data('flickity').selectedIndex +'"]')
				.addClass('is-selected')
				.siblings()
				.removeClass('is-selected');
		});

		$('.js-thumbnail').on('click', function(){
			var $self = $(this);
			$flickity.flickity('select', $self.data('thumbnail'));
		});
	}

	$('#scrollTop').on('click', function(){
	    $('html, body').stop().animate({
	        scrollTop: 0
	    }, 500, 'swing');
	    return false;
	});

	/**
	* Categories and products
	*/
	if($('.js-categories').length > 0){

		$('.js-categories').on('click', function(e){

			e.preventDefault();
			e.stopPropagation();

			$(this).parents('.categories').toggleClass('active');
			$('#categories-overlay').toggleClass('active');
			if($(this).parents('.categories').hasClass('active')){
				$('.js-categories span').html('Ver productos');
			}else{
				$('.js-categories span').html('Ver categorías');
				closeCategories('.js-subcateg-toggle');
			}
		});

		$('#categories-overlay').on('click', function(e){

			e.preventDefault();
			e.stopPropagation();

			$('.js-categories span').html('Ver categorías');
			$('#categories').removeClass('active');
			closeCategories('.js-subcateg-toggle');
			$(this).removeClass('active');
		});
	}

	if($('.js-subcateg-toggle').length > 0){
		$('.js-subcateg-toggle').on('click', function(e){

			e.preventDefault();
			e.stopPropagation();

			var self = this;

			if($(self).hasClass('active')){
				closeCategories(self);
			}
			else if($('.js-subcateg-toggle').hasClass('active')){
				closeCategories('.js-subcateg-toggle');

				$(self).addClass('active')
					.parents('.categories__link').addClass('active').siblings('.categories__subcateg').slideDown(300);
			}else{
				$(self).addClass('active')
					.parents('.categories__link').addClass('active').siblings('.categories__subcateg').slideDown(300);
			}
		});

		$('.js-subcateg-hover').hover(function(e){
			e.preventDefault();
			$(this).find('.categories__subcateg').addClass('hover-lg');

			$('.js-filter').removeClass('active')
				.siblings('.js-filterdropdown').fadeOut(0);
		},function(e){
			e.preventDefault();
			$(this).find('.categories__subcateg').removeClass('hover-lg');
		});
	}

	if($('.js-subcategsub-toggle').length > 0){
		$('.js-subcategsub-toggle').on('click', function(e){

			e.preventDefault();
			e.stopPropagation();

			var self = this;

			if($(self).hasClass('active')){
				$(self).removeClass('active')
					.parents('a').removeClass('active').siblings('.categories__subcateg__sub').slideUp(300);
			}
			else if($('.js-subcategsub-toggle').hasClass('active')){
				$('.js-subcategsub-toggle').removeClass('active')
					.parents('a').removeClass('active').siblings('.categories__subcateg__sub').slideUp(300);
				$(self).addClass('active')
					.parents('a').addClass('active').siblings('.categories__subcateg__sub').slideDown(300);
			}else{
				$(self).addClass('active')
					.parents('a').addClass('active').siblings('.categories__subcateg__sub').slideDown(300);
			}
		});
	}
	/**
	* Categories and products
	*/

	/**
	* Search bar
	*/
	if($('.js-search').length > 0){

		$('.js-search')
			.keyup(function(){

				$('#results').empty();

				var text = $(this).val().toLowerCase();

				if(text != undefined && text != ""){

					for(i=0; i < result.length; i++){

						if(result[i].toLowerCase().indexOf(text) > -1){

							if(!isResult){
								isResult = true;
							}

							var pre = result[i].slice(0, result[i].toLowerCase().indexOf(text.toLowerCase()));
							var mid = result[i].slice(result[i].toLowerCase().indexOf(text.toLowerCase()), result[i].toLowerCase().indexOf(text.toLowerCase()) + text.length);
							var post = result[i].slice(result[i].toLowerCase().indexOf(text.toLowerCase()) + text.length, result[i].length);

							prediction += '<li class="js-result" data-product="producto.html">' + pre + '<strong>' + mid + '</strong>' + post + '</li>';
						}
					}
				}

				if(isResult){
					$('#results').append(prediction);
				}

				isResult = false;
				prediction = "";

				$('.js-result').on('click',function(){
					window.location.href = $(this).data('product');
				});
			})
			.keydown(function(e) {
				if (e.keyCode==8){
					$(this).trigger('keyup');
				}
			});
	}
	/**
	* Search bar
	*/

	/**
	* Filters
	*/
	if($('.js-filter').length > 0){
		$('.js-filter').on('click', function(e){

			e.preventDefault();

			var self = this;

			if($(self).hasClass('active')){
				$(self).removeClass('active')
					.siblings('.js-filterdropdown').fadeOut(100);
			}
			else if($('.js-filter').hasClass('active')){
				$('.js-filter').removeClass('active')
					.siblings('.js-filterdropdown').fadeOut(0);
				$(self).addClass('active')
					.siblings('.js-filterdropdown').fadeIn(200);
			}else{
				$(self).addClass('active')
					.siblings('.js-filterdropdown').fadeIn(200);
			}
		});
	}

	if($( ".js-rangeslider" ).length > 0){
		$( ".js-rangeslider" ).slider({
			range: true,
			max: 100,
	        values: [0, 100],
			slide: function( event, ui ) {
				$(this).siblings('.filter__pricerange').find('span:first span').text(ui.values[0]);
				$(this).siblings('.filter__pricerange').find('span:eq(2) span').text(ui.values[1]);
			}
		});
	}

	if($('.js-nproducts').length > 0){
		$('.js-nproducts span').html($('.producto').length);
	}

	if($('.js-applyfilters').length > 0){
		$('.js-applyfilters').on('click', function(e){
			e.preventDefault();
			window.location.reload();
		});
	}
	/**
	* Filters
	*/

	/**
	* Maps
	*/
	if($('#map').length > 0){
		$('#map').on('click', function(){
			$(this).addClass('clicked');
		});
	}
	/**
	* Maps
	*/

	/**
	* Add to cart methods
	*/
	$('.js-number').each(setCustomInputNumber);
	$('.js-addtocart').on('click', addToCart);

	loadCart();
	/**
	* Add to cart methods
	*/
});
