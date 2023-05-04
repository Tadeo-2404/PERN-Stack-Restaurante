const cadenaRegex = /^[a-zA-Z\s]+$/; //validar cadena de caracteres sin especiales
const cadenaLengthRegex = /^.{10,}$/;//validar cadena longitud
const flotanteRegex = /^\d+(\.\d+)?$/; //validar flotante positivo
const enteroRegex = /^\d+$/; //validar entero positivo
const dateOnlyRegex = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))|(?!0000)[0-9]{4}-W(?:0[1-9]|[1-4][0-9]|5[0-3])-(?:[1-7]))$/;
const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u;
const correoRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/u;
const telRegex = /^\d{10}$/u;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/u;

export {
    cadenaRegex,
    cadenaLengthRegex,
    flotanteRegex,
    enteroRegex,
    dateOnlyRegex,
    nombreRegex,
    correoRegex,
    telRegex,
    contrasenaRegex
}