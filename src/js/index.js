import { oversizeForm } from './oversize.js';

window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	scrollup();
	details();
	selects();
	oversizeForm();
	callbackForm();
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
}

function modalWindows() {
	document.querySelectorAll('[modal-button]').forEach((button) => {
		const modal = document.querySelector(`div[modal-window="${button.getAttribute('modal-button')}"]`);

		if (modal) {
			const content = modal.querySelector('.modal__content');

			button.addEventListener('click', () => {
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

function selects() {
	document.querySelectorAll('.select').forEach(function (select) {
		const selectButton = select.querySelector('.select__button');
		const selectList = select.querySelector('.select__list');
		const selectListItems = select.querySelectorAll('.select__list li');
		const selectInputHidden = select.querySelector('.select__input-hidden');
		const selectIcon = select.querySelector('.select__icon');

		selectButton.addEventListener('click', (event) => {
			event.preventDefault();
			selectList.classList.toggle('visible');
			selectButton.classList.toggle('active');
			selectIcon && selectIcon.classList.toggle('active');
		});

		selectIcon.addEventListener('click', (event) => {
			event.stopPropagation();
			selectList.classList.toggle('visible');
			selectButton.classList.toggle('active');
			selectIcon && selectIcon.classList.toggle('active');
		});

		selectListItems.forEach((item) => {
			item.addEventListener('click', (event) => {
				selectButton.innerText = item.innerText;
				selectInputHidden.value = item.dataset.value;
				selectList.classList.remove('visible');
				selectButton.classList.remove('active');
				selectIcon && selectIcon.classList.remove('active');
				selectButton.focus();
				event.stopPropagation();
			});
		});

		document.addEventListener('click', (event) => {
			if (event.target !== selectButton) {
				selectList.classList.remove('visible');
				selectButton.classList.remove('active');
				selectIcon && selectIcon.classList.remove('active');
			};
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Tab' || event.key === 'Escape') {
				selectList.classList.remove('visible');
				selectButton.classList.remove('active');
				selectIcon && selectIcon.classList.remove('active');
				selectButton.blur();
			};
		});
	});
};

function callbackForm() {
	document.querySelector('#form').addEventListener('submit', (event) => {
		event.preventDefault();
	});

	$('#form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'Неверный формат email'
			},
			message: {
				required: 'Введите текст сообщения',
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	});

	function ajaxFormSubmit() {
		const string = $('#form').serialize();

		$.ajax({
			type: "POST",
			url: "./php/mail.php",
			data: string,
			success: function (html) {
				$('#form').slideUp(800);
				$('#answer').html(html);
			}
		});
		return false;
	};
}