import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, query, collection, where, getDocs} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/settings';

const auth = getAuth(app);
//crear cuenta
const db = getFirestore(app);
const storage = getStorage(app);


const rutExiste = async (rut) => {
  const collectionPath = 'users'; // Definir la ruta de la colección
  const q = query(collection(db, collectionPath), where("rut", "==", rut));

  try {
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; 
  } catch (error) {
    console.error('Error al verificar la colección:', error);
    throw error;
  }
}




const subirFotos = async (file) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const storageRef = ref(storage, 'fotoUser/' + user.uid);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          await fotoDb (user.uid,downloadURL)
          await updateProfile(user, { photoURL: downloadURL });
        console.log('Archivo subido exitosamente');
      } catch (error) {
        console.error('Error al subir o actualizar la foto:', error);
      }
    } else {
      console.error('El usuario no está autenticado.');
    }
  });
};

const fotoDb = async (id, photoUrl) => {
  const userRef = doc(db, 'users', id);
  const userData = {
    photoUrl: photoUrl,
  };

  try {
    await setDoc(userRef, userData, { merge: true }); // El uso de { merge: true } permite actualizar solo los campos proporcionados
    console.log('Campo photoUrl agregado con éxito');
  } catch (error) {
    console.error('Error al agregar el campo photoUrl:', error);
  }
};


const registrarse = (nombre, email, password, rut, apellidoM, apellidoP) => {
  return setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userToken = user.getIdToken();
          localStorage.setItem('userToken', userToken);

          // Obtén el UID del usuario
          const uid = user.uid;

          // Llama a la función setUsuario con el UID
          setUsuario(uid, email, nombre, rut, apellidoM, apellidoP);

          // Además, si deseas, puedes establecer el nombre del usuario
          setNombre(user, nombre);
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}






const setUsuario = async (uid, email, nombre, rut, apellidoM, apellidoP) => {
  try {
    const userDocRef = doc(db, 'users', uid);

    const data = {
      correo: email.toLowerCase(),
      nombre : nombre,
      apellidoM : apellidoM,
      apellidoP : apellidoP,
      rut : rut,
    };

    await setDoc(userDocRef, data);

    console.log('Documento agregado con éxito');
  } catch (error) {
    throw error;
  }
};

const setNombre = (user, nombre) => {
  return updateProfile(user, {
    displayName: nombre
  })
    .then(() => {
    })
    .catch(error => {
      throw error;
    });
}


export { registrarse, subirFotos, auth, onAuthStateChanged, rutExiste }