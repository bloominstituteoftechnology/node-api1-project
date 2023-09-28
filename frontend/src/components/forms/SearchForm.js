import { useContext } from "react";
import { StyledSearch } from "../../styles/StyledSearch";
import { GlobalContext } from "../contexts/contextHandlers";

export default function SearchForm() {
    const {data,searchById,changeSearchValue} = useContext(GlobalContext);
    return (
        <StyledSearch>
            <input value = {data.userManager.userIdToSearch} onChange={(e)=>changeSearchValue(e)} type = "number" />
            <button onClick={searchById(data.userManager.userIdToSearch)}>search</button>
        </StyledSearch>
    )
}