import { app } from '../firebase/settings'
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Nominatim from 'nominatim-geocoder';


const db = getFirestore(app);



const lugar = (lat, lon) => {

}





const rutEncontrar = async (id) => {
  const usersCollection = collection(db, 'users');
  const docRef = doc(usersCollection, id);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Si el documento existe, obtener el valor del campo "rut"
      const rut = docSnap.data().rut;
      return rut;
    } else {
      console.log(`Error al encontrar el rut`);
      return null;
    }
  } catch (error) {
    console.error(`Error al encontrar el rut:`, error);
    throw error;
  }
};


const rutExiste = async (rut) => {
  const collectionPath = 'users'; 
  const q = query(collection(db, collectionPath), where("rut", "==", rut));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; 
    return doc.data().nombre;
  } else {
    return null; 
  }
}
const geocoder = new Nominatim({
  serviceUrl: 'https://nominatim.openstreetmap.org',
});

const documentosEnc = async (rut) => {
  try {
    const q = query(collection(db, "documentos"), where("rut_propietario", "==", rut));
    const querySnapshot = await getDocs(q);

    const documentos = [];
    
    const promises = querySnapshot.docs.map(async (doc) => {
      try {
        const nombre = await rutExiste(doc.data().rut_encontro);
        const response = await geocoder.reverse({ lat: doc.data().lat, lon: doc.data().long });
        const city = response.address.city || response.address.town || 'unknown';
        const pais = response.address.country
        documentos.push({ id: doc.id, data: doc.data(), city, pais, nombre });
      } catch (error) {
        console.error('Error al obtener la información de ubicación:', error);
      }
    });

    await Promise.all(promises);
    return documentos;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export { rutEncontrar, documentosEnc, db, lugar, rutExiste }