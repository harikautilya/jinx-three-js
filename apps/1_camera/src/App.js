import React, { useEffect, useState } from 'react'
import { folder, useControls } from "leva";
import { multiplyColorWithConstant, multiplyColors } from '@jinx/base/color';
import { Container } from './container';
import { rotate } from 'three/webgpu';
import { Flex } from '@jinx/base/flex';


function App() {

  const {
    intensity,
    directionLightX,
    directionLightY,
    directionLightZ,
    pointLightX,
    pointLightY,
    pointLightZ,
    lightDiffusionColor,
    materialColor,
    pointLightIntensity
  } = useControls("Lights", {
    intensity: {
      value: 5,
      min: 1,
      max: 10
    },
    "Direction Light": folder({
      directionLightX: {
        value: 5,
        min: 0,
        max: 10
      },
      directionLightY: {
        value: 5,
        min: 0,
        max: 10
      },
      directionLightZ: {
        value: 0,
        min: 0,
        max: 10
      }
    }),
    "Point Light": folder({
      pointLightIntensity: {
        value: 100,
        min: 1,
        max: 500
      },
      pointLightX: {
        value: 10,
        min: 0,
        max: 10
      },
      pointLightY: {
        value: 10,
        min: 0,
        max: 10
      },
      pointLightZ: {
        value: 5,
        min: 0,
        max: 10
      }
    }),
    lightDiffusionColor: {
      value: "#FFFFFF"
    },
    materialColor: {
      value: "#ffA500"
    }
  })

  const { x, y, z, near, far, fov } = useControls("Perspective Camera", {
    x: {
      value: 10,
      min: 1,
      max: 10
    },
    y: {
      value: 10,
      min: 1,
      max: 10
    },
    z: {
      value: 5,
      min: 1,
      max: 10
    },
    near: {
      value: 2,
      min: 1,
      max: 10
    },
    far: {
      value: 10,
      min: 1,
      max: 10
    },
    fov: {
      value: 100,
      min: 1,
      max: 180
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
    <div style={{
      width: '100vw',
      height: "100vh",
    }}>
      <Flex direction="row">
        <Container
          title="Ambient Light"
          content="This provides a evently distributed lighting across the scene"
          perceivedColor={perceivedColor}
          lightModel={<ambientLight color={lightDiffusionColor} intensity={intensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [x, y, z],
            near: near,
            far: far,
            fov: fov
          }}
        />
        <Container
          title="Hemisphere Light"
          content="This provide a directionaly light from top to bottom with two different color know as sky for top and earth for bottom."
          perceivedColor={perceivedColor}
          lightModel={<hemisphereLight color={lightDiffusionColor} groundColor="black" intensity={intensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [x, y, z],
            near: near,
            far: far,
            fov: fov,
          }}
        />
        <Container
          title="Directional Light"
          content="This provide a directionaly light from top to bottom with two different color know as sky for top and earth for bottom."
          perceivedColor={perceivedColor}
          lightModel={<directionalLight color={lightDiffusionColor} position={[directionLightX, directionLightY, directionLightZ]} intensity={intensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [x, y, z],
            near: near,
            far: far,
            fov: fov,
          }}
        />
        <Container
          title="Point Light"
          content="A point projects light in all the direction from the position"
          perceivedColor={perceivedColorPointLight}
          lightModel={<pointLight color={lightDiffusionColor} position={[pointLightX, pointLightY, pointLightZ]} intensity={pointLightIntensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [x, y, z],
            near: near,
            far: far,
            fov: fov,
          }}
        />
      </Flex>
    </div>
  );
}

export default App;
