import Image from "next/image";
import Link from "next/link";

// import logo from '../assets/shared/desktop/logo.svg';

export default function LogoAndNav (){

    return (
    <div className="nav-and-logo">
        <Link href="/"><Image src='/assets/shared/desktop/logo.svg' alt="Audiophile logo" width="143" height="25"/></Link>
        <nav className="footer-nav">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/headphones">Headphones</Link></li>
            <li><Link href="/speakers">Speakers</Link></li>
            <li><Link href="/earphones">Earphones</Link></li>
          </ul>
        </nav>
      </div>
    )
}