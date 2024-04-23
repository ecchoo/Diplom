export const convertErrorsValidation = (errors) => {
    // const convertedErrors = {}

    // errors.forEach(err => {
    //     if (!convertedErrors[err.path]) {
    //         convertedErrors[err.path] = ''
    //     }

    //     convertedErrors[err.path] += ` ${err.msg}`
    // })

    // return convertedErrors

    return errors.reduce((convertedErrors, err) => {
        convertedErrors[err.path] = (convertedErrors[err.path] || '') + ` ${err.msg}`;
        return convertedErrors;
    }, {});
}