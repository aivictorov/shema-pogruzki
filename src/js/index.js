import { oversizeForm } from './oversize.js';
import { validate, validateEmail, validateCaptcha } from './validation.js';

window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	scrollup();
	oversizeForm();
	callbackForm();
	inputFile();
	mobileNav();
});

function mobileNav() {
	const nav = document.querySelector('.header-bottom__item--menu');
	const navIcon = document.querySelector('.nav-icon');
	const navLinks = document.querySelectorAll('.nav a');

	navIcon.addEventListener('click', function () {
		this.classList.toggle('nav-icon--active');
		nav.classList.toggle('header-bottom__item--menu-active');
	});

	navLinks.forEach((navLink) => {
		navLink.addEventListener('click', function () {
			nav.classList.remove('nav--active');
			navIcon.classList.remove('header-bottom__item--menu-active');
		});
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

				const nav = document.querySelector('.header-bottom__item--menu');
				const navIcon = document.querySelector('.nav-icon');
				navIcon.classList.remove('nav-icon--active');
				nav.classList.remove('header-bottom__item--menu-active');

				modal.classList.add('active');
				document.body.classList.add('no-scroll');
				modal.scrollTo(0, 0);
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

		validate(form, 'name');
		validate(form, 'phone');
		validateEmail(form, 'email');
		validateCaptcha(form);

		if (
			validate(form, 'name') &&
			validate(form, 'phone') &&
			validateEmail(form, 'email') &&
			validateCaptcha(form)
		) {
			const formData = new FormData(form);

			fetch('./../php/mail.php', {
				method: 'POST',
				body: formData
			}).then(response => {
				response.text().then(responseText => {
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
		};
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