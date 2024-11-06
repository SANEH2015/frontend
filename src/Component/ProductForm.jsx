import React, { useState } from 'react';
import { storage } from '../firebase'; // Make sure Firebase is initialized correctly

const categories = [
    'Laptops',
    'Laptop Bags',
    'Router',
    'Desktops',
    'Accessories',
];

const ProductForm = ({ onSubmit }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        imageFile: null,
        imageUrl: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image file upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prev) => ({
                ...prev,
                imageFile: file,
            }));
        }
    };

    // Upload the image to Firebase Storage and get the URL
    const uploadImage = async (file) => {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`products/${file.name}`);
        const uploadTask = imageRef.put(file);
        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                () => {},
                (err) => reject(err),
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(resolve).catch(reject);
                }
            );
        });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // If there's an image, upload it
            let imageUrl = product.imageUrl;
            if (product.imageFile) {
                imageUrl = await uploadImage(product.imageFile);
            }

            // Submit the product data
            const productData = { ...product, imageUrl };
            onSubmit(productData);

            setProduct({
                name: '',
                price: '',
                category: '',
                imageFile: null,
                imageUrl: '',
            }); // Reset form

        } catch (err) {
            setError('Error submitting product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add New Product</h3>
            {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '20px' }}>{error}</p>}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        required
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="price" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Product Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        placeholder="Product Price"
                        required
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="category" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Product Category</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%'
                        }}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="imageFile" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Product Image</label>
                    <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%'
                        }}
                    />
                    {product.imageFile && (
                        <p style={{ fontSize: '14px', color: '#555' }}>Image selected: {product.imageFile.name}</p>
                    )}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <button type="submit" disabled={loading} style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        width: '100%'
                    }}>
                        {loading ? 'Submitting...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
