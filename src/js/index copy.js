import { oversizeForm } from './oversize.js';

window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	scrollup();
	details();
	oversizeForm();
	callbackForm();
	// gallery();
	// selects();
	inputFile();
});

function gallery() {
	const modals = document.querySelector('.modals')
	const portfolio = document.querySelector('.portfolio__row')

	portfolio.querySelectorAll('img').forEach((img) => {

		let string = img.src
		string = string.split('/')[string.split('/').length - 1].split('.')[0].split('img-')[1];

		console.log(string)
		img.src = img.src.replace("small", "big");
		console.log(img.src)

		modals.insertAdjacentHTML("afterbegin", `
			<div class="modal" modal-window="gallery">
				<div class="modal__content modal__content--center modal__content--gallery page-text">
					<img class="img" src="./img/portfolio/img-small.jpg" alt="" style="width: 100%;">
				</div>
				<div class="modal__close-button">
					<svg class="icon icon--close-light">
						<use xlink:href="./img/icons/sprite.svg#close-light"></use>
					</svg>
				</div>
			</div>
		`);
	});
};

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
	const form = document.querySelector('#form')
	const answer = document.querySelector('#answer')

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const formData = new FormData(form);

		console.log(Array.from(formData));

		fetch('./../php/mail_old.php', {
			method: 'POST',
			body: formData
		}).then(response => {
			// console.log(response.ok);
			// console.log(response.status);
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
	});
};


function inputFile() {
	let inputFile = document.querySelector('input[type="file"]');
	console.log(inputFile)
	// let button = $('#myButton');
	// let filesContainer = $('#myFiles');
	// let files = [];

	inputFile.addEventListener('change', function () {
		if (this.value) {
			console.log("Оппа, выбрали файл!");
			console.log(this.value);
			console.log(inputFile.files[0].name);
			console.log(inputFile.nextElementSibling.nextElementSibling);
			inputFile.nextElementSibling.nextElementSibling.innerText = inputFile.files[0].name
		} else { // Если после выбранного тыкнули еще раз, но дальше cancel
			console.log("Файл не выбран");
		}
	});


	// inputFile.change(function () {
	// let newFiles = [];
	// for (let index = 0; index < inputFile[0].files.length; index++) {
	// 	let file = inputFile[0].files[index];
	// 	newFiles.push(file);
	// 	files.push(file);
	// }

	// newFiles.forEach(file => {
	// 	let fileElement = $(`<p>${file.name}</p>`);
	// 	fileElement.data('fileData', file);
	// 	filesContainer.append(fileElement);

	// 	fileElement.click(function (event) {
	// 		let fileElement = $(event.target);
	// 		let indexToRemove = files.indexOf(fileElement.data('fileData'));
	// 		fileElement.remove();
	// 		files.splice(indexToRemove, 1);
	// 	});
	// });
	// });

	// button.click(function () {
	// 	inputFile.click();
	// });
}