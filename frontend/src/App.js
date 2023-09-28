import './App.css';
import { GlobalContext, FormContext, UserContext } from "./components/contexts/contextHandlers";
import User from "./components/users/User";
import AddUserForm from "./components/forms/AddUserForm";
import { StyledApp } from './styles/StyledApp';
import { useData } from './components/custom-hooks/useData';
import { initialData } from './components/initialDataSchema/initialData';

function App() {
  const [data] = useData(initialData); 
  return (
    <StyledApp>
    <GlobalContext.Provider value={[]}>
      <UserContext.Provider value = {[]}>
        {data.userManager.usersAreVisible && <User />}
      </UserContext.Provider>
      <FormContext.Provider value = {[]}>
        {data.userManager.userAddMode && <AddUserForm />}
      </FormContext.Provider>
    </GlobalContext.Provider>
    </StyledApp>
  );
}

export default App;
