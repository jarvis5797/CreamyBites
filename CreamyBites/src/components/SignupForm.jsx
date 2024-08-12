import { useState } from "react";
import { toast } from "react-toastify";
import EmailVerificationModal from "./EmailVerificationModal";
import { generateOtp, signUp } from "../services/user-service";


const SignupForm = ({closeSignUp}) =>{

    const [user , setUser] = useState({
        userName:'',
        email:'',
        password:'',
        sector:'',
        flatName:'',
        phoneNumber:0
    })

    const[isVerified , setIsVerified] = useState(false);

    const handleVerification=()=>{
        setIsVerified(true);
    }

    const[confirmPassword , setConfirmPassword] = useState('')

    const[isVerifiedClicked , setIsVerifiedClicked] = useState(false);

    const handleChange =(event , propertry)=>{
        if(event.target.id==='confirmPassword'){
            setConfirmPassword(event.target.value);
        }else{
            setUser({...user,[propertry]:event.target.value})
        }
    }

    const sendOtp=()=>{
        generateOtp(user.email).then((hash)=>{
            if(localStorage.getItem("hash")!=null){
                localStorage.removeItem("hash")
            }
            localStorage.setItem("hash" , hash);
        })
    }

    const handleOpenIsVerifiedClicked = ()=>{
        sendOtp();
        setIsVerifiedClicked(true);
    }

    const handleCloseIsVerifiedClicked=()=>{
        setIsVerifiedClicked(false);
    }

    const validateFields = () => {
        let isValid = true;

        for (const key in user) {
            if (user[key].trim() === '') {
                toast.error(`Please fill the ${key}`);
                isValid = false;
            }
        }

        if (confirmPassword.trim() === '') {
            toast.error('Please fill the Confirm Password');
            isValid = false;
        }

        if (user.phoneNumber.trim() === '') {
            toast.error('Please fill the Phone Number');
            isValid = false;
        } else if (!/^\d+$/.test(user.phoneNumber)) {
            toast.error('Phone Number must contain only numbers');
            isValid = false;
        } else if (user.phoneNumber.length !== 10) {
            toast.error('Phone Number must be exactly 10 digits');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (event)=>{

        event.preventDefault(); 
        if (!validateFields()) return;
        if (user.password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if(!isVerified){
            toast.error('please verify your email!');
            return;
        }
        signUp(user).then((data)=>{
            if(data==="user created!!"){
                toast.success("User Added!");
                closeSignUp();
            }
        }).catch((error)=>{
            toast.error("Something went wrong!!");
        })
    }


    return(
        <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Sign Up</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                User name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={user.userName}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'userName')}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'email')}
                />
                 <button type='button' className="text-blue-600 hover:text-blue-800" onClick={handleOpenIsVerifiedClicked}>Verify Email!!</button>
              </div>
            </div>

            <div className="sm:col-span-3">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="password"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'password')}
                  value={user.password}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="city"
                  type="password"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'confirmPassword')}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Sector
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'sector')}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                Flat
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'flatName')}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Phone no.
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="phone"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>handleChange(e,'phoneNumber')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
      {
        isVerifiedClicked && (
            <EmailVerificationModal onClose={handleCloseIsVerifiedClicked} email={user.email} handleVerification={handleVerification} resendOtp={sendOtp} />
        )
      }
    </form>
    );
}

export default SignupForm;