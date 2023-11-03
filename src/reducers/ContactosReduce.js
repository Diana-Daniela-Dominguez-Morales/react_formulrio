// funcion de js que arrutina los procesos de ABC  (enf)
/**
 * Definimos el reducer de contactos como una funcion de JS
 * recibe los siguientes parámetros:
 * @param {*} state 
 * @param {*} accion 
 * 
 * Recordar que un reducer no puede llamar al localstorage, ni llamados asincronos a una API todo
    se tiene que procesar en otro lugar y mandarlo por medio del payload.
 */
export const ContactosReducer = (state, accion) => {
    //Toda acción tiene un tipo para cual agregamos un switch-case para determinar que tipo es 
    switch(accion.type){
        case "add":
            //payload contiene la informacion de los datos nuevos que vamoa a agregar 
            return [...state, accion.payload]
        case "add":
            //payload contiene la informacion de los datos nuevos que vamoa a agregar 
            return []
        case "delete":
            //Filtrmos el state con todos los dats menos deoned coincidad los ids
            ///Con esto vamos a filtrar el state con todos los datos menos en donde coincida con el id seleccionado
            return state.filter( (actual) => actual.id !== accion.payload )

        default:
            return state;
    } 
}
