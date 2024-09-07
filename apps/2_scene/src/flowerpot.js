import React from "react";

function FlowerPot({
  position = [ -1, 0, 0 ],
  size = 2
}) {

  const basicHeight = size / 2;

  // Pot details
  const potSize = basicHeight;
  const bottomRadius = potSize / 3;
  const topRadius = potSize / 2;

  const potPosition = [ position[ 0 ], position[ 1 ], position[ 2 ] ];

  return (
    <group>
      <mesh position={potPosition}>
        <meshStandardMaterial color="brown" />
        <cylinderGeometry args={[ topRadius, bottomRadius, potSize ]} />
      </mesh>
    </group>
  );

}

export { FlowerPot };
