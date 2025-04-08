
import Link from "next/link";
import Image from "next/image";


import { removeAll } from '@/lib/cart.js';
import CartItemQuantity from "./cartItemQuantity";

export default function CartModal({storedProducts, handleCloseModal}){



    return(
        <div className="modal-summary-holder rounded-corners">
            <div className="cart-header-holder">            
                <h2 className="title-6" tabIndex="-1" autoFocus>
                    Cart ({storedProducts.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                {storedProducts.length > 0 && 
                <button onClick={removeAll} type="button" className="btn-text">Remove all</button>
                }
                
            </div>
            <div className="cart-summery-holder">
                {storedProducts.length > 0 ?
                <>
                <ul>
                    {storedProducts.map((item) => (
                        <li key={item.slug}>
                            <Image src={`/assets/cart/image-${item.slug}.jpg`} className="rounded-corners" alt={item.name} width="64" height="64" />
                            <p className="cart-name">{item.name}
                                <span className="cart-price">
                                    $ {item.price}
                                </span>
                            </p>
                            <CartItemQuantity slug={item.slug} name={item.name} price={item.price} storedQuantity={item.quantity}/>
                        </li>
                    ))}
                </ul>
                <div className="total">
                    <h2 className="title-6">
                        <span>Total</span>
                        <span>$ {(storedProducts.reduce((total, item) => 
                            total + (item.quantity * item.price), 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                    </h2>
                </div>
                <Link href="/checkout" className="btn-main" onClick={handleCloseModal}><span>Checkout</span></Link>
                </>
                   
                : 
                <p>Your cart is still empty</p>} 
                

            </div>
        </div>
    )
}