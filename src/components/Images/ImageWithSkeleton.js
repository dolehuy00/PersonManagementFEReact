
// reactstrap components
import {
    Spinner,
} from "reactstrap";
import React, { useState } from 'react';

const ImageWithSkeleton = ({ src, placeholder, alt, className, transform = "translate(-50%, -50%)", showSpiner = false }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <div style={{ position: "relative" }}>
                {showSpiner && (!loaded || !src)
                    ? (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: transform,
                                zIndex: 10,
                            }}
                        >
                            <Spinner color="info" />
                        </div>
                    )
                    : ""
                }
                {src
                    ? (
                        <img
                            className={className}
                            src={src}
                            onLoad={() => { setLoaded(true) }}
                            alt={alt}
                        />
                    )
                    : (
                        <img
                            className={className}
                            src={placeholder}
                            alt={alt}
                        />
                    )
                }
            </div>
        </>
    );

};

export default ImageWithSkeleton;