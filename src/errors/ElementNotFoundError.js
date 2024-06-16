class ElementNotFoundError extends Error{
    cause = 'Elemento no encontrado dentro de la base de datos.';

    constructor(message){
        super(message);
        this.name = 'ElementNotFoundError';
    }  
}

export default ElementNotFoundError;