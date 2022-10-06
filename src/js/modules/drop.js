const drop = () => {
	// dragenter - объект над dropArea
	// dragleave - объект за пределами dropArea
	// dragover - объект зависает над dropArea
	// drop - объект отправлен в dropArea

	const fileInputs = document.querySelectorAll('[name="upload"]');

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, preventDefaults, false);
		});
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highligth(input) {
		input.closest('.file_upload').style.border = '3px dashed gray';
		input.closest('.file_upload').style.backgroundColor = '#F7E7E6';
	}

	function unHighlight(input) {
		input.closest('.file_upload').style.border = "none";
		if (input.closest('.form__calc')) {
			input.closest('.file_upload').style.backgroundColor = "#fff";
		} else {
			input.closest('.file_upload').style.backgroundColor = "#ededed";
		}
	}

	['dragenter', 'dragover'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => highligth(input), false);
		});
	});

	['dragleave', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => unHighlight(input), false);
		});
	});

	fileInputs.forEach(input => {
		input.addEventListener('drop', (e) => {
			input.files = e.dataTransfer.files;

			let dots;
			const arr = input.files[0].name.split('.');

			arr[0].length > 6 ? dots = "..." : dots = '.';
			input.previousElementSibling.textContent = arr[0].substring(0, 6) + dots + arr[1];
		});
	})
};

export default drop;