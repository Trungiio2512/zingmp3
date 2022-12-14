import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            leftIcon,
            rightIcon,
            primary,
            secondary,
            circle,
            circleSmall,
            circleSpecial,
            square,
            outline,
            hover,
            disabled = false,
            className,
            onClick,
            children,
            ...passProps
        },
        ref,
    ) => {
        let Comp = "button";
        const props = {
            onClick,
            ...passProps,
        };

        // remove event when btn disabled
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith("on") && typeof props[key] === "function") {
                    delete props[key];
                }
            });
        }

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = "a";
        }
        const classes = cx("wrapper", {
            [className]: className,
            primary,
            circle,
            circleSpecial,

            secondary,
            disabled,
            outline,
            hover,
            square,
            circleSmall,
        });

        return (
            <Comp className={classes} {...props} ref={ref}>
                {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
                <span className={cx("title")}>{children}</span>
                {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
            </Comp>
        );
    },
);

export default Button;
