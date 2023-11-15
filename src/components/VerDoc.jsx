import React, { useEffect } from 'react';
import { Mapa } from './Mapa';
import '../assets/css/mapa.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VerDoc = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state) {
            navigate('/menu');
        }
    }, [location, navigate]);

    if (location.state) {
        const { lat, long } = location.state;

        return (
            <div>
                <div>
                    <header className="justify-content-center py-4 ">
                        <ul className="nav nav-pills">
                            <li className="nav-item position-absolute top-0 start-0">
                                <a className="nav-link" aria-current="page" onClick={() => navigate("/menu")} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </header>
                </div>



                    <div  >
                        <div className="card" style={{ width: "90%", height: "90vh" }}>
                            <div className="card-body">
                            <Mapa latitude={lat} longitude={long} marcador={true} />
                            </div>
                        </div>
                    </div>


            
            </div>
        );
    }

    return null; // Retorna null en caso de no haber datos de ubicación
};

export default VerDoc;
