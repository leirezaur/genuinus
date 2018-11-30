function addToCart(e){

	e.preventDefault()
	e.stopPropagation();

	var product = $(this).parents('.js-producto');
	var qty = product.find('.js-number input').val();

	console.log("PRODUCT:");
	console.log(product);

	if(isProductAdded(product.data('id'))){

		console.log("Is added");
		addMoreItems(product.data('id'), qty)
	}else{
		console.log("Is not added");
		var newProd = {
			'image' : product.data('image'),
			'name' : product.data('name'),
			'uds' : qty,
			'price' : parseFloat(product.data('price')).toFixed(2),
			'unit': product.data('unit'),
		};

		console.log(newProd);
		addNewProduct(product.data('id'), newProd)
	}
	loadCart();

	$('.js-cart-amount').addClass('shaking');
	setTimeout(function(){
		$('.js-cart-amount').removeClass('shaking');
	}, 1000);
}
function addNewProduct(key, product){

	console.log("Add new product");
	var cart = JSON.parse(sessionStorage.getItem('cart'));
	var total = fixDecimals(parseFloat(cart.total));

	cart.total = fixDecimals(total + product.price * product.uds);
	cart.items[key] = product;
	storeCart(cart);
}
function addMoreItems(key, number){
	var cart = JSON.parse(sessionStorage.getItem('cart'));
	var qty = parseInt(cart.items[key].uds);
	var total = fixDecimals(parseFloat(cart.total));

	cart.items[key].uds = qty + parseInt(number);
	cart.total = fixDecimals(total + cart.items[key].price * parseInt(number));
	storeCart(cart);
}
function isProductAdded(key){
	var cart = JSON.parse(sessionStorage.getItem('cart'));
	if(cart == null){
		cart = {
			total : 0,
			shipping: 7,
			items : {}
		}
		storeCart(cart);
		return false;
	}else{
		return cart.items.hasOwnProperty(key);
	}
}
function storeCart(cart){
	sessionStorage.setItem('cart', JSON.stringify(cart));
}
function loadCart(){
	var cart = JSON.parse(sessionStorage.getItem('cart'));
	var cartOutput = '';

	if(cart == null){
		cart = {
			total : 0,
			shipping: 7,
			items : {}
		}
		storeCart(cart);
	}

	console.log("length: " + Object.keys(cart.items).length);

	if(Object.keys(cart.items).length == 0){
		cartOutput = '<li><span class="cart__empty">Su carrito está vacío</span></li>';
		$('.header__cart__total span').html(0);
		$('.header__cart__cta').fadeOut(0);
	}else{
		Object.keys(cart.items).forEach(function(key){
			cartOutput += '<li class="cart__underline">'+
							'<a href="producto.html" class="cart__row">'+
								'<div class="cart__col cart__col--imagen">'+
									'<img src="images/productos/' + cart.items[key].image + '" alt="' + cart.items[key].name + '">'+
								'</div>'+
								'<div class="cart__col cart__col--nombre">'+
									'<span>' + cart.items[key].name + '</span>'+
								'</div>'+
								'<div class="cart__col cart__col--uds">'+
									'<span>' + cart.items[key].uds + '</span>'+
								'</div>'+
								'<div class="cart__col cart__col--precio">'+
									'<span>' + (cart.items[key].price + "").replace('.', ',') + '</span> €'+
								'</div>'+
							'</a>'+
						'</li>';
					});

		// cartOutput += '<li class="cart__row__last">'+
		// 				'<div class="cart__col cart__col--total">'+
		// 					'TOTAL: <span>' + (cart.total + "").replace('.', ',') + '</span> €'+
		// 				'</div>'+
		// 			'</li>';

		$('.header__cart__total span').html((cart.total + "").replace('.', ','));
		$('.header__cart__cta').fadeIn(0);
	}

	$('.js-cart-amount').html(Object.keys(cart.items).length);
	$('.js-cart-price span').html((cart.total + "").replace('.', ','));
	$('#cart').html(cartOutput);
}
function loadCartSummary(){
	var cart = JSON.parse(sessionStorage.getItem('cart'));
	var cartOutput = '';
	var widgetOutput = '';

	if(Object.keys(cart.items).length == 0){
		//TODO: fer algo si carrito vació
		// cartOutput = '<li><span class="cart__empty">Su carrito está vacío</span></li>';

		console.log("EMPTY CART!!!!");


		$('#cart-container').html('<div class="checkoutcart__emptycart">' +
									'Su carrito está vacío' +
								'</div>');
	}else{

		widgetOutput = '<div class="resumewidget">' +
                '<div class="resumewidget__content">' +
                    '<div class="resumewidget__header">' +
                        '<div class="resumewidget__info">' +
                            '<div class="resumewidget__price">' +
                                '<span>' + (cart.total + "").replace('.', ',') + '</span> €' +
                            '</div>' +
                            '<div class="resumewidget__name">' +
                                'Productos' +
                            '</div>' +
                        '</div>' +
                        '<div class="resumewidget__info">' +
                            '<div class="resumewidget__price">' +
                                '<span>' + cart.shipping + '</span> €' +
                            '</div>' +
                            '<div class="resumewidget__name">' +
                                'Envío' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="resumewidget__footer">' +
                        '<h3 class="resumewidget__total">' +
                            'Total carro: ' + ' <span>' + ((cart.total + cart.shipping) + "").replace('.', ',') + '</span> €' +
                        '</h3>' +
                        '<a href="checkout.html" class="resumewidget__button button button--primary">' +
                            'Comprar'
                        '</a>' +
                    '</div>' +
                '</div>';

		Object.keys(cart.items).forEach(function(key){
			cartOutput += '<li class="checkoutcart__item">'+
							'<div class="js-product checkoutcart-item" data-id="' + key + '">'+
								'<div class="checkoutcart-item__content">' +
									'<div class="checkoutcart-item__imagen">' +
										'<img src="images/productos/' + cart.items[key].image + '" alt="' + cart.items[key].name + '">'+
									'</div>' +
									'<div class="checkoutcart-item__info">' +
										'<h3 class="checkoutcart-item__title">' +
											'<span>' + cart.items[key].name + '</span>'+
										'</h3>' +
										'<div class="checkoutcart-item__price">' +
											'<span>' + (cart.items[key].price + "").replace('.', ',') + '</span> € / <span class="checkoutcart-item__unit">' + cart.items[key].unit + '</span>' +
										'</div>' +
										'<div class="checkoutcart-item__subtotal">' +
											'Subtotal: <br><span>' + (fixDecimals(cart.items[key].price * cart.items[key].uds) + "").replace('.', ',') + '</span> €' +
										'</div>' +
										'<div class="checkoutcart-item__number number js-number">' +
											'<div class="number__button number__button--down"></div>' +
											'<input class="js-amount" type="number" min="1" max="50" step="1" value="' + cart.items[key].uds + '">' +
											'<div class="number__button number__button--up"></div>' +
											'<div class="js-delete number__button number__button--delete"></div>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</li>';
					});

		$('#summary-widget').html(widgetOutput);
		$('#summary-cart').html(cartOutput);
		$('.js-number').each(setCustomInputNumber);
		$('.js-delete').on('click', function(){
			$('#loader').fadeIn(100);
			var cart = JSON.parse(sessionStorage.getItem('cart'));
			delete cart.items[$(this).parents('.js-product').data('id')];
			refreshCart(cart);
		});
		$('.js-amount').on('change', function(){
			$('#loader').fadeIn(100);
			var val = $(this).val();
			var cart = JSON.parse(sessionStorage.getItem('cart'));
			cart.items[$(this).parents('.js-product').data('id')].uds = val;
			refreshCart(cart);
		});
	}
	$('#loader').fadeOut(100);
}
function updateCartTotal(){
	var cart = JSON.parse(sessionStorage.getItem('cart'));
	var total = 0;
	Object.keys(cart.items).forEach(function(key){

		console.log(cart.items[key].price);
		console.log(cart.items[key].uds);

		total += (cart.items[key].price * cart.items[key].uds);
	});

	console.log(fixDecimals(total));
	cart.total = fixDecimals(total);
	storeCart(cart);
}
function refreshCart(cart){
	storeCart(cart);
	updateCartTotal();
	loadCart();
	loadCartSummary();
}
function emptyCart(){
	sessionStorage.clear();
	loadCart();
}
function fixDecimals(number){
	return Math.round( number * 1e2 ) / 1e2;
}
