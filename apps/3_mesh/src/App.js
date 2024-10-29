"use client";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Flex, FlexItem } from "@jinx/base/flex";
import { Text } from "@jinx/base/text";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function Header() {

  return (
    <Flex >
      <FlexItem>
        <Text text={"MeshPhongMaterial"} align="center"/>
      </FlexItem>
      <FlexItem>
        <Text text={"MeshLambertMaterial"} align="center"/>
      </FlexItem>
      <FlexItem>
        <Text text={"MeshToonMaterial"} align="center"/>
      </FlexItem>
      <FlexItem>
        <Text text={"MeshStandardMaterial"} align="center"/>
      </FlexItem>
      <FlexItem>
        <Text text={"MeshPhysicalMaterial"} align="center"/>
      </FlexItem>
    </Flex>
  );

}

function Scene({ material }) {

  const meshRef = useRef();

  useFrame((state, delta)=> {

    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;

  });

  return (
    <mesh
      ref={meshRef}
      position={[ 0, 0, 0 ]}>
      <sphereGeometry args={[ 5, 10, 10 ]} />
      {material}
    </mesh>

  );

}

function MeshRow({ lightModel, shininess, roughness, metalness, clearCoat, clearCoatRoughness }) {

  return (
    <Flex direction="row" height={"200px"}>
      <FlexItem>
        <Canvas
          camera={{ position: [ 0, 0, 15 ], near: 1, far: 20, fov: 60 }}>
          {lightModel}
          <Scene material={<meshPhongMaterial color="blue" shininess={shininess}/>}/>
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas
          camera={{ position: [ 0, 0, 15 ], near: 1, far: 20, fov: 60 }}>
          {lightModel}
          <Scene material={<meshLambertMaterial color="blue"/>}/>
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas
          camera={{ position: [ 0, 0, 15 ], near: 1, far: 20, fov: 60 }}>
          {lightModel}
          <Scene material={<meshToonMaterial color="blue" />}/>
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas
          camera={{ position: [ 0, 0, 15 ], near: 1, far: 20, fov: 60 }}>
          {lightModel}
          <Scene material={<meshStandardMaterial color="blue" metalness={metalness} roughness={roughness} />}/>
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas
          camera={{ position: [ 0, 0, 15 ], near: 1, far: 20, fov: 60 }}>
          {lightModel}
          <Scene material={<meshPhysicalMaterial color="blue" metalness={metalness} roughness={roughness} clearCoatRoughness={clearCoatRoughness} clearcoat={clearCoat} />}/>
        </Canvas>
      </FlexItem>
    </Flex>
  );

}

function TextureScene({ geometry, image }) {

  const texture = useTexture(image);
  const meshRef = useRef();

  useFrame((state, delta)=> {

    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;

  });

  return (
    <mesh
      ref={meshRef}
      position={[ 0, 0, 0 ]}>
      {geometry}
      <meshBasicMaterial map={texture}/>
    </mesh>
  );

}

function TextureRow() {

  return (
    <Flex direction="row" height={"200px"}>
      <FlexItem>
        <Canvas>
          <TextureScene
            image={"./textures/wood_0066_color_1k.jpg"}
            geometry={<sphereGeometry args={[ 2, 30, 30 ]} />}
          />
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas>
          <TextureScene
            image={"./textures/wood_0066_color_1k.jpg"}
            geometry={<boxGeometry args={[ 3, 3, 3 ]} />}
          />
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas>
          <TextureScene
            image={"./textures/wood_0066_roughness_1k.jpg"}
            geometry={<sphereGeometry args={[ 2, 30, 30 ]} />}
          />
        </Canvas>
      </FlexItem>
      <FlexItem>
        <Canvas>
          <TextureScene
            image={"./textures/wood_0066_roughness_1k.jpg"}
            geometry={<boxGeometry args={[ 3, 3, 3 ]} />}
          />
        </Canvas>
      </FlexItem>
    </Flex>
  );

}

function App() {

  const intensity = Math.PI / 2;

  const { shininess } = useControls("Phong", {
    shininess: {
      value: 30,
      min: 1,
      max: 150
    }
  });

  const { roughness, metalness } = useControls("standard", {
    roughness: {
      value: 0,
      min: 0,
      max: 1
    },
    metalness: {
      value: 0,
      min: 0,
      max: 1
    }
  });

  const { clearCoat, clearCoatRoughness } = useControls("physical", {
    clearCoat: {
      value: 0,
      min: 0,
      max: 1
    },
    clearCoatRoughness: {
      value: 0,
      min: 0,
      max: 1
    }
  });

  return (
    <div style={{
      width: '100vw',
      height: "100vh"
    }}>
      <div style={{ padding: "20px" }}>
        <Text text={"Materials"} align="center" bold/>
        <Header />
        {/* There is no reason for this light model to be used as this will same for cases of the material */}
        {/*
          <MeshRow
            lightModel={<ambientLight intensity={intensity}/>}
            shininess={shininess}
            roughness={roughness}
            metalness={metalness}
            clearCoat={clearCoat}
            clearCoatRoughness={clearCoatRoughness}
          />
         */}
        <MeshRow
          lightModel={ <directionalLight intensity={intensity}/>}
          shininess={shininess}
          roughness={roughness}
          metalness={metalness}
          clearCoat={clearCoat}
          clearCoatRoughness={clearCoatRoughness}
        />
        <MeshRow
          lightModel={<hemisphereLight skyColor={"white"} groundColor={"black"} intensity={intensity}/>}
          shininess={shininess}
          roughness={roughness}
          metalness={metalness}
          clearCoat={clearCoat}
          clearCoatRoughness={clearCoatRoughness}
        />
        <Text text={"Textures"} align="center" bold/>
        <TextureRow />
      </div>
    </div >
  );

}

export default App;
