import { getData } from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
	const btn = document.querySelector(trigger),
		error = false;

	function createCard(response) {
		response.forEach(item => {
			let card = document.createElement('div');

			card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animate__animated', 'animate__fadeIn');
			card.innerHTML = `
				<div class=styles-block>
					<img src=${item.src} alt>
					<h4>${item.title}</h4>
					<a href=${item.link}>Подробнее</a>
				</div>
			`;

			document.querySelector(wrapper).appendChild(card);
		});
	}

	btn.addEventListener('click', () => {
		getData('assets/db.json')
			.then(({styles}) => {
				createCard(styles);
				btn.remove();
			})
			.catch(error => {
				if (!document.querySelector('#error-block')) {
					let errorBlock = document.createElement('div');

					errorBlock.setAttribute('id', 'error-block');
					errorBlock.style.cssText = `
						text-align: center;
						color: red;
					`;
					errorBlock.innerText = 'Ошибка ответа от сервера, пожалуйста, перезагрузите страницу и попробуйте еще раз';

					document.querySelector(wrapper).appendChild(errorBlock);
				}
			});
	});
};

export default showMoreStyles;