import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

const ChangeAwarePerspectiveCamera = ({ position, fov, near, far, aspect, lookAt = false }) => {

  const ref = useRef();
  const set = useThree((state) => state.set);
  useEffect(() => {
    set({ camera: ref.current });
    if (ref.current) {
      ref.current.updateProjectionMatrix();
      if (lookAt)
        ref.current.lookAt(5, 5, 0)
    }
  }, [position, fov, near, far, set, aspect, lookAt, set]);
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

const ChangeAwareOrthographicCamera = ({ position, zoom, far, near, lookAt = false }) => {
  const ref = useRef();
  const set = useThree((state) => state.set);
  useEffect(() => {
    set({ camera: ref.current });
    if (ref.current) {
      ref.current.updateProjectionMatrix();
      if (lookAt)
        ref.current.lookAt(5, 5, 0)

    }
  }, [position, zoom, far, near, lookAt, set]);
  useFrame(() => ref.current.updateMatrixWorld());
  return (
    <orthographicCamera
      ref={ref}
      position={position}
      aspect={2}
      near={near}
      far={far}
      zoom={zoom}
    />
  );
}

export { ChangeAwarePerspectiveCamera, ChangeAwareOrthographicCamera }