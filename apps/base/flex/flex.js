import React, { forwardRef } from "react";

const FlexComponent = ({ flex, direction, jc, ai, children, height, margin }, ref) => (
  <div
    style={{
      display: "flex",
      ...(flex ? { flex } : {}),
      ...(direction ? { flexDirection: direction } : {}),
      ...(jc ? { justifyContent: jc } : {}),
      ...(ai ? { alignItems: ai } : {}),
      ...(height ? { height: height } : {}),
      ...(margin ? { margin: margin } : {}),
    }}
    ref={ref}>
    {children}
  </div>
);

const FlexItemComponent = ({ children, style }, ref) => (
  <div
    style ={{
      flex: 1,
      ...style
    }}
    ref={ref}>
    {children}
  </div>
);

const Flex = forwardRef(FlexComponent);
const FlexItem = forwardRef(FlexItemComponent);

export { Flex, FlexItem };
