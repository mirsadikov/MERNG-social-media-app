import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/authRoute'

import MenuBar from './component/MenuBar'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={HomeScreen} />
          <AuthRoute exact path='/register' component={RegisterScreen} />
          <AuthRoute exact path='/login' component={LoginScreen} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
