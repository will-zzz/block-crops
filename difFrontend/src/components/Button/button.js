import React from "react";
import { CustomizedButton } from "./styled";

export default function Button(props) {
  return (
    <CustomizedButton size="large" {...props}>
      {props.label}
    </CustomizedButton>
  );
}
