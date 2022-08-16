const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const form = document.querySelector('#form')

const isRequired = value => value === ''? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email)
}

const isPasswordStrong = (password) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regex.test(password)
}

const showError = (input, message) => {
    // get the field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
}

const showSuccess = (input) => {
    // get the field element
    const formField = input.parentElement;

    // add the success class
    formField.classList.remove('error');
    formField.classList.add('success');

    //hide the error message
    error.textContent = '';
}

const checkFirstName = () => {

    let validation = false;

    const firstN = firstName.value.trim();

    if(!isRequired(firstN)) {
        showError(firstName, 'First Name cannot be blank.')
    } else {
        showSuccess(firstN);
        validation = true;
    }

    return validation;

}

const checkLastName = () => {

    let validation = false;

    const lastN = lastName.value.trim();

    if(!isRequired(lastN)) {
        showError(lastName, 'Last Name cannot be blank.');
    } else {
        showSuccess(lastName);
        validation = true;
    }

    return validation
}

const checkEmail = () => {

    let validation = false;

    const eMail = email.value.trim();

    if(!isRequired(eMail)) {
        showError(email, 'Email cannot be blank.');
    } else if(!isEmailValid(eMail)) {
        showError(email, 'Email is not valid.');
    } else {
        showSuccess(email);
        validation = true
    }

    return validation;
}

const checkPassword = () => {

    let validation = false;

    const passwordEl = password.value.trim();

    if(!isRequired(passwordEl)) {
        showError(password, 'Password cannot be blank.');
    } else if(!isPasswordStrong(passwordEl)) {
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)')
    } else {
        showSuccess(password);
        validation = true;
    }

    return validation
}

form.addEventListener('submit', (e) => {
    // prevent from submitting
    e.preventDefault();

    // validate fields
    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid  = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid;

    
    
    // submit to the server if it is valid

    if(isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'first-name':
            checkFirstName();
            break;
        case 'last-name':
            checkLasttName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));


