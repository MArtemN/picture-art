import {getData} from '../services/requests';

const createCalcOptionsList = () => {
	const sizeBlock = document.querySelector('#size'),
		materialBlock = document.querySelector('#material'),
		optionsBlock = document.querySelector('#options');

	const createOptions = (res, wrapper) => {
		res.forEach(({price, textValue, titleValue}) => {
			const option = document.createElement('option');

			if (titleValue) {
				option.setAttribute('title', titleValue);
			}

			option.setAttribute('value', price);
			option.textContent = textValue;

			wrapper.append(option);
		})
	};

	getData('assets/db.json')
		.then(({calc: {size, material, options}}) => {
			createOptions(size, sizeBlock);
			createOptions(material, materialBlock);
			createOptions(options, optionsBlock);
	});
};

export default createCalcOptionsList;