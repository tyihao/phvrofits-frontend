import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDkzczYXW6sCsTh1yzdDo1YSiGP9yd2KFw',
  authDomain: 'phvrofits.firebaseapp.com',
  databaseURL:
    'https://phvrofits-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'phvrofits',
  storageBucket: 'phvrofits.appspot.com',
  messagingSenderId: '1082643447398',
  appId: '1:1082643447398:web:770a40726ba170c15bb7a7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const submitEntryToFirebase = async (
  id: string,
  gojekEarnings: number,
  tadaEarnings: number,
  grabEarnings: number,
  rydeEarnings: number,
  date: number,
  distance: number
) => {
  try {
    await addDoc(collection(db, 'users/' + id + '/logs'), {
      gojekEarnings,
      tadaEarnings,
      grabEarnings,
      rydeEarnings,
      date,
      distance,
      totalEarnings: gojekEarnings + tadaEarnings + grabEarnings + rydeEarnings,
    });
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  carModel: string,
  fuelEfficiency: string,
  petrolStation: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      carModel,
      fuelEfficiency,
      petrolStation,
    });
  } catch (err) {
    console.error(err);
  }
};
const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  submitEntryToFirebase,
};
