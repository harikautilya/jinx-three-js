import React, { useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Box } from './box';
import { Text } from "@jinx/base/text";
import { Flex } from '@jinx/base/flex';

const ChangeAwarePerspectiveCamera = ({ position, fov, near, far, aspect, lookAt = false }) => {
  console.log(fov);
  const ref = useRef();
  const set = useThree((state) => state.set);
  useEffect(() => {
    set({ camera: ref.current });
    if (ref.current) {
      ref.current.updateProjectionMatrix();
      if (lookAt)
        ref.current.lookAt(5, 5, 0)
    }
  }, [position, fov, near, far, set, aspect]);
  useFrame(() => ref.current.updateMatrixWorld());
  return (
    <perspectiveCamera
      ref={ref}
      position={position}
      fov={fov}
      aspect={2}
      near={near}
      far={far}
    />
  );
};

const Container = ({
  title,
  content,
  perceivedColor,
  materialColor,
  lightModel,
  perspectiveCameraProps
}) => (
  <Flex
    direction="column"
    flex="1"
    jc="center"
    ai="center">
    <Text text={title} bold />
    <Text text={content} />

    <div>
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}>
        {lightModel}
        <Box
          materialColor={materialColor}
          size={5}
          position={[0, 0, 0]} />
      </Canvas>
    </div>
    <div>
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}>
        {lightModel}
        <Box
          materialColor={materialColor}
          size={5}
          position={[0, 0, 0]}
          enableMovement />
      </Canvas>
    </div>
    <Flex
      direction="row"
      jc="center"
      ai="center">
      <Text text={"Perceived color"} />
      <div style={{ backgroundColor: perceivedColor, height: "20px", width: "20px", margin: "5px" }} />
    </Flex>

    <Text text={"Perspective camera"} bold />
    <Text text={"This camera postion can be changed but it always looks at the position of the object that is 5,5,0"} />


    <div>
      <Canvas>
        <ChangeAwarePerspectiveCamera {...perspectiveCameraProps} lookAt />
        {lightModel}
        < Box
          materialColor={materialColor}
          size={5}
          position={[5, 5, 0]} />
      </Canvas>
    </div>
    <Text text={"This camera postion can be changed but it always looks in the straight prospective"} />

    <div>
      <Canvas>
        <ChangeAwarePerspectiveCamera {...perspectiveCameraProps} />
        {lightModel}
        < Box
          materialColor={materialColor}
          size={5}
          position={[5, 5, 0]} />
      </Canvas>
    </div>

  </Flex >
)


export { Container };