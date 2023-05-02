const cadenaRegex = /^[a-zA-Z\s]+$/; //validar cadena de caracteres sin especiales
const cadenaLengthRegex = /^.{10,}$/;//validar cadena longitud
const flotanteRegex = /^\d+(\.\d+)?$/; //validar flotante positivo
const enteroRegex = /^\d+$/; //validar entero positivo

export {
    cadenaRegex,
    cadenaLengthRegex,
    flotanteRegex,
    enteroRegex
}