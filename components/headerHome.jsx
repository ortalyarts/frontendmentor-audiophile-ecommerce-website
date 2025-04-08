import Link from "next/link";

import LogoNavCart from "./logoNavCart";

export default function HeaderHome(){
    return(
   <header className="rounded-corners-bottom">
    <div className="content-holder">
      <LogoNavCart />
      <section className="new-product">
        <div className="new-product-content  animmate-slide-right-fade-in">
          <h1 className="title-overline">New product</h1>
          <h2 className="title-1">XX99 Mark II
            Headphones</h2>
          <p className="new-product-text">
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>
          <Link href="/products/xx99-mark-two-headphones" className="btn-main">See product</Link>
        </div>
      </section>
    </div>
  </header>
    )
}