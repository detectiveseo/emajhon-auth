import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';



export const AuthContext = createContext(null);
const auth = getAuth(app)

const Authprovider = ({children}) => {
    //registration
    const createUserWithEmail = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const createuserWIthGoogle = (provider) => {
        return signInWithPopup(auth, provider)
    }

    //login
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    //observe
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false)
        })
        return () => {
            return unsubscribe();
        }
    }, [])


    //singout
    const singout = () => {
        return signOut(auth)
    }
    

    const details = {
        user,
        loader,
        createUserWithEmail,
        createuserWIthGoogle,
        loginWithEmail,
        singout,

    }
    return (
        <AuthContext.Provider value={details}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;