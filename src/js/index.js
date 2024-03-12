window.addEventListener('DOMContentLoaded', () => {
	modalWindows();
	scrollup();
	// dropdowns()
	// dualRangeInputs();
	// selects();
	// tabs();
	// accordeons();
	oversizeForm();
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

function oversizeForm() {
	const countBtn = document.querySelector('#count');
	const resultField = document.querySelector('#result');

	const loadingSize = {
		480: [1625, 1700, 1760, false, false, false, false, 1920],
		1100: [1625, 1700, 1760, false, false, false, false, 1920],
		1200: [1625, 1700, 1760, false, false, false, false, 2450],
		1230: [1625, 1700, 1760, 1850, 2000, 2080, 2240, 2450],
		1240: [1625, 1700, 1760, 1850, 2000, 2080, 2240, 2450],
		1399: [1625, 1700, 1760, 1850, 2000, 2080, 2240, 2450]
	}

	countBtn.addEventListener('click', (event) => {
		event.preventDefault();

		const coordX = parseInt(document.querySelector('#coord-X').value);
		const coordY = parseInt(document.querySelector('#coord-Y').value);

		console.log(Object.keys(loadingSize)[0]);
		console.log(Object.keys(loadingSize)[Object.keys(loadingSize).length - 1]);

		let hmin, hmax, result

		for (const key in Object.keys(loadingSize)) {
			if (parseInt(Object.keys(loadingSize)[parseInt(key)]) < coordY && parseInt(Object.keys(loadingSize)[parseInt(key) + 1]) > coordY){
				hmin = parseInt(Object.keys(loadingSize)[parseInt(key)]);
				hmax = parseInt(Object.keys(loadingSize)[parseInt(key) + 1]);
				console.log(coordY, hmin, hmax)
			}
		}

		let wmin = parseInt(loadingSize[hmin][0])
		let wmax = parseInt(loadingSize[hmax][0])

		if (wmin === wmax) {
			result = wmin
		} else {
			result = wmin + (hmax - hmin) / (wmax - wmin) * (coordY - hmin)
		}

		if (coordX <= result) {
			resText = 'Груз габаритный' + ' ' + coordX + ' ' + coordY + ' ' + result
		} else {
			resText = 'Груз негабаритный' + ' ' + coordX + ' ' + coordY + ' ' + result
		}

		resultField.innerHTML = resText
	});
};



// function dropdowns() {
// 	document.querySelectorAll('button[dropdown-button]').forEach((button) => {
// 		const dropdown = document.querySelector(`div[dropdown="${button.getAttribute('dropdown-button')}"]`);

// 		if (dropdown) {
// 			button.addEventListener('click', (event) => {
// 				event.stopPropagation();
// 				dropdown.classList.toggle('active');
// 			});

// 			dropdown.addEventListener('click', (event) => {
// 				event.stopPropagation();
// 			});

// 			document.addEventListener('click', () => {
// 				dropdown.classList.remove('active');
// 			});

// 			document.addEventListener('keydown', (event) => {
// 				if (event.key === 'Escape') dropdown.classList.remove('active');
// 			});
// 		};
// 	});
// };

// function dualRangeInputs() {
// 	const dualRangeInputs = document.querySelectorAll('.dual-range-input');

// 	dualRangeInputs.forEach((input) => {
// 		const rangeOne = input.querySelector('[data-name="range-1"]');
// 		const rangeTwo = input.querySelector('[data-name="range-2"]');
// 		const valueOne = input.querySelector('[data-name="value-1"]');
// 		const valueTwo = input.querySelector('[data-name="value-2"]');
// 		const minGap = 0;
// 		const track = input.querySelector('[data-name="track"]');
// 		const maxValue = rangeOne.max;

// 		slideOne();
// 		slideTwo();

// 		rangeOne.addEventListener('input', slideOne);
// 		rangeTwo.addEventListener('input', slideTwo);

// 		function slideOne() {
// 			if (parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap) {
// 				rangeOne.value = parseInt(rangeTwo.value) - minGap;
// 			}
// 			valueOne.textContent = formatValue(rangeOne.value);
// 			fillColor();
// 		};

// 		function slideTwo() {
// 			if (parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap) {
// 				rangeTwo.value = parseInt(rangeOne.value) - minGap;
// 			}
// 			valueTwo.textContent = formatValue(rangeTwo.value);
// 			fillColor();
// 		};

// 		function fillColor() {
// 			const percent1 = rangeOne.value / maxValue * 100;
// 			const percent2 = rangeTwo.value / maxValue * 100;
// 			track.style.background = `linear-gradient(to right, #E1E1E1 ${percent1}%,  #112211 ${percent1}%,
// 				#112211 ${percent2}%,  #E1E1E1 ${percent2}%)`;
// 		};

// 		function formatValue(value) {
// 			return value + '$';
// 		};
// 	})
// };

// function selects() {
// 	document.querySelectorAll('.select').forEach(function (select) {
// 		const selectButton = select.querySelector('.select__button');
// 		const selectList = select.querySelector('.select__list');
// 		const selectListItems = select.querySelectorAll('.select__list li');
// 		const selectInputHidden = select.querySelector('.select__input-hidden');
// 		const selectIcon = select.querySelector('.select__icon');

// 		selectButton.addEventListener('click', (event) => {
// 			event.preventDefault();
// 			selectList.classList.toggle('visible');
// 			selectButton.classList.toggle('active');
// 			selectIcon && selectIcon.classList.toggle('active');
// 		});

// 		selectIcon.addEventListener('click', (event) => {
// 			event.stopPropagation();
// 			selectList.classList.toggle('visible');
// 			selectButton.classList.toggle('active');
// 			selectIcon && selectIcon.classList.toggle('active');
// 		});

// 		selectListItems.forEach((item) => {
// 			item.addEventListener('click', (event) => {
// 				selectButton.innerText = item.innerText;
// 				selectInputHidden.value = item.dataset.value;
// 				selectList.classList.remove('visible');
// 				selectButton.classList.remove('active');
// 				selectIcon && selectIcon.classList.remove('active');
// 				selectButton.focus();
// 				event.stopPropagation();
// 			});
// 		});

// 		document.addEventListener('click', (event) => {
// 			if (event.target !== selectButton) {
// 				selectList.classList.remove('visible');
// 				selectButton.classList.remove('active');
// 				selectIcon && selectIcon.classList.remove('active');
// 			};
// 		});

// 		document.addEventListener('keydown', (event) => {
// 			if (event.key === 'Tab' || event.key === 'Escape') {
// 				selectList.classList.remove('visible');
// 				selectButton.classList.remove('active');
// 				selectIcon && selectIcon.classList.remove('active');
// 				selectButton.blur();
// 			};
// 		});
// 	});
// };

// function tabs() {
// 	document.querySelectorAll('[tabs]').forEach((tabs) => {
// 		const tabButtons = tabs.querySelectorAll(`[tab-button][tab-group=${tabs.getAttribute('tabs')}]`);

// 		tabButtons.forEach((tabButton) => {
// 			tabButton.addEventListener('click', () => {
// 				tabButtons.forEach((item) => {
// 					item.classList.remove('active')
// 				});

// 				tabButton.classList.add('active');

// 				tabs.querySelectorAll(`[tab-content][tab-group=${tabs.getAttribute('tabs')}]`).forEach((tabContent) => {
// 					tabContent.classList.add('none');
// 					tabs.querySelector(`[tab-content="${tabButton.getAttribute('tab-button')}"]`).classList.remove('none');
// 				});
// 			});
// 		});
// 	});
// };

// function accordeons() {
// 	document.querySelectorAll('[accordeon-button]').forEach((button) => {
// 		button.addEventListener('click', () => {
// 			button.classList.toggle('active')

// 			const content = document.querySelector(`[accordeon-content="${button.getAttribute('accordeon-button')}"]`);
// 			content.classList.toggle('none');
// 		});
// 	});
// };