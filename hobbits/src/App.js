import './App.css';
import {Route} from 'react-router-dom';
import HobbitAddForm from './HobbitAddForm';
import HobbitUpdateForm from './HobbitUpdateForm';
import Home from './Home';

function App() {
  return (
    <div className="App">
        <header className="banner">
        <h1>Welcome to Hobbits World!</h1>
        <h3>Far over the misty mountains cold....</h3>
        </header>
        <Route exact path="/">
           <Home />
        </Route>
     
        <Route exact path="/addhobbits">
           <HobbitAddForm />
        </Route>

        <Route exact path="/updatehobbits/:id">
           <HobbitUpdateForm />
        </Route>
    </div>
  );
}

export default App;
