import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Swal from 'sweetalert2';
/**
 * <></> englobar en código del html
 * libreria para generar los id
 * https://www.npmjs.com/package/uuid
 */
const FormularioAdd = ({ dispatch }) => {
  //Agregamos un useState
  const [data, setData] = useState({ nombre: "", numero: "", sexo: "", fechaNac:"" , imagen:"" });
  
  //agregamos el useState para las validaciones 
  const [validations, setValidations] = useState({
    nombre: false,
    numero: false,
    fechaNac: false,
    imagen: true,
    sexo:false
    // Agrega más campos según tus necesidades
  });
  //Destruccturar el state
  const { nombre, numero,sexo,fechaNac, imagen } = data;

  //Agregamos el metodp handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    // agregamos la logica de la validacion 
    const validationsCopy = { ...validations };
    if (name === "nombre") {
      validationsCopy.nombre = value.trim() !== "";
    } else if (name === "numero") {
      validationsCopy.numero = /^\d+$/.test(value);
    } else if (name === "fechaNac") {
      validationsCopy.fechaNac = value.trim() !== "";
    } else if (name === "sexo") {
      validationsCopy.sexo = value.trim() !== "";
    } else if (name === "fechaNac") {
      validationsCopy.imagen = value.trim() !== "";
    }
    setValidations(validationsCopy);
    //Modificamos el estado
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //definimos el objeto add
  const actionAdd = {
    type: "add",
    payload: {
      id: uuid(),
      nombre,
      numero,
      sexo,
      fechaNac,
      imagen,
    },
  };
  const handleAdd = () => {
    const isValid = Object.values(validations).every((valid) => valid);
    if (isValid) {
    //Invocamos al dispatch, todos los dispatch tienen referencas directas con el reducer a ejecutar
    dispatch(actionAdd);
    handleClear(); //llamamos la la funcion para limpiar el formulario 
    }
    //si los campos no estan completos alerta
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese los datos faltantes :)',
      })
    }
  };
  // funcion para limpiar los campos del formulario 
  const handleClear = () => {
    // Definimos la acción para el delete 
    const clearAction = {
      type: "clear",
      payload: {
        nombre: "",
        numero: "",
        sexo: "",
        fechaNac: "",
        imagen:"",
       
      },
    }
    setData({
      nombre: "",
      numero: "",
      sexo: "",
      fechaNac: "",
      imagen:"",
    });
    dispatch(clearAction);
  }

 

  return (
    <>
      <div className="container">
      <label className="mx-1 d-grid gap-2">
          Imagen: {""}
          <input
            onChange={handleChange}
            name="imagen"
            type="text"
            value={imagen}
            className={`form-control ${validations.imagen ? "" : "is-invalid"}`}
            autoComplete="off"
          />
          
          {validations.imagen ? null : <div className="invalid-feedback">La imagen es obligatoria</div>}
        </label>
          <label className="mx-1 d-grid gap-2">
          Nombre: {" "}
          <input
            onChange={handleChange}
            name="nombre"
            type="text"
            value={nombre}
            className={`form-control ${validations.nombre ? "" : "is-invalid"}`}
            autoComplete="off"
          />
          {validations.nombre ? null : <div className="invalid-feedback">El nombre es obligatorio</div>}
        </label>

        <label className="mx-1 d-grid gap-2">
          Número: {""}
          <input
            onChange={handleChange}
            name="numero"
            type="text"
            value={numero}
            className={`form-control ${validations.numero ? "" : "is-invalid"}`}
            autoComplete="off"
          />
           {validations.numero ? null : <div className="invalid-feedback">El numero es obligatorio</div>}
        </label>
        <label className="mx-1 d-grid gap-2">
          fecha Nacimiento: {""}
          <input
            onChange={handleChange}
            name="fechaNac"
            type="date"
            value={fechaNac}
            className={`form-control ${validations.fechaNac ? "" : "is-invalid"}`}
            autoComplete="off"
          />
           {validations.fechaNac ? null : <div className="invalid-feedback">La fecha es obligatoria</div>}
        </label>
   
        <br />
        <div className={`form-control ${validations.sexo ? "" : "is-invalid"}`}>
        <label className="mx-1 d-grid gap-2"> Seleccione el sexo:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sexo"
              value="masculino"
              checked={sexo === "masculino"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDisabled">
              Masculino
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sexo"
              value="femenino"
              checked={sexo === "femenino"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDisabled">
              Femenino
            </label>
          </div>
        </div>
        {validations.sexo ? null : <div className="invalid-feedback">El sexo es obligatorio</div>}
      

        <div className="mx-1 d-grid gap-2">
          <button className="btn btn-info mt-2" onClick={handleAdd}>
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormularioAdd;
