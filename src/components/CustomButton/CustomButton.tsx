import React from "react";
import { Button } from "antd";

const CustomButton = ({
  label,
  ButtonIcon,
  clickHandler,
}: {
  label: string;
  ButtonIcon: React.ReactNode;
  clickHandler: React.MouseEventHandler<HTMLElement>;
}) => {
  return (
    <Button type="primary" icon={ButtonIcon} onClick={clickHandler}>
      {label}
    </Button>
  );
};

export default CustomButton;
