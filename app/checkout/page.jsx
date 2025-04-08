'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { removeAll } from '@/lib/cart.js';

import HeaderInnerPage from "@/components/headerInnerPage";
import GoBackButton from '@/components/goBackButton.jsx';
import Modal from "@/components/modal";

let sumTotal;
let vat;
let grandTotal;
let totalItems;
export default function Checkout() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [storedProducts, setStoredProducts] = useState([]);

    const loadStoredProducts = () => {
        if (typeof window !== "undefined") {
            const products = JSON.parse(localStorage.getItem('selectedProducts')) || [];
            setStoredProducts(products);


        }
    };
    // Load stored products from localStorage when the component mounts
    useEffect(() => {
        loadStoredProducts();

        // Listen for changes in localStorage (for updates from other components)
        const handleCartUpdate = () => loadStoredProducts();
        // Listen for both "cartUpdated" (custom event) and "storage" (for other tabs)
        window.addEventListener("cartUpdated", handleCartUpdate);
        window.addEventListener("storage", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
            window.removeEventListener("storage", handleCartUpdate);
        };
    }, []);

    function handleCloseModal() {
        setModalIsOpen(false);
    }
    function handleOpenModal() {
        setModalIsOpen(true);
    }

    sumTotal=
        (storedProducts.reduce((total, item) => 
        total + (item.quantity * item.price), 0));
    vat = sumTotal / 100 * 20;
    grandTotal = sumTotal + 50;
    totalItems = (storedProducts.reduce((total, item) => total + (item.quantity), 0));


// Form Validation
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    payment: "emoney",
    cardNumber: "",
    cardPin: "",
});
const [errors, setErrors] = useState({});

