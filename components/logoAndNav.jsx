'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

// import logo from '../assets/shared/desktop/logo.svg';
// import openMenu from '../assets/shared/tablet/icon-hamburger.svg';
// import closeMenu from '../assets/shared/mobile/icon-close.svg';

export default function LogoAndNav (){
  console.log('v 1')
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu () {
      setIsOpen((isOpen) => !isOpen);
  }
  useEffect(() => {
      window.addEventListener("resize", handleCloseNav);
      return () => {
          window.removeEventListener("resize", handleCloseNav)
      }
      
  }, [isOpen])

  function handleCloseNav(){
      setIsOpen(false)
  }

    return (
    <div className="nav-and-logo">
        <Link className="logo" onClick={toggleMenu} href="/"><Image src='/assets/shared/desktop/logo.svg' priority alt="Audiophile logo" width="143" height="25"/></Link>
        <button className='nav-icon' onClick={toggleMenu} aria-label="toggle navigation" aria-haspopup="true" aria-expanded={isOpen}>
            {isOpen ? 
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M12.657.843a1.5 1.5 0 010 2.121L9.12 6.5l3.536 3.536a1.5 1.5 0 11-2.121 2.12L7 8.622l-3.536 3.536a1.5 1.5 0 11-2.12-2.121L4.877 6.5 1.343 2.964A1.5 1.5 0 113.464.844L7 4.377 10.536.843a1.5 1.5 0 012.12 0z" fill="black" fillRule="evenodd"/></svg>
                :
                <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fillRule="evenodd"><path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"/></g></svg>
            }
            
        </button>
        <nav className={`main-navigation ${isOpen ? 'is-open' : ''}`}>
          <ul className="nav">
            <li><Link onClick={toggleMenu} href="/">Home</Link></li>
            <li><Link onClick={toggleMenu} href="/headphones">Headphones</Link></li>
            <li><Link onClick={toggleMenu} href="/speakers">Speakers</Link></li>
            <li><Link onClick={toggleMenu} href="/earphones">Earphones</Link></li>
          </ul>
        </nav>
      </div>
    )
}