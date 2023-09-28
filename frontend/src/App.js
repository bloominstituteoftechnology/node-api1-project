import './App.css';
import { GlobalContext, FormContext, UserContext } from "./components/contexts/contextHandlers";
import User from "./components/users/User";
import AddUserForm from "./components/forms/AddUserForm";

function App() {
  return (
    <GlobalContext.Provider value={[]}>
      <UserContext.Provider value = {[]}>
        <User />
      </UserContext.Provider>
      <FormContext.Provider value = {[]}>
        <AddUserForm />
      </FormContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
