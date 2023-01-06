import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {

  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      min: -4,
      max: 4,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#00fff4",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: { options: ["a", "b", "c"] },
  });

  return (
    <>
     <Perf position="top-left"/>

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <Cube scale={2} />

      <mesh
        position-y={-1}
        visible={visible}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
