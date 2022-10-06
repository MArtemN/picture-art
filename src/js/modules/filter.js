const filter = () => {
	const btnsWrapper = document.querySelector('.portfolio-menu'),
		btns = btnsWrapper.querySelectorAll('li'),
		content = document.querySelectorAll('.portfolio-block'),
		noContentBlock = document.querySelector('.portfolio-no');

	const showActiveBlock = (filterName) => {
		let visibleContent = [];

		content.forEach(item => {
			item.style.display = 'none';

			if (filterName === 'no-content') {
				noContentBlock.style.display = 'block';
				noContentBlock.classList.add('animate__animated', 'animate__fadeIn');
			} else {
				if (item.classList.contains(filterName)) {
					visibleContent.push(item);
					noContentBlock.style.display = 'none';
				}
			}
		});

		visibleContent.forEach(item => {
			if (getComputedStyle(item).display === 'none') {
				item.style.display = 'block';
				item.classList.add('animate__animated', 'animate__fadeIn');
			}
		})
	}

	btnsWrapper.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.tagName === 'LI') {
			const filterName = target.getAttribute('data-filter');

			if (!target.classList.contains('active')) {
				btns.forEach(btn => {
					btn.classList.remove('active');
				});

				target.classList.add('active');

				showActiveBlock(filterName);
			}

		}
	})
};

export default filter;