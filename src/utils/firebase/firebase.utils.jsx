import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
    getFirestore,
    doc, //allows us to retrieve documents inside of our firestore database
    getDoc, //access the get doc
    setDoc, //want to set doc
} from 'firebase/firestore';

//Authentication
const firebaseConfig = {
    apiKey: "AIzaSyBYFvUuDGF5MKUvY7_UeQ4tbpPLOM5A4JQ",
    authDomain: "crawn-clothing-18623.firebaseapp.com",
    projectId: "crawn-clothing-18623",
    storageBucket: "crawn-clothing-18623.appspot.com",
    messagingSenderId: "895577435801",
    appId: "1:895577435801:web:9a383c7f7ebe63150b1208"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);


//Cloud FireStore
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)  //doc three argument (database name, collections name, identifier)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef); //allow to check whether or not an instance of it that exist inside our database and it also access the data
    
    console.log(userSnapshot);
    console.log(userSnapshot.exists()); //false

    //if user data exists
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        //create/set the document with the data from userAuth in my collection
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(error) {
            console.log('error creating the user', error.message)
        }
    }
    //if user data does not exists
    return userDocRef;
}


//Email and Password

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}




