import { useContext } from "react";
import { StyledUser } from "../../styles/StyledUser";
import { GlobalContext } from "../contexts/contextHandlers";
import Spinner1 from "../spinner/spinner";

export default function User() {
    const { data,getUserData } = useContext(GlobalContext);
    const users = data.userManager.users;
    return (
        <StyledUser>
            {data.userManager.spinnerOn ?
                <Spinner1 />
                :
                <>
                    {users.map(n => {
                        if (users.length === 1) {
                            return <div key={n.id} className="users">
                            <span className="movingGeo"></span>
                            <span className="movingGeo2"></span>
                            <div><span className="contents">Name:</span> {n.name}</div>
                            <div><span className="contents">Bio:</span> {n.bio}</div>
                            {<span onClick = {getUserData} className="material-symbols-outlined">
                                close
                            </span>}
                        </div>
                        } else {
                        return <div key={n.id} className="users">
                            <span className="movingGeo"></span>
                            <span className="movingGeo2"></span>
                            <div><span className="contents">Name:</span> {n.name}</div>
                            <div><span className="contents">Bio:</span> {n.bio}</div>
                        </div>
                        }
                    })}
                    <span className="movingGeo3"></span></>}
        </StyledUser>
    )
}