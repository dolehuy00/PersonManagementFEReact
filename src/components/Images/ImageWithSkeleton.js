
// reactstrap components
import {
    Spinner,
} from "reactstrap";
import React, { useState } from 'react';

const ImageWithSkeleton = ({ src, placeholder, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {loaded && !src
                ? (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, 50%)",
                            zIndex: 10,
                        }}
                    >
                        <Spinner color="info" />
                    </div>
                )
                : ""
            }
            <img
                className={className}
                src={loaded && src ? src : placeholder}
                onLoad={() => setLoaded(true)}
                alt={alt}
            />
        </>
    );

};

export default ImageWithSkeleton;