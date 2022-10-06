const checkTextInputs = (selector) => {
	const txtInputs = document.querySelectorAll(selector);

	txtInputs.forEach(input => {
		input.addEventListener('keypress', (e) => {
			if (e.key.match(/[^а-яё\d]/ig)) {
				e.preventDefault();
			}
		});

		input.addEventListener('input', (e) => {
			input.value = e.target.value.replace(/[^а-яё\d]/ig, '');
		});
	});
};

export default checkTextInputs;