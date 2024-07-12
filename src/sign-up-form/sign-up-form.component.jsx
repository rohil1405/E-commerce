import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName , email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth('user', {displayName});
            resetFormFields();
            console.log(response);
        } catch(error) {
            console.log('user creation encountered an error',error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value});
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='text' required onChange={handleChange} name='displayName' value={formFields.displayName}/>

                <label>Email</label>
                <input type='email' required onChange={handleChange} name='email' value={formFields.email}/>

                <label>Password</label>
                <input type='password' required onChange={handleChange} name='password' value={formFields.password}/>

                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} name='confirmPassword' value={formFields.confirmPassword}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
    
}

export default SignUpForm;