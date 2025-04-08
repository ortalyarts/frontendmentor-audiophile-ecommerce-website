import Image from "next/image";
import Link from "next/link";

// import imgThumbHeadphonesDesktop from '/assets/shared/desktop/image-category-thumbnail-headphones.png';
// import imgThumbSpeakers from '/assets/shared/desktop/image-category-thumbnail-speakers.png';
// import imgThumbEarphines from '/assets/shared/desktop/image-category-thumbnail-earphones.png'

export default function ThumbProductCategories(){
    return(
    <ul className="categories-links">
        <li className="hidden-for-animation" style={{animation: "falldown 0.25s ease-in-out 0.1s forwards"}}> 
          <Link href="/headphones" className="category-link">
            <div className="category-link-img">
              <Image src='/assets/shared/desktop/image-category-thumbnail-headphones.png' width="229" height="221" alt="Big black headphones with cable" />
            </div>
            <h3 className="title-6">Headphones</h3>
            <p>Shop</p>
          </Link>
          <div className="grey-bg"></div>
        </li>
        <li className="hidden-for-animation" style={{animation: "falldown 0.25s ease-in-out 0.15s forwards"}}> 
          <Link href="/speakers" className="category-link">
            <div className="category-link-img">
              <Image src='/assets/shared/desktop/image-category-thumbnail-speakers.png' width="222" height="207" alt="Big black speaker" />
            </div>
            <h3 className="title-6">Speakers</h3>
            <p>Shop</p>
          </Link>
          <div className="grey-bg"></div>
        </li>
        <li className="hidden-for-animation" style={{animation: "falldown 0.25s ease-in-out 0.2s forwards"}}> 
          <Link href="/earphones" className="category-link">
            <div className="category-link-img">
              <Image src='/assets/shared/desktop/image-category-thumbnail-earphones.png' width="219" height="190" alt="Black round earphone" />
            </div>
            <h3 className="title-6">Earphones</h3>
            <p>Shop</p>
          </Link>
          <div className="grey-bg"></div>
        </li>
      </ul>
    )
}