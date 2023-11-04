import {Html} from "@react-three/drei";
import React from "react";

const LoadingScreen = () => {
  return (
    <Html position={"absolute"}>
      <div
        className="fixed z-50 top-0 left-0 w-[100vw] h-screen bg-black flex justify-center"
        id="fdp">
        <img className="h-screen" src="/images/game1.jfif" />
        <h2 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-5xl bg-black rounded-full p-3 flex justify-center align-middle items-center">
          <svg
            className="animate-spin h-10 w-10 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            stroke="#fff">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
          Chargement...
        </h2>
      </div>
    </Html>
  );
};

export default LoadingScreen;
