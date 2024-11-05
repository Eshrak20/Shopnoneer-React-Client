import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert

const Otp = () => {
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here you would typically verify the OTP
        console.log("Verifying OTP:", otp);
        
        // Simulate OTP verification (Replace this with your actual OTP verification logic)
        try {
            // Assuming OTP verification is successful
            Swal.fire({
                title: 'Success!',
                text: 'OTP verified successfully!',
                icon: 'success',
                confirmButtonText: 'Okay',
            }).then(() => {
                // Redirect to password reset page or login page after alert is dismissed
                window.location.href = '/resetPass'; // Change to your intended redirect
            });
        } catch (error) {
            // Handle any errors if verification fails
            Swal.fire({
                title: 'Error!',
                text: 'OTP verification failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-teal-600">
                    Verify Your OTP
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">Didn't receive the OTP?</p>
                    <a href="/resetPass" className="text-teal-500 hover:underline">
                        Resend OTP
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Otp;
