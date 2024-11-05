import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Adjust the import path based on your project structure
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProducts = async () => {
        try {
            const snapshot = await firestore.collection('products').get(); // Fetch products from Firestore
            const fetchedProducts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await firestore.collection('products').doc(id).delete(); // Delete product from Firestore
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on component mount
    }, []);

    return (
        <div style={styles.container}>
            <button
                onClick={() => { setEditingProduct(null); setShowForm(true); }}
                style={styles.addButton}
            >
                Add Product
            </button>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSuccess={() => {
                        fetchProducts(); // Refresh the product list after adding/updating
                        setShowForm(false); // Hide the form
                    }}
                />
            )}

            <div style={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <img src={product.image} alt={product.name} style={styles.image} />
                        <h2 style={styles.title}>{product.name}</h2>
                        <p style={styles.price}>${product.price.toFixed(2)}</p>
                        <p style={styles.description}>{product.description}</p>
                        <button onClick={() => { setEditingProduct(product); setShowForm(true); }} style={styles.button}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)} style={styles.button}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f8f0f8',
    },
    addButton: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#ff69b4',
        color: 'white',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
    },
    card: {
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    title: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '5px',
    },
    price: {
        color: '#ff69b4',
        fontWeight: 'bold',
    },
    description: {
        fontSize: '14px',
        color: '#777',
        marginBottom: '10px',
    },
    button: {
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#ff69b4',
        color: 'white',
        cursor: 'pointer',
        margin: '5px',
    },
};

export default ProductList;
