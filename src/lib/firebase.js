// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';
import { calculateFrequency } from './estimates';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyDFXBbPe8ZUkuAIc4Ep-BGbesyTW4yPy-g',
  authDomain: 'tcl-10-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-10-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-10-smart-shopping-list',
  storageBucket: 'tcl-10-smart-shopping-list.appspot.com',
  messagingSenderId: '946401926689',
  appId: '1:946401926689:web:24889e069cf0aff111cd60',
};

let fb = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export function updatePurchaseDate(
  collectionName,
  itemId,
  existingPurchaseDates,
) {
  //include current purchaseDates as parameter
  const currentPurchaseDate = firebase.firestore.Timestamp.now().toMillis(); // set the new purchase date
  if (existingPurchaseDates.length > 2) {
    const newPurchaseDates = [...existingPurchaseDates, currentPurchaseDate]; // set new purchase dates array for calculate function
    updateFirestore(collectionName, itemId, {
      purchaseDates: firebase.firestore.FieldValue.arrayUnion(
        currentPurchaseDate,
      ),
      frequency: calculateFrequency(newPurchaseDates),
    });
  } else {
    updateFirestore(collectionName, itemId, {
      purchaseDates: firebase.firestore.FieldValue.arrayUnion(
        currentPurchaseDate,
      ),
    });
  }
}

export function writeToFirestore(collectionName, options = {}) {
  db.collection(collectionName).add(options);
}

export function updateFirestore(collectionName, itemId = {}, options = {}) {
  db.collection(collectionName)
    .doc(itemId)
    .update(options);
}

export { fb, db };
