import { browserLocalPersistence,getAuth, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase/settings';

const auth = getAuth(app);
const db = getFirestore(app);

const buscarEmailRut = async (rut) => {
  try {
    const q = query(collection(db, "users"), where("rut", "==", rut));
    const querySnapshot = await getDocs(q);

    const correos = [];
    querySnapshot.forEach((doc) => {
      correos.push(doc.data().correo);

    });

    return correos;
  } catch (error) {
    console.error("Error al buscar correo por rut:", error);
    throw error;
  }
}


const iniciarSesion = (email, password) => {

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Realiza el inicio de sesión con el correo y la contraseña
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Obtén el token de usuario e guárdalo en el almacenamiento local
          user.getIdToken().then((userToken) => {
            localStorage.setItem('userToken', userToken);
          }).catch((error) => {
            throw error;
          });
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}
  
  
  
  

export { iniciarSesion, buscarEmailRut, auth, onAuthStateChanged };