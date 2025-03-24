import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {login} from '../Store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'

function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error,setError] =useState("")
    const {register, handleSubmit} = useForm()

    const create = async(data)=>{
      setError("")
      try {
        const userData =  await authService.createAccount(data);
        if(userData){
          const userData = await authService.getCurrentUser();
          if(userData) dispatch(login(userData));
          navigate('/');
        }
      } catch (error) {
        setError(error.message)
        alert(error.message)
      }
    }
  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                <p className="text-red-600 mt-8 text-center">{error}</p>
                <form onSubmit={handleSubmit(create)}>
                  <div className='space-y-5'>
                    <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register("name",{
                      required:true,
                      validate: {
                        matchPattern: (value) =>{
                          /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address"
                        }
                      }
                    })}
                    />
                    <Input
                    label = "Email : "
                    placeholder="Enter your email"
                    type = "email"
                    {...register("email",{
                        required: true, // yha se agge ka optional h knowledge ke liye
                        validate:{
                            matchPattern: (value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value)|| "Email address must be valid address"
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{
                      required:true,
                    })}
                    />
                    <Button type="submit" className="w-full">Create Account</Button>
                  </div>
                </form>
      </div>
    </div>
  )
}

export default SignIn


//Production grade takeaways from here
// 1. Ek smart way mei error handling ho rhi h error ko useState mei daaldiya or agr error ho rha h toh setError kr kr ek para print kraya h
