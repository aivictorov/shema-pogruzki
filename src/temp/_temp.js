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

var time = 2,
	cc = 1;
$(window).scroll(function () {
	$('#counter').each(function () {
		var
			cPos = $(this).offset().top,
			topWindow = $(window).scrollTop();
		if (cPos < topWindow + 200) {
			if (cc < 2) {
				$(".number").addClass("viz");
				$('div').each(function () {
					var
						i = 1,
						num = $(this).data('num'),
						step = 1000 * time / num,
						that = $(this),
						int = setInterval(function () {
							if (i <= num) {
								that.html(i);
							} else {
								cc = cc + 2;
								clearInterval(int);
							}
							i++;
						}, step);
				});
			}
		}
	});
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