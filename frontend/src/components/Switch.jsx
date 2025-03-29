import React from "react";
import { Switch as SwitchA } from "antd";

const Switch = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return <SwitchA defaultChecked onChange={onChange} />;
};

export default Switch;
