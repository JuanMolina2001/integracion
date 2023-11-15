// import { createWorker } from "tesseract.js";
// import OIGf8wa7 from '../../assets/images/OIGf8wa7.jpg';
// import { useState } from "react";
// import '../../assets/css/foto.css'

// const AgregarDoc = () => {
 
//   const [photo, setPhoto] = useState(null);
//   const [texto, setTexto] = useState(''); // Inicializado como una cadena vacía en lugar de null
//   const defaultImage = OIGf8wa7;

//   const capturePhoto = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const imageUrl = URL.createObjectURL(file);
//         setPhoto(imageUrl);
//         const worker = await createWorker('eng'); // Crear una nueva instancia de worker
//         const { data } = await worker.recognize(file);
//         setTexto(data.text);
//         await worker.terminate();
//       }
//     } catch (error) {
//       console.error('Error al capturar la foto desde el archivo:', error);
//     }
//   };

//   return (
//     <div className='contenedor-foto'>
//      <ul>
//       <li>
//       <div className="image-container">
//       {photo ? (<img src={photo} alt="Foto capturada" />) : (<img src={defaultImage} alt="Foto capturada" />)}
//       </div>
//       </li>
//       <li>
//       <input type="file" accept=".jpg, .jpeg, .png" onChange={capturePhoto} />
//       </li>
//      </ul>
 

      
//       <p>{texto}</p>
//     </div>
//   );
// };

// export default AgregarDoc;
