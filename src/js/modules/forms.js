import { closeModal } from './modals';
import { postData } from '../services/requests';

const forms = () => {
	const forms = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]');

	const status = {
		loading: 'Загрузка...',
		ok: 'Спасибо! Скоро мы с вами свяжемся',
		fail: 'Что-то пошло не так...',
		loadingImg: 'assets/img/spinner.gif',
		okImg: 'assets/img/ok.png',
		failImg: 'assets/img/fail.png'
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	}

	function clearInputs() {
		inputs.forEach(item => {
			item.value = '';
		});

		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		});
	}

	function resetSelects() {
		const selects = document.querySelectorAll('select');

		selects.forEach(option => {
			option.value = '';
		});
	}

	upload.forEach(item => {
		item.addEventListener('input', () => {
			let fileName = item.files[0].name.split('.')[0],
				fileExtension = item.files[0].name.split('.')[1];

			if (fileName.length > 14) {
				fileName = fileName.substring(0, 13) + '..' + `.${fileExtension}`;
			} else {
				fileName = fileName + `.${fileExtension}`;
			}

			item.previousElementSibling.textContent = fileName;
		});
	});

	forms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let formData = new FormData(form);
			let api;
			form.closest('.popup-design') || form.classList.contains('form__calc') ? api = path.designer : api = path.question;

			if (form.classList.contains('form__calc')) {
				const selects = form.querySelectorAll('select'),
					promoCode = document.querySelector('.promocode'),
					sizeSelect = document.querySelector('#size'),
					materialSelect = document.querySelector('#material');

				if (sizeSelect.value !== '' && materialSelect.value !== '') {
					selects.forEach(item => {
						formData.append(item.getAttribute('id'), item.value);
					});
				} else {
					return false;
				}

				if (promoCode) {
					formData.append('promoCode', promoCode.value);
				}
			}

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status', 'animate__animated', 'animate__fadeIn');
			statusMessage.style.textAlign = 'center';
			form.parentNode.appendChild(statusMessage);

			let textMessage = document.createElement('div');
			textMessage.textContent = status.loading;
			statusMessage.appendChild(textMessage);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', status.loadingImg);
			statusMessage.appendChild(statusImg);

			form.style.display = 'none';

			postData(api, formData)
				.then(res => {
					console.log(res);
					textMessage.textContent = status.ok;
					statusImg.setAttribute('src', status.okImg);
				})
				.catch(() => {
					textMessage.textContent = status.fail;
					statusImg.setAttribute('src', status.failImg);
				})
				.finally(() => {
					clearInputs();
					resetSelects();
					setTimeout(() => {
						statusMessage.remove();
						form.style.display = 'block';
						form.classList.add('animate__animated', 'animate__fadeIn');
						closeModal(document.querySelectorAll('[data-modal]'));
					}, 3000);
				});
		});
	});
}

export default forms;