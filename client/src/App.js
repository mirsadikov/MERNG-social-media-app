import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import MenuBar from './component/MenuBar'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        <Route exact path='/login' component={LoginScreen} />
      </Container>
    </Router>
  )
}

export default App
