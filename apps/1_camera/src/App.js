import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import './App.css';

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      rotateOnAxis={[0, 0, 0]}
      ref={meshRef}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}


function App() {
  return (
    <Canvas
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [15, 15, 15], fov: 50 }}
    >

      <Box position={[0, 0, 0]} />

    </Canvas>
  );
}

export default App;
