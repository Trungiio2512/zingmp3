import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { setFollower } from "~/funtion";
import styles from "./Media.module.scss";

const cx = classNames.bind(styles);

function MediaArtist({ dataArtist, dataArtists, title, avata, to, className, follower, ...passProps }) {
    // console.log(dataArtist);
    let Comp;
    const props = {
        ...passProps,
    };
    if (to) {
        Comp = Link;
        props.to = to;
    } else {
        Comp = "h4";
    }
    return (
        <div className={cx("media-left", { [className]: className })}>
            {avata && (
                <div className={cx("thumb", "circle_small", "mediumSizeImg")}>
                    <figure className={cx("thumb-song", "thumb-img")}>
                        <img src={dataArtist?.thumbnail} alt={dataArtist?.alias} />
                    </figure>
                </div>
            )}
            <div className={cx("info")}>
                <Comp {...props} className={cx("info-name", { to })}>
                    {title}
                </Comp>
                {dataArtists && (
                    <p className={cx("info-artists")}>
                        {dataArtists.map((artist, index) => (
                            <Link to={artist?.link} className={cx("info-artists__name")} key={index}>
                                {artist?.name}
                            </Link>
                        ))}
                    </p>
                )}
                {follower && dataArtist?.totalFollow && (
                    <h3 className={cx("info-follower")}>Nghệ sĩ . {setFollower(dataArtist?.totalFollow)} quan tâm</h3>
                )}
            </div>
        </div>
    );
}

export default MediaArtist;
