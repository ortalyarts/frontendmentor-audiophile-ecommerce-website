'use client'

import { useState, useEffect } from "react";

import { addProduct } from '@/lib/cart.js';

import Quantity from "./quantity.jsx";

export default function CartItemQuantity({slug, name, price, storedQuantity}){
    const [quantity, setQuantity] = useState(storedQuantity);
    
    useEffect(() => {
        addProduct(slug, quantity, price, name);
    }, [quantity])

    function reduceQuantity (){
        if(quantity <= 1){
            return;
        }
        setQuantity((prevQuantity) => prevQuantity - 1 );
    }
    function increaseQuantity (){
        setQuantity((prevQuantity) => prevQuantity + 1 );
    }

    return(
        <Quantity quantity={quantity} reduceQuantity={reduceQuantity} increaseQuantity={increaseQuantity} />
    )
}