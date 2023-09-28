import { useState } from "react"
import { editData, getData, getDataById } from "../axios/actions";


export const useData = (initialData) => {
    const [data,setData] = useState(initialData); 
    
    const initialGet = (data1) => {
        setData({...data, userManager : {...data.userManager, users : data1}})
    }
    
    const getUserData = () => {
        getData().then(res=> {
            setData({...data, userManager : {...data.userManager, users : res.data}})
        })
    }
    
    const changeSearchValue = (e) => {
        e.stopPropagation(); 
        setData({...data, userManager : {...data.userManager, userIdToSearch : (e.target.value)}})
    } 
    const searchById = (e,id) => {
        e.preventDefault();
        setData({...data, userManager : {...data.userManager, spinnerOn : true}})
                getDataById(id).then(res=> {
                    const fetchedUser = res.data;
                    setTimeout(()=>{
                    setData({...data, userManager : {...data.userManager, users : [fetchedUser], spinnerOn : false, userIdToSearch : ""}})
                },100)
                }).catch(err => {
                    const newMessage = (err.response.data.message);
                    setTimeout(()=>{
                        setData({...data, message : newMessage, userManager : {...data.userManager, spinnerOn : false,}})
                    },100)
                }
                )
    }
    const toggleEditMode = (id) => {
        const setUser = data.userManager.users.find(n => n.id == id);
        setData({...data, userManager : {...data.userManager, userEditMode : !data.userManager.userEditMode, users : [setUser], userBody : setUser, userEditedId : id}});
    }
    const changeEditHandler = e => {
        setData({...data, userManager : {...data.userManager, userBody : {...data.userManager.userBody, [e.target.name] : e.target.value}}})
    }
    const pushModification = (id,modification) => {
        setData({...data, userManager : {...data.userManager, spinnerOn : true}})
        editData(id,modification).then(res=> {
            setData({...data, userManager : {...data.userManager, spinnerOn : false, userBody : {name : "", bio : "", userEditedId : ""}}})
            getUserData();
        }).catch(err => {
            const newMessage = (err.response.data.message);
            setTimeout(()=>{
                setData({...data, message : newMessage, spinnerOn : false})
            },100)
        })
    }
    const closeAlerts = () => {
        setData({...data, message : ""})
    }
    return [
        data,
        initialGet,
        searchById,
        changeSearchValue,
        closeAlerts,
        getUserData,
        pushModification,
        toggleEditMode,
        changeEditHandler,
    ]
}