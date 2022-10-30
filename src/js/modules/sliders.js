const sliders = (slides, direction, prev, next) => {
	let slideIndex = 1,
		autoInterval;

	const items = document.querySelectorAll(slides);

	function showSlides(i, addAnimate, removeAnimate) {

		if (i < 1) {
			slideIndex = items.length;
			i = items.length;
		}

		if (i > items.length) {
			slideIndex = 1;
			i = 1;
		}

		items.forEach(item => {
			item.style.display = 'none';
		});

		items[i - 1].style.display = 'block';
		items[i - 1].classList.remove(`${removeAnimate}`);
		items[i - 1].classList.add('animate__animated', `${addAnimate}`);
	}

	function changeSlide(prev, next) {
		const prevBtn = document.querySelector(prev),
			nextBtn = document.querySelector(next);

		if (prevBtn && nextBtn) {
			prevBtn.addEventListener('click', () => {
				showSlides(slideIndex += -1, 'animate__slideInRight', 'animate__slideInLeft');
			});
			nextBtn.addEventListener('click', () => {
				showSlides(slideIndex += 1, 'animate__slideInLeft', 'animate__slideInRight');
			});
		}
	}

	function autoPlay() {
		if (direction === 'vertical') {
			autoInterval = setInterval(() => {
				slideIndex += 1;
				showSlides(slideIndex, 'animate__slideInDown');
			}, 5000);
		} else {
			autoInterval = setInterval(() => {
				slideIndex += 1;
				showSlides(slideIndex, 'animate__slideInLeft', 'animate__slideInRight');
			}, 3000);
		}
	}

	items[0].parentNode.addEventListener('mouseenter', () => {
		clearInterval(autoInterval);
	});

	items[0].parentNode.addEventListener('mouseleave', () => {
		autoPlay();
	});

	showSlides(slideIndex);
	changeSlide(prev, next);
	autoPlay();
};

export default sliders;