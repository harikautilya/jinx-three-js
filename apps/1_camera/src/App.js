import { useEffect, useState } from 'react';
import { folder, useControls } from "leva";
import { multiplyColorWithConstant, multiplyColors } from '@jinx/base/color';
import { Container } from './container';
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
  });

  const { px, py, pz, pnear, pfar, pfov } = useControls("Perspective Camera", {
    px: {
      label: "x",
      value: 10,
      min: 1,
      max: 30
    },
    py: {
      label: "y",
      value: 10,
      min: 1,
      max: 30
    },
    pz: {
      label: "z",
      value: 5,
      min: 1,
      max: 30
    },
    pnear: {
      label: "near",
      value: 2,
      min: 1,
      max: 10
    },
    pfar: {
      label: "far",
      value: 10,
      min: 1,
      max: 40
    },
    pfov: {
      label: "fov",
      value: 50,
      min: 1,
      max: 180
    }
  });

  const { ox, oy, oz, ozoom, ofar, onear } = useControls("Orthographic Camera", {
    ox: {
      label: "x",
      value: 10,
      min: 1,
      max: 10
    },
    oy: {
      label: "y",
      value: 10,
      min: 1,
      max: 10
    },
    oz: {
      label: "z",
      value: 5,
      min: 1,
      max: 10
    },
    onear: {
      label: "near",
      value: 2,
      min: 1,
      max: 10
    },
    ofar: {
      label: "far",
      value: 10,
      min: 1,
      max: 40
    },
    ozoom: {
      label: "zoom",
      value: 0.1,
      min: 0.1,
      max: 0.3
    }
  });

  const [ perceivedColor, setPerceivedColor ] = useState("#000000");
  const [ perceivedColorPointLight, setPerceivedColorPointLight ] = useState("#000000");


  useEffect(() => {

    const mixedColor = multiplyColors(lightDiffusionColor, materialColor);
    const finalColor = multiplyColorWithConstant(mixedColor, intensity);
    setPerceivedColor(finalColor);

  }, [ lightDiffusionColor, materialColor, intensity ]);

  useEffect(() => {

    const mixedColor = multiplyColors(lightDiffusionColor, materialColor);
    const finalColor = multiplyColorWithConstant(mixedColor, pointLightIntensity);
    setPerceivedColorPointLight(finalColor);

  }, [ lightDiffusionColor, materialColor, pointLightIntensity ]);


  return (
    <div style={{
      width: '100vw',
      height: "100vh",
    }}>
      <Flex direction="row" height={"100%"}>
        <Container
          title="Ambient Light"
          content="This provides a evently distributed lighting across the scene irrespective of the object placement and direction"
          perceivedColor={perceivedColor}
          lightModel={<ambientLight color={lightDiffusionColor} intensity={intensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [ px, py, pz ],
            near: pnear,
            far: pfar,
            fov: pfov,
          }}
          orthographicCameraProps={{
            position: [ ox, oy, oz ],
            near: onear,
            far: ofar,
            zoom: ozoom,
          }}
        />
        <Container
          title="Hemisphere Light"
          content="This provide a directionaly light from top to bottom with two different color know as sky for top and earth for bottom."
          perceivedColor={perceivedColor}
          lightModel={<hemisphereLight color={lightDiffusionColor} groundColor="black" intensity={intensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [ px, py, pz ],
            near: pnear,
            far: pfar,
            fov: pfov,
          }}
          orthographicCameraProps={{
            position: [ ox, oy, oz ],
            near: onear,
            far: ofar,
            zoom: ozoom,
          }}
        />
        <Container
          title="Directional Light"
          content="This provide a directionaly light from top to bottom with two different color know as sky for top and earth for bottom."
          perceivedColor={perceivedColor}
          lightModel={<directionalLight color={lightDiffusionColor} position={[ directionLightX, directionLightY, directionLightZ ]} intensity={intensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [ px, py, pz ],
            near: pnear,
            far: pfar,
            fov: pfov,
          }}
          orthographicCameraProps={{
            position: [ ox, oy, oz ],
            near: onear,
            far: ofar,
            zoom: ozoom,
          }}
        />
        <Container
          title="Point Light"
          content="A point projects light in all the direction from the position. This light is spread across the scene"
          perceivedColor={perceivedColorPointLight}
          lightModel={<pointLight color={lightDiffusionColor} position={[ pointLightX, pointLightY, pointLightZ ]} intensity={pointLightIntensity} />}
          materialColor={materialColor}
          perspectiveCameraProps={{
            position: [ px, py, pz ],
            near: pnear,
            far: pfar,
            fov: pfov,
          }}
          orthographicCameraProps={{
            position: [ ox, oy, oz ],
            near: onear,
            far: ofar,
            zoom: ozoom,
          }}
        />
      </Flex>
    </div>
  );

}

export default App;
