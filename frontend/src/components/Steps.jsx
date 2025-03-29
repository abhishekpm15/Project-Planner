import { Steps as StepsA } from "antd";

import React from "react";

const Steps = () => {
  return (
    <StepsA
      size="small"
      current={1}
      items={[
        {
          title: "Finished",
        },
        {
          title: "In Progress",
        },
        {
          title: "Waiting",
        },
      ]}
    />
  );
};

export default Steps;
