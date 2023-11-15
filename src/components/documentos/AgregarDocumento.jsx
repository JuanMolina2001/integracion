import React, { useState } from 'react'
import smcarnet from "../../assets/images/smcarnet.png"
import smtne from "../../assets/images/smtne.png"
import personDoc from "../../assets/images/personDoc.png"
import { useNavigate } from 'react-router-dom'
import { Button, Toast } from 'react-bootstrap';
import '../../assets/css/perfil.css'
export const AgregarDocumento = ({rut}) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    return (

        <div>
            <div className='main'>
                <div className='d-flex justify-content-center'>
                    <img src={personDoc} className='bd-placeholder-img rounded-circle' alt="ilustracion" />
                </div>
                <div className="card text-bg-primary" style={{ width: "90hv" }}>
                    <div className="card-header">Selecciona una opcion</div>
                </div>



                <div className="card  mb-3" style={{ width: "90hv" }}>
                    <div className="card-header">
                        <button style={{ width: "100%", backgroundColor: 'transparent', border: 'none' }} onClick={() =>  navigate('/carnet', { state: { rut } })}>
                            <div className='row'>
                                <div className='col-2'>
                                    <img width='50' src={smcarnet} alt="carnet" />
                                </div>
                                <div className='col'>
                                    <p style={{ fontWeight: "bold" }}>CARNET</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="card  mb-3" style={{ width: "90hv" }}>
                    <div className="card-header">
                        <Button style={{ width: "100%", backgroundColor: 'transparent', border: 'none' }} onClick={() => setShow(true)}>
                            <div className='row'>
                                <div className='col-2'>
                                    <img width='50' src={smtne} alt="tne" />
                                </div>
                                <div className='col' style={{ color: 'black', fontWeight: "bold" }}><p>TNE</p></div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>

            <Toast className="position-absolute bottom-0 end-0" show={show} autohide delay={1000} onClose={() => setShow(false)}>
                <Toast.Body>En desarrollo </Toast.Body>

            </Toast>
        </div>

  


    )
}

