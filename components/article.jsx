// import imgBestGear from '/assets/shared/desktop/image-best-gear.jpg';
// import imgBestGearTablet from '@/assets/shared/tablet/image-best-gear.jpg';
// import imgBestGearMobile from '@/assets/shared/mobile/image-best-gear.jpg';
import AnimatedDivSlideInView from "@/components/AnimatedDivSlideInView.jsx";

export default function Article(){
    return (
      <AnimatedDivSlideInView>
      <article className="featured-article">

          <picture className="rounded-corners">
                <source srcSet='/assets/shared/desktop/image-best-gear.jpg' media="(min-width: 768px)" width="540" height="588" />
                <source srcSet='/assets/shared/tablet/image-best-gear.jpg' media="(min-width: 560px)" width="689" height="300" />
                <img className="rounded-corners" src='/assets/shared/mobile/image-best-gear.jpg' alt="young man wearing headphons" width="540" height="588" />
            </picture>
            <div className="article-summary">
              <h2 className="title-2">Bringing you the <span>best</span> audio gear</h2>
              <p>
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
              </p>
            </div>
        </article>
        </AnimatedDivSlideInView>
    )
}