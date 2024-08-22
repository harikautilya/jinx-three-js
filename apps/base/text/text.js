import React, { forwardRef } from "react";

const TextComponent = ({ text, bold = false }, ref) => (
  <p ref={ref} style={{
    ...(bold ? { fontWeight: "500" } : {})
  }}
  >{text}</p>
);

const Text = forwardRef(TextComponent)

export { Text };