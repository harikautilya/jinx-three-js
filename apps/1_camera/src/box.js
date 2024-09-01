import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Box({
  size = 5,
  materialColor,
  enableMovement = false,
  position = [ 0, 0, 0 ],
  ...props }) {

  const meshRef = useRef();
  useFrame((state, delta) => {

    if (enableMovement)
      meshRef.current.rotation.x += delta;

  });
  return (
    <mesh
      position={position}
      {...props}
      ref={meshRef}>
      <boxGeometry args={[ size, size, size ]} />
      <meshStandardMaterial color={materialColor} />
    </mesh>
  );

}

export { Box };
