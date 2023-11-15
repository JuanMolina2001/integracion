import React, { useState, useEffect } from 'react';
import QRScanner from './QRCodeReader';
import { useNavigate } from 'react-router-dom'
import { AnimationPageRight } from '../AnimationPage';
import { useLocation } from 'react-router-dom';
function AgregarCarnet() {
  const location = useLocation();
  const state = location.state;
  const rut = state.rut;
  const navigate = useNavigate();
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [result, setResult] = useState('');
  const [error, setError] = useState('')


 useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(latitude + " " + longitude)
                   setLon(longitude)
          	setLat(latitude)
                },
                function (error) {
                    console.error("Error al obtener la ubicación:", error);
                }
            );
        } else {
            console.log("La geolocalización no está disponible en este navegador.");
        }
    }, []);



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
      <AnimationPageRight>


        <div  >
          <div className="card" style={{ width: "90%", height: "90vh" }}>
            <div className="card-body">
              <QRScanner long={lon} lat={lat} rut={rut} />
            </div>
          </div>
        </div>

      </AnimationPageRight>
    </div>
  );
}

export default AgregarCarnet;
