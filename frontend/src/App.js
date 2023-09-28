import './App.css';
import { GlobalContext, FormContext, UserContext } from "./components/contexts/contextHandlers";
import User from "./components/users/User";
import AddUserForm from "./components/forms/AddUserForm";
import { StyledApp } from './styles/StyledApp';
import { useData } from './components/custom-hooks/useData';
import { initialData } from './components/initialDataSchema/initialData';
import { Hidden } from './components/Hidden';
import SearchForm from './components/forms/SearchForm';

function App() {
  const [data,initialGet,searchById,changeSearchValue] = useData(initialData); 
  return (
    <StyledApp>
    <GlobalContext.Provider value={{data,initialGet,searchById,changeSearchValue}}>
      <SearchForm />
      <UserContext.Provider value = {[]}>
        { <User />}
      </UserContext.Provider>
      <FormContext.Provider value = {[]}>
        {data.userManager.userAddMode && <AddUserForm />}
      </FormContext.Provider>
    <Hidden/>
    </GlobalContext.Provider>
    </StyledApp>
  );
}

export default App;
