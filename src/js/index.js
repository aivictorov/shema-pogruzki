import { oversizeForm } from './oversize.js';
import { validate, validateEmail, validateCaptcha } from './validation.js';

window.addEventListener('load', () => {
	loader();
	modalWindows();
	mobileNav();
	metrika();
});

document.addEventListener('click', function () {
	callbackForm();
	inputFile();
	oversizeForm();
	captcha();
}, { once: true });

document.addEventListener('scroll', function () {
	faq();
	scrollup();
}, { once: true });


function faq() {
	const questions = document.querySelectorAll('.question-card');

	questions.forEach((question) => {
		const head = question.querySelector('.question-card__head');
		const body = question.querySelector('.question-card__body');

		head.addEventListener('click', () => {
			head.classList.toggle('js-faq-active');

			if (!body.style.display || body.style.display == "none") {
				body.style.display = "block";
			} else {
				body.style.display = "none";
			}
		});
	});

	const closeBtns = document.querySelectorAll('.js-dropdown-close');

	closeBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			btn.closest('.question-card').querySelector('.question-card__head').classList.toggle('js-faq-active');
			btn.closest('.question-card').querySelector('.question-card__body').style.display = "none";
		});
	});
}

function loader() {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
	}, 500);
}

function captcha() {
	var key = '6LcXOZkpAAAAAKMYw8hzWcIoRbcvHp4BBlgZCUVs';

	var script = document.createElement('script');
	script.src = 'https://www.google.com/recaptcha/api.js';
	script.async = true;
	script.onload = function () {
		grecaptcha.ready(function () {
			grecaptcha.render('captcha_id', { 'sitekey': key, 'callback': verifyCallback, });
		})
	};

	document.body.appendChild(script);

	function verifyCallback() {
		const captcha = form.querySelector('#captcha_id');
		const notify = captcha.closest('.captcha').querySelector('.input__notify');
		notify.innerText = "";
	};
};

function mobileNav() {
	const nav = document.querySelector('.menu');
	const navIcon = document.querySelector('.nav-icon');
	const navLinks = document.querySelectorAll('.menu .menu__item a');

	navIcon.addEventListener('click', function () {
		navIcon.classList.toggle('nav-icon--active');
		nav.classList.toggle('menu--active');
	});

	navLinks.forEach((navLink) => {
		navLink.addEventListener('click', function () {
			navIcon.classList.remove('nav-icon--active');
			nav.classList.remove('menu--active');
		});
	});
};

function scrollup() {
	const scrollup = document.querySelector('.scrollup');
	document.addEventListener('scroll', () => {
		scrollup.style.display = window.scrollY > 300 ? scrollup.classList.add('scrollup--active') : scrollup.classList.remove('scrollup--active');;
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
			const closeBtns = modal.querySelectorAll(`[close-modal-button="${button.getAttribute('modal-button')}"]`);
			const nav = document.querySelector('.menu');
			const navIcon = document.querySelector('.nav-icon');
			const header = document.querySelector('.header');


			button.addEventListener('click', () => {
				document.querySelectorAll('[modal-window]').forEach((window) => {
					window.classList.remove('active');
				});
				navIcon.classList.remove('nav-icon--active');
				nav.classList.remove('menu--active');
				modal.classList.add('active');
				document.body.classList.add('noscroll');
				header.classList.add('noscroll');
				modal.scrollTo(0, 0);
			});

			content.addEventListener('mousedown', (event) => {
				event.stopPropagation();
			});

			modal.addEventListener('mousedown', () => {
				modal.classList.remove('active');
				document.body.classList.remove('noscroll');
				header.classList.remove('noscroll');
			});

			if (closeBtns) {
				closeBtns.forEach((closeBtn => {
					closeBtn.addEventListener('click', () => {
						modal.classList.remove('active');
						document.body.classList.remove('noscroll');
						header.classList.remove('noscroll');
					});
				}));
			};
		};
	});

	alignModalWindows();

	window.addEventListener('resize', alignModalWindows);

	function alignModalWindows() {
		document.querySelectorAll('div[modal-window]').forEach((modal) => {
			const content = modal.querySelector('.modal__content');
			if (content.clientHeight >= window.innerHeight - 100) {
				content.classList.remove('modal__content--center');
			} else {
				content.classList.add('modal__content--center');
			};
		});
	};
};

function callbackForm() {
	const form = document.querySelector('#form');
	const answer = document.querySelector('#answer');
	const content = form.closest('.modal__content');

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		validate(form, 'company');
		validate(form, 'name');
		validate(form, 'phone');
		validateEmail(form, 'email');
		validate(form, 'message');
		validateCaptcha(form);

		if (
			validate(form, 'company') &&
			validate(form, 'name') &&
			validate(form, 'phone') &&
			validateEmail(form, 'email') &&
			validate(form, 'message') &&
			validateCaptcha(form)
		) {
			const formData = new FormData(form);

			fetch('./../php/mail.php', {
				method: 'POST',
				body: formData
			}).then(response => {
				response.text().then(responseText => {
					content.classList.add('modal__content--center');
					form.classList.add('none')
					answer.innerText = responseText;
					const closeBtn = event.target.closest('[modal-window]').querySelector('[close-modal-button]');

					if (closeBtn) {
						closeBtn.classList.remove('none');

						closeBtn.addEventListener('click', function (event) {
							content.classList.remove('modal__content--center');
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

function metrika() {
	(function (d, w, c) {
		(w[c] = w[c] || []).push(function () {
			try {
				w.yaCounter96778311 = new Ya.Metrika({ id: 96778311, clickmap: false, trackLinks: false, accurateTrackBounce: true });
			} catch (e) { }
		});

		var n = d.getElementsByTagName("script")[0],
			x = "https://mc.yandex.ru/metrika/watch.js",
			s = d.createElement("script"),
			f = function () {
				n
					.parentNode
					.insertBefore(s, n);
			};
		for (var i = 0; i < document.scripts.length; i++) {
			if (document.scripts[i].src === x) {
				return;
			}
		}
		s.type = "text/javascript";
		s.async = true;
		s.src = x;

		if (w.opera == "[object Opera]") {
			d.addEventListener("DOMContentLoaded", f, false);
		} else {
			f();
		}
	})(document, window, "yandex_metrika_callbacks");
}