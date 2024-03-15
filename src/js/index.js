import { oversizeForm } from './oversize.js';

window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	scrollup();
	details();
	oversizeForm();
	callbackForm();
	inputFile();
});

function details() {
	document.querySelectorAll('[details-button]').forEach((button) => {
		const details = document.querySelector(`[details-content="${button.getAttribute('details-button')}"]`);

		if (details) {
			button.addEventListener('click', () => {
				details.classList.toggle('none');
			});
		};
	});
};

function scrollup() {
	const scrollup = document.querySelector('.scrollup');
	scrollup.style.opacity = 0;
	document.addEventListener('scroll', () => {
		scrollup.style.opacity = window.scrollY > 300 ? 1 : 0;
	});
	scrollup.addEventListener('click', () => {
		window.scrollTo(0, 0);
	});
};

function modalWindows() {
	document.querySelectorAll('[modal-button]').forEach((button) => {
		const modal = document.querySelector(`div[modal-window="${button.getAttribute('modal-button')}"]`);

		if (modal) {
			const content = modal.querySelector('.modal__content');
			const closeBtn = modal.querySelector(`[close-modal-button="${button.getAttribute('modal-button')}"]`);

			button.addEventListener('click', () => {
				document.querySelectorAll('[modal-window]').forEach((window) => {
					window.classList.remove('active');
				});
				modal.classList.add('active');
				document.body.classList.add('no-scroll');
			});

			content.addEventListener('mousedown', (event) => {
				event.stopPropagation();
			});

			modal.addEventListener('mousedown', () => {
				modal.classList.remove('active');
				document.body.classList.remove('no-scroll');
			});

			if (closeBtn) {
				closeBtn.addEventListener('click', () => {
					modal.classList.remove('active');
					document.body.classList.remove('no-scroll');
				});
			};
		};
	});

	alignModalWindows();

	window.addEventListener('resize', alignModalWindows);

	function alignModalWindows() {
		document.querySelectorAll('div[modal-window]').forEach((modal) => {
			const content = modal.querySelector('.modal__content');
			if (content.clientHeight >= window.innerHeight - 80) {
				content.classList.remove('modal__content--center');
			} else {
				content.classList.add('modal__content--center');
			};
		});
	};
};

function callbackForm() {
	const form = document.querySelector('#form')
	const answer = document.querySelector('#answer')

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		if (form.querySelector('[name="name"]').value.trim() == "") {
			alert('Не заполнено имя');
			return false;
		};

		if (form.querySelector('[name="phone"]').value.trim() == "") {
			alert('Не заполнен телефон');
			return false;
		};

		if (form.querySelector('[name="email"]').value.trim() == "") {
			alert('Не заполнен email');
			return false;
		};

		if (!grecaptcha.getResponse()) {
			alert('Вы не заполнили поле Я не робот!');
			return false;
		};

		const formData = new FormData(form);

		fetch('./../php/mail.php', {
			method: 'POST',
			body: formData
		}).then(response => {
			// console.log(response.ok);
			// console.log(response.status);
			response.text().then(responseText => {
				// console.log(responseText);
				form.classList.add('none')
				answer.innerText = responseText;
				const closeBtn = event.target.closest('[modal-window]').querySelector('[close-modal-button]');

				if (closeBtn) {
					closeBtn.classList.remove('none');

					closeBtn.addEventListener('click', function (event) {
						form.classList.remove('none');
						answer.innerText = "";
						grecaptcha.reset();
						closeBtn.classList.add('none');
					});
				};
			});
		});
	});
};

function inputFile() {
	document.querySelectorAll('input[type="file"]').forEach((input) => {
		const label = input.closest('label')
		const info = label.querySelector('.input-file__info');

		input.addEventListener('change', function () {
			if (input.files.length > 0) {
				info.innerText = `Прикреплено файлов: ${input.files.length}`;
			} else {
				info.innerText = "Прикрепить файл";
			};
		});

		input.addEventListener('change', function () {
			if (input.files.length > 3) {
				input.value = "";
				alert('Ошибка! Нельзя прикреплять больше 3 файлов');
				info.innerText = "Прикрепить файл";
			};
		});
	});
};