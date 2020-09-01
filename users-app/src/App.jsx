// libraries
import React from 'react'
//components
import Daskboard from './component/Daskboard'
import EditForm from './component/EditForm'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch  >
        <Route exact path='/'>
          <Daskboard />
        </Route>
        <Route route='/editform/:id'>
          <EditForm />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
