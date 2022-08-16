const form = document.querySelector('#form');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const emailValidation = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
const nameValidation = /\d+$/g

form.addEventListener('submit', e => {
    e.preventDefault();

    let firstName = fname.value.trim();
    let lastName = lname.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    if(firstName === '' || firstName.match(nameValidation)) {
        errorFunc(fname, 'First Name must be correct.');
    } else {
        successFunc(fname);
    };

    if (lastName === '' || lastName.match(nameValidation)) {
        errorFunc(lname, 'Last Name must be correct.');
    } else {
        successFunc(lname);
    };

    if(emailValue === '') {
        errorFunc(email, 'Email must be valid');
    } else if(!emailValidation.test(emailValue)) {
        errorFunc(email, 'This is not a valid email')
    } else {
        successFunc(email);
    };

    if(passwordValue === '' || !checkPassword(passwordValue)) {
        errorFunc(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)')
    } else {
        successFunc(password);
    };


})

const errorFunc = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.textContent = message;
    input.classList.add('input-error-icon');

    formControl.classList.remove('success');
    formControl.classList.add('error')

    if(input === email) {
        input.style.color = 'hsl(0, 100%, 74%)';
    }
}

const successFunc = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    input.classList.remove('input-error-icon');

}

const checkPassword = (password) => {
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.,_-]{8,}$/g;
    if(password.match(regex)) {
        return true
    } else {
        return false
    }
}
