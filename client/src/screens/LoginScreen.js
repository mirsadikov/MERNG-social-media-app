import { useState, useContext, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Form, Button, Container } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'
import { HeaderContext } from '../context/header'

export default function LoginScreen(props) {
  const context = useContext(AuthContext)
  const { activateHeaderItem } = useContext(HeaderContext)

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function loginUserCallback() {
    loginUser()
  }

  useEffect(() => {
    activateHeaderItem('login')
  }, [])

  return (
    <Container>
      <div className='form-container'>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? 'loading' : ''}
          mobile={16}
        >
          <h1>Login</h1>
          <Form.Input
            label='Username'
            placeholder='Enter username...'
            type='text'
            name='username'
            value={values.username}
            onChange={onChange}
            error={errors.username ? true : false}
          />
          <Form.Input
            label='Password'
            placeholder='Enter password...'
            type='password'
            name='password'
            value={values.password}
            onChange={onChange}
            error={errors.password ? true : false}
          />
          <Button type='submit' primary>
            Login
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`
