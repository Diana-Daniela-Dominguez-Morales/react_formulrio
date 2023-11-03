import React from 'react'

const TablaContactos = ({ contactos = [], dispatch }) => {
    //Definimos el método que vamos handleDelete

    const handleDelete =(id)=>{
        //Definimos la accion para el delete 
        const deleteAction ={
            type: "delete",
            payload: id //id del contacto a eliminar
        }
        dispatch(deleteAction);
    }

  return (
    <table className='table table-striped text-center' >
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Número</th>
                <th>Sexo</th>
                <th>fecha de nacimiento</th>
                <th>Edad</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {
                contactos.map((contacto) =>{
                    const fechaNac= new Date(contacto.fechaNac);
                    const fecha = new Date();
                    const edad = fecha.getFullYear() - fechaNac.getFullYear();

                    const idFinal = contacto.id.split("-"); 
                    return (
                        <tr key={contacto.id}>
                            <th >{idFinal[0]}</th>
                            <td><p>{contacto.nombre}</p>
                                <img src={contacto.imagen} alt=""  width="60" height="80" />
                            </td>
                            <td>{contacto.numero}</td>
                            <td>{contacto.sexo}</td>
                            <td>{contacto.fechaNac}</td>
                            <td>{edad}</td>
                            <td>
                                <button onClick={() => handleDelete(contacto.id)} className='btn btn-danger'>Eliminar</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default TablaContactos;