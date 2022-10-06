function closeModal(modals) {
	const giftCard = document.querySelector('.fixed-gift');

	modals.forEach(modal => {
		modal.classList.remove('animate__fadeIn');
		modal.classList.add('animate__fadeOut');

		setTimeout(() => {
			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
			giftCard ? giftCard.style.marginRight = '0px' : '';
		}, 300);
	});
}

const modals = () => {
	let modalTimerId,
		isClicked = false;

	function openModal(modalSelector) {
		const scrollWidth = getScrollWidth(),
			modal = document.querySelector(modalSelector),
			giftCard = document.querySelector('.fixed-gift');

		modal.style.display = 'block';
		document.body.style.overflow = 'hidden';
		document.body.style.marginRight = `${scrollWidth}px`;
		giftCard ? giftCard.style.marginRight = `${scrollWidth}px` : '';
		modal.classList.remove('animate__fadeOut');
		modal.classList.add('animate__animated', 'animate__fadeIn', 'animate__faster');
	}

	function getScrollWidth() {
		const div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.visibility = 'hidden';
		div.style.overflowY = 'scroll';

		document.body.appendChild(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function bindModal(triggerSelector, modalSelector, closeSelector, removeTrigger = false) {
		const triggers = document.querySelectorAll(triggerSelector),
			closeBtn = document.querySelector(closeSelector),
			modal = document.querySelector(modalSelector),
			allModals = document.querySelectorAll('[data-modal]');

		allModals.forEach(modal => {
			modal.style.display = 'none';
		});

		triggers.forEach(trigger => {
			trigger.addEventListener('click', (e) => {
				e.preventDefault();

				isClicked = true;
				openModal(modalSelector);
				clearTimeout(modalTimerId);

				if (removeTrigger) {
					trigger.remove();
				}
			});
		});

		closeBtn.addEventListener('click', (e) => {
			if (e.target) {
				closeModal(allModals);
			}
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && e.target) {
				closeModal(allModals);
			}
		});
	}

	function openByScroll(trigger) {
		window.addEventListener('scroll', () => {
			if (!isClicked && (window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight)) {
				document.querySelector(trigger).click();
			}
		});
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

	openByScroll('.fixed-gift');
	// modalTimerId = setTimeout(() => {openModal('.popup-consultation')}, 5000);
}

export default modals;
export {closeModal};