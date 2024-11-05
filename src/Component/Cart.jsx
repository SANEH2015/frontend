import React from 'react';

const Cart = ({ cartItems, onRemove }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item._id}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <button onClick={() => onRemove(item._id)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total: ${totalPrice}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
