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
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Log } from '../Utils/types';

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
  gojekEarnings: number,
  tadaEarnings: number,
  grabEarnings: number,
  rydeEarnings: number,
  date: moment.Moment,
  distance: number
) => {
  try {
    const userId = await fetchUserId();
    await addDoc(collection(db, 'users/' + userId + '/logs'), {
      gojekEarnings,
      tadaEarnings,
      grabEarnings,
      rydeEarnings,
      date: date.toDate().getTime(),
      distance,
      totalEarnings:
        Math.round(
          (gojekEarnings + tadaEarnings + grabEarnings + rydeEarnings) * 100
        ) / 100,
    });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const editEntryOnFirebase = async (log: Log) => {
  const {
    id,
    gojekEarnings,
    tadaEarnings,
    grabEarnings,
    rydeEarnings,
    distance,
  } = log;
  try {
    const userId = await fetchUserId();
    console.log(userId);
    const docsRef = doc(db, 'users/' + userId + '/logs', id);
    const log = (await getDoc(docsRef)).data();
    if (log) {
      const date = log.date;
      setDoc(docsRef, {
        date,
        gojekEarnings,
        tadaEarnings,
        grabEarnings,
        rydeEarnings,
        distance,
        totalEarnings:
          gojekEarnings + grabEarnings + rydeEarnings + rydeEarnings,
      })
        .then(() => {
          console.log('Entire Document has been updated successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  carModel: string,
  fuelEfficiency: string,
  petrolStation: string,
  fuelGrade: string
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
      fuelGrade,
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
  editEntryOnFirebase,
};

const fetchUserId = async () => {
  try {
    const user = auth.currentUser;
    const q1 = query(
      collection(db, 'users'),
      where('uid', '==', user && user.uid)
    );
    const doc = (await getDocs(q1)).docs[0];
    const id = doc.id;
    return id;
  } catch (err) {
    console.error(err);
  }
};
