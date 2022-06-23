import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userStore } from '../stores'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button } from '@windmill/react-ui'

import { registerUser } from '../api/endpoints'

function Login() {
  
  const storeUser = userStore(state=> state.storeUser)
  const user = userStore(state=> state.user)

  const initialDetails = {
    email: '',
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
    role: "brand",
    names: "",
    location: "",
  }
  const history = useHistory();
  const [formDetails, setFormDetails] = useState(initialDetails)
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(user){
      history.push('/app/dashboard')
    }
  }, [])

  useEffect(() => {
    checkFieldsFilled()
  }, [formDetails])

  const handleChange = (e) => {
    e.persist();
    setFormDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const checkFieldsFilled = () => {
    if (formDetails.email !== "" && formDetails.phone !== "" && formDetails.password !== "" && formDetails.confirmPassword !== "" && formDetails.terms !== "" && formDetails.password === formDetails.confirmPassword) {
      setFieldsFilled(true)
      return true
    } else {
      if (fieldsFilled) {
        setFieldsFilled(false)
      }
      return false
    }
  }

  const handleSubmit = () => {
    if (checkFieldsFilled()) {
      setLoading(true)
      registerUser(formDetails).then((response) =>{
        console.log(response)
        setLoading(false)
        if(response?.status === 200){
          setTimeout(()=>{
            storeUser(response.data.user)
            history.push("/onboarding/step-1")
          }, 500)
        }
      })
    }
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Email</span>
                <Input name="email" className="mt-1" type="email" placeholder="john@doe.com" onChange={handleChange} />
              </Label>
              <Label className="mt-4">
                <span>Phone Number</span>
                <Input name="phone" className="mt-1" type="text" placeholder="+254729400426" onChange={handleChange} />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input name="password" className="mt-1" placeholder="***************" type="password" onChange={handleChange} />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input name="confirmPassword" className="mt-1" placeholder="***************" type="password" onChange={handleChange} />
              </Label>

              <Label className="mt-6" check>
                <Input name="terms" type="checkbox" onChange={handleChange} />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              {
                fieldsFilled && !loading &&
                <Button block className="mt-4" onClick={handleSubmit}>
                  Create account
                </Button>
              }
              {
                (!fieldsFilled || loading) &&
                <Button to="/login" block className="mt-4" disabled>
                  Create account
                </Button>
              }
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-yellow3400 dark:text-yellow-300 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
