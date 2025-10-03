import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, updateProfile } from 'firebase/auth';
import app from '../WebAuth/firebase.config';


export const Zaitooncontext = createContext()

const auth =getAuth(app);
const ContextAuth = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ loader, setLoader ] = useState(true)
    const [ offer, setOffer ]= useState('');
    const [cartdataset, setCartdataset]=useState('');
    const [prices, setPrices] = useState(0);
    const [ident, setIdent] = useState(0);
    const [producD, setProducD]=useState('')
    const [cashonprodata,setCashonprodata]=useState(null)


    // device id data pass
  const localDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};


    const createUserWithEP = (email, password) => {
        // setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const loginWithEP =(email,password)=>{
        // setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const addedUpdateUser =(displayName,photoURL)=>{
        setLoader(true)
        return updateProfile(auth.currentUser, {displayName,photoURL})
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
        addedUpdateUser,
        loginWithEP,
        signInwithGoogle,
        logOut,
        setOffer,
        offer,
        cartdataset,
        setCartdataset,
        prices,
        setPrices,
        ident,
        setIdent,
        producD,
        setProducD,
        cashonprodata,
        setCashonprodata,
        localDeviceId
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