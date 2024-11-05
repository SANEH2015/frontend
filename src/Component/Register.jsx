import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'companyName':
                setCompanyName(value);
                break;
            case 'companyAddress':
                setCompanyAddress(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'adminEmail':
                setAdminEmail(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        
        // Basic validation
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password, role, companyName, companyAddress, phoneNumber, adminEmail });
            setMessage('Registration successful! Please log in.');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setCompanyName('');
            setCompanyAddress('');
            setPhoneNumber('');
            setAdminEmail('');
            setErrors({});
        } catch (error) {
            setMessage('Registration failed. Try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container max-w-sm mx-auto p-4 border rounded-lg shadow-md flex-grow">
                <h2 className="text-2xl font-bold mb-4">Register</h2>

                {/* Role selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={role === 'user'}
                            onChange={handleInputChange}
                            className="form-check-input"
                        />
                        <label className="form-check-label">User</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={handleInputChange}
                            className="form-check-input"
                        />
                        <label className="form-check-label">Admin</label>
                    </div>
                </div>

                {/* Common fields for both Admin and User */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                        {errors.username && <p className="text-danger">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                    </div>

                    {/* Fields for Admin only */}
                    {role === 'admin' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="companyName" className="form-label">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={companyName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                {errors.companyName && <p className="text-danger">{errors.companyName}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="companyAddress" className="form-label">Company Address</label>
                                <input
                                    type="text"
                                    id="companyAddress"
                                    name="companyAddress"
                                    value={companyAddress}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                {errors.companyAddress && <p className="text-danger">{errors.companyAddress}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="adminEmail" className="form-label">Admin Email</label>
                                <input
                                    type="email"
                                    id="adminEmail"
                                    name="adminEmail"
                                    value={adminEmail}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                {errors.adminEmail && <p className="text-danger">{errors.adminEmail}</p>}
                            </div>
                        </>
                    )}

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary w-100">Register</button>

                    {/* Message display */}
                    {message && <p className="mt-3 text-success">{message}</p>}
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Register;
