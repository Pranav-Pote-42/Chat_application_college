import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormaData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
  const {signUp,isSigningUp} = useAuthStore();

  const validateForm = ()=>{}
  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage