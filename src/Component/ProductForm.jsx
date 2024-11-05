// src/components/ProductForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { firestore, storage } from '../firebase'; // Adjust the import path based on your project structure
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary storage functions
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions

const ProductForm = ({ product, onSuccess }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            if (product) {
                // Update existing product
                const productRef = doc(firestore, 'products', product.id);
                await updateDoc(productRef, {
                    name,
                    price: parseFloat(price),
                    description,
                    image: imageUrl || product.image, // Keep old image if no new image is uploaded
                });
            } else {
                // Add new product
                await addDoc(collection(firestore, 'products'), {
                    name,
                    price: parseFloat(price),
                    description,
                    image: imageUrl,
                });
            }

            onSuccess(); // Call the success callback to refresh the product list or redirect
        } catch (error) {
            setError('Error adding product: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
