import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./SliderPlaylist.module.scss";
import Card from "~/layouts/components/Card";
import ButtonSlider from "~/components/Button/ButtonSlider";
const cx = classNames.bind(styles);

function SliderPlaylist({ data }) {
    console.log(data);
    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        nextArrow: <ButtonSlider standardMiddle next />,
        prevArrow: <ButtonSlider standardMiddle prev />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {data &&
                data.map((item, index) => {
                    return (
                        <div key={index} className={styles.wrapper}>
                            <Card playlist title artists data={item} />
                        </div>
                    );
                })}
        </Slider>
    );
}

export default SliderPlaylist;
