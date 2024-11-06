import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';  // Import the Firestore instance correctly (as `db`)
import { collection, getDocs } from 'firebase/firestore';  // Import Firestore methods

const categories = [
    { 
        name: 'Laptops', 
        image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDJ8fGxhcHRvcHN8ZW58MHx8fHwxNjY1MjU2NzU2&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Laptop Bags', 
        image: 'https://images.unsplash.com/photo-1618755935639-267a06329a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDF8fGxhcHRvcCUyMGJhZ3xlbnwwfHx8fDE2NjUyNTY3NTY&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Router', 
        image: 'https://images.unsplash.com/photo-1605902711622-cfb43c44339d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDJ8fHJvdXRlcnxlbnwwfHx8fDE2NjUyNTY3NTY&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Desktops', 
        image: 'https://images.unsplash.com/photo-1532287387152-4f54c2d88c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDd8fGRlc2t0b3B8ZW58MHx8fHwxNjY1MjU2NzU2&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Accessories', 
        image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDV8fGNvbXB1dGVyJTIwYWNjZXNzb3JpZXN8ZW58MHx8fHwxNjY1MjU2NzU2&ixlib=rb-4.0.3&q=80&w=1080' 
    },
];

const slideshowImages = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDF8fGNvZGUlMjBjb21wdXRlcnxlbnwwfHx8fDE2MzE4MjMwMzI&ixlib=rb-4.0.3&q=80&w=1080', // Coding on laptop
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDF8fGRldmVsb3BlcnxlbnwwfHx8fDE2MzE4MjMwMzI&ixlib=rb-4.0.3&q=80&w=1080', // Coding setup with dual monitors
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDF8fGVsZWN0cm9uaWNzfGVufDB8fHx8MTYyNjEwNzg4OA&ixlib=rb-4.0.3&q=80&w=1080', // Electronics and coding
    'https://images.unsplash.com/photo-1580894908361-7a439217b2d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDZ8fGVsZWN0cm9uaWNzJTIwbGFwdG9wfGVufDB8fHx8MTY2MTU1OTgyNA&ixlib=rb-4.0.3&q=80&w=1080', // Laptop setup with coding environment
    'https://images.unsplash.com/photo-1587614295999-6d8e1e07f42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDg2NHwwfDF8c2VhcmNofDh8fGxhcmdlJTIwY29tcHV0ZXIlMjBtb25pdG9yfGVufDB8fHx8MTY2NTI1Njc1Ng&ixlib=rb-4.0.3&q=80&w=1080', // Laptop on desk with accessories
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
                const productsCollection = collection(db, 'products');  // Use `db` to access Firestore collection
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
    }, [])

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
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        textAlign: 'center',
        width: '200px',
        height: '250px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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

            <h2 style={{ color: 'black', marginTop: '30px' }}>Shop by Category</h2>
            <div style={categoryCardStyle}>
                {categories.map((category) => (
                    <div key={category.name} style={cardStyle(category.image)}>
                        <h3>{category.name}</h3>
                        <a href={`/categories/${category.name}`} className="btn btn-secondary">Explore</a>
                    </div>
                ))}
            </div>

            <h2 style={{ color: 'black', marginTop: '30px' }}>Featured Products</h2>
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
