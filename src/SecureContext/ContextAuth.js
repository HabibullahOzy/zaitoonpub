import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import app from '../WebAuth/firebase.config';


export const Zaitooncontext = createContext()

const auth =getAuth(app);
const ContextAuth = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ loader, setLoader ] = useState(true)
    const [ offer, setOffer ]= useState('');


    const createUserWithEP = (email, password) => {
        // setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const loginWithEP =(email,password)=>{
        // setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInwithGoogle=(provider)=>{
        // setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const logOut =()=>{
        // setLoader(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubmit = onAuthStateChanged(auth, (currentuser) => {
            // if (currentuser) {
                setUser(currentuser);
                setLoader(false);
            // }
            // else {
            //     console.log("sign in error")
            // }
        })
        return unSubmit;
    },[]);

    const mainValue = {
        auth,
        user,
        loader,
        setLoader,
        createUserWithEP,
        loginWithEP,
        signInwithGoogle,
        logOut,
        setOffer,
        offer
    }
    return (
        <div>
            <Zaitooncontext.Provider value={mainValue}>
                {children}
            </Zaitooncontext.Provider>
        </div>
    );
};

export default ContextAuth;