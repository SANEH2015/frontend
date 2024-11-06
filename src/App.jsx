import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Nav';
import Footer from './Component/Footer';
import Register from './Component/Register';
import Login from './Component/Login';
import ProductForm from './Component/ProductForm';
import Cart from './Component/Cart';
import LandingPage from './Component/LandingPage';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/productform" element={<ProductForm />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </Provider>
    );
}

export default App;
