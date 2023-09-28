import { useContext } from "react";
import { StyledUser } from "../../styles/StyledUser";
import { GlobalContext } from "../contexts/contextHandlers";
import { Spinner } from "reactstrap";

export default function User() {
    const {data} = useContext(GlobalContext);
    const users = data.userManager.users;
    return (
        <StyledUser>
            {data.userManager.spinnerOn ? 
                <Spinner /> 
                :
                <>
                {users.map(n=> {
                    return <div key = {n.id} className="users">
                        <span className="movingGeo"></span>
                        <span className="movingGeo2"></span>
                        <div><span className="contents">Name:</span> {n.name}</div>
                        <div><span className="contents">Bio:</span> {n.bio}</div>
                        </div>
                })}
                 <span className="movingGeo3"></span></>}
        </StyledUser>
    )
}