import React, { useEffect, useState } from 'react';
import "./Carousel.css";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

function Carousel() {

    const images = [
        "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Xiaomi/family/17th-Nov/D18787601_BAU_Xiaomi_Family_DesktopHero_1500x600_2._CB415252218_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Jewellery/GW/unrec2/PC-BUnk-1500-600._CB415511219_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Boson/Sid/CCBP/Nov/BAU/Credit-Card-Bill_1500x600_without._CB415288872_.jpg"
    ]
    const [activeImage, setActiveImage] = useState(0);

    const nextImage = () => {
        setActiveImage(activeImage < images.length - 1 ? activeImage + 1 : 0);
    }

    const prevImage = () => {
        setActiveImage(activeImage > 0 ? activeImage - 1 : images.length - 1);
    }

    useEffect(() => {
        const timer = setInterval(nextImage, 3000);
        return () => { clearInterval(timer); };
    });

    return (
        <div className="imageFrame">
            <ChevronLeft className="imageNavButtonLeft" onClick={prevImage} />
            <img className={`image ${activeImage === 0 ? 'imageFull' : 'imageHidden'} ${activeImage === 1 ? '' : ''} ${activeImage === 3 ? '' : ''}`} src={images[0]} alt="Sorry" />
            <img className={`image ${activeImage === 1 ? 'imageFull' : 'imageHidden'} ${activeImage === 2 ? '' : ''} ${activeImage === 0 ? '' : ''}`} src={images[1]} alt="Sorry" />
            <img className={`image ${activeImage === 2 ? 'imageFull' : 'imageHidden'} ${activeImage === 3 ? '' : ''} ${activeImage === 1 ? '' : ''}`} src={images[2]} alt="Sorry" />
            <img className={`image ${activeImage === 3 ? 'imageFull' : 'imageHidden'} ${activeImage === 0 ? '' : ''} ${activeImage === 2 ? '' : ''}`} src={images[3]} alt="Sorry" />
            <ChevronRight className="imageNavButtonRight" onClick={nextImage} />
        </div>
    );
}

export default Carousel;