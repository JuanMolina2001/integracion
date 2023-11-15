import React from 'react'
import { useState, useEffect } from 'react'
import { buscarEmailRut, iniciarSesion, auth, onAuthStateChanged } from './functions'
import { validRut, formatRut } from 'chilean-rutify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';


export const Iniciarsesion = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/perfil')
            } else {

            }
        });

        return () => {
            // Limpia el listener cuando el componente se desmonta
            unsubscribe();
        };
    }, []);



    const [msgError, setMsgError] = useState('')
    const [datoIngreso, setDatoIngreso] = useState(null)
    const [password, setpassword] = useState()
    const esValido = validRut(datoIngreso);

    const validarRut = (rut, password) => {
        if (esValido) {
            const newrut = formatRut(rut)
            return buscarEmailRut(newrut)
                .then((correos) => {
                    if (correos.length > 0) {

                        const email = correos[0];
                        iniciarSesion(email, password);

                    }
                })
                .catch(error => {
                    setMsgError(error.message);
                });
        } else if (datoIngreso) {
            setMsgError('RUT no válido');
        }
    }

    return (

        <div>
            <header style={{ padding: '0.3rem' }}>
                <button className='btn' onClick={()=>navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                    </svg>
                </button>

            </header>
            <div style={{ height: '100vh', backgroundColor: "white", marginTop: '2 rem' }} >

                <div style={{Height: '70vh', overflowY: 'auto',}} className="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle"  >
                    <div className='container-sm' >
                        <div>
                            <h3 className="fw-normal" style={{ textAlign: 'center' }}>Ingresa tu Rut </h3>
                            <br />

                            <div className="form-floating">
                                <input className="form-control" type='text' name="datoIngreso" onChange={(e) => setDatoIngreso(e.target.value)} placeholder="00.000.000-0" />
                                <label htmlFor="floatingInput">Rut</label>
                            </div>
                            <br />

                            <h3 className="fw-normal" style={{ textAlign: 'center' }}>Contraseña</h3>
                            <br />

                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={(e) => setpassword(e.target.value)} />
                                <label htmlFor="floatingPassword" >Contraseña</label>
                            </div>
                            <br />

                            <div style={{ textAlign: 'center' }}>

                                <button onClick={() => validarRut(datoIngreso, password)} className="btn btn-primary w-50 py-2" type="submit">Iniciar sesion</button>
                                <br />
                                <Link to='/register'>registrarse</Link>
                                <p>{msgError}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>




    )
}
