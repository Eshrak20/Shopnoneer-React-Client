import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert

const ResetPass = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Here you would typically send the OTP to the provided email
        console.log("Sending OTP to:", email);
        
        // Simulate OTP sending (Replace this with your actual OTP sending logic)
        try {
            // Assuming OTP sending logic is successful
            Swal.fire({
                title: 'OTP Sent!',
                text: 'An OTP has been sent to your email address. Please check your inbox.',
                icon: 'success',
                confirmButtonText: 'Okay',
            }).then(() => {
                // Redirect to the OTP page after alert is dismissed
                window.location.href = '/otp'; // Redirect to OTP page
            });
        } catch (error) {
            // Handle any errors if sending fails
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue sending the OTP. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-teal-600">
                    Reset Your Password
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="block text-gray-700 font-semibold mb-2">
                            ইমেইল Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            Send OTP
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">Remember your password?</p>
                    <a href="/login" className="text-teal-500 hover:underline">
                        Go back to login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPass;
