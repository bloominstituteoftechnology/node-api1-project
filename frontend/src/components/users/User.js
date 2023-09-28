import { useContext } from "react";
import { StyledUser } from "../../styles/StyledUser";
import { GlobalContext } from "../contexts/contextHandlers";
import Spinner1 from "../spinner/spinner";

export default function User() {
    const { data, getUserData, toggleEditMode, changeEditHandler,pushModification } = useContext(GlobalContext);
    const users = data.userManager.users;
    return (
        <StyledUser>
            {data.userManager.spinnerOn ?
                <Spinner1 />
                :
                <>
                    {users.map(n => {
                        if (users.length === 1 && !data.userManager.userEditMode) {
                            return <div key={n.id} className="users">
                                <span className="movingGeo"></span>
                                <span className="movingGeo2"></span>
                                <div><span className="contents">Name:</span> {n.name}</div>
                                <div><span className="contents">Bio:</span> {n.bio}</div>
                                {<span onClick={getUserData} className="material-symbols-outlined">
                                    close
                                </span>}
                            </div>
                        } else if (users.length === 1 && data.userManager.userEditMode) {
                            return <div style = {{position : "relative"}} key={n.id} className="users">
                                <span className="movingGeo"></span>
                                <span className="movingGeo2"></span>
                                <div><span className="contents">Name:</span><input name="name" onChange={(e) => changeEditHandler(e)}
                                    value={data.userManager.userBody.name} type="text" /></div>
                                <div><span className="contents">Bio:</span><input name="bio" onChange={(e) => changeEditHandler(e)}
                                    value={data.userManager.userBody.bio} type="text" /></div>
                                {<span onClick={getUserData} className="material-symbols-outlined">
                                    keyboard_return
                                </span>}
                                <button id = "sub" onClick={()=> pushModification(data.userManager.userBody.id,data.userManager.userBody)}>submit change</button>
                            </div>
                        } else {
                            return <div key={n.id} className="users">
                                <span className="movingGeo"></span>
                                <span className="movingGeo2"></span>
                                <div onClick={() => toggleEditMode(n.id)} style={{ position: 'relative' }}><span className="contents">Name:</span> {n.name}  <span id="edit" className="material-symbols-outlined">
                                    edit
                                </span></div>
                                <div><span className="contents">Bio:</span> {n.bio}</div>
                            </div>
                        }
                    })}
                    <span className="movingGeo3"></span></>}
        </StyledUser>
    )
}