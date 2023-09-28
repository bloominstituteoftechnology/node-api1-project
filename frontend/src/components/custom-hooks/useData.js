import { useState } from "react"
import { getDataById } from "../axios/actions";


export const useData = (initialData) => {
    const [data,setData] = useState(initialData); 
    
    const initialGet = (data1) => {
        setData({...data, userManager : {...data.userManager, users : data1}})
    }
    
    
    
    const changeSearchValue = (e) => {
        // setData({...data, userManager : {...data.userManager, userIdToSearch : Number(e.target.value)}})
    } 
    const searchById = id => {
        // setData({...data, userManager : {...data.userManager, spinnerOn : true}})
        // setTimeout(()=> {
        //     getDataById(id).then(res=> {
        //         console.log(res.data); 
        //         setData({...data, userManager : {...data.userManager, spinnerOn : true}})
        //     })
        // },500)
    }
    
    return [
        data,
        initialGet,
        searchById,
        changeSearchValue,
    ]
}