const nav = document.querySelector('.nav');
const navIcon = document.querySelector('.nav-icon');
const navLinks = document.querySelectorAll('.nav a');

navIcon.addEventListener('click', function () {
	this.classList.toggle('nav-icon--active');
	nav.classList.toggle('nav--active');
});

navLinks.forEach((navLink) => {
	navLink.addEventListener('click', function () {
		nav.classList.remove('nav--active');
		navIcon.classList.remove('nav-icon--active');
	});
});