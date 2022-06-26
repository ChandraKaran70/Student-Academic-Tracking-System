const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateParentRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
        console.log("length issue")
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
        console.log("name field empty")
    }

    if (Validator.isEmpty(data.dob)) {
        errors.name = 'Name field is required';
        console.log("name req err")
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
        console.log("nt email err")
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
        console.log("email req err")
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateParentRegisterInput