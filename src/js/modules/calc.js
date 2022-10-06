const calc = (size, material, options, promoCode, result) => {
	const sizeBlock = document.querySelector(size),
		materialBlock = document.querySelector(material),
		optionsBlock = document.querySelector(options),
		promoCodeBlock = document.querySelector(promoCode),
		resultBlock = document.querySelector(result);

	let sum = 0;

	const calculation = () => {
		sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

		if (sizeBlock.value === '' || materialBlock.value === '') {
			resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
		} else if (promoCodeBlock.value === 'IWANTPOPART') {
			resultBlock.textContent = Math.round(sum * 0.7);
		} else {
			resultBlock.textContent = sum;
		}
	}

	sizeBlock.addEventListener('change', calculation);
	materialBlock.addEventListener('change', calculation);
	optionsBlock.addEventListener('change', calculation);
	promoCodeBlock.addEventListener('input', calculation);
};

export default calc;