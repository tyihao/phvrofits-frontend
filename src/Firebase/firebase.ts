import { format } from 'date-fns';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {
  EarningsLogInfo,
  FuelLogFormType,
  FuelLogInfo,
  UserInfo,
} from '../Utils/types';
import { firebaseConfig } from './constants';

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

// Fuel Logs: Create
const submitFuelLogToFirebase = async (data: FuelLogFormType) => {
  const { date, isFullTank, mileage, petrolPumped } = data;
  try {
    const userId = await fetchUserId();

    if (isFullTank && !mileage) {
      throw new Error('Full tank logs should include mileage entry.');
    }

    if (petrolPumped <= 0) {
      throw new Error('Petrol pumped must be more than 0.');
    }

    if (mileage && mileage <= 0) {
      throw new Error('Mileage must be more than 0.');
    }

    setDoc(
      doc(
        db,
        'users/' + userId + '/fuel_logs',
        format(date, 'yyyyMMdd') +
          (isFullTank ? 'Full_' : '_') +
          Math.floor(Math.random() * 1000)
      ),
      {
        date: date.getTime(),
        petrolPumped,
        isFullTank,
        mileage: mileage || null,
      }
    );
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

// TODO Fuel Logs: Read
const fetchFuelLogData = async () => {
  const user = await fetchUserInfo();
  try {
    const q1 = query(
      collection(db, 'users'),
      where('uid', '==', user && user.uid)
    );
    const doc = (await getDocs(q1)).docs[0];
    const id = doc.id;

    const q2 = query(collection(db, 'users/' + id + '/fuel_logs'));
    const logData = (await getDocs(q2)).docs.map((doc) => ({
      ...doc.data(),
      date: new Date(doc.data().date),
      id: doc.id,
    })) as Array<FuelLogInfo>;
    return logData;
  } catch (err) {
    console.error(err);
    console.log('An error occured while fetching log data!');
  }
};

// TODO Fuel Logs: Update

// TODO Fuel Logs: Delete (Low Priority)

// Earnings Logs: Create
const submitEarningsLogToFirebase = async (
  gojekEarnings: number,
  tadaEarnings: number,
  grabEarnings: number,
  rydeEarnings: number,
  date: moment.Moment,
  distance: number
) => {
  try {
    const userId = await fetchUserId();
    const discountedLitrePetrol = await getPetrolPrice(date);
    const userInfo = await fetchUserInfo();
    const totalRevenue =
      Math.round(
        (gojekEarnings + tadaEarnings + grabEarnings + rydeEarnings) * 100
      ) / 100;
    const petrolCost =
      discountedLitrePetrol *
      (distance / 100) *
      parseFloat(userInfo.fuelEfficiency);

    setDoc(doc(db, 'users/' + userId + '/logs', date.format('YYYYMMDD')), {
      gojekEarnings,
      tadaEarnings,
      grabEarnings,
      rydeEarnings,
      date: date.toDate().getTime(),
      distance,
      totalRevenue,
      fuelEfficiency: parseFloat(userInfo.fuelEfficiency),
      discountedLitrePetrol,
      petrolCost,
      totalProfit: totalRevenue - petrolCost,
    });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

// TODO Earnings Logs: Retrieve
const fetchEarningsLogData = async () => {
  const user = await fetchUserInfo();
  try {
    const q1 = query(
      collection(db, 'users'),
      where('uid', '==', user && user.uid)
    );
    const doc = (await getDocs(q1)).docs[0];
    const id = doc.id;

    const q2 = query(collection(db, 'users/' + id + '/logs'));
    const logData = (await getDocs(q2)).docs.map((doc) => ({
      ...doc.data(),
      date: new Date(doc.data().date),
      id: doc.id,
    })) as Array<EarningsLogInfo>;
    return logData;
  } catch (err) {
    console.error(err);
    console.log('An error occured while fetching log data!');
  }
};

// Earnings Logs: Update
const editEarningsLogOnFirebase = async (log: EarningsLogInfo) => {
  const {
    id,
    gojekEarnings,
    tadaEarnings,
    grabEarnings,
    rydeEarnings,
    distance,
    totalProfit,
    totalRevenue,
    petrolCost,
  } = log;
  try {
    const userId = await fetchUserId();
    const docsRef = doc(db, 'users/' + userId + '/logs', id);
    const log = (await getDoc(docsRef)).data();
    if (log) {
      setDoc(docsRef, {
        // TODO test this logic
        ...log,
        gojekEarnings,
        tadaEarnings,
        grabEarnings,
        rydeEarnings,
        distance,
        totalRevenue,
        petrolCost,
        totalProfit,
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

// Earnings Logs: Delete (Low Priority)

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
    await setDoc(doc(db, 'users', user.email || user.uid), {
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

const fetchUserInfo = async (): Promise<UserInfo> => {
  try {
    const user = await fetchUserId();
    const docsRef = doc(db, 'users/' + user);
    const userDoc = (await getDoc(docsRef)).data() as UserInfo;
    return userDoc;
  } catch (err) {
    console.error(err);
  }
  return {} as UserInfo;
};

export {
  auth,
  db,
  editEarningsLogOnFirebase,
  fetchEarningsLogData,
  fetchFuelLogData,
  fetchUserInfo,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
  submitEarningsLogToFirebase,
  submitFuelLogToFirebase,
};

// functions from here are not meant to be exported

const fetchUserId = async () => {
  try {
    const user = auth.currentUser;
    const q1 = query(
      collection(db, 'users'),
      where('uid', '==', user && user.uid)
    );
    const doc = (await getDocs(q1)).docs[0];
    return doc.id;
  } catch (err) {
    console.error(err);
  }
};

const fetchPetrolData = async (
  date: moment.Moment,
  otherDate?: moment.Moment
): Promise<DocumentData | undefined> => {
  if (otherDate && otherDate.diff(moment(date).subtract(30, 'days')) === 0) {
    // History not long enough... must be after 8/6/2021
    // Return some form of error message in FE
    throw new Error('No such record found');
  }
  try {
    const docRef = doc(
      db,
      'gas_prices',
      otherDate ? otherDate.format('YYYYMMDD') : date.format('YYYYMMDD')
    );
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // doc.data() will be undefined in this case
      return fetchPetrolData(
        date,
        otherDate
          ? otherDate.subtract(1, 'days')
          : moment(date).subtract(1, 'days')
      );
    }
    return docSnap.data();
  } catch (err) {
    console.error('An error occured while fetching petrol data!');
    console.error(err);
  }
};

const getPetrolPrice = async (date: moment.Moment) => {
  // get user's petrol station and petrol type
  const userDoc = await fetchUserInfo();
  const petrolStation = (userDoc && userDoc.petrolStation) || 'esso';
  const petrolType = (userDoc && userDoc.fuelGrade) || '95';
  const petrolProfile = (petrolStation + '_' + petrolType).toLowerCase();
  // get the date's petrol prices from db
  const petrolData = await fetchPetrolData(date);
  const userPetrolPrice = petrolData && petrolData[petrolProfile];
  const discountedPetrol =
    petrolData && petrolData.raw_prices
      ? userPetrolPrice * 0.8 // using 0.8 as a rough estimate for discounts
      : userPetrolPrice;
  return discountedPetrol;
};
