import { useContext } from "react";
import { StyledSearch } from "../../styles/StyledSearch";
import { GlobalContext } from "../contexts/contextHandlers";
import reactstrap, { Alert } from "reactstrap";

export default function SearchForm() {
    const { data, searchById, changeSearchValue, closeAlerts } = useContext(GlobalContext);
    return (
        <StyledSearch>
            {data.message && <Alert id = "alert"color={"danger"}>{data.message}
                <span onClick = {closeAlerts} id = "closed" className="material-symbols-outlined">
                    close
                </span>
            </Alert>}
            <select value={data.userManager.userIdToSearch} onChange={(e) => changeSearchValue(e)}>
                <option value="">--select id--</option>
                <option value="asdf">asdf --sanity check</option>
                {data.userManager.users.map(n => {
                    return <option value={n.id} key={n.id}>{n.id}</option>;
                })}
            </select>
            <button onClick={(e) => searchById(e, data.userManager.userIdToSearch)}>search</button>
        </StyledSearch>
    )
}