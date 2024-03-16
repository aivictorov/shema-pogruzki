export function validate(form, name) {
    let result = true;

    const input = form.querySelector(`[name=${name}]`);
    const notify = input.closest('.input').querySelector('.input__notify');

    if (isEmpty(input.value)) {
        result = false;
        input.classList.add('input__field--error');
        notify.innerText = "Заполните поле";
    }

    input.addEventListener("input", () => {
        input.classList.remove('input__field--error');
        if (!isEmpty(input.value)) notify.innerText = "";
    });

    return result;
};


function isEmpty(value) {
    return value.trim() == "";
};


export function validateCaptcha(form) {
    let result = true;

    const captcha = form.querySelector('.g-recaptcha');
    let notify = captcha.closest('.captcha').querySelector('.input__notify');

    if (!grecaptcha.getResponse()) {
        result = false;
        notify.innerText = "Пройдите проверку";
    } else {
        notify.innerText = "";
    }

    captcha.closest('.captcha').addEventListener('click', () => {
        alert('hi')
    })

    return result;
};

export function validateEmail(form, name) {
    let result = true;

    const input = form.querySelector(`[name=${name}]`);
    const notify = input.closest('.input').querySelector('.input__notify');

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;


    if (!EMAIL_REGEXP.test(input.value)) {
        result = false;
        input.classList.add('input__field--error');
        notify.innerText = "Введите корректный e-mail";
    }

    input.addEventListener("input", () => {
        if (EMAIL_REGEXP.test(input.value)) {
            input.classList.remove('input__field--error');
            notify.innerText = "";
        }
    });

    return result;
};