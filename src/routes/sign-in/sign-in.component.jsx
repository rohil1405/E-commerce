// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    // signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {

    // useEffect(() => {
    //     const fetchRedirectResult = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);

    //         if(response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     };

    //     fetchRedirectResult();
    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log({ user });

        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    );
};

export default SignIn;
