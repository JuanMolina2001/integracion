import React, { useState, useEffect } from "react";
import { Mapa } from "../Mapa";
import "../../assets/css/mapa.css";
import lost from '../../assets/images/lost.png'

function Location({ enviar, latitude,longitude}) {
    const [marcador, setMarcador] = useState(false)

    const sendData = () => {
        enviar(true);

    }


    return (
        <div>
            <h3 className="d-flex justify-content-center" style={{ marginBottom: "2rem", marginTop: "1rem" }}>Elije la ubicacion</h3>
            {latitude != null ? (<Mapa latitude={latitude} longitude={longitude} marcador={marcador} />) : (
                <div className="d-flex justify-content-center" style={{ width: "100%", height: "50vh", backgroundColor: "gray" }}>
                    <div className="spinner-border" style={{ marginTop: "25vh" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)}


            {marcador ?
                (<div className="container-md">
                    <div className="d-flex justify-content-center row" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                        <button className="btn btn-primary col" onClick={() => sendData()}>Continuar</button>
                        <div className="col-1"></div>
                        <button className="btn btn-danger col" onClick={() => setMarcador(false)}>cancelar</button>
                    </div>
                </div>
                ) :
                (<div className="d-flex justify-content-center" style={{ marginBottom: "2rem", marginTop: "1rem" }} >

                    <button className="btn btn-primary" onClick={async () => {
                        setMarcador(true);
                    }}>
                        Usar mi ubicación actual
                    </button>
                </div>)}
            <div className="d-flex justify-content-center"><img src={lost} alt="" /></div>
        </div>
    );
}

export default Location;
