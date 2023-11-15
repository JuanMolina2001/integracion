

import React, { useState } from 'react';
import * as faceapi from 'face-api.js';
import { loadTinyFaceDetectorModel } from 'face-api.js';
import { subirFotos } from '../functions';
import { useNavigate } from 'react-router-dom';
import personPhoto from '../../../assets/images/personPhoto.png'
import '../../../assets/css/foto.css'

const CameraCapture = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);
    const [mensajeError, setMensajeError] = useState('');
    const defaultImage = personPhoto
    const [mostrarB, setMostrarB] = useState(false);

    const aceptar = async () => {
        if (file) {
            const subida = await subirFotos(file)

            navigate('/menu')

        } else {
            setMensajeError('No hay una foto para subir.');
        }
    };



    const capturePhoto = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setPhoto(imageUrl);
                setFile(file)

                try {
                    await loadTinyFaceDetectorModel(`${process.env.PUBLIC_URL}/models/tiny_face_detector_model-weights_manifest.json`);
                    const image = await faceapi.fetchImage(imageUrl);
                    const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());

                    if (detections.length > 0) {
                        alert('Se detectó una cara en la imagen.');
                        setMostrarB(true)

                    } else {
                        alert('No se detectaron caras en la imagen.');
                    }
                } catch (error) {
                    setMensajeError('Error al cargar modelos o realizar la detección de caras:', error.message);
                    console.log(error);
                }
            } else {
                setMensajeError('No se seleccionó un archivo.');
            }
        } catch (error) {
            console.error('Error al capturar la foto desde el archivo:', error);
        }
    };

    const cancelar = () => {
        setPhoto(null);
        setMostrarB(false)
    };
    return (
        <div style={{height: '100vh', backgroundColor: 'white'}}>
            <div className="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle">


                <div className="position-absolute top-0 start-50 translate-middle">
                    <div className='d-flex justify-content-center'>
                        {photo ? (
                            <img src={photo} width="200px" height="200px" alt="Foto capturada" />
                        ) : (
                            <img src={defaultImage} className='foto-def' width="200px" height="200px" alt="Foto capturada" />
                        )}
                    </div>

                    <br />
                    <br />

                    {mostrarB ? (

                        <div className='row d-flex justify-content-center' >
                            <button className='btn btn-primary' style={{ marginBottom: '1rem' }} onClick={aceptar}>Aceptar</button>

                            <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>



                        </div>
                    ) : (
                        <div>
                            <h3 className="fw-normal" style={{ textAlign: "center" }} >Suba una foto donde se vea su cara</h3>
                            <br />
                            <br />

                            <div className='d-flex justify-content-center'>
                                <div className='input-file-container '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-camera foto position-absolute top-50 start-50 translate-middle" viewBox="0 0 16 16">
                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                    </svg>
                                    <input type="file" className='input-file' accept=".jpg, .jpeg, .png*" capture="camera" onChange={capturePhoto} />
                                </div>
                            </div>
                        </div>
                    )}
                    <p>{mensajeError}</p>
                </div>






            </div>
        </div>



    );
}


export default CameraCapture;
