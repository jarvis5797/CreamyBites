import { useState } from "react";
import { getVerified } from "../services/user-service";

const EmailVerificationModal=({onClose , email ,handleVerification , resendOtp})=>{

    const [otp, setOtp] = useState('');

    const handleVerify = () => {
      getVerified(otp,localStorage.getItem("hash")).then((data)=>{
        if(data===true){
          onClose();
          handleVerification();
          localStorage.removeItem("hash");
        }
      })
    };

    const handleResendOtp = () => {
        resendOtp();
    };

    return(
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Verify Email!</h2>
          <p className="mt-2 text-sm text-gray-600">
            The OTP has been sent to your email : {email}
          </p>
          <div className="mt-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-900">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handleVerify}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Resend OTP
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
}

export default EmailVerificationModal;