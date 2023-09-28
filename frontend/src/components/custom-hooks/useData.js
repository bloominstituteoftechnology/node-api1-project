import { useState } from "react"


export const useData = (initialData) => {
    const [data,setData] = useState(initialData); 


    return [
        data,
    ]
}