import SliderSlick from "react-slick";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Slider.module.scss";
import SliderItem from "./SliderItem";
import ButtonSlider from "~/components/Button/ButtonSlider";

const cx = classNames.bind(styles);
function SliderShow({ data }) {
    // console.log(data);
    const settings = {
        // dots: true,
        infinite: true,
        // lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <ButtonSlider middle next />,
        prevArrow: <ButtonSlider middle prev />,
        responsive: [
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    dots: true,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className={cx("slider-container")}>
            <SliderSlick {...settings}>
                {data.map((item, index) => {
                    return <SliderItem data={item} key={index} />;
                })}
            </SliderSlick>
        </div>
    );
}

export default SliderShow;
