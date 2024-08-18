import React, { forwardRef } from "react";

const FlexComponent = ({ flex, direction, jc, ai, children }, ref) => (
  <div
    style={{
      display: "flex",
      ...(flex ? { flex } : {}),
      ...(direction ? { flexDirection: direction } : {}),
      ...(jc ? { justifyContent: jc } : {}),
      ...(ai ? { alignItems: ai } : {}),
    }}

    ref={ref}>
    {children}
  </div>
)


const Flex = forwardRef(FlexComponent);

export { Flex }