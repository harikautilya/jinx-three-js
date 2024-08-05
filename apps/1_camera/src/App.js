import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { multiplyColorWithConstant, multiplyColors } from './utils';
import './App.css';

function Box({ size = 5, materialColor, enableMovement = false, ...props }) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (enableMovement)
      meshRef.current.rotation.x += delta;
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      rotateOnAxis={[0, 0, 0]}
      ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={materialColor} />
    </mesh>
  )
}

const BoldText = ({ text }) => (<p style={{ fontWeight: "500" }}>{text}</p>)
const Text = ({ text }) => (<p>{text}</p>)


const Container = ({ title, content, perceivedColor, children }) => {
  console.log(perceivedColor)
  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div>
        {children}
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text text={"Perceived color"} />
        <div style={{ backgroundColor: perceivedColor, height: "20px", width: "20px", margin: "5px" }} />
      </div>
      <BoldText text={title} />
      <Text text={content} />

    </div>
  )
}


function App() {

  const { intensity, lightDiffusionColor, materialColor, pointLightIntensity } = useControls({
    intensity: {
      value: 5,
      min: 1,
      max: 10
    },
    pointLightIntensity: {
      value: 100,
      min: 1,
      max: 500
    },
    lightDiffusionColor: {
      value: "#FFFFFF"
    },
    materialColor: {
      value: "#ffA500"
    }
  })

  const [perceivedColor, setPerceivedColor] = useState("#000000");

  const [perceivedColorPointLight, setPerceivedColorPointLight] = useState("#000000");


  useEffect(() => {

    const mixedColor = multiplyColors(lightDiffusionColor, materialColor);
    const finalColor = multiplyColorWithConstant(mixedColor, intensity);
    setPerceivedColor(finalColor)

  }, [lightDiffusionColor, materialColor, intensity])

  useEffect(() => {

    const mixedColor = multiplyColors(lightDiffusionColor, materialColor);
    const finalColor = multiplyColorWithConstant(mixedColor, pointLightIntensity);
    setPerceivedColorPointLight(finalColor)

  }, [lightDiffusionColor, materialColor, pointLightIntensity])


  return (
    <div style={{ width: '100vw', height: "100vh", display: "flex", flexFlow: "row", flexWrap: "wrap" }}>
      <Container
        title="Ambient Light"
        content="This provides a evently distributed lighting across the scene"
        perceivedColor={perceivedColor}>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <ambientLight color={lightDiffusionColor} intensity={intensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} />
          </Canvas>
        </div>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <ambientLight color={lightDiffusionColor} intensity={intensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} enableMovement />
          </Canvas>
        </div>
      </Container>

      <Container
        title="Hemisphere Light"
        content="This provide a directionaly light from top to bottom with two different color know as sky for top and earth for bottom."
        perceivedColor={perceivedColor} >
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <hemisphereLight color={lightDiffusionColor} groundColor="black" intensity={intensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} />
          </Canvas>
        </div>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <hemisphereLight color={lightDiffusionColor} groundColor="black" intensity={intensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} enableMovement />
          </Canvas>
        </div>
      </Container>

      <Container
        title="Directional Light"
        content="This provide a directionaly light from top to bottom with two different color know as sky for top and earth for bottom."
        perceivedColor={perceivedColor}>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <directionalLight color={lightDiffusionColor} position={[5, 5, 0]} intensity={intensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} />
          </Canvas>
        </div>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <directionalLight color={lightDiffusionColor} position={[5, 5, 0]} intensity={intensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} enableMovement />
          </Canvas>
        </div>
      </Container>

      <Container
        title="Point Light"
        content="A point projects light in all the direction from the position"
        perceivedColor={perceivedColorPointLight}>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <pointLight color={lightDiffusionColor} position={[5, 5, 0]} intensity={pointLightIntensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} />
          </Canvas>
        </div>
        <div>
          <Canvas
            camera={{ position: [8, 8, 8], fov: 50 }}>
            <pointLight color={lightDiffusionColor} position={[6, 6, 0]} intensity={pointLightIntensity} />
            <Box materialColor={materialColor} size={5} position={[0, 0, 0]} enableMovement />
          </Canvas>
        </div>
      </Container>

    </div>
  );
}

export default App;
