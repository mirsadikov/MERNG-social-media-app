import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

export default function RegisterScreen(props) {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result)
      props.history.push('/')
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addUser()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading && 'loading'}>
        <h1>Register</h1>
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
          label='Email'
          placeholder='Enter email...'
          type='email'
          name='email'
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm password...'
          type='password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button type='submit' primary>
          Register
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
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`
