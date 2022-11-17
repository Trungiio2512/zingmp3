import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function SliderItem({ data }) {
    // console.log(data);
    return (
        <div className={cx("slider-item")}>
            <Link to={data?.link} state={{ id: data?.encodeId }} className={cx("slider-item__link")}>
                <img className={cx("slider-item__image")} src={data?.banner} alt={data?.description} />
            </Link>
        </div>
    );
}

export default SliderItem;
