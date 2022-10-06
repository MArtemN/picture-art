const pictureSize = (blockSelector) => {
	const blocks = document.querySelectorAll(blockSelector);

	const showPicture = (block) => {
		const img = block.querySelector('img');

		img.src = img.src.slice(0, -4) + '-1.png';
		img.classList.add('fadeIn');

		block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
			item.classList.add('animate__animated', 'animate__fadeInUp');
			item.style.display = 'none';
		});
	}

	const hidePicture = (block) => {
		const img = block.querySelector('img');

		img.src = img.src.slice(0, -6) + '.png';
		img.classList.remove('fadeIn');

		block.querySelectorAll('p').forEach(item => {
			item.style.display = 'block';
		});
	}

	blocks.forEach(block => {
		block.addEventListener('mouseover', () => {
			showPicture(block);
		});
		block.addEventListener('mouseout', () => {
			hidePicture(block);
		});
	});
};

export default pictureSize;