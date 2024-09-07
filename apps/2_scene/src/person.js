import React from "react";

function Person({
  position,
  materialColor = "orange",
  size = 4
}) {

  // Sizes
  // Ref :  https://anatomymasterclass.com/anatomy-video-lessons/human-figure-proportions#:~:text=Once%20again%2C%20the%20top%20quarter,head%2Dto%2Dbody%20ratio.
  // Not every adult person has 1 to 8 head-to-body ratio
  // Head size is taken as reference ratio for the whole design
  const singlePartHeight = size / 8;
  const headSize = singlePartHeight;
  const torsoSize = [ singlePartHeight * 3, singlePartHeight * 3, 1, 1, 2 ];
  const legSize = [ singlePartHeight, singlePartHeight * 4, 1 ];
  const handSize = [ singlePartHeight, singlePartHeight * 2, 1 ];


  // Positions
  const torsoPosition = [ position[ 0 ], position[ 1 ], position[ 2 ] ]; // center around this object
  const headPosition = [ position[ 0 ], position[ 1 ] + (headSize * 3), position[ 2 ] ]; // Top head

  const leftHandPosition = [ position[ 0 ] - (singlePartHeight * 3), position[ 1 ] + (singlePartHeight / 2), position[ 2 ] ]; // left of the torso
  const rightHandPosition = [ position[ 0 ] + (singlePartHeight * 3), position[ 1 ] + (singlePartHeight / 2), position[ 2 ] ]; // right of th torso

  const leftLegPosition = [ position[ 0 ] - (singlePartHeight), position[ 1 ] - singlePartHeight * 4, position[ 2 ] ]; // left of the torso
  const rightLegPosition = [ position[ 0 ] + (singlePartHeight), position[ 1 ] - singlePartHeight * 4, position[ 2 ] ]; // right of th torso

  return (
    <group>
      <mesh position={headPosition}>
        <meshStandardMaterial color={materialColor} />
        <sphereGeometry args={[ headSize, 30, 30 ]} />
      </mesh>
      <mesh position={torsoPosition}>
        <meshStandardMaterial color={materialColor} />
        <boxGeometry args={torsoSize}/>
      </mesh>
      <mesh position={leftLegPosition}>
        <meshStandardMaterial color={materialColor} />
        <boxGeometry args={legSize}/>
      </mesh>
      <mesh position={rightLegPosition}>
        <meshStandardMaterial color={materialColor} />
        <boxGeometry args={legSize}/>
      </mesh>
      <mesh position={leftHandPosition} rotation={[ 0, 0, (Math.PI / 4) * 3 ]}>
        <meshStandardMaterial color={materialColor} />
        <boxGeometry args={handSize}/>
      </mesh>
      <mesh position={rightHandPosition} rotation={[ 0, 0, (Math.PI / 4) ]}>
        <meshStandardMaterial color={materialColor} />
        <boxGeometry args={handSize}/>
      </mesh>
    </group>
  );

}

export { Person };
