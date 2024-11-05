import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase'; 

const categories = [
    { name: 'Electronics', image: '../assets/image.jpg' },
    { name: 'Fashion', image: '../assets/image.jpg' },
    { name: 'Home & Garden', image: '../assets/image.jpg' },
    { name: 'Sports', image: '../assets/image.jpg' },
];

const slideshowImages = [
    'https://example.com/image1.jpg', // Ensure these are valid URLs
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
];

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slideshowImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(firestore, 'products');
                const snapshot = await getDocs(productsCollection);
                const fetchedProducts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const landingPageStyle = {
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    const contentStyle = {
        backgroundImage: `url(${slideshowImages[currentSlide]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        position: 'relative',
    };

    const textOverlayStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        textAlign: 'center',
    };

    const navbarStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'black',
        zIndex: 10,
    };

    const searchStyle = {
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
    };

    const categoryCardStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        margin: '20px 0',
        width: '100%',
    };

    const cardStyle = (image) => ({
        backgroundImage: `url(${image})`, // Set the background image from the product
        backgroundSize: 'cover',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        textAlign: 'center',
        width: '200px', // Adjusted width for the card
        height: '250px', // Set a fixed height for the card
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        color: 'black', // Set text color to black
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // To space out content in the card
    });

    return (
        <div style={landingPageStyle}>
            <div style={navbarStyle}>
                <div className="logo">CodeTribe</div>
                <div>
                    <a href="/cart" style={{ color: 'Black' }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Cart
                    </a>
                </div>
            </div>

            <div style={searchStyle}>
                <input
                    type="text"
                    placeholder="Search for products..."
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        marginRight: '10px',
                        width: '300px',
                    }}
                />
                <button style={{
                    padding: '10px 15px',
                    borderRadius: '5px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div style={contentStyle}>
                <div style={textOverlayStyle}>
                    <h1 className="my-5">Welcome to CodeTribe Marketplace</h1>
                    <p>Your one-stop shop for amazing products!</p>
                    <a href="/products" className="btn btn-primary">Shop Now</a>
                </div>
            </div>

            <h2 style={{ color: 'black', marginTop: '30px' }}>Shop by Category</h2> {/* Changed to black */}
            <div style={categoryCardStyle}>
                {categories.map((category) => (
                    <div key={category.name} style={cardStyle(category.image)}>
                        <h3>{category.name}</h3>
                        <a href={`/categories/${category.name}`} className="btn btn-secondary">Explore</a>
                    </div>
                ))}
            </div>

            <h2 style={{ color: 'black', marginTop: '30px' }}>Featured Products</h2> {/* Changed to black */}
            <div style={categoryCardStyle}>
                {products.map((product) => (
                    <div key={product.id} style={cardStyle(product.image || '/path/to/default/image.jpg')}>
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                        <a href={`/products/${product.id}`} className="btn btn-secondary">View Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
