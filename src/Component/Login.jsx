import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            dispatch(login(response.data.token));
            setSuccess('Login successful!');
            setTimeout(() => {
                navigate('/products');
            }, 1000); // Redirect after 1 second
        } catch (error) {
            setLoginError('Login failed. Check your credentials.');
        }
    };

    return (
        <div>
            {/* Login form */}
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="card shadow-lg" style={{ width: '25rem' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Login</h5>
                        <form onSubmit={handleSubmit}>
                            {/* Username input */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    id="username"
                                    required
                                />
                            </div>

                            {/* Password input */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    id="password"
                                    required
                                />
                                <div className="form-text">
                                    <a href="#" onClick={() => {/* handle password reset */}} className="link-primary">Forgot password?</a>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>

                        {/* Display login error and success messages */}
                        {loginError && <p className="text-danger mt-2">{loginError}</p>}
                        {success && <p className="text-success mt-2">{success}</p>}

                        {/* Link to Sign-Up */}
                        <p className="mt-3 text-center">
                            New to this website? Please <Link to="/sign-up" className="link-primary">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
