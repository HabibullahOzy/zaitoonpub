import { useEffect, useState } from "react"

const useSuperAdmin =email =>{
    const [isSuperAdmin, setIsSuperAdmin]=useState(false);
    const [adminLoading, setAdminLoading]=useState(true);
    useEffect(()=>{
        if(email) {
            fetch(`${process.env.REACT_APP_backendurl}/users/superadmin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSuperAdmin(data.isSuperAdmin)
                setAdminLoading(false)
            })
        }
    }, [email])
    return [isSuperAdmin, adminLoading]
}

export default useSuperAdmin;