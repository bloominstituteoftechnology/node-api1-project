import React from "react";
import "./App.css";

import UsersList from "./components/UsersList";

const App = () => {
	return (
		<div className='App'>
			<h1>Welcome to the user community!</h1>
			<UsersList />
		</div>
	);
};

export default App;
