import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/auth'
import { HeaderProvider } from './context/header'
import AuthRoute from './utils/authRoute'

import MenuBar from './component/MenuBar'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SinglePost from './screens/SinglePostScreen'

function App() {
  return (
    <AuthProvider>
      <HeaderProvider>
        <Router>
          <Container>
            <MenuBar />
            <Route exact path='/' component={HomeScreen} />
            <AuthRoute exact path='/register' component={RegisterScreen} />
            <AuthRoute exact path='/login' component={LoginScreen} />
            <Route exact path='/post/:postId' component={SinglePost} />
          </Container>
        </Router>
      </HeaderProvider>
    </AuthProvider>
  )
}

export default App
