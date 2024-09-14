//kindly NOTE: Before adding the script. we need to import the CDN link inside the chrome extenstion (javascript & CSS)

// 1 - External modules -> we need to import the CDN links

/**  
   jQuery -> https://code.jquery.com/jquery-3.6.0.min.js
   Slick JS -> https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js
   Slick CSS -> https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css
   Slick Theme -> https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css
*/


if (window.location.href.includes('/dp/')) {
	const product = {
		title: document.title,
		url: window.location.href,
		image: document.querySelector('#imgTagWrapperId img')?.src || '',
	};

	let products = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

	products.unshift(product);
	localStorage.setItem('recentlyViewed', JSON.stringify(products));
}

// if we are in Amazon home page
if (window.location.href.startsWith('https://www.amazon.in/')) {
	const products = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
	if (products.length > 0) {
		insertRecentlyViewedSection(products);
	}
}

function insertRecentlyViewedSection(products) {
	let relatedToItemsSection =
		document.querySelector('#main-content') || document.querySelector('#gwm-Deck-btf');
	if (!relatedToItemsSection) return;
  // console.log(products);
	const recentlyViewedSection = document.createElement('div');
	recentlyViewedSection.id = 'recently-viewed-products';
	recentlyViewedSection.className = 'slick-container';
	recentlyViewedSection.innerHTML = `
		<h2>Recently Viewed Products</h2>
		<div class="products slick-carousel">
			${products
				.map(
					(product) => `
			
				<a href="${product.url}" class="product">
					<img src="${product.image}" alt="${product.title}">
				</a>
				
			`
				)
				.join('')}
		</div>
	`;

	// relatedToItemsSection.insertAdjacentElement('afterend', recentlyViewedSection);
	relatedToItemsSection.parentNode.insertBefore(
		recentlyViewedSection,
		relatedToItemsSection
	);

	if (products.length > 5) {
		carouselInit();
	}
}

function carouselInit() {
	$('.slick-carousel').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		autoplaySpeed: 3000,
		arrows: true,
		prevArrow:
			'<button type="button" class="slick-prev custom-prev-arrow"></button>',
		nextArrow:
			'<button type="button" class="slick-next custom-next-arrow"></button>',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});
}
