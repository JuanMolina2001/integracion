import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { registrarse, } from '../functions';
function IngresarCorreoContrasena({ rut, registro }) {

    const [nombre, setnombre] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [password2, setpassword2] = useState()
    const [apellidoM, setapellidoM] = useState()
    const [apellidoP, setapellidoP] = useState()
    const [errorMsg, setErrorMsg] = useState()

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

    const realizarRegistro = () => {
        if (password === password2) {
            return registrarse(nombre, email, password, rut, apellidoM, apellidoP)
                .then((user) => {
                    registro(true)
                })
                .catch((error) => {
                    setErrorMsg(error.message);
                    toggleShow()
                });
        } else {
            setErrorMsg('Las contraseñas no coinciden')
            toggleShow()
        }
    };


    return (
        <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <div>
                <h4 className="fw-normal" style={{ textAlign: "center" }}>Correo</h4>
                <div className="form-floating">

                    <input autoComplete='off' type="text" className="form-control" name="email" onChange={(e) => setemail(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                    <label htmlFor="floatingInput">Correo</label>

                </div>
                <br />
                <h4 className="fw-normal" style={{ textAlign: "center" }}>Nombre</h4>

                <div className="form-floating">
                    <input autoComplete='off' type="text" className="form-control" name="nombre" onChange={(e) => setnombre(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                    <label htmlFor="floatingInput">Nombre</label>

                </div>

                <div className="form-floating">

                    <input autoComplete='off' type="text" className="form-control" name="apellidoP" onChange={(e) => setapellidoP(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                    <label htmlFor="floatingInput">Apellido Paterno</label>

                </div>

                <div className="form-floating">

                    <input autoComplete='off' type="text" className="form-control" name="apellidoM" onChange={(e) => setapellidoM(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                    <label htmlFor="floatingInput">Apellido Materno</label>

                </div>
                <br />
                <h4 className="fw-normal" style={{ textAlign: "center" }}>Contraseña</h4>
                <div className="form-floating">

                    <input autoComplete='off' type="password" className="form-control" name="password" onChange={(e) => setpassword(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                    <label htmlFor="floatingInput">Contraseña</label>

                </div>
                <br />
                <h4 className="fw-normal" style={{ textAlign: "center" }}>Repite la Contraseña</h4>
                <div className="form-floating">

                    <input autoComplete='off' type="password" className="form-control" name="password" onChange={(e) => setpassword2(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                    <label htmlFor="floatingInput">Contraseña</label>

                </div>


                <br />
                <br />
                <div className='d-flex justify-content-center'>
                    <button className="btn btn-primary w-50 py-2" onClick={() => realizarRegistro()}>Registrarse</button>
                </div>
                <div className='d-flex justify-content-center'>
                    <Link to='/login'>Iniciar sesión</Link>
                </div>
                <div className='d-flex justify-content-center'>
                    <Toast className='position-absolute bottom-0 start-50 translate-middle-x' show={show} onClose={toggleShow}>
                        <Toast.Header>
                            <strong className="mr-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {errorMsg}
                        </Toast.Body>
                    </Toast>
                </div>
            </div>


        </div>
    )
}
export default IngresarCorreoContrasena;