import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Box({ size = 5, materialColor, enableMovement = false, ...props }) {
  const meshRef = useRef()
  useFrame((state, delta) => {
    if (enableMovement)
      meshRef.current.rotation.x += delta;
  })
  return (
    <mesh
      {...props}

      ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={materialColor} />
    </mesh>
  )
}

export { Box }