window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	scrollup();
	oversizeForm();
	details()
	// selects();
});

document.querySelectorAll('[details-button]').forEach((button) => {
	const details = document.querySelector(`[details-content="${button.getAttribute('details-button')}"]`);

	if (details) {
		button.addEventListener('click', () => {
			details.classList.toggle('none');
		});
	};
});

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

function oversizeForm() {
	const addBtn = document.querySelector('#addBtn');
	const countBtn = document.querySelector('#count');
	const pointsField = document.querySelector('#points');
	const resultField = document.querySelector('#result');
	const points = [];

	const loadingSize = [
		[480, 1625],
		[4000, 1625],
		[4500, 1238],
		[5000, 853],
		[5300, 620],
	]

	addBtn.addEventListener('click', (event) => {
		event.preventDefault();
		pointsField.innerHTML = "";
		const coordY = parseInt(document.querySelector('#coord-Y').value);
		const coordX = parseInt(document.querySelector('#coord-X').value);
		points.push([coordY, coordX]);
		points.forEach((point) => {
			pointsField.innerHTML = pointsField.innerHTML + "Y = " + point[0] + ", X = " + point[1] + "<br>"
		})
	});

	countBtn.addEventListener('click', (event) => {
		event.preventDefault();
		resultField.innerHTML = "";
		points.forEach((point) => {

			let interpolation = false

			let index = loadingSize.findIndex((loadingSizePoint) => {
				if (point[0] === loadingSizePoint[0]) {
					return true
				} else if (point[0] < loadingSizePoint[0]) {
					interpolation = true
					return true
				}

			});

			if (!interpolation) result = loadingSize[index][1]

			if (interpolation) {
				result = Math.round(loadingSize[index - 1][1] + (point[0] - loadingSize[index - 1][0]) * (loadingSize[index][1] - loadingSize[index - 1][1]) / (loadingSize[index][0] - loadingSize[index - 1][0]))
			}

			resultField.innerHTML = resultField.innerHTML + `<div>X = ${result}</div>`
		})




		// let hmin, hmax

		// for (const key in Object.keys(loadingSize)) {
		// 	if (parseInt(Object.keys(loadingSize)[parseInt(key)]) < coordY && parseInt(Object.keys(loadingSize)[parseInt(key) + 1]) > coordY) {
		// 		hmin = parseInt(Object.keys(loadingSize)[parseInt(key)]);
		// 		hmax = parseInt(Object.keys(loadingSize)[parseInt(key) + 1]);
		// 		console.log(coordY, hmin, hmax)
		// 	}
		// }

		// let wmin = parseInt(loadingSize[hmin][0])
		// let wmax = parseInt(loadingSize[hmax][0])

		// if (wmin === wmax) {
		// 	result = wmin
		// } else {
		// 	result = wmin + (hmax - hmin) / (wmax - wmin) * (coordY - hmin)
		// }

		// if (coordX <= result) {
		// 	resText = 'Груз габаритный' + ' ' + coordX + ' ' + coordY + ' ' + result
		// } else {
		// 	resText = 'Груз негабаритный' + ' ' + coordX + ' ' + coordY + ' ' + result
		// }

	});
};