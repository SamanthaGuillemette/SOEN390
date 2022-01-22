import * as React from 'react';
import {authMethods} from '../backend/authmethods';
import {db} from './firebase';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
    const initState = {email: '', password: '', firstName: '', lastName: '', address: '', city: '', state: '', postalCode: '', dob: ''}
    const [inputs, setInputs] = React.useState(initState);
    const [errors, setErrors] = React.useState([]);
    const [token, setToken] = React.useState(localStorage.getItem('token'));

    const handleSignup = () => {
        authMethods.signup(inputs.email, inputs.password, inputs.firstName, inputs.lastName, inputs.address, inputs.city, inputs.state, inputs.postalCode, inputs.dob, setErrors, setToken)
        db.collection('users').doc(inputs.email).set({
            email: inputs.email,
            firstName: inputs.firstName,
            lastName: inputs.lastName, 
            address: inputs.address,
            city: inputs.city,
            state: inputs.state,
            postalCode: inputs.postalCode,
            dob: inputs.dob
        })
    }

    return(
        <firebaseAuth.Provider
            value={{ 
                handleSignup,
                token,
                inputs,
                setInputs,
                errors
            }}>
                {props.children}
            </firebaseAuth.Provider>
    )
}

export default AuthProvider;