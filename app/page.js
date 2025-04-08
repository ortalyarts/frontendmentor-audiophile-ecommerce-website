import Link from "next/link";

import HeaderHome from "@/components/headerHome";
import ThumbProductCategories from "@/components/thumbProductCategories";
import Article from "@/components/article";
import AnimatedDivExpandInView from "@/components/animatedDivExpandInView.jsx";

// import imgEarphonesDesktop from '/assets/home/desktop/image-earphones-yx1.jpg';
// import imgEarphonesTablet from '/assets/home/tablet/image-earphones-yx1.jpg';
// import imgEarphonesMobile from '/assets/home/mobile/image-earphones-yx1.jpg';


export default function Home() {
  return (
    <>
    <HeaderHome />

    <main>
      <div className="content-holder">

      <ThumbProductCategories />

      <section aria-label="Featured products">
        <AnimatedDivExpandInView className="featured-orange rounded-corners"
          >
          <div className="featured-text">
            <h2 className="title-1">ZX9 SPEAKER</h2>
            <p>
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <Link href="/products/zx9-speaker" className="btn-main btn-black">See product</Link>
          </div>
        </AnimatedDivExpandInView>
        <AnimatedDivExpandInView className="featured-grey-img rounded-corners">
          <div className="featured-text">
            <h2 className="title-4">ZX7 SPEAKER</h2>
            <Link href="/products/zx7-speaker" className="btn-main btn-outline">See product</Link>
          </div>
        </AnimatedDivExpandInView>

        <AnimatedDivExpandInView className="featured-double">
          <picture className="rounded-corners">
              <source srcSet='/assets/home/desktop/image-earphones-yx1.jpg' media="(min-width: 768px)"idth="540" height="320" />
              <source srcSet='/assets/home/tablet/image-earphones-yx1.jpg' media="(min-width: 560px)" width="339" height="320" />
              <img className="rounded-corners" src='/assets/home/mobile/image-earphones-yx1.jpg' alt="black earphones" width="327" height="200" />
          </picture>


          <div className="grey-holder rounded-corners">
            <div className="featured-text">
            <h2 className="title-4">YX1 EARPHONES</h2>
            <Link href="/products/yx1-earphones" className="btn-main btn-outline">See product</Link>
            </div>
          </div>          
        </AnimatedDivExpandInView>
      </section>
      <Article />
    </div>
  </main>
  </>
  );
}
