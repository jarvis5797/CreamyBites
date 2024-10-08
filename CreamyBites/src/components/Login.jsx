import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../utils/authenticationHelper";
import SignupForm from "./SignupForm";

const Login = () =>{

    const [loginDetails , setLoginDetails]=useState({
        email:'',
        password:''
    })

    const [signup , setSignup] = useState(false);

    const navigate = useNavigate();

    const handleChange=(event,propertry)=>{
        setLoginDetails({...loginDetails,[propertry]:event.target.value})
    }

    const handleOpenSignUp = ()=>{
      setSignup(true);
    }

    const hadnleCloseSignUp = () =>{
      setSignup(false);
    }

    const submitForm=(event)=>{
        event.preventDefault()
        signIn(loginDetails).then((resp)=>{
            doLogin(resp,()=>{
                if(resp.user.role=='Admin'){
                    navigate("/admin")
                }else{
                    navigate("/user")
                }
            })
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid email or password");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        });

    }

    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="/creamyBites-logo.jpg"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-black-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>handleChange(e,'email')}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>handleChange(e,'password')}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submitForm}
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleOpenSignUp}>
                Sign up
              </a>
            </p>
          </div>
          {
            signup &&(
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-full max-w-5xl p-8 rounded-lg relative overflow-auto max-h-[90vh]">
            <button onClick={hadnleCloseSignUp} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
                        <SignupForm closeSignUp={hadnleCloseSignUp}/>
                    </div>
                </div>
    )
          }
        </div>
      </>
    );
}

export default Login;