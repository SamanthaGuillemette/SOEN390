import {auth} from "./firebase"

export const authMethods = {
    
    signup: (email, password, firstName, setErrors, setToken) => {
        auth().createUserWithEmailAndPassword(email, password)
        .then(async res => {
            const token = await Object.entries(res.user)[5][1].b
            await localStorage.setItem('token', token)
            setToken(token)
            res.user.updateProfile({
                displayName: firstName
            }).then(function() {
                console.log('username updated successfully')
            }, function (error) {
                console.log('oh no an error, fml')
            });
        })
        .catch(error => {
            setErrors(prev => ([...prev, error.message]))
        })
    }

}

 