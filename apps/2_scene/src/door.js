import React from "react";

function Door({
  materialColor = 'red',
  knobColor = "yellow",
  position = [ 0, 0, 0 ],
  size = [ 1, 1, 1 ],
}) {

  const knobSize = size[ 0 ] / 2;
  const knobPosition = [ position[ 0 ] + (2 * knobSize), position[ 1 ] - (2 * knobSize), position[ 2 ] ];

  return (
    <group>
      <mesh position={position}>
        <meshStandardMaterial color={materialColor}/>
        <boxGeometry args={size} />
      </mesh>
      <mesh position={knobPosition}>
        <meshStandardMaterial color={knobColor}/>
        <sphereGeometry args={[ knobSize, 30, 30 ]} />
      </mesh>
    </group>
  );

}

export { Door };
