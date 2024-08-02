import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping ,onSetRemovedToCart}) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // set added product to cart
    // const handleSetRemovedTocart = (item) =>{
    //     console.log('handleSetRemovedTocart', item)
    //     onSetRemovedToCart(item);
    // }

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.cost.split('$')[1] * item.quantity, 0);
    };

    // Continue to shop
    const handleContinueShopping = (e) => {
        // e.preventDefault(); preventDefault
        onContinueShopping();
    };
    // Checkout
    const handleCheckoutShopping = (e) => {
        alert('Coming soon');
    };
    // Increment product quantity
    const handleIncrement = (item) => {
        const{name,quantity} = item;
        const pdt = {name,quantity:quantity + 1} 
        dispatch(updateQuantity(pdt));
    };
    //Decrement product quantity
    const handleDecrement = (item) => {
        const{name,quantity} = item;
        const pdt = {name,quantity:quantity - 1} 
        if(quantity > 0){     
            dispatch(updateQuantity(pdt)); 
        }
        else{
            dispatch(removeItem(pdt.name));
        }

    };

    //Remove product to the  cart
    const handleRemove = (item) => {
        onSetRemovedToCart(item);
        dispatch(removeItem(item.name));
        
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        return item.quantity * item.cost.split('$')[1];
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


