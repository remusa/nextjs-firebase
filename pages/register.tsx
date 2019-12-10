import { NextPage } from 'next'
import React from 'react'
import useForm from 'react-hook-form'
import styled from 'styled-components'
import * as yup from 'yup'
import Layout from '../components/Layout'
import { useAuth } from '../context/Firebase/AuthContext'
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../utils/validationSchemas'
import { IUser } from './login'

const validationSchema = yup.object().shape({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})

const RegisterStyles = styled.section`
  text-align: center;

  .error-message {
    color: red;
  }
`

interface IRUser extends IUser {
  username: string
  confirmPassword: string
}

interface Props {}

const Register: NextPage<Props> = props => {
  const { registerWithEmail } = useAuth()
  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    formState: { isSubmitting, dirty, isValid },
  } = useForm<IRUser>({
    validationSchema,
  })

  const onSubmit = async ({ email, username, password, confirmPassword }: IRUser) => {
    console.log('SUBMITING: ', email, username, password, confirmPassword)
    try {
      registerWithEmail(email, password)
    } catch (e) {
      console.log(`FAILED SIGNING UP: ${e.message}`)
    }
  }

  return (
    <Layout>
      <RegisterStyles>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
              <h1 data-testid='signup-page'>Sign Up</h1>

              <div>
                <label className='label' htmlFor='username'>
                  Username
                </label>

                <p>
                  <input
                    name='username'
                    className='input'
                    placeholder='Username'
                    ref={register({ required: true })}
                  />
                </p>

                {errors.username && (
                  <span className='error-message'>{errors.username.message}</span>
                )}
              </div>

              <div>
                <label htmlFor='email'>Email </label>

                <p>
                  <input
                    type='email'
                    name='email'
                    className='input'
                    placeholder='Email'
                    ref={register}
                  />
                </p>

                {errors.email && <span className='error-message'>{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor='password'>Password </label>

                <p>
                  <input
                    type='password'
                    name='password'
                    className='input'
                    placeholder='*****'
                    ref={register}
                  />
                </p>

                {errors.password && (
                  <span className='error-message'>{errors.password.message}</span>
                )}
              </div>

              <div>
                <label className='label' htmlFor='confirmPassword'>
                  Confirm Password
                </label>

                <p>
                  <input
                    type='password'
                    name='confirmPassword'
                    className='input'
                    placeholder='*****'
                    ref={register}
                  />
                </p>

                {errors.confirmPassword && (
                  <span className='error-message'>{errors.confirmPassword.message}</span>
                )}
              </div>

              <div>
                <p>
                  <button type='submit'>Sign Up</button>

                  <button type='reset'>Reset</button>
                </p>
              </div>
            </fieldset>

            <div style={{ color: 'red' }}>
              <pre>
                {Object.keys(errors).length > 0 && (
                  <label>Errors: {JSON.stringify(errors, null, 2)}</label>
                )}
              </pre>
            </div>
          </form>
        </div>
      </RegisterStyles>
    </Layout>
  )
}

export default Register
