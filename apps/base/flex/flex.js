import React, { forwardRef } from "react";

const FlexComponent = ({ flex, direction, jc, ai, children, height }, ref) => (
  <div
    style={{
      display: "flex",
      ...(flex ? { flex } : {}),
      ...(direction ? { flexDirection: direction } : {}),
      ...(jc ? { justifyContent: jc } : {}),
      ...(ai ? { alignItems: ai } : {}),
      ...(height ? { height: height } : {}),
    }}
    ref={ref}>
    {children}
  </div>
);

const Flex = forwardRef(FlexComponent);

export { Flex };
