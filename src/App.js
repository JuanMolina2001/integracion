
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Registrarse } from './components/registrarse/Registrarse';
import { Iniciarsesion } from './components/iniciarsesion/Iniciarsesion';
import { Perfil } from './components/Perfil';
import CameraCapture from './components/registrarse/child/Foto';
import { Menu } from './components/Menu';
import AgregarCarnet from './components/documentos/AgregarCarnet';
import VerDoc from './components/VerDoc';
import { Busqueda } from './components/Busqueda';
import CoverPage from './components/Cover';




function App() {
  return (

    <div>
       
         <Routes>
        <Route path='/register' element={<Registrarse />} />
        <Route path='/login' element={<Iniciarsesion />} />
        <Route path='/foto' element={<CameraCapture />} />
        <Route path="/carnet" element={<AgregarCarnet />} />
        <Route path="*" element={<Menu/>} />
        <Route path="/loc" element={<VerDoc/>} />
        <Route path="/search" element={<Busqueda/>} />
        <Route path="/" element={<CoverPage/>} />
        
      </Routes>
     


    </div>

  );
}

export default App;
