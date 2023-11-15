import React, { useState, useEffect } from 'react';
import jsQR from 'jsqr';
import qrej from "../../assets/images/qrej.png"
import { validRut, formatRut } from 'chilean-rutify';
import ImageEditor from './CarnetDatos';
import { buscarDatos, ingresarDocumento } from './Functions';
import "../../assets/css/qr.css";
import escaner from "../../assets/images/escaner.png"
import Location from './Location';
import { useNavigate } from 'react-router-dom'
import loading from "../../assets/animations/loading.gif"

function QRImageScanner(props) {




    const navigate = useNavigate();
    const rutCurrentUser = props.rut
    const [mostrar, setMostrar] = useState(false)
    const [datos, setDatos] = useState({
        nombre: "",
        apellidos: "",
        rut: "",
        documento: "",
        photoUrl: ""
    });
    const [imageSrc, setImageSrc] = useState(qrej);
    const [result, setResult] = useState('');
    const [aceptar, setAceptar] = useState(false)
    const [enviar, setEnviar] = useState(false)
    const [cargando, setcargando] = useState(false)


    const Enviar = (data) => {
        setEnviar(data)
    }




    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target.result;

                image.onload = async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;

                    const context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, image.width, image.height);

                    const imageData = context.getImageData(0, 0, image.width, image.height);
                    const code = jsQR(imageData.data, image.width, image.height);

                    if (code) {
                        const textoQR = code.data

                        // Utiliza una expresión regular para buscar el valor del parámetro "RUN"
                        const regex = /RUN=([0-9\-]+)/;
                        const match = textoQR.match(regex);

                        if (match) {
                            const run = match[1]; // El valor capturado dentro de los paréntesis
                            // Elimina cualquier guion '-' si lo hay
                            const soloNumeros = formatRut(run.replace(/-/g, ''));
                            try {
                                const usuario = await buscarDatos(soloNumeros);

                                if (usuario && usuario[0]) {
                                    setDatos((prevDatos) => ({
                                        ...prevDatos,
                                        nombre: usuario[0].nombre,
                                        apellidos: usuario[0].apellidoP + " " + usuario[0].apellidoM,
                                        rut: usuario[0].rut,
                                        documento: null,
                                        photoUrl: usuario[0].photoUrl,
                                    }));
                                } else {

                                    setDatos((prevDatos) => ({
                                        ...prevDatos,
                                        nombre: "null",
                                        apellidos: "null",
                                        rut: soloNumeros,
                                        documento: "null",
                                        photoUrl: "null",
                                    }));

                                }
                                setMostrar(true);
                            } catch (error) {
                                console.error('Error al buscar el usuario:', error);
                            }
                        } else {
                            console.log("No se encontró el patrón 'RUN=' en el QR.");
                        }



                    } else {
                        setResult('No se encontró ningún código QR en la imagen.');
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return (

        <div>
            {aceptar ? (
                enviar ?
                    (cargando ? (<div>
                        <img className='position-absolute top-50 start-50 translate-middle' src={loading} alt="" />
                    </div>) :
                        (
                            <div style={{ marginTop: "25vh" }}>
                                <h4 className=' d-flex justify-content-center' style={{ marginBottom: "10vh" }}>Presione aceptar para continuar</h4>
                                <div className=' d-flex justify-content-center'>

                                    <button className='btn btn-primary' onClick={async () => {
                                        try {
                                            setcargando(true)
                                            await ingresarDocumento(rutCurrentUser, datos.rut, props.long, props.lat);
                                            navigate('/');
                                        } catch (error) {
                                            console.error('Error al ingresar el documento:', error);
                                        }
                                    }}>Aceptar</button>
                                </div>

                                <div className=' d-flex justify-content-center'>
                                    <button onClick={() => navigate('/')} className='btn btn-danger' style={{ marginTop: "5vh" }} type="button">
                                        Cancelar
                                    </button>
                                </div>

                            </div>

                        )) :
                    (
                        <div>
                            <Location latitude={props.lat} longitude={props.long} enviar={Enviar} />
                        </div>
                    )


            ) :
                (<div>
                    <div className='d-flex justify-content-center' style={{ marginBottom: "1rem" }}>
                        <img src={escaner} className=' bd-placeholder-img' alt="ilustracion" />
                    </div>


                    {mostrar ? (

                        <div>
                            <div className='d-flex justify-content-center' style={{ marginBottom: "1rem" }}>
                                <h4>¿Esta es la persona?</h4>
                            </div>

                            <div className=' d-flex justify-content-center' style={{ marginBottom: "2rem" }} ><ImageEditor datos={datos} ></ImageEditor ></div>
                            <div className="row">
                                <div className='col-2'></div>
                                <div className='col'>
                                    <button className="btn btn-primary" type="button" onClick={() => { setAceptar(true) }}>Si</button>
                                </div>
                                <div className='col-1'></div>
                                <div className='col'>
                                    <button className="btn btn-danger" type="button" onClick={() => { setMostrar(false) }}>No</button>
                                </div>
                                <div className='col-2'></div>
                            </div>
                        </div>

                    ) : (
                        <div >
                            <div className='d-flex justify-content-center' style={{ marginBottom: "1rem" }}>
                                <h4>Escanea el QR detras del Carnet</h4>
                            </div>
                            <div className='qr-code d-flex justify-content-center ' ><img src={imageSrc} alt="Imagen cargada" className='img-fluid' style={{ marginBottom: "2rem" }} /></div>
                            <div className='d-flex justify-content-center'>
                                <div className='input-file-container '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-camera foto position-absolute top-50 start-50 translate-middle" viewBox="0 0 16 16">
                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                    </svg>
                                    <input className='input-file' type="file" accept=".jpg, .jpeg, .png*" onChange={handleImageUpload} />
                                </div>
                            </div>




                        </div>
                    )}



                    <p>{result}</p>
                </div>)}


        </div>



    );
}
export default QRImageScanner;

