import { useEffect, useState } from "react"

const useSuperAdmin =email =>{
    const [isSuperAdmin, setIsSuperAdmin]=useState(false);
    const [adminLoading, setAdminLoading]=useState(true);
    useEffect(()=>{
        if(email) {
            fetch(`http://localhost:5000/users/superadmin/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(isSuperAdmin)
                setIsSuperAdmin(data.isSuperAdmin)
                setAdminLoading(false)
            })
        }
    }, [email])
    return [isSuperAdmin, adminLoading]
}

export default useSuperAdmin;