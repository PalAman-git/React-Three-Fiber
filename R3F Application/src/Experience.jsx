import { useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef } from "react";
import CustomObject from "./CustomObject";
import { Vector3 } from "three";
extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const groupRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y+=delta

    // const angle=state.clock.elapsedTime;
    // state.camera.lookAt(new Vector3())
    // state.camera.position.x=(Math.sin(angle)*8);
    // state.camera.position.z=(Math.cos(angle)*8);
  });
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight intensity={1.5} position={[1,2,3]} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh ref={cubeRef} position-x={2}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="purple" />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI * 0.5} scale={10} position-y={-1}>
        <planeGeometry />
        <meshStandardMaterial color={"olive"} />
      </mesh>

      <CustomObject />
    </>
  );
}
