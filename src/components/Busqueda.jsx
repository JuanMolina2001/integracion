import React from 'react'
import { useState } from 'react';
import { documentosEnc } from './functions';
import { validRut, formatRut } from 'chilean-rutify';
import { useNavigate } from 'react-router-dom';
export const Busqueda = () => {
    const navigate = useNavigate()
    const [rut, setRut] = useState(null)
    const [error, setError] = useState('')
    const [misDocumentos, setMisDocumentos] = useState(null)
    const buscar = async () => {
        const newRut = formatRut(rut)
        console.log(newRut)
        if (newRut != null && validRut(newRut) == true) {
            const doc = await documentosEnc(newRut)
            setMisDocumentos(doc)
            console.log(doc)
        } else {
            setError('ingresa un rut valido')
        }

    }
    return (
        <div>
            <input type="text" onChange={(e) => { setRut(e.target.value) }} />
            <button onClick={() => buscar()} >buscar</button>
            <div >
                {Array.isArray(misDocumentos) ? (
                misDocumentos.length > 0 ? (
                    misDocumentos.map((documento) => (
                        <div className='d-flex justify-content-center' key={documento.id} style={{ marginBottom: "1rem" }}>
                            <button className='btn' onClick={()=>{navigate('/perfil');setMisDocumentos(null)}}>
                                <div className="card mb-3" style={{ margin:'2rem' }}>
                                    <div className='card-header'>
                                    <h6 className="card-title">Documento encontrado</h6>
                                    </div>
                                    <div className="card-body">
                                        
                                        <div className="row">
                                            <div className="col">
                                                <p> {documento.data.tipo ? "Carnet" : "TNE"}</p>
                                            </div>
                                        </div>
                                        <p>Inicia Sesión para ver mas información</p>
                                    </div>
                                </div>
                            </button>

                        </div>
                    )
                    )

                ) : (<p>No se han encontrado ningún documento</p>)) : (<p>Escriba su rut para buscar</p>)
            }
            </div>
            
            <p>{error}</p>
        </div>
    )

}
