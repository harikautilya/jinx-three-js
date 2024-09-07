import React from "react";

function Book({
  materialColor = 'grey',
  position = [ 0, 0, 0 ],
  size = [ 1, 1, 1 ],
}) {

  return (
    <group>
      <mesh position={position}>
        <meshStandardMaterial color={materialColor}/>
        <boxGeometry args={size} />
      </mesh>
    </group>
  );

}

export { Book };
