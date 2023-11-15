import React, { useState, useEffect } from 'react';
import IngresarCorreoContrasena from './child/IngresarCorreoContrasena';
import IngresarRut from './child/IngresarRut';
import { auth, onAuthStateChanged } from './functions';
import { Link, useNavigate } from 'react-router-dom';
import CameraCapture from './child/Foto';
import { Toast } from 'react-bootstrap';
export const Registrarse = () => {
  const navigate = useNavigate()


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.photoURL != null) {
        navigate('/menu')
      } else {

      }
    });

    return () => {
      // Limpia el listener cuando el componente se desmonta
      unsubscribe();
    };
  }, []);


  //variables

  const [errorMsg, setErrorMsg] = useState()
  const [rut, setRut] = useState()
  const [mostrarElemento, setElemento] = useState(false);

  const [registroCompleto, setRegistro] = useState(false)

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);


  //variebles del componente IngresarCorreoContrasena
  const handleChildData = (data) => {
    setRegistro(data)

  };
  //variebles del componente IngresarRut
  const handleChildRut = (data) => {
    if (data.dato2 == true) {
      setRut(data.dato1);
      setElemento(data.dato2);
    }

  };

  const ComRegistro = (data)=>{
setRegistro(data)
  }

  //funcion cambiar elemento 


  // Realizar el registro cuando enviar sea true
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 5000); // 5000 milisegundos (5 segundos) - puedes ajustar este valor según tus necesidades
      return () => clearTimeout(timeout);
    };

  }, [show])


  return (
    <div>
      <header style={{ padding: '0.3rem' }}>
        <button className='btn' onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
          </svg>
        </button>

      </header>

      <div style={{ height: '90vh', backgroundColor: "white", }}>

        <div >
          <div style={{ overflow: "scroll", height: "75vh" }} className='form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle d-flex justify-content-center'>
            {registroCompleto ? (
              <CameraCapture />
            ) : mostrarElemento ? (
              <div >
                <IngresarCorreoContrasena rut={rut} registro={ComRegistro} />
              </div>

            ) : (
              <div className=''>
                <IngresarRut onChildData={handleChildRut} />
                <div>
                </div>
              </div>
            )}
          </div>

        </div>
        <div className=' d-flex justify-content-center'>
        </div>
        <Toast show={show} onClose={toggleShow}>
          <Toast.Header>
            <strong className="mr-auto">Erro</strong>
          </Toast.Header>
          <Toast.Body>
            {errorMsg}
          </Toast.Body>
        </Toast>
      </div>
    </div>



  )
}