const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (!formData.phone.match(/^\+?[0-9 ]+$/)) newErrors.phone = "Invalid phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.zip.match(/^[0-9]{4,10}$/)) newErrors.zip = "Invalid ZIP code";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (formData.payment === "emoney") {
        if (!formData.cardNumber.match(/^[0-9]{8,20}$/)) newErrors.cardNumber = "Invalid card number";
        if (!formData.cardPin.match(/^[0-9]{3,4}$/)) newErrors.cardPin = "Invalid PIN";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        handleOpenModal();
    }
};

  return (
    <>
    <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <button className='close-modal' aria-label="Close cart modal" onClick={handleCloseModal}>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M12.657.843a1.5 1.5 0 010 2.121L9.12 6.5l3.536 3.536a1.5 1.5 0 11-2.121 2.12L7 8.622l-3.536 3.536a1.5 1.5 0 11-2.12-2.121L4.877 6.5 1.343 2.964A1.5 1.5 0 113.464.844L7 4.377 10.536.843a1.5 1.5 0 012.12 0z" fill="black" fillRule="evenodd"/></svg>
        </button>
        <div className="modal-summary-holder rounded-corners">
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle fill="#D87D4A" cx="32" cy="32" r="32"/><path stroke="#FFF" strokeWidth="4" d="m20.754 33.333 6.751 6.751 15.804-15.803"/></g></svg>
            <h2 className="title-3" tabIndex="-1" autoFocus>Thank you<br/>for your order</h2>
            <p>
                You will receive an email confirmation shortly.
            </p>
            {storedProducts.length > 0 ?
            <div className='conformation-summery'>
                <div className='rounded-corners'>
                    <div className='conformation-products'>
                        <Image src={`/assets/cart/image-${storedProducts[0].slug}.jpg`} className="rounded-corners" alt={storedProducts[0].name} width="64" height="64" />
                        <p className="cart-name">{storedProducts[0].name}
                            <br/>
                            <span className="cart-price">
                                $ {storedProducts[0].price}
                            </span>
                        </p>
                        <p className='checkout-quantity'>
                            <span>
                                x{storedProducts[0].quantity}
                            </span>
                        </p>
                        <div className='conformation-items'>
                            {storedProducts.length > 1 ?
                                <p className='text-mini'>
                                    and  {totalItems - 1} other item(s)
                                </p>
                                : null
                            }
                        </div> 
                    </div>
                    <div className="conformation-total">
                        <h3 className='cart-name'>Grand total <br/>
                            <span className='title-6'>$ {grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </h3>
                    </div>
                </div>
            </div>
            : null}
            <Link href="/" className='btn-main' onClick={() => (handleCloseModal(), removeAll())}>Back to home</Link>
        </div>
    </Modal>
    <HeaderInnerPage />
    <main className='checkout'>
        <div className="content-holder">
            <div className="button-holder">
                <GoBackButton />
            </div>
            <form className="checkout-page" noValidate onSubmit={handleSubmit}>
                <div className="form-holder rounded-corners">
                    <h1 className="title-3" tabIndex="-1" autoFocus>Checkout</h1>
                    <fieldset className="fieldset-text">
                        <legend>Billing details</legend>
                        <div className="table-double">
                            <label htmlFor="name">
                                <span>Name</span>
                                <input required type="text" name="name" id="name" 
                                    className={errors.name ? "invalid-input" : ""} value={formData.name} 
                                    onChange={handleChange} />
                                {errors.name && <span aria-live="polite" className="error-text">{errors.name}</span>}
                            </label>
                            <label htmlFor="email">
                                <span>Email</span>
                                <input required type="text" name="email" id="email" className={errors.email ? "invalid-input" : ""} value={formData.email} onChange={handleChange} />
                                {errors.email && <span aria-live="polite" className="error-text">{errors.email}</span>}
                            </label>
                            <label htmlFor='phone'>
                                <span>Phone</span>
                                <input required type="text" name="phone" id="phone" className={errors.phone ? "invalid-input" : ""} value={formData.phone} onChange={handleChange} />
                                {errors.phone && <span aria-live="polite" className="error-text">{errors.phone}</span>}
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="fieldset-text">
                        <legend>Shipping info</legend>
                        <label htmlFor="address">
                            <span>Address</span>
                            <input required type="text" name="address" id="address" className={errors.address ? "invalid-input" : ""} value={formData.address} onChange={handleChange} />
                            {errors.address && <span aria-live="polite" className="error-text">{errors.address}</span>}
                        </label>
                        <div className='table-double'>
                            <label htmlFor='zip'>
                                <span>ZIP Code</span>
                                <input required type="text" name="zip" id='zip' className={errors.zip ? "invalid-input" : ""} value={formData.zip} onChange={handleChange} />
                                {errors.zip && <span aria-live="polite" className="error-text">{errors.zip}</span>}
                            </label>
                            <label htmlFor='city'>
                                <span>City</span>
                                <input required type="text" name="city" id="city" className={errors.city ? "invalid-input" : ""} value={formData.city} onChange={handleChange} />
                                {errors.city && <span aria-live="polite" className="error-text">{errors.city}</span>}
                            </label>
                            <label htmlFor='country'>
                                <span>Country</span>
                                <input required type="text" name="country" id="country" className={errors.country ? "invalid-input" : ""} value={formData.country} onChange={handleChange} />
                                {errors.country && <span aria-live="polite" className="error-text">{errors.country}</span>}
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="fieldset-text">
                        <legend>Payment details</legend>
                            <div className="table-double">
                                <p>Payment Method</p>
                                <div>
                                <label className="radio-label" htmlFor="emoney">
                                    <input type="radio" name="payment" id="emoney" value="emoney" checked={formData.payment === "emoney"} onChange={handleChange} /> 
                                    <span>e-Money</span>
                                </label>
                                <label className="radio-label" htmlFor="cash">
                                    <input type="radio" name="payment" id="cash" value="cash" checked={formData.payment === "cash"} onChange={handleChange} />
                                    <span>Cash on delivery</span>
                                </label>
                            </div>
                        {formData.payment === "emoney" && (
                            <>
                                <label htmlFor='cardNumber'>
                                    <span>e-Money Number</span>
                                    <input type="text" name="cardNumber" id="cardNumber" className={errors.cardNumber ? "invalid-input" : ""} value={formData.cardNumber} onChange={handleChange} />
                                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                                </label>
                                <label htmlFor="cardPin">
                                    <span>e-Money PIN</span>
                                    <input type="text" name="cardPin" id="cardPin" className={errors.cardPin ? "invalid-input" : ""} value={formData.cardPin} onChange={handleChange} />
                                    {errors.cardPin && <span className="error-text">{errors.cardPin}</span>}
                                </label>
                            </>
                        )}
                        </div>
                    </fieldset>
                </div>

                <div className="checkout-summary-holder rounded-corners">        
                    <h2 className="title-6">
                        Summary
                    </h2>                        
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
                                    <p className='checkout-quantity'>
                                        x{item.quantity}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="total">
                            <h3 className="title-6">
                                <span>Total</span>
                                <span>$ {sumTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                            </h3>
                            <h3 className="title-6">
                                <span>Shipping</span>
                                <span>$ 50
                                </span>
                            </h3>
                            <h3 className="title-6">
                                <span>Vat (included)</span>
                                <span>$ {vat.toFixed(2)}
                                </span>
                            </h3>
                            <br />
                            <h3 className="title-6">
                                <span>Grand total</span>
                                <span>$ {grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                            </h3>
                        </div>
                        <button type="submit" className="btn-main">
                            Continue & pay
                        </button>
                        </>
                        
                        : 
                        <p>Your cart is still empty</p>} 
                        

                    </div>

                </div>
            </form>
        </div>
    </main>
    </>
  );
}
