'use client'

import { useState, useEffect } from "react";
import LogoAndNav from "./logoAndNav";
import CartModal from "./cartModal.jsx";

import Modal from "@/components/modal";

export default function LogoNavCart (){
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
        loadStoredProducts(); // Ensure latest data before opening modal
        setModalIsOpen(true);
    }

    return(
    <>
        <Modal open={modalIsOpen} onClose={handleCloseModal}>
            <button className='close-modal' aria-label="Close cart modal" onClick={handleCloseModal}>
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M12.657.843a1.5 1.5 0 010 2.121L9.12 6.5l3.536 3.536a1.5 1.5 0 11-2.121 2.12L7 8.622l-3.536 3.536a1.5 1.5 0 11-2.12-2.121L4.877 6.5 1.343 2.964A1.5 1.5 0 113.464.844L7 4.377 10.536.843a1.5 1.5 0 012.12 0z" fill="black" fillRule="evenodd"/></svg>
            </button>
            <CartModal storedProducts={storedProducts} handleCloseModal={handleCloseModal}/>
        </Modal>
        
        <div className="logo-nav-cart">
            <LogoAndNav />
            <button onClick={handleOpenModal} type="button" aria-label="view cart" className="icon-cart">
                <span>
                    <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fillRule="nonzero"/></svg>
                </span>
                <span>
                    {storedProducts.length > 0 ?
                    storedProducts.reduce((total, item) => total + item.quantity, 0)
                    : null}
                </span>
            </button>
        </div>
    </>
    )
}