import React from 'react';
import '../assets/css/cover.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function CoverPage() {
    const navigate = useNavigate()


    return (
        <div className="">
            <div className='card' style={{ width: '80wh', height: '50vh', marginTop: '25vh' }}>
                <div className="card-body row align-items-center">

                    <div className='col'>
                        <div className='d-flex justify-content-center'>
                            <h1>Bienvenido</h1>
                        </div>

                        <p className='text-center'>La Solución para Documentos Perdidos: Encuéntralos Aquí</p>

                    
                        <div className='d-flex justify-content-center'>
                            <a onClick={()=>navigate('/register')} className="btn btn-lg btn-primary ">Registrate</a>
                        </div>
                        <br />
                        <p className='text-center'>¿Ya Tienes Una Cuenta?</p>
                        <div className='d-flex justify-content-center'>
                            <a onClick={()=>navigate('/login')} className="btn btn-lg btn-primary ">Iniciar Sesion</a>
                        </div>
                        <br />
                        <div className='d-flex justify-content-center'>
                            <a onClick={()=>navigate('/search')} className="btn  btn-success ">
                                <div className='row'>
                                    <div className='col-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>



                </div>

            </div>



        </div>

    );
}

export default CoverPage;
