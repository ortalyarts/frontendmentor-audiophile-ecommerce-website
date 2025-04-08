'use client'

import { useState } from "react";

import { addProduct } from '@/lib/cart.js';
import Quantity from "./quantity";

export default function QuantityAddToCart({slug, price, name}){
    const [quantity, setQuantity] = useState(1);

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
        <>
        <div className='quantity-and-button'>
            <Quantity quantity={quantity} reduceQuantity={reduceQuantity} increaseQuantity={increaseQuantity}/>
            <button type="button" className='btn-main' onClick={()=> addProduct(slug,quantity, price, name)}>Add to cart</button>
        </div>
        </>
    )
}