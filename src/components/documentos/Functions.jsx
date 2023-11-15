import { getAuth } from 'firebase/auth';
import { getFirestore, getDocs,query,collection,where, setDoc, doc } from 'firebase/firestore';
import { app } from '../../firebase/settings';
import 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

const fechaActual = new Date();
const fechaActualISO = fechaActual.toISOString();

const auth = getAuth(app);
const db = getFirestore(app);


const buscarDatos = async (rut) => {
    try {
        const q = query(collection(db, "users"), where("rut", "==", rut));
        const querySnapshot = await getDocs(q);
        const usuario = [];
        querySnapshot.forEach((doc) => {
          usuario.push(doc.data());
        });
        return usuario;
      } catch (error) {
        console.error("Error al buscar correo por rut:", error);
        throw error;
      }
}

const ingresarDocumento = async(rutCurrentUser,rut,long,lat)=>{
  try {
    const idDoc = uuidv4();
    const userDocRef = doc(db, 'documentos', idDoc);
    const data = {
        rut_encontro : rutCurrentUser,
        rut_propietario : rut,
        tipo : true,
        long : long,
        lat : lat,
        fecha : fechaActualISO 
    };

    await setDoc(userDocRef, data);

    console.log('Documento agregado con éxito');
} catch (error) {
    throw error;
}
}

export {buscarDatos, ingresarDocumento}