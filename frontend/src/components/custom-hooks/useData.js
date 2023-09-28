import { useState } from "react"


export const useData = (initialData) => {
    const [data,setData] = useState(initialData); 
    
    const initialGet = (data1) => {
        setData({...data, userManager : {...data.userManager, users : data1}})
    }

    return [
        data,
        initialGet,
    ]
}