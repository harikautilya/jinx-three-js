import React, { forwardRef } from "react";

const TextComponent = ({ text, bold = false, align = "start" }, ref) => (
  <p ref={ref} style={{
    ...(bold ? { fontWeight: "500" } : {}),
    ...(align ? { textAlign: align } : {} )
  }}
  >{text}</p>
);

const Text = forwardRef(TextComponent);

export { Text };
