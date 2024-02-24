interface SignUpValidation {
    name: string,
    email: string,
    password: string
}
export const signUpValidation = (data: SignUpValidation) => {
    const hasAnyError =
      data.name.trim() === '' ||
      !validateEmail(data.email) ||
      !validatePassword(data.password);
  
    return !hasAnyError;
};

export const validateEmail = (email: string) => {
    const regex = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,6})$/;
    return regex.test(email);
};

export const validatePassword = (password: string) => {
    return password.length >= 8 && password.length <= 16 && hasUpperCase(password) && hasNumber(password) 
}

function hasUpperCase(str: string) {
    return /[A-Z]/.test(str);
}

function hasNumber(str: string) {
    return /[0-9]/.test(str);
}