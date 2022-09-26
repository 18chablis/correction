import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useIntersection } from "../utils/intersectionObserver";

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${({ thumb }) =>
    thumb &&
    `opacity: 1;
    filter: blur(10px);
    transition: opacity 1s ease-out;
    position: absolute;
    ${({ loaded }) => loaded && `opacity: 0;`}
  `}
  ${({ loaded }) =>
    loaded &&
    `transition: opacity 1s ease-out;
    opacity: 1;`}
`;
const ImageRenderer = ({ url, thumb, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: "100%",
      }}
    >
      {isInView && (
        <>
          <Image
            src={`${process.env.REACT_APP_API_URL}/uploads/cars/thumbnail/${thumb}`}
            alt=""
            thumb={isLoaded}
            loaded={isLoaded}
          />
          <Image
            src={`${process.env.REACT_APP_API_URL}/uploads/cars/${url}`}
            onLoad={handleOnLoad}
            alt=""
            loaded={isLoaded}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
