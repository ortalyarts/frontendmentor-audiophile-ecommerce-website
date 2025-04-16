import Link from "next/link";

import HeaderHome from "@/components/headerHome";
import ThumbProductCategories from "@/components/thumbProductCategories";
import Article from "@/components/article";
import AnimatedDivExpandInView from "@/components/animatedDivExpandInView.jsx";
import ImageProductDetails from "@/components/imageProductDetails";

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
            <ImageProductDetails srcDesktop='./assets/home/desktop/image-earphones-yx1.jpg' srcTablet='./assets/home/tablet/image-earphones-yx1.jpg' srcMobile='./assets/home/mobile/image-earphones-yx1.jpg' alt="black earphones"
                desktopWidth={540} desktopHeight={320}
                tabletWidth={339} tabletHeight={320}
                mobileWidth={327} mobileHeight={200}
            />

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
