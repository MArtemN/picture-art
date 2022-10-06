const mask = (selector) => {
	function setCursorPosition(pos, elem) {
		elem.focus();

		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		}
	}

	function createMask(event) {
		let matrix = '+7 ___ ___-__-__',
			i = 0,
			def = matrix.replace(/\D/g, ''),
			currentVal = this.value.replace(/\D/g, '');

		if (def.length >= currentVal.length) {
			currentVal = def;
		}

		this.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < currentVal.length ? currentVal.charAt(i++) : i >= currentVal.length ? '' : a;
		});

		if (event.type === 'blur') {
			if (this.value.length <= 2) {
				this.value = '';
			}
		} else {
			setCursorPosition(this.value.length, this);
		}
	}

	const inputs = document.querySelectorAll(selector);

	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('keypress', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
	});
};

export default mask;