import React from 'react'
import { useState, useEffect } from 'react';
import { validRut, formatRut } from 'chilean-rutify';
import { rutExiste } from '../functions';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
function IngresarRut(props) {
  const [rut, setRut] = useState()
  const esValido = validRut(rut);
  const [msgError, setMsgError] = useState()
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);


  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 2000); // 5000 milisegundos (5 segundos) - puedes ajustar este valor según tus necesidades
      return () => clearTimeout(timeout);
    }
  }, [show]);

  const enviarDatosAlPadre = (rut) => {
    const newrut = formatRut(rut); // Asumo que formatRut es una función que formatea el Rut.
    
    // Primero, verifica si el Rut ingresado es válido
    if (esValido) {
      // Ahora, verifica si el Rut existe en la base de datos
      rutExiste(newrut)
        .then((rutExiste) => {
          if (rutExiste) {
            // Si el Rut existe, muestra un mensaje de error
            setMsgError('Rut en uso');
            toggleShow()
          } else {
            // Si el Rut no existe, prepara los datos a enviar al padre
            const datosAEnviar = {
              dato1: newrut,
              dato2: true
            };
            setMsgError('');
            props.onChildData(datosAEnviar);
          }
        })
        .catch((error) => {
          setMsgError('Error al verificar el Rut: ' + error);
          toggleShow()
        });
    } else {
      // Si el Rut no es válido, muestra un mensaje de error
      const datosAEnviar = {
        dato1: false,
        dato2: false
      };
      setMsgError('Ingresa un Rut válido');
      toggleShow()
      props.onChildData(datosAEnviar);
    };
  };
  


  return (
    <div  className='form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle d-flex justify-content-center ' >
      <div>
          <h3 className="fw-normal" style={{textAlign: "center"}} >Ingresa tu Rut</h3>
      <br></br>
      <input type="text" htmlFor="floatingInput" id="floatingInput" className="form-control" aria-label="Username" onChange={(e) => setRut(e.target.value)} aria-describedby="basic-addon1" autoComplete='off' />
      <br />
      <div className='d-flex justify-content-center'>
         <button className=" btn btn-primary w-50 py-2" type="button" onClick={() => { enviarDatosAlPadre(rut) }}>Continuar</button>
      </div>
      
      <br />
     <div className='d-flex justify-content-center'>
     </div>
     <div className='d-flex justify-content-center'>
      <Link to='/login'>Iniciar sesion</Link>
     </div>
      
      <div className="form-floating">
      </div>
      </div>
      <Toast style={{ position: "absolute", bottom: "-vh"}} show={show} onClose={toggleShow}>
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>
          {msgError}
        </Toast.Body>
      </Toast>
    </div>
  )
}
export default IngresarRut
