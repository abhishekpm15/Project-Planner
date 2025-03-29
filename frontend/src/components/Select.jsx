import React from "react";
import { Select as SelectA, Space } from "antd";

const Select = ({handleChange, status}) => {

  return (
    <SelectA
      defaultValue={status}
      style={{ width: 200 }}
      onChange={handleChange}
      size="large"
      options={[
        { value: "To Do", label: "Todo" },
        { value: "In Progress", label: "In Progress" },
        { value: "Completed", label: "Completed" },
        { value: "Closed", label: "Closed" },
      ]}
    />
  );
};

export default Select;
