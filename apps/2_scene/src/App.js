import React from "react";
import { Canvas } from "@react-three/fiber";
import { Person } from "./person";
import { Door } from "./door";
import { FlowerPot } from "./flowerpot";
import { Book } from "./book";

function App() {

  // Orthogonal camers for a straigh view
  // Ambient light across the scene
  // Two persons
  // One door with knob inside
  // Book
  return (
    <div style={{
      width: '100vw',
      height: "100vh",
    }}>
      <Canvas
        orthographic
        camera={{ position: [ 0, 0, 5 ], near: 0.1, far: 100, zoom: 50 }}>
        <ambientLight intensity={ Math.PI / 2}/>
        <Person position={[ -5, 0, 0 ]} materialColor="red" size={4} />
        <group>
          <Door size={[ 0.5, 6, 1 ]} materialColor="brown"/>
          <FlowerPot position={[ -1, -2.5, 0 ]} size={2}/>
        </group>
        <Person position={[ +5, 0, 0 ]} materialColor="blue" size={4} />
        <Book position={[ -8, 0, 0 ]} />
      </Canvas>
    </div >
  );

}




export default App;
