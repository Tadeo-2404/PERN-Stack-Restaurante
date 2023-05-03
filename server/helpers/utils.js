const cadenaRegex = /^[a-zA-Z\s]+$/; //validar cadena de caracteres sin especiales
const cadenaLengthRegex = /^.{10,}$/;//validar cadena longitud
const flotanteRegex = /^\d+(\.\d+)?$/; //validar flotante positivo
const enteroRegex = /^\d+$/; //validar entero positivo
const dateOnlyRegex = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))|(?!0000)[0-9]{4}-W(?:0[1-9]|[1-4][0-9]|5[0-3])-(?:[1-7]))$/;

export {
    cadenaRegex,
    cadenaLengthRegex,
    flotanteRegex,
    enteroRegex,
    dateOnlyRegex
}