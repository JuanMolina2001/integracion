import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/perfil.css'
export const Perfil = (props) => {
  const navigate = useNavigate();


  return (
    <div className="">
      <main className="px-3 fondo" >

        <div>
          <div className="bd-placeholder-img rounded-circle d-flex justify-content-center position-relative" style={{ display: 'block', margin: '0 auto', width: "150px", height: "150px" }}>
            <div className='position-absolute top-50 start-50 translate-middle' style={{ zIndex: 1 }}>
              <img className="bd-placeholder-img rounded-circle"  width="150" height="150" src={props.user?.photoURL} alt="" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"></img>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 0 }} role="status">
              <div className="spinner-border text-dark" style={{width: "50px", height: "50px"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              
            </div>
          </div>

        </div>

        <h1 className='nombre'>{props.user?.displayName}</h1>
        <div className="card ">
          <div className='card-header'>
            <p style={{ fontWeight: "bold" }} >Rut </p>
          </div>
          <div className="card-body">

            <p style={{ fontSize: "1rem" }} className="lead">{props.rut}</p>
          </div>
        </div>
        <div className="card">
          <div className='card-header'>
            <p style={{ fontWeight: "bold" }} >Email </p>
          </div>
          <div className="card-body">

            <p style={{ fontSize: "1rem" }} className="lead">{props.user?.email}</p>
          </div>
        </div>


      </main>




    </div>










  );
};
