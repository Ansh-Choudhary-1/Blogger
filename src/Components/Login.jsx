import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../Store/authSlice'
import {Button, Input, Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error,setError] = useState("");

    const login = async (data) =>{ //async h kyuki data layega work krega isiliye
        console.log(data);
        
        setError("");
        try {
            const session = await authService.logIn(data);
            
            if(session){
                const userData = await authService.getCurrentUser()
                
                if(userData){
                    dispatch(authLogin(userData));
                    navigate("/"); // Link mei enclosed krna pdta h and click krna pdta h lekin navigate mei hm programatically usse khi bhi bhej skte h
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>                    
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        <p className="text-red-600 mt-8 text-center">{error}</p>
        <form onSubmit={handleSubmit(login)}className='mt-8'>{// handle submit ek last baar check krta h ki register koi error toh nhi de rha fir login funciton run krdega
        // Most importantly tere sare input ka data jo bhi form mei h voh register register krta h or handlesubmit tere function mei daaldeta h as an input
        }
            <div className='space-y-5'>
                <Input
                label = "Email : "
                placeholder="Enter your email"
                type = "email"
                {...register("email",{ // register data ko register krta h or validity check krta h data ki jaise yha dekhega ki email diya h ya nhi or fir ek pattern check h
                    required: true, // yha se agge ka optional h knowledge ke liye
                    validate:{
                        matchPattern: (value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value)|| "Email address must be valid address"
                    }
                })}
                />
                <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true
                })}
                />
                <Button type='submit' className='w-full'>Sign In </Button>
            </div>
            </form> 
        </div>
    </div>
  )
}

export default Login;

// Production grade takeaways from here
// 1. Agr Ek form h toh ek input ka bnalio component usko baar baar use krlio or props dedio usmei type, classname label vagera ke
// 2. mnnkre toh submit button bhi bna skta h aise
// 3. register ko use kr kr ek form ke andr ke input ka sara data register krlio or kch check bhi kr skta h like required feilds
//    or fir handleregister usko data ko as an input bhejega specified function mei 
// 4. yaad gr jo tune ek store bnaya h redux ka toh apne database se fetch kr kr user info usko store krlio redux mei getUser se
//    data ajaiga or fir usse auth.user.data mei daaldio mtlb jo bhi naam ho yeh naam refrence ke liye h
// 5. register("Idhr name jaiga jismei input stored hoga", {
//                      required:true
//                      idhr jata h validation check of input
//    })
