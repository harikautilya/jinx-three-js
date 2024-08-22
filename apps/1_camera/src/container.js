import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from './box';
import { Text } from "@jinx/base/text";
import { Flex } from '@jinx/base/flex';
import { ChangeAwareOrthographicCamera, ChangeAwarePerspectiveCamera } from "@jinx/base/camera";



const LightComponent = ({ lightModel, materialColor, perceivedColor }) => (
  <>

    <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
      {lightModel}
      <Box materialColor={materialColor} />
    </Canvas>
    <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
      {lightModel}
      <Box materialColor={materialColor} enableMovement />
    </Canvas>

    <Flex
      direction="row"
      jc="center"
      ai="center">
      <Text text={"Perceived color"} />
      <div style={{ backgroundColor: perceivedColor, height: "20px", width: "20px", margin: "5px" }} />
    </Flex>
  </>
);


const PerspectiveCameraComponent = ({ lightModel, materialColor, perspectiveCameraProps }) => (
  <>
    <Text text={"Perspective camera"} bold />
    <Text text={"This camera postion can be changed bearing that it always looks at the position of the object that is 5,5,0 and provides a frustum perspective"} />
    <Canvas>
      <ChangeAwarePerspectiveCamera {...perspectiveCameraProps} lookAt />
      {lightModel}
      <Box
        materialColor={materialColor}
        position={[5, 5, 0]} />
    </Canvas>
  </>
)

const OrthographicCameraComponent = ({ lightModel, materialColor, orthographicCameraProps }) => (
  <>
    <Text text={"Orthographic camera"} bold />
    <Text text={"This camera postion can be changed bearing that it always looks at the position of the object that is 5,5,0 and provides a cubio perspective"} />
    <Canvas>
      <ChangeAwareOrthographicCamera {...orthographicCameraProps} lookAt />
      {lightModel}
      < Box
        materialColor={materialColor}
        position={[5, 5, 0]} />
    </Canvas>
  </>
)

const Container = ({
  title,
  content,
  perceivedColor,
  materialColor,
  lightModel,
  perspectiveCameraProps,
  orthographicCameraProps
}) => (

  <Flex
    direction="column">
    <Text text={title} bold />
    <Text text={content} />
    <LightComponent
      lightModel={lightModel}
      materialColor={materialColor}
      perceivedColor={perceivedColor} />
    <PerspectiveCameraComponent
      lightModel={lightModel}
      materialColor={materialColor}
      perspectiveCameraProps={perspectiveCameraProps} />
    <OrthographicCameraComponent
      lightModel={lightModel}
      materialColor={materialColor}
      orthographicCameraProps={orthographicCameraProps} />

  </Flex >
)


export { Container };