import React from "react";
import { Progress } from "antd";
const Circular = () => {
  return (
    <>
      <Progress
        type="circle"
        percent={75}
        strokeColor={{
          "0%": "#15803d",
          "100%": "#4ade80",
        }}
        format={() => "Level 1"}
      />
    </>
  );
};

export default Circular;
