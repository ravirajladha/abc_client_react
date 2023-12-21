import React from "react";
import { Bars } from "react-loader-spinner";

function Loader({ height = 50, width = 50, wrapperClass = "" }) {
  return (
    <Bars
      height={height}
      width={width}
      color="#ff9500"
      ariaLabel="bars-loading"
      wrapperClass={`position-absolute top-50 start-50 ${wrapperClass}`}
      visible={true}
    />
  );
}

export default Loader;
