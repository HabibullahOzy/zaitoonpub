import { useEffect, useState } from "react";

const useToken = email => {

    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`https://used-products-server-gold.vercel.app/jsonwebToken?email=${email}`)
                .then(res => res.json())
                .then(info => {
                    if (info.jsonAccessToken) {
                        localStorage.setItem('jsonAccessToken', info.jsonAccessToken)
                        setToken(info.jsonAccessToken);
                    }
                })
        }
    }, [email]);
    return [token];
}

export default useToken;