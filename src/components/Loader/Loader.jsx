import React from "react";
import LoaderImages from "./LoaderImages";

const Loader = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh !important",
        overflow:"hidden",
        backgroundColor: "#ffffff",
        backgroundAttachment: "fixed",
      }}
    >
      <LoaderImages />
    </div>
  );
};

export default Loader;
