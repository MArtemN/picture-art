const burgerMenu = (burgerSelector, menuSelector) => {
	const burger = document.querySelector(burgerSelector),
		menu = document.querySelector(menuSelector),
		menuItem = menu.querySelectorAll('li'),
		overlay = document.querySelector('.overlay');

	menu.style.display = 'none';

	burger.addEventListener('click', (e) => {
		overlay.style.display = 'block';

		if (menu.style.display === 'none' && window.screen.availWidth < 993) {
			menu.style.display = 'block';
		} else {
			overlay.style.display = 'none';
			menu.style.display = 'none';
		}
	});

	menuItem.forEach(item => {
		item.addEventListener('click', (e) => {
			if (e.target.tagName === 'A') {
				overlay.style.display = 'none';
				menu.style.display = 'none';
			}
		});
	})

	window.addEventListener('click', (e) => {
		if (e.target.classList.contains('overlay') && menu.style.display === 'block') {
			menu.style.display = 'none';
			overlay.style.display = 'none';
		}
	});
};

export default burgerMenu;