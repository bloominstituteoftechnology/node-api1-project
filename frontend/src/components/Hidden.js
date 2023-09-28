import { useContext, useEffect } from "react"
import { GlobalContext } from "./contexts/contextHandlers"
import { getData } from "./axios/actions";

export const Hidden = () => {
    const {initialGet} = useContext(GlobalContext);
    useEffect(()=> {
        getData().then(res=> {
            initialGet(res.data)
        })
    },[])
    return <></>
}