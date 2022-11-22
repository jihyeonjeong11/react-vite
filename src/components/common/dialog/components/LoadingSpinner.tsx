import React from "react";
import { motion } from "framer-motion";

const containerStyle: StyleProps = {
    position: "relative",
    width: "3rem",
    height: "3rem",
    boxSizing: "border-box",
};

const circleStyle: StyleProps = {
    display: "block",
    width: "3rem",
    height: "3rem",
    border: "0.5rem solid #e9e9e9",
    borderTop: "0.5rem solid #3498db",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0,
};

const spinTransition: StyleProps = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
};

type StyleProps = Record<string, any>;

export default function LoadingSpinner() {
    return (
        <div style={containerStyle}>
            <motion.span
                style={circleStyle}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        </div>
    );
}
