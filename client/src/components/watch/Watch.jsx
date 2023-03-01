import { ArrowBackOutlined } from "@mui/icons-material";
import React from "react";

const Watch = () => {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className="video"
        autoPlay
        controls
        onProgress={() => console.log("progress")}
        src=""
      />
    </div>
  );
};

export default Watch;
