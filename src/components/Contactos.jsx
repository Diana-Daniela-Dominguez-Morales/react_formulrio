import React, { useReducer,useEffect , useState } from "react";
import TablaContactos from "./TablaContactos";
import FormularioAdd from "./FormularioAdd";
import { ContactosReducer } from "../reducers/ContactosReduce";

/*  // Datos de prueba
 const contactos = [
    {
        id:'c1',
        nombre:"Ana",
        numero:"477890024"
    },
    {
         id: "c1",
         nombre: "Raúl",
         numero: "477839293"
    },
    {
        id:'c2',
        nombre:"Daniel",
        numero:"4771230976"
    }
] */

//Definimos la función init, donde vamos a poder hacer todo lo necesario
const init = () => {
    //Definimos el localStorage
    const contactos = localStorage.getItem("contactos");
    
    return contactos ? JSON.parse(contactos) : [];
};

const Contactos = () => {
    //utilizar el reducer necesitamos ocupar un hoock useReducer
    /*
       Creamos otro useReducer y le pasamos el ContactosReducer y el initial state vacio
       init: Es una función que va calcular el valor incial de nuestro state
      */
       const [state, dispatch] = useReducer(ContactosReducer, [], init);

       useEffect(() => {
           localStorage.setItem("contactos", JSON.stringify(state));
       }, [state]);


    //Agregamos un state para determinar si el formulario es visible o no.
    const [formView, setFormView] = useState(false);
    
    return (
        <div className="container mt-3">
            <div className="container mt-3">
                <button
                    onClick={() => setFormView(!formView)}
                    className="btn btn-success">
                    {!formView ? "+ Agregar Contacto" : "- Cerrar Formulario"}
                </button>
                {formView && <FormularioAdd dispatch={dispatch} />}
                <TablaContactos contactos={state} dispatch={dispatch} />
            </div>
        </div>
    );
};

export default Contactos;
