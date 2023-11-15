
import { AgregarDocumento } from './documentos/AgregarDocumento'
import { Perfil } from './Perfil'
import '../assets/css/perfil.css'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/settings';
import { useNavigate } from 'react-router-dom';
import { query, collection, where, getDocs, onSnapshot } from 'firebase/firestore';
import { rutEncontrar, documentosEnc, db, rutExiste } from './functions';
import { AnimationPageLeft } from './AnimationPage';
import Nominatim from 'nominatim-geocoder';
import locationIcon from "../assets/images/locationIcon.png"
import a1 from "../assets/images/imagesA/a1.png"
import a2 from "../assets/images/imagesA/a2.png"
import a3 from "../assets/images/imagesA/a3.png"
import a4 from "../assets/images/imagesA/a4.png"
import loading from "../assets/animations/loading.gif"
import { Card, CardBody } from 'react-bootstrap';
export const Menu = () => {


    const frases = [
        {
            imagen: a2,
            frase: 'Tus documentos son tan buenos en el escondite como Houdini.',
        },
        {
            imagen: a1,
            frase: 'Donde habrás perdido tus documentos que nadie los encuentra.',
        },
        {
            imagen: a4,
            frase: '¿Tus documentos son ninjas? Nadie los ha encontrado.',
        },
        {
            imagen: a3,
            frase: 'Creo que tu billetera tiene piernas. Siempre se va de paseo sin ti.',
        },
    ];



    const [fraseAleatoria, setFraseAleatoria] = useState({});

    const mostrarFraseAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * frases.length);
        setFraseAleatoria(frases[indiceAleatorio]);
    };



    // Genera un índice aleatorio para seleccionar una frase




    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [rut, setRut] = useState(null);
    const [misDocumentos, setMisDocumentos] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const [hayDocumentos, setHayDocumentos] = useState(false)
    const geocoder = new Nominatim({
        serviceUrl: 'https://nominatim.openstreetmap.org',
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        let unsubscribeDocumentos;
        let unsubscribe; // Declara la variable unsubscribe en un ámbito más amplio

        if (!subscribed) {
            const auth = getAuth(app);
            unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    navigate('/');
                } else {
                    setUser(user);


                    try {
                        const resultados = await rutEncontrar(user.uid);
                        setRut(resultados);
                        const noti = await documentosEnc(resultados);
                        setMisDocumentos(noti);
                        const q = query(collection(db, "documentos"), where("rut_propietario", "==", rut));
                        onSnapshot(q, async (querySnapshot) => {
                            const nuevoDoc = []
                            const promises = querySnapshot.docs.map(async (doc) => {
                                try {
                                    const response = await geocoder.reverse({ lat: doc.data().lat, lon: doc.data().long });
                                    const nombre = await rutExiste(doc.data().rut_encontro)
                                    const city = response.address.city || response.address.town || response.address.village;
                                    const pais = response.address.country
                                    nuevoDoc.push({ id: doc.id, data: doc.data(), city, pais, nombre });
                                    setMisDocumentos(nuevoDoc)
                                    setHayDocumentos(true)
                                } catch (error) {
                                    console.error('Error al obtener la información de ubicación:', error);
                                }
                            });

                            await Promise.all(promises);
                        });
                    } catch (error) {
                        console.error('Error al obtener datos:', error);
                    }
                }

                // Marcar que ya nos hemos suscrito para evitar el bucle
                setSubscribed(true);
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [subscribed, navigate, rut]);



    const handleSignOut = () => {
        const auth = getAuth(app);

        signOut(auth)
            .then(() => {
                // Aquí puedes realizar acciones adicionales al cerrar la sesión
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (<div >

        <header className="justify-content-center py-4 ">
            <ul className="nav nav-pills">
                <li className="nav-item position-absolute top-0 start-0">
                    <a className="nav-link" aria-current="page" data-bs-toggle="modal" data-bs-target="#cerrar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                            <path d="M7.5 1v7h1V1h-1z" />
                            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                        </svg>
                    </a>
                </li>

                <li className="nav-item position-absolute top-0 end-0">
                    <button className="button nav-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <span className="position-absolute top-50 start-0 translate-middle badge rounded-pill bg-danger">
                            99+
                            <span className="visually-hidden">unread messages</span>
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="svgH bi bi-bell-fill" viewBox="0 0 16 16" height="30" width="30">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                        </svg>


                    </button>
                </li>
            </ul>
        </header>
        {rut != null ? (<AnimationPageLeft>

            <div className="card" >
                <div className="card-body" style={{ height: "78vh", zIndex: 0 }}>
                    <div className="tab-content" id="pills-tabContent">
                        <div style={{ Height: '70vh', overflowY: 'auto' }} className="tab-pane fade show active" id="pills-perfil" role="tabpanel" aria-labelledby="pills-perfil-tab" tabIndex="0"><Perfil user={user} rut={rut} /></div>
                        <div style={{ Height: '70vh', overflowY: 'auto' }} className="tab-pane fade" id="pills-agregar" role="tabpanel" aria-labelledby="pills-agregar-tab" tabIndex="0"><AgregarDocumento rut={rut} /></div>
                        <div style={{ Height: '70vh', overflowY: 'auto' }} className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                            {hayDocumentos ? (
                                Array.isArray(misDocumentos) ? (
                                    misDocumentos.map((documento) => (
                                        <div key={documento.id} style={{ marginBottom: "1rem" }}>
                                            <div className="card mb-3" style={{ maxWidth: "100%" }}>
                                                <button className='btn' onClick={() => { navigate('/loc', { state: { lat: documento.data.lat, long: documento.data.long } }) }}>
                                                    <div className="card-body">
                                                        <h6 className="card-title">Han encontrado uno de tus documentos</h6>
                                                        <div className="row">
                                                            <div className="col">
                                                                <p>{capitalizeFirstLetter(documento.nombre)} Encontró tu {documento.data.tipo ? "carnet" : "TNE"} en:</p>
                                                                <p>{documento.city}, {documento.pais}</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <img src={locationIcon} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>La variable misDocumentos no es un array.</p>
                                )
                            ) : (
                                <div >
                                    <div className='position-absolute top-50 start-50 translate-middle'>
                                        <div className='d-flex justify-content-center'>
                                            <img style={{ width: "10rem" }} src={fraseAleatoria.imagen} alt="" />
                                        </div>
                                        <p>{fraseAleatoria.frase}</p>
                                    </div>

                                </div>
                            )
                            }

                        </div>
                    </div>

                </div>
                <div className="card-footer" style={{ zIndex: 1, backgroundColor: '#E2E2E2', }}>
                    <ul className="nav nav-pills mb-3 d-flex justify-content-center " id="pills-tab" role="tablist">
                        <div className='row '>
                            <div className='col'>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active  btn-sm" id="pills-perfil-tab" data-bs-toggle="pill" data-bs-target="#pills-perfil" type="button" role="tab" aria-controls="pills-perfil" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg></button>
                                </li>
                            </div>
                            <div className='col'></div>
                            <div className='col'>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link  btn-sm" id="pills-agregar-tab" data-bs-toggle="pill" data-bs-target="#pills-agregar" type="button" role="tab" aria-controls="pills-agregar" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg></button>
                                </li>
                            </div>
                            <div className='col'></div>
                            <div className='col'>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link  btn-sm" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" style={{ fontSize: '0.8rem' }} onClick={() => mostrarFraseAleatoria()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                                    </svg></button>
                                </li>
                            </div>
                        </div>



                    </ul>


                </div>
            </div>



            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Notificaciones</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade " id="cerrar" tabIndex="-1" aria-labelledby="cerrarlLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cerrarlLabel">Seguro que quieres cerrar sesión</h1>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                No
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleSignOut();
                                    navigate("/login");
                                }}
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Sí
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </AnimationPageLeft>) : (
            <AnimationPageLeft>
                <Card>
                    <CardBody style={{ height: "90vh" }}>
                        <img className='position-absolute top-50 start-50 translate-middle' src={loading} alt="" />
                    </CardBody>

                </Card>

            </AnimationPageLeft>)}

    </div>)
}

